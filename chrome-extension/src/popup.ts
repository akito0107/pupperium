import "chrome-extension-async";
import { EVENT_KEY, EventType, LoggingState, STATE_KEY } from "./keys";

const startLoggingButton = document.getElementById("startLogging");
const stopLoggingButton = document.getElementById("stopLogging");

startLoggingButton.onclick = () => {
  startLogging().then();
};

stopLoggingButton.onclick = () => {
  stopLogging().then();
};

async function startLogging() {
  const result = await chrome.storage.local.get([STATE_KEY]);
  if (result[STATE_KEY] && result[STATE_KEY] === LoggingState.Started) {
    console.log("already started");
    return;
  }

  console.log("start logging");
  const scenarioName = (document.getElementById(
    "scenarioName"
  ) as HTMLInputElement).value;
  console.log(scenarioName);
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.tabs.sendMessage(tabs[0].id, {
    type: EventType.Start,
    payload: {
      scenarioName
    }
  });

  const url = tabs[0].url;
  await chrome.storage.local.set({
    [EVENT_KEY]: {
      url,
      scenarioName,
      events: []
    }
  });

  await chrome.storage.local.set({ [STATE_KEY]: LoggingState.Started });
}

async function stopLogging() {
  const result = await chrome.storage.local.get([STATE_KEY]);
  if (!result[STATE_KEY] || result[STATE_KEY] === LoggingState.Stopped) {
    console.log("state is stopped");
    return;
  }
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await chrome.tabs.sendMessage(tabs[0].id, {
    type: EventType.Stop
  });

  const ev = await chrome.storage.local.get([EVENT_KEY]);

  download(response, ev[EVENT_KEY].scenarioName);

  await chrome.storage.local.set({ [STATE_KEY]: LoggingState.Stopped });
}

function download(body, filename) {
  const atag = document.createElement("a");
  const blob = new Blob([body], { type: "text/plain" });
  atag.href = URL.createObjectURL(blob);
  atag.target = "_blank";
  atag.download = `${filename}.yaml`;

  atag.click();
}
