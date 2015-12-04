var timer = function() {
	this.elapsed = 0;
	this.startTime = 0;
	this.stop = 0;
	this.running = false;
	this.highestSolveId = 0;
	this.times = [];
	this.sortedTimes = [];

	this.stats = {
		bestAo5: 0,
		bestAo12: 0,
		meanRunning: 0,
		mean: 0,
		median: 0,
		totalTimes: 0,
		Ao5: 0,
		Ao12: 0,
		secondMeanRunning: 0,
		secondMean: 0,
		standardDev: 0,
		worst: 0,
		best: 0
	};

	this.overallStats = {
		mean: 0,
		median: 0,
		totalTimes: 0,
		Ao5: 0,
		Ao12: 0,
		secondMean: 0,
		standardDev: 0,
		worst: 0,
		best: 0
	};


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

	this.formatTime = function( msTime ) {
		var timeValues = [];
		var result = '';

		var hundred, seconds, minutes, hours, remainingTime;

		//Calculate the Time components from millisecs
		hundred = msTime % 1000;
		remainingTime = (msTime - hundred) / 1000;
		seconds = remainingTime % 60;
		remainingTime = (remainingTime - seconds) / 60;
		minutes = remainingTime % 60;
		remainingTime = (remainingTime - minutes) / 60;
		hours = remainingTime;

		hundred = Math.floor(hundred / 10);

		if(hours == 0) timeValues = [minutes, seconds, hundred]; //trims the hours if the are 0
		else timeValues = [hours, minutes, seconds, hundred];

		for ( var i = 0; i < timeValues.length; i++) {
			if( i == 0 && timeValues[i] == 0) continue; //trims the minutes if necessary

			var seperator;
			if( i < timeValues.length - 2) seperator = ':'; 
			else seperator = '.';


			result += padding(timeValues[i], 2) + seperator;
		};

		return result.slice(0,-1);
	};

	this.logNewTimes = function() {
		var prev = $("#times").children("p").html();
		var seperator = "";
		if( prev != "") seperator = ", ";

		var len = this.times.length - 1;
		
		var solveTime = '' + getTimes(this.formatTime(this.times[len].solveTime));

		$("#times").children("p").append(seperator + "<span id = \"solve" + this.times[len].solveId + "\">" + solveTime + "</span>");
	};

	this.addLatestTime = function() {
		this.highestSolveId++;
		var timeObject = {
			solveId: this.highestSolveId,
			solveTime: this.elapsed
		};

		this.times.push(timeObject);
	};

	this.sortNewTime = function( timerObject ) {
		var time = timerObject.solveTime;
		var len = this.sortedTimes.length;
		for (var i = 0; i < len; i++) {
			if( time < this.sortedTimes[i].solveTime ) break;
		}
		this.sortedTimes.splice( i, 0, timerObject);
	}

	this.updateCurrentMean = function() {
		var timeLen = this.times.length;
		this.stats.meanRunning += this.times[timeLen - 1].solveTime;
		this.stats.mean = Math.round(this.stats.meanRunning / timeLen);

		var meanOutput = this.formatTime( this.stats.mean );
		var outputString = $("#mean").html();

		$("#mean").html(outputString.split("</span>")[0] + "</span>" + meanOutput);
	}

	this.updateCurrentStandardDev = function() {
		var timeLen = this.times.length;
		var currentTime = this.times[ timeLen - 1].solveTime;

		this.stats.secondMeanRunning += ( currentTime * currentTime );
		this.stats.secondMean = Math.round(this.stats.secondMeanRunning / timeLen);

		var variance = this.stats.secondMean - (this.stats.mean * this.stats.mean);
		this.stats.standardDev = Math.round( Math.sqrt( Math.abs(variance)));

		var stdDevOutput = this.formatTime( this.stats.standardDev );
		var outputString = $("#stdDev").html();

		$("#stdDev").html( outputString.split("</span>")[0] + "</span>" + stdDevOutput );
	}

	this.updateCurrentMedian = function() {
		var timeLen = this.times.length;
		var newTime = this.times[timeLen - 1];

		this.sortNewTime( newTime );

		if( timeLen % 2 == 0) {
			var start = timeLen / 2 ;
			this.stats.median = this.sortedTimes[start].solveTime;
			start--;
			this.stats.median += this.sortedTimes[start].solveTime;
			this.stats.median /= 2;
		} else {
			this.stats.median = this.sortedTimes[ Math.floor(timeLen / 2) ].solveTime;
		}


		var medianOutput = this.formatTime( this.stats.median );
		var outputString = $("#median").html();

		$("#median").html( outputString.split("</span>")[0] + "</span>" + medianOutput);
	}

	this.updateCurrentWorst = function() {
		var timeLen = this.times.length;
		var current = this.times[ timeLen - 1].solveTime;
		if( timeLen == 1)
			this.stats.worst = this.times[timeLen - 1];
		else if( current > this.stats.worst.solveTime) 
			this.stats.worst = this.times[timeLen - 1];

		var worstOutput = this.formatTime( this.stats.worst.solveTime );
		var outputString = $("#worst").html();

		$("#worst").html( outputString.split("</span>")[0] + "</span>" + worstOutput );	
	}

	this.updateCurrentWorst = function() {
		var timeLen = this.times.length;
		
		this.stats.worst = this.sortedTimes[ timeLen - 1];

		var worstOutput = this.formatTime( this.stats.worst.solveTime );
		var outputString = $("#worst").html();

		$("#worst").html( outputString.split("</span>")[0] + "</span>" + worstOutput );	
	}

	this.updateCurrentBest = function() {
		var timeLen = this.times.length;

		this.stats.best = this.sortedTimes[ 0 ];

		var bestOutput = this.formatTime( this.stats.best.solveTime );
		var outputString = $("#best").html();

		$("#best").html( outputString.split("</span>")[0] + "</span>" + bestOutput );	
	}

	this.updateCurrentAo5 = function() {
		var timeLen = this.times.length;

		if( timeLen >= 5) {
			var last5Times = this.times.slice(-5);
			trim( last5Times );
			alert( last5Times );
		} 
	}

	this.updateAllCurrentStats = function() {
		this.updateCurrentMean();
		this.updateCurrentStandardDev();
		this.updateCurrentMedian();
		this.updateCurrentWorst();
		this.updateCurrentBest();
	}

};

