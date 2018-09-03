function Resource(number) {
	this.number = number;
	this.listOfUsers = [];
	this.totalTime = 0;
}

function User(number, waitingTime, useTime) {
	this.number = number;
	this.waitingTime = waitingTime;
	this.useTime = useTime;
}

window.setInterval(() => {
	if (app.started)
  		app.updateTime();
}, 1000);

var app = new Vue({
  el: '#app',
  data: {
  	max: 30,
  	nums: [],
    randNumUsr: 0,
    randNumRes: 0,
    randNumResrcs: [],
    randResObjs: [],
    randNumUsrs: [],
    started: false
  },
   methods: {
   	genListofNums: function() {
   		for (var i = 1; i < this.max; i++) {
   			this.nums.push(i);
		}
   	},

   	randomize: function() {
   		this.genRandResrcs();
   		this.genRandUsrs();
   		this.populateUsrPerRes();
   		this.started = true;
   	},

   	reset: function() {
   		location.reload();
   	},

   	genRandResrcs: function () {
    	var randNumRes = Math.floor((Math.random() * this.max) + 1);
    	var selectedNums = [];
    	var randResrcs = [];   // list of resource object elements
    	var x;
    	this.randNumRes = randNumRes;
    	for (var i = 0; i < randNumRes;) {
    		x = Math.floor((Math.random() * this.max) + 1);
    		if (!selectedNums.includes(x)) {
    			selectedNums.push(x);
    			randResrcs.push(x);
    			i++;
    		}

    	}

    	randResrcs.sort((a, b) => a - b);
    	// populate array of random Resource objects
    	for (var i = 0; i < randResrcs.length; i++) {
    		var res = new Resource(randResrcs[i]);
    		this.randResObjs.push(res);
    		console.log(this.randResObjs[i]);

    	}

    	while (selectedNums.length) { selectedNums.pop(); }
    	this.randNumResrcs = randResrcs;
    	for (var i = 0; i < this.randResObjs.length; i++) {
    		console.log(this.randResObjs[i]);

    	}
    },

    genRandUsrs: function () {
    	var randNumUsr = Math.floor((Math.random() * this.max) + 1);
    	var selectedNums = [];
    	var randUsrs = [];
    	var x;
    	this.randNumUsr = randNumUsr;
    	for (var i = 0; i < randNumUsr;) {
    		x = Math.floor((Math.random() * this.max) + 1);
    		if (!selectedNums.includes(x)) {
    			selectedNums.push(x);
    			randUsrs.push(x);
    			i++;
    		}

    	}

    	randUsrs.sort((a, b) => a - b);
  
    	while (selectedNums.length) { selectedNums.pop(); }
    	this.randNumUsrs = randUsrs;
    },

    populateUsrPerRes: function() {
    	var indicesArr = [];
    	
    	for (var i = 0; i < this.randResObjs.length; i++) {
    		indicesArr.push(i);
    	}
    	
    	for (var i = 0; i < this.randNumUsrs.length; i++) {
    		var prevWaitingTime = 0;
	    	var prevUsageTime = 0;
	    	var currWaitingTime = 0;
	    	var shuffledArr = this.shuffle(indicesArr);
    		var shuffledSortedArr = shuffledArr.sort((a, b) => a - b);
    		var resToUse = Math.floor((Math.random() * this.randResObjs.length) + 1);  // random number of resources to use
    		for (var j = 0; j < resToUse; j++) {
    			var index = shuffledArr[j];
    			currWaitingTime = prevWaitingTime + prevUsageTime;
    			if (currWaitingTime < this.randResObjs[index].totalTime) {
    				currWaitingTime = this.randResObjs[index].totalTime;
    			}
    			var timeNeeded =  Math.floor((Math.random() * 3) + 1);
    			var usr = new User(this.randNumUsrs[i], currWaitingTime, timeNeeded);
    			this.randResObjs[index].listOfUsers.push(usr);
    			this.randResObjs[index].totalTime = (timeNeeded + currWaitingTime);
    			prevWaitingTime = currWaitingTime;
    			prevUsageTime = timeNeeded;
    		}
    	}
    },

    shuffle: function (array) {
    	var currentIndex = array.length, temporaryValue, randomIndex;

	  	// While there remain elements to shuffle...
	  	while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  	}
	  	return array;
	},

	updateTime: function () {
		for (var i = 0; i < this.randResObjs.length; i++) {
    		for (var j = 0; j < this.randResObjs[i].listOfUsers.length; j++) {
    			if (this.randResObjs[i].listOfUsers[j].waitingTime == 0) {
    				this.randResObjs[i].listOfUsers[j].useTime--;
    				if (this.randResObjs[i].listOfUsers[j].useTime == 0) {
    					this.randResObjs[i].listOfUsers.shift();
    					j--;
    				}
    			} else {
					this.randResObjs[i].listOfUsers[j].waitingTime--;
				}
    		}
    	}
    	console.log("hello");
	}
  }
})