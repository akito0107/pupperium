function logging() {
  console.log("start logging");
  const forms = document.querySelectorAll("input");
  console.log(forms);

  forms.forEach((f: HTMLInputElement) => {
    f.addEventListener("change", ev => {
      console.log(ev);
    });
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "startLogging":
      logging();
      sendResponse("started");
      break;
    default:
      console.log(`${message} is unknown`);
  }
});
