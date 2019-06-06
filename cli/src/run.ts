import { PathLike } from "fs";
import { default as produce } from "immer";
import { reduce } from "p-iteration";
import { default as puppeteer, LaunchOptions } from "puppeteer";
import { default as ffpuppeteer } from "puppeteer-firefox";
import { Builder, WebDriver } from "selenium-webdriver";
import {
  Action,
  ActionName,
  BrowserEngine,
  BrowserPage,
  Scenario
} from "./main";
import { ActionHandler, BrowserType, Context } from "./types";

export type RunnerOptions = {
  browserType: BrowserType;
  scenario: Scenario;
  imageDir: PathLike;
  launchOption?: LaunchOptions;
  handlers: { [key in ActionName]: ActionHandler<key, BrowserType> };
};

async function getBrowser(
  type: BrowserType,
  opts
): Promise<BrowserEngine<BrowserType>> {
  return type === "ie"
    ? new Builder().forBrowser("internet explorer").build()
    : type === "firefox"
    ? ffpuppeteer.launch(opts)
    : puppeteer.launch(opts);
}

async function getPage(
  type: BrowserType,
  browser: BrowserEngine<BrowserType>
): Promise<BrowserPage<BrowserType>> {
  return type === "ie"
    ? (browser as WebDriver)
    : type === "firefox"
    ? (browser as ffpuppeteer.Browser).newPage()
    : (browser as puppeteer.Browser).newPage();
}

export async function run({
  browserType,
  scenario,
  handlers,
  imageDir,
  launchOption
}: RunnerOptions) {
  const browser = await getBrowser(browserType, launchOption);

  if (browserType === "ie" && launchOption.defaultViewport) {
    await (browser as WebDriver)
      .manage()
      .window()
      .setRect({
        width: launchOption.defaultViewport.width,
        height: launchOption.defaultViewport.height
      });
  }

  const page = await getPage(browserType, browser);

  let context: Context = {
    info: {
      options: { browserType, scenario, imageDir, launchOption, handlers },
      name: scenario.name
    },
    currentIteration: 0,
    precondition: { steps: [] },
    iterations: [{ steps: [] }],
    postcondition: { steps: [] }
  };

  const errorHandler = async (ctx: Context) => {
    console.error(ctx);
    if (!ctx.error) {
      return;
    }
    console.error(`scenario ${scenario.name} failed`);
    console.error(`context: ${ctx}`);
    console.error("dom state -------");
    const screenshotHandler = handlers.screenshot;
    await screenshotHandler(
      page,
      {
        action: {
          type: "screenshot",
          name: "error",
          fullPage: true
        }
      },
      {
        imageDir,
        browserType,
        context: ctx
      } as any
    );

    const dumpHandler = handlers.dump;
    await dumpHandler(page, { action: { type: "dump" } });
  };

  try {
    const precondition = scenario.precondition;
    console.log(precondition);
    if (precondition) {
      console.log("precondition start.");
      context = await handlePreCondition(page, handlers, precondition, {
        imageDir,
        context,
        browserType
      });
      await errorHandler(context);
      console.log("precondition done.");
    }

    console.log("main scenario start.");

    if (!context.error) {
      context = await handleIteration(page, handlers, scenario, {
        imageDir,
        context,
        browserType
      });

      await errorHandler(context);
    }
    console.log("main scenario end.");

    if (scenario.postcondition) {
      await handlePostCondition(page, handlers, scenario.postcondition, {
        imageDir,
        context,
        browserType
      });
    }
  } finally {
    await browser.close();
    if (browserType === "ie") {
      await (browser as WebDriver).quit();
    }
  }
}

type ContextReducer = (ctx: Context, res: any) => Context;

export async function handlePreCondition<T extends BrowserType>(
  page: BrowserPage<T>,
  handlers: { [key in ActionName]: ActionHandler<key, T> },
  condition: { url?: string; steps: Action[] },
  {
    imageDir,
    context,
    browserType
  }: { imageDir: PathLike; context: Context; browserType: T }
): Promise<Context> {
  if (condition.url) {
    await handlers.goto(page, {
      action: { type: "goto", url: condition.url }
    });
  }
  return handleAction(
    0,
    page,
    handlers,
    condition.steps,
    {
      imageDir,
      context,
      browserType
    },
    (ctx, res) => {
      return produce(ctx, draft => {
        draft.precondition.steps.push(res);
      });
    }
  );
}

export async function handlePostCondition<T extends BrowserType>(
  page: BrowserPage<T>,
  handlers: { [key in ActionName]: ActionHandler<key, T> },
  condition: { url?: string; steps: Action[] },
  {
    imageDir,
    context,
    browserType
  }: { imageDir: PathLike; context: Context; browserType: T }
): Promise<Context> {
  if (condition.url) {
    await handlers.goto(page, {
      action: { type: "goto", url: condition.url }
    });
  }
  return handleAction(
    0,
    page,
    handlers,
    condition.steps,
    {
      imageDir,
      context,
      browserType
    },
    (ctx, res) => {
      return produce(ctx, draft => {
        draft.postcondition.steps.push(res);
      });
    }
  );
}

export async function handleIteration<T extends BrowserType>(
  page: BrowserPage<T>,
  handlers: { [key in ActionName]: ActionHandler<key, T> },
  scenario: Scenario,
  {
    imageDir,
    browserType,
    context
  }: { imageDir: PathLike; browserType: T; context: Context }
): Promise<Context> {
  return reduce(
    Array.from({ length: scenario.iteration }),
    async (acc: Context, current: number, idx) => {
      console.log(`${idx} th iteration start`);
      console.log(`${scenario.name} start`);
      await handlers.goto(page, {
        action: { type: "goto", url: scenario.url }
      });
      return handleAction(
        idx + 1,
        page,
        handlers,
        scenario.steps,
        {
          context: acc,
          imageDir,
          browserType
        },
        (ctx, res) => {
          return produce(ctx, draft => {
            if (!draft.iterations[idx]) {
              draft.iterations.push({ steps: [] });
            }
            draft.iterations[idx].steps.push(res);
          });
        }
      );
    },
    context
  );
}

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

export async function handleAction<T extends BrowserType>(
  iteration: number,
  page: BrowserPage<T>,
  handlers: { [key in ActionName]: ActionHandler<key, T> },
  steps: Action[],
  {
    imageDir,
    browserType,
    context
  }: { imageDir: PathLike; browserType: T; context: Context },
  reducer: ContextReducer
): Promise<Context> {
  for (const step of steps) {
    const action = step.action;
    console.log(action);
    const handler = handlers[action.type];
    if (!handler) {
      throw new Error(`unknown action type: ${(action as any).type}`);
    }
    const res = await handler(page, { action } as any, {
      context: {
        ...context,
        currentIteration: iteration
      },
      imageDir,
      browserType
    }).catch(e => {
      return { error: e };
    });

    if (res.error) {
      return {
        ...context,
        ...res
      };
    }

    if (browserType === "ie") {
      await sleep(1000);
    }
    context = reducer(context, res);
  }
  return context;
}
