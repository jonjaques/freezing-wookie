$(document).ready(function() {

	$('#codeRequestor').on('submit', function(e) {
		var codeInput = $(this).find('#reqCode');
		window.location.href = '/error/'+codeInput.val();
		return false;
	});

});