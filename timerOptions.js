$(document).ready( function() {
	$("#larger").on("click", function () {
		var currentSize = parseInt($("#timerOut").css("font-size"));
		var newSize = currentSize + 10;
		alert(currentSize);
		$("timerOut").css("font-size", newSize);
	});

	$("#smaller").on("click", function () {
		var currentSize = parseInt($("#timerOut").css("font-size"));
		var newSize = currentSize - 10;
		$("timerOut").css("font-size", newSize);
	});
});