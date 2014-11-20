/**
 * New node file
 */

$(document).ready(function() {
	$("body").delegate("#business-add-form", "submit", function(ev) {
		$.ajax({
			type : $(this).attr('method'),
			url : $(this).attr('action'),
			data : $(this).serialize(),
			success : function(data) {
				showRecievedMessage(JSON.parse(data));
			},
			error : function(data) {
				showRecievedMessage(data);

			}

		});

		ev.preventDefault();
	});



});
