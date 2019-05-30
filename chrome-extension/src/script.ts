import "chrome-extension-async";
import { EVENT_KEY, EventType } from "./keys";
import {
  Action,
  InputAction,
  RadioAction,
  Scenario,
  SelectAction
} from "@pupperium/cli";

import * as YAML from "yamljs";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === EventType.Start) {
    inputLogging();
    sendResponse("started");
    return true;
  }

  if (message.type === EventType.Stop) {
    generateScenario().then(yamlstr => {
      sendResponse(yamlstr);
    });
    return true;
  }
});

function inputLogging() {
  console.log("start logging");
  const forms = document.querySelectorAll("input");
  const textareas = document.querySelectorAll("textarea");
  const selects = document.querySelectorAll("select");

  const logging = inputs => {
    inputs.forEach((f: HTMLInputElement) => {
      f.addEventListener("change", ev => {
        appendEvent(ev).then();
      });
    });
  };

  logging(forms);
  logging(textareas);
  logging(selects);
}

function parseInputEvent(ev: Event) {
  const target = ev.target as HTMLInputElement;
  let type = target.getAttribute("type");
  const name = target.getAttribute("name");
  const id = target.getAttribute("id");

  if (target.localName === "select") {
    type = "select";
  }

  if (target.localName === "textarea") {
    type = "textarea";
  }

  return {
    id,
    type: type || "input",
    name,
    value: target.value
  };
}

async function appendEvent(ev) {
  const logs = await chrome.storage.local.get([EVENT_KEY]);
  const log = parseInputEvent(ev);
  console.log(log);
  const newLogs = {
    ...logs[EVENT_KEY],
    events: logs[EVENT_KEY].events.concat([log])
  };

  await chrome.storage.local.set({
    [EVENT_KEY]: newLogs
  });
}

async function generateScenario() {
  const logs = await chrome.storage.local.get([EVENT_KEY]);

  const url = logs[EVENT_KEY].url;

  const events: Action[] = logs[EVENT_KEY].events.map(e => {
    switch (e.type) {
      case "text":
      case "email":
      case "password":
      case "tel":
      case "input":
        const inputAction: InputAction = {
          action: {
            type: "input",
            form: {
              selector: `input[name="${e.name}"]`,
              value: e.value
            }
          }
        };

        return inputAction;
      case "date":
        const dateAction: InputAction = {
          action: {
            type: "input",
            form: {
              selector: `input[name="${e.name}"]`,
              value: {
                date: e.value as string
              }
            }
          }
        };
        return dateAction;
      case "select":
        const selectAction: SelectAction = {
          action: {
            type: "select",
            form: {
              selector: `select[name="${e.name}"]`,
              constrains: {
                required: true,
                values: [e.value]
              }
            }
          }
        };

        return selectAction;
      case "textarea":
        const textareaAction: InputAction = {
          action: {
            type: "input",
            form: {
              selector: `textarea[name="${e.name}"]`,
              value: e.value
            }
          }
        };

        return textareaAction;
      case "radio":
        const radioAction: RadioAction = {
          action: {
            type: "radio",
            form: {
              selector: `input[name="${e.name}"]`,
              value: e.value
            }
          }
        };

        return radioAction;
      default:
        console.error(`unknown error type: ${e.type}`);
    }
  });

  const scenario: Scenario = {
    name: logs[EVENT_KEY].scenarioName,
    iteration: 1,
    url,
    steps: events
  };

  return YAML.stringify(scenario, 100);
}
