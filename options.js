// Saves options to chrome.storage
function save_options() {
  var signature = document.getElementById('signature').value;//.replace(/<p.*?>/gi,'<br/>').replace(/<\/p>/gi,'<br/>');
  console.log(signature);
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
    document.getElementById('signature').value = items.signatureText;
  });
}

document.addEventListener('DOMContentLoaded', 
	function() {
		tinymce.init({
		selector: '#signature',
		menubar: false,
		resize: 'both',
		toolbar: 'styleselect | undo redo bold italic underline | bullist numlist | forecolor backcolor | image link hr',
		height: 150,
		width: 550,
		plugins: "paste hr link code image textcolor lists",
		branding: false,
		paste_enable_default_filters: false,
		paste_preprocess: function(plugin, args) {
			console.log(args.content);
			//Stripping pargraph tags due to poor formatting when pasting in TinyMCE
			args.content = args.content.replace(/<p.*?>/gi,'').replace(/<\/p>/gi,'<br/>');
		},
		forced_root_block : '',
		setup: function (editor) {
			editor.on('change', function () {
				editor.save();
			})
		}});
	});
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);