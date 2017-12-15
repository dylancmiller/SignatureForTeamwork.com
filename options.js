// Saves options to chrome.storage
function save_options() {
  var signature = document.getElementById('signature').value.replace(/\r\n|\n|\r/g, '<br />');
  chrome.storage.sync.set({
    signatureText: signature
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
  signatureText: 'Enter text here...'
  }, function(items) {
    document.getElementById('signature').value = items.signatureText.replace(/<br\s*\/?>/mg,"\r\n");
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);