// content.js

//Listener for actions sent from background.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) 
		insertSignature();
	else if ( request.message === "command_insertSignature")
		insertSignature();
  }
);

/*
* insertSignature() - Retreives signature from chrome settings or uses a default string
* 	and inserts the signature at the end of the comment text box in Teamwork.com.
*/
function insertSignature() {
	chrome.storage.sync.get({
			//Default attributes in storage
			signatureText: 'You need to set your signature! To do so, right click on the extension in your toolbar and select "Options".'
		}, 
		function(items) {
			//Retreive signature from Chrome storage
			var signature = items.signatureText;
			
			//Insert signature into comment text box
			$('.fr-element.fr-view').first().append('<code>' + signature + '</code></br>');
		}
	);
}
