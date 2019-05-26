function logging() {
    console.log("start logging");
    var forms = document.querySelectorAll("input");
    console.log(forms);
    forms.forEach(function (f) {
        f.addEventListener("change", function (ev) {
            console.log(ev);
        });
    });
}
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.type) {
        case "startLogging":
            logging();
            sendResponse("started");
            break;
        default:
            console.log(message + " is unknown");
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NjcmlwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTLE9BQU87SUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdCLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRW5CLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFtQjtRQUNoQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFVBQUEsRUFBRTtZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZO0lBQ2pFLFFBQVEsT0FBTyxDQUFDLElBQUksRUFBRTtRQUNwQixLQUFLLGNBQWM7WUFDakIsT0FBTyxFQUFFLENBQUM7WUFDVixZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDeEIsTUFBTTtRQUNSO1lBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBSSxPQUFPLGdCQUFhLENBQUMsQ0FBQztLQUN4QztBQUNILENBQUMsQ0FBQyxDQUFDIn0=