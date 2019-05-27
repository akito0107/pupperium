enum LoggingState {
  Started = 1,
  Stopped
}
let state: LoggingState = LoggingState.Stopped;

const STATE = "logging-state";

const startLogging = document.getElementById("startLogging");
console.log(startLogging);

startLogging.onclick = () => {
  chrome.storage.local.get([STATE], result => {
    if (result[STATE] && result[STATE] === LoggingState.Started) {
      console.log("already started");
      return;
    }
  });
  console.log("start logging");

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { type: "startLogging" }, response => {
      console.log(response);
    });
  });
  state = LoggingState.Started;
};
