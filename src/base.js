
var H = {



	// Checking type of variables
	// Source: underscore.js

	isArray: function(obj) {
		return toString.call(obj) == '[object Array]';
	},

	isObject: function(obj) {
		return obj === Object(obj);
	},

	isFunction: function(obj) {
		return toString.call(obj) == '[object Function]';
	},



	// Get Object size
	// Source: http://stackoverflow.com/questions/5223/length-of-a-javascript-object-that-is-associative-array

	objSize: function(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
	},



	// String pad
	// Source: http://www.webtoolkit.info/

	STR_PAD_LEFT: 1,
	STR_PAD_RIGHT: 2,
	STR_PAD_BOTH: 3,

	strpad: function(str, len, pad, dir) {

	    if (typeof(len) == "undefined") { var len = 0; }
	    if (typeof(pad) == "undefined") { var pad = ' '; }
	    if (typeof(dir) == "undefined") { var dir = H.STR_PAD_RIGHT; }

	    if (len + 1 >= str.length) {

	        switch (dir){

	            case H.STR_PAD_LEFT:
	                str = Array(len + 1 - str.length).join(pad) + str;
	            break;

	            case H.STR_PAD_BOTH:
	                var right = Math.ceil((padlen = len - str.length) / 2);
	                var left = padlen - right;
	                str = Array(left+1).join(pad) + str + Array(right+1).join(pad);
	            break;

	            default:
	                str = str + Array(len + 1 - str.length).join(pad);
	            break;

	        } // switch

	    }

	    return str;

	},



	// Better webkit console logging.
	// (c) 2015 | Pierrick Varin (hezad.com)

	logger: {
	    domainPadLength: 20,
	    domainSeparator: ':',
	    isActive: true,
	    logType: 'info',

	    logDomainStyles: {
	        info:  'background: #eaeaff; color: #1214ff;',
	        error: 'background: #ffeaea; color: #ff1214;',
	        log:   'background: #ffffff; color: #404040'
	    },

	    tempData: {},

	    as: function(domainName) {
	        H.logger.tempData.domainName = domainName;
	        return H.logger;
	    },

	    log: function() {
	        H.logger.logType = 'info';
	        H.logger.finalLog.apply(H.logger, arguments);
	    },

	    info: function() {
	        H.logger.logType = 'info';
	        H.logger.finalLog.apply(H.logger, arguments);
	    },

	    error: function() {
	        H.logger.logType = 'error';
	        H.logger.finalLog.apply(H.logger, arguments);
	    },

	    finalLog: function() {
	        var args = [];
	        for(var i = 0; i < arguments.length; i++) {
	            args.push(arguments[i]);
	        }

	        if( H.logger.tempData.domainName ) {
	            var domainString = H.strpad(H.logger.tempData.domainName + ' ', H.logger.domainPadLength, ' ', H.STR_PAD_LEFT) + H.logger.domainSeparator;

	            args.unshift(domainString);
	            args.unshift('font-weight: bold; '+H.logger.logDomainStyles[H.logger.logType]);
	            args.unshift('%c%s');
	        }

	        if( H.logger.isActive ) {
	            console[H.logger.logType].apply(console, args);
	        }

	        H.logger.tempData = {};
	    }
	},


	// Human readable time intervals
	humanReadableTimeDiff: function(milliseconds) {

		function numberEnding (number) {
		    return (number > 1) ? 's' : '';
		}

		var temp = Math.floor(milliseconds / 1000);
		var years = Math.floor(temp / 31536000);
		if (years) {
		    return years + ' year' + numberEnding(years);
		}
		//TODO: Months! Maybe weeks? 
		var days = Math.floor((temp %= 31536000) / 86400);
		if (days) {
		    return days + ' day' + numberEnding(days);
		}
		var hours = Math.floor((temp %= 86400) / 3600);
		if (hours) {
		    return hours + ' hour' + numberEnding(hours);
		}
		var minutes = Math.floor((temp %= 3600) / 60);
		if (minutes) {
		    return minutes + ' minute' + numberEnding(minutes);
		}
		var seconds = temp % 60;
		if (seconds) {
		    return seconds + ' second' + numberEnding(seconds);
		}
		return 'an instant ago';
	}
};
