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
		this.elapsed = currentTime - this.start;
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
};


$(document).ready( function() {

	var cubeTimer = new timer();
	var cubeTimerTimeout;
	$(document.body).on( "keyup", function( e ) {
		if( e.keyCode == 32) {
			updateTimerText( cubetimer);
			if( !cubeTimer.isRunning()) {
				cubeTimer.startTimer();
			} else {
				cubeTimer.stopTimer();
				cubeTimer.resetTimer();
			}
		}
	});
});

