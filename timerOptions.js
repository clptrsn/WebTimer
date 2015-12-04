$(document).ready( function() {
	$("#optionShow").on("click", function() {
		if($("#option").is(':visible')) {
			$("#option").hide();
			changeHeightDivs(0);
		} else {
			$("#option").show();
			changeHeightDivs(-50);
		}
	});

	function changeHeightDivs( change ) {
		$("#timer").height("calc(100% - 78px + " + change + "px)");
		$("#stats").height("calc(100% - 78px + " + change + "px)");
		$("#times").height("calc(100% - 78px + " + change + "px)");
	}

	$("#larger").on("click", function () {
		var currentSize = parseInt($("#timerOut").css("font-size"));
		var newSize = currentSize + 10;

		var optionHeight = $("#timer").height() / 2 + newSize;
		$("#timerOut").css("fontSize", newSize);
		$("#optionShow").css({"top": optionHeight });
	});

	$("#smaller").on("click", function () {
		var currentSize = parseInt($("#timerOut").css("font-size"));
		var newSize = currentSize - 10;

		var optionHeight = $("#timer").height() / 2 + newSize;
		$("#timerOut").css("fontSize", newSize);
		$("#optionShow").css({"top": optionHeight });
	});
});