const changeColor = document.getElementById("changeColor");

changeColor.onclick = element => {
  const color = (element.target as any).value;
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.executeScript(tabs[0].id, {
      code: 'document.body.style.backgroundColor = "' + color + '";'
    });
  });
};

enum LoggingState {
  Started = 1,
  Stopped
}
const state: LoggingState = LoggingState.Started;

const startLogging = document.getElementById("startLogging");

startLogging.onclick = () => {
  if (state === LoggingState.Started) {
    console.log("already started");
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.executeScript(tabs[0].id, {});
  });
};
