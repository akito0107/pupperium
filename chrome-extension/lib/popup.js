var LoggingState;
(function (LoggingState) {
    LoggingState[LoggingState["Started"] = 1] = "Started";
    LoggingState[LoggingState["Stopped"] = 2] = "Stopped";
})(LoggingState || (LoggingState = {}));
var state = LoggingState.Stopped;
var startLogging = document.getElementById("startLogging");
console.log(startLogging);
startLogging.onclick = function () {
    if (state === LoggingState.Started) {
        console.log("already started");
        return;
    }
    console.log("start logging");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "startLogging" }, function (response) {
            console.log(response);
        });
    });
    state = LoggingState.Started;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcG9wdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSyxZQUdKO0FBSEQsV0FBSyxZQUFZO0lBQ2YscURBQVcsQ0FBQTtJQUNYLHFEQUFPLENBQUE7QUFDVCxDQUFDLEVBSEksWUFBWSxLQUFaLFlBQVksUUFHaEI7QUFDRCxJQUFJLEtBQUssR0FBaUIsWUFBWSxDQUFDLE9BQU8sQ0FBQztBQUUvQyxJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzdELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFMUIsWUFBWSxDQUFDLE9BQU8sR0FBRztJQUNyQixJQUFJLEtBQUssS0FBSyxZQUFZLENBQUMsT0FBTyxFQUFFO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvQixPQUFPO0tBQ1I7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRTdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLEVBQUUsVUFBQSxJQUFJO1FBQzNELE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQUUsVUFBQSxRQUFRO1lBQ3BFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILEtBQUssR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDO0FBQy9CLENBQUMsQ0FBQyJ9