function trim( timeArray ) {
	var length = timerArray.length;
	var bigIndex = 0,
		smallIndex = 0;
	for( i = 1; i < length; i++) {
		if( timerArray[i].solveTime < timerArray[smallIndex].solveTime )
			smallIndex = i;
		if( timerArray[i].solveTime < timerArray[bigIndex].solveTime )
			bigIndex = i;
	}

	timerArray.slice(bigIndex, 1);
	timerArray.silce(smallIndex, 1);
}

function padding( numberIn, padding) {
	var numberString = numberIn.toString();
	numberString = numberString.split('').reverse().join('');
	var zeros =  padding - numberString.length;

	for( var i = 0; i < zeros; i++) {
		numberString += '0';
	}

	return numberString.split('').reverse().join('');
}

function getTimes( time ) {
	var timeComponents = time.split(":");

	var s;

	if( timeComponents.length == 1) {
		if( Number(timeComponents[0].split(".")[0]) == 0 ) s = timeComponents[0].slice(1);
		else s = timeComponents[0];
	} else {
		s = Number(timeComponents[0]) + '';
		for( i = 1; i < timeComponents.length; i++) {
			s += ":" + timeComponents[i];
		}
	}

	return s;	
}

$(document).ready( function() {

	var cubeTimer = new timer();	
	var timerUpdate;

	function updateTimer() {
		var timerText = '';
		var timerTime = cubeTimer.getTimerElapsed();

		timerText = cubeTimer.formatTime( timerTime);
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

				cubeTimer.addLatestTime();
				cubeTimer.logNewTimes();
				cubeTimer.updateAllCurrentStats();
				cubeTimer.resetTimer();
			}
		}
	});
});