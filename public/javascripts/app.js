$(document).ready(function() {

	$('#codeRequestor').on('submit', function(e) {
		var codeInput = $(this).find('#reqCode');
		window.location.href = '/error/'+codeInput.val();
		return false;
	});

	$('#statusRequestor').on('submit', function(e) {
		var urlInput = $(this).find('#statusUrl');
		var parser = $('<a>', {href: urlInput.val()})[0]
		if (parser.protocol === 'https:') {
			alert('Secure websites (https) are not supported at this time');
			return false;
		}
		var url = [
			'http://'
			, parser.host
			, parser.pathname
			, parser.search
			, parser.hash
		]
		window.location.href = '/status/'+url.join('');
		return false;
	});


});