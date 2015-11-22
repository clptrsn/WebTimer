var timer = function() {
	this.elapsed = 0;
	this.startTime = 0;
	this.stop = 0;
	this.running = false;

	this.resetTimer = function() {
		this.elapsed = 0;
		this.startTime = 0;
		this.stop = 0;
		this.running = false;
	};

	this.startTimer = function() {
		this.startTime = Date.now();
		this.running = true;
	};

	this.updateTimer = function() {
		var currentTime = Date.now();
		this.elapsed = currentTime - this.startTime;
	};

	this.getTimerElapsed = function() {
		if( this.running ) this.updateTimer();
		return this.elapsed;		
	};

	this.stopTimer = function() {
		this.stop = Date.now();
		this.elapsed = this.stop - this.startTime;
		this.running = false;
	};

	this.isRunning = function() {
		return this.running;
	}; 

	this.formatTime = function() {
		var timeValues = [];
		var result = '';

		var msTime = this.getTimerElapsed();
		var hundred, seconds, minutes, hours, remainingTime;

		hundred = msTime % 1000;
		remainingTime = (msTime - hundred) / 1000;
		seconds = remainingTime % 60;
		remainingTime = (remainingTime - seconds) / 60;
		minutes = remainingTime % 60;
		remainingTime = (remainingTime - minutes) / 60;
		hours = remainingTime;

		hundred = Math.floor(hundred / 10);

		timeValues = [hours, minutes, seconds, hundred];

		for ( var i = 0; i < timeValues.length; i++) {
			if( i == 0 && timeValues[i] == 0) continue;

			var seperator;
			if( i < timeValues.length - 2) seperator = ':'; 
			else seperator = '.';

			result += padding(timeValues[i], 2) + seperator;
		};

		return result.slice(0,-1);
	};
};

function padding( numberIn, padding) {
	var numberString = numberIn.toString();
	numberString = numberString.split('').reverse().join('');
	var zeros =  padding - numberString.length ;

	for( var i = 0; i < zeros; i++) {
		numberString += '0';
	}

	return numberString.split('').reverse().join('');
}


$(document).ready( function() {

	var cubeTimer = new timer();
	var timerText = '';
	var timerUpdate;

	function updateTimer() {
		timerText = cubeTimer.formatTime();
		$("#timerOut").html(timerText);
	}

	updateTimer();
	$(document.body).on( "keyup", function( e ) {
		if( e.keyCode == 32) {
			if( !cubeTimer.isRunning()) {
				cubeTimer.startTimer();
				timerUpdate = setInterval(function() { updateTimer() }, 1);
			} else {
				cubeTimer.stopTimer();
				updateTimer();
				clearInterval(timerUpdate);
				cubeTimer.resetTimer();
			}
		}
	});
});
