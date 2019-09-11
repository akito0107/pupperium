import { PathLike } from "fs";
import { default as puppeteer } from "puppeteer";
import { WebDriver } from "selenium-webdriver";
import { ActionName, ActionType, RunnerOptions } from "./main";

export type Context = {
  info: {
    // @sumary scenario name
    name: string;
    options: RunnerOptions;
  };
  currentIteration: number;
  precondition: {
    steps: Array<{}>;
  };
  iterations: Array<{
    steps: Array<{}>;
  }>;
  postcondition: {
    steps: Array<{}>;
  };
  error?: Error;
};

export type BrowserType = "ie" | "chrome" | "firefox" | "edge";

export type WebDriverType = "ie" | "edge";

export type BrowserEngine<T extends BrowserType> = T extends WebDriverType
  ? WebDriver
  : puppeteer.Browser;

export type BrowserPage<T extends BrowserType> = T extends WebDriverType
  ? WebDriver
  : puppeteer.Page;

export type ActionHandler<T extends ActionName, E extends BrowserType> = (
  page: BrowserPage<E>,
  action: ActionType<T>,
  options?: { imageDir: PathLike; browserType: E; context: Context }
) => Promise<any>;

/**
 * @summary test
 */
export type Scenario = {
  /**
   *  `true` のとき当該のファイルのシナリオの実行をskipする
   */
  skip?: boolean;
  /**
   * シナリオ名. `--target` オプションで指定する.
   */
  name: string;
  /**
   * 繰り返す回数
   */
  iteration: number;
  /**
   * 最初にブラウザで開くURL.
   * preconditionが設定されている場合は, preconditionの実行終了時に遷移する.
   */
  url: string;
  /**
   * mainのaction(steps)を実行する前に実行するaction. login処理などで用いる.
   *
   * ### example
   * ```yaml
   * name: login
   * iteration: 1
   * url: http://example.com
   * precondition:
   *   url: http://example.com/login
   *   steps:
   *     - action:
   *         type: input
   *         form:
   *           selector: 'input[name="email"]'
   *           value: 'test@test.com'
   *     - action:
   *         type: input
   *         form:
   *           selector: 'input[name="password"]'
   *           value: 'password'
   *     - action:
   *         type: click
   *         selector: 'button'
   *         navigation: true
   * steps:
   *     - action:
   *         type: ....
   * ```
   */
  precondition?: PreCondition;
  /**
   * mainのscenarioを記述する. iterationが指定されている場合は, この中を繰り返す.
   */
  steps: Action[];
  /**
   * scenarioがすべて終了した時, もしくは, scenarioが異常終了した時に実行される.
   * error handlingなどのcustom actionを定義して使用する.
   */
  postcondition?: PostCondition;
};

/**
 * main scenario実行前に実行される処理
 */
export type PreCondition = {
  /**
   * 最初にブラウザで開くURL
   */
  url: string;
  /**
   * ctionを記述する.
   */
  steps: Action[];
};

/**
 * main scenario実行後に実行される処理
 */
export type PostCondition = {
  /**
   * actionを記述する.
   */
  steps: Action[];
};

/**
 * Browserのaction
 */
export type Action =
  | InputAction
  | ClickAction
  | SelectAction
  | WaitAction
  | EnsureAction
  | RadioAction
  | ScreenshotAction
  | GotoAction
  | ClearAction
  | DumpAction;

type Value =
  /**
   * formに直接文字列を入力する
   *
   * ### example
   * ```yaml
   *  - action:
   *    type: input
   *    form:
   *      selector: 'input[name="name"]'
   *      value: "name"
   * ```
   */
  | string
  | {
      /**
       * [faker](https://www.npmjs.com/package/faker) を使う時に使用する.
       *
       * ### example
       * ```yaml
       * - action:
       *   type: input
       *   form:
       *     selector: 'input[name="address"]'
       *     value:
       *       faker: address.city
       * ```
       */
      faker: string;
    }
  | {
      /**
       * input type="date"に入力する場合に使う.
       *
       * ### example
       * ```yaml
       * - action:
       *   type: input
       *   form:
       *     selector: 'input[name="birthday"]'
       *     value:
       *       date: "1989-04-01"
       * ```
       */
      date: string;
    };

