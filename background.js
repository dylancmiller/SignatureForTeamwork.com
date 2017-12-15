// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tabs) {
  	sendMessageToActiveTab(tabs, "clicked_browser_action");
});

// Called when the user presses a keyboard shortcut defined in manifest.json.
chrome.commands.onCommand.addListener(function(command) {
	if(command == "insertSignature")
		sendMessageToActiveTab(command, "command_insertSignature");
});

/**
* sendMessageToActiveTab(tabs, messageName) - 
* Description: Sends a message to active tab. Content.js should handle the message. 
* @Params
* -tabs: This is the parameter passed from the initial event.
* -messageName: Name of message.
**/
function sendMessageToActiveTab(tabs, messageName){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {  
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {"message": messageName});
	});
}