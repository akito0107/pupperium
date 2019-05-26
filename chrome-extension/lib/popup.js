var changeColor = document.getElementById("changeColor");
changeColor.onclick = function (element) {
    var color = element.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            code: 'document.body.style.backgroundColor = "' + color + '";'
        });
    });
};
var LoggingState;
(function (LoggingState) {
    LoggingState[LoggingState["Started"] = 1] = "Started";
    LoggingState[LoggingState["Stopped"] = 2] = "Stopped";
})(LoggingState || (LoggingState = {}));
var state = LoggingState.Started;
var startLogging = document.getElementById("startLogging");
startLogging.onclick = function () {
    if (state === LoggingState.Started) {
        console.log("already started");
        return;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {});
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcG9wdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUUzRCxXQUFXLENBQUMsT0FBTyxHQUFHLFVBQUEsT0FBTztJQUMzQixJQUFNLEtBQUssR0FBSSxPQUFPLENBQUMsTUFBYyxDQUFDLEtBQUssQ0FBQztJQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxFQUFFLFVBQUEsSUFBSTtRQUMzRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3BDLElBQUksRUFBRSx5Q0FBeUMsR0FBRyxLQUFLLEdBQUcsSUFBSTtTQUMvRCxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLElBQUssWUFHSjtBQUhELFdBQUssWUFBWTtJQUNmLHFEQUFXLENBQUE7SUFDWCxxREFBTyxDQUFBO0FBQ1QsQ0FBQyxFQUhJLFlBQVksS0FBWixZQUFZLFFBR2hCO0FBQ0QsSUFBTSxLQUFLLEdBQWlCLFlBQVksQ0FBQyxPQUFPLENBQUM7QUFFakQsSUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUU3RCxZQUFZLENBQUMsT0FBTyxHQUFHO0lBQ3JCLElBQUksS0FBSyxLQUFLLFlBQVksQ0FBQyxPQUFPLEVBQUU7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9CLE9BQU87S0FDUjtJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLEVBQUUsVUFBQSxJQUFJO1FBQzNELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==