export type ActionName =
  | "input"
  | "click"
  | "select"
  | "wait"
  | "ensure"
  | "radio"
  | "screenshot"
  | "goto"
  | "clear"
  | "dump";

export type ActionType<T extends ActionName> = T extends "input"
  ? InputAction
  : T extends "click"
  ? ClickAction
  : T extends "select"
  ? SelectAction
  : T extends "wait"
  ? WaitAction
  : T extends "ensure"
  ? EnsureAction
  : T extends "radio"
  ? RadioAction
  : T extends "screenshot"
  ? ScreenshotAction
  : T extends "goto"
  ? GotoAction
  : T extends "clear"
  ? ClearAction
  : T extends "dump"
  ? DumpAction
  : never;

/**
 * Actionの入力に成約を加える場合に用いる. 現在は `regexp` しか動作しない.
 */
type Constrains = {
  /**
   * @deprecated
   * unused
   */
  required: boolean;
  /**
   * 正規表現を満たすような文字列を自動で出力する.
   *
   * ### example
   * ```yaml
   * - action:
   *   type: input
   *   form:
   *     selector: 'input[name="email"]'
   *     constrains:
   *       regexp: '([a-z]|[0-9]){5,10}@test\.com'
   * ```
   */
  regexp: string;
};

type ActionMeta = {
  name?: string;
  tag?: string;
};

/**
 * input type=form, dateもしくはtextareaに対する入力を行う.
 *
 * ### example
 * ```yaml
 * - action:
 *   type: input
 *   form:
 *     selector: 'input[name="email"]'
 *     constrains:
 *       regexp: '([a-z]|[0-9]){5,10}@test\.com'
 * - action:
 *   type: input
 *   form:
 *     selector: 'input[name="name"]'
 *     value: "name"
 * ```
 */
export type InputAction = {
  action: {
    meta?: ActionMeta;
    type: "input";
    form: {
      /**
       * css selector
       */
      selector: string;
      /**
       * valueかconstrainsのどちらか片方しか指定できない.
       * 任意の文字列を入力したい場合はvalueを, 与えた正規表現から任意の文字列を入力したい場合はconstraintsを使う
       */
      constrains?: Constrains;
      /**
       * valueかconstrainsのどちらか片方しか指定できない.
       * 任意の文字列を入力したい場合はvalueを, 与えた正規表現から任意の文字列を入力したい場合はconstraintsを使う
       */
      value?: Value;
    };
  };
};

export type ClickAction = {
  action: {
    meta?: ActionMeta;
    type: "click";
    selector: string;
    navigation: boolean;
    emulateMouse: boolean;
  };
};

export type SelectAction = {
  action: {
    meta?: ActionMeta;
    type: "select";
    form: {
      selector: string;
      constrains: {
        required: boolean;
        values: Value[];
      };
    };
  };
};

export type WaitAction = {
  action: {
    meta?: ActionMeta;
    name?: string;
    type: "wait";
    duration: number;
  };
};

export type ScreenshotAction = {
  action: {
    meta?: ActionMeta;
    type: "screenshot";
    name: string;
    fullPage?: boolean;
  };
};

export type EnsureAction = {
  action: {
    meta?: ActionMeta;
    name?: string;
    type: "ensure";
    location: {
      regexp?: string;
      value?: string;
    };
  };
};

export type RadioAction = {
  action: {
    meta?: ActionMeta;
    type: "radio";
    form: {
      selector: string;
      constrains?: {
        required: boolean;
      };
      value: string;
    };
  };
};

export type GotoAction = {
  action: {
    meta?: ActionMeta;
    type: "goto";
    url: string;
  };
};

export type ClearAction = {
  action: {
    meta?: ActionMeta;
    type: "clear";
    selector: string;
  };
};

export type DumpAction = {
  action: {
    meta?: ActionMeta;
    type: "dump";
  };
};
