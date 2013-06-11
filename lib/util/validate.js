"use strict";
/**
 * Validate
 *
 * @name   index.js
 * @author Taiga Kodaira
 */
var Validate = function () {};
module.exports = new Validate();

/**
 *
 * Validation
 *
 * @param object req  : express request object
 * @param object res  : express responce object
 * @param object rule : rule map
 * @desc  This method is a method to perform the validation process for input form.
 *        Please see the following if you want using.
 *
 *        1) Create the conditions.
 *           Must be an associative array conditional expression.
 *
 *           Format:
 *            { parameter name : { condition name : condition expression } }
 *
 *           Sample:
 *             var rule = {
 *			event_id : {
 *				"isInt": true,
 *				"notEmpty" : true,
 *			},
 *			type : {
 *				"notEmpty" : true,
 *				"isInt": true,
 *			},
 *             },
 *
 *
 *	 2) Specify each parameter of the method.
 *
 *          var util     = require('util'),
 *          var validate = validate = require('util_modules/validate.js')
 *
 *          var errors = validate.validator(req,res,rule);
 *          if ( errors ) {
 *              // error process
 *          }
 *
 *	 3) If a validation error occurs, the return value is included.
 *	    Please implement the treatment you need.
 *
 */
Validate.prototype.validator = function (req, res, rule) {
	var i = null,
	    j = null,
	    input_time = null,
	    rule_time = 0,
	    rule_dt = null;
	if (typeof rule !== "object") {
		return;
	}
	for (i in rule) {
		if (rule.hasOwnProperty(i)) {
			for (j in rule[i]) {
				if (rule[i].hasOwnProperty(j)) {
					if (j === "notEmpty") {
						req.assert(i, 'required.').notEmpty();
					} else if (req.body[i] !== "") {
						if (j === "isInt") {
							req.assert(i, 'must enter a number.').isInt();
						} else if (j === "regex") {
							if (typeof rule[i][j].modifiers !== "undefined") {
								req.assert(i, 'format is incorrect.').regex(rule[i][j].pattern);
							} else {
								req.assert(i, 'format is incorrect.').regex(rule[i][j].pattern, rule[i][j].modifiers);
							}
						} else if (j === "isDateTime") {
							if (!this.is_datetime(req.body[i])) {
								this.set_error(req, res, i, 'datetime format is incorrect. must be "yyyy-MM-dd HH:mm:ss".');
							}
						} else if (j === "isDate") {
							if (!this.is_date(req.body[i])) {
								this.set_error(req, res, i, 'date format is incorrect. must be "yyyy-MM-dd".');
							}
						} else if (j === "isDateOrDateTime") {
							if (!this.is_date(req.body[i])) {
								if (!this.is_datetime(req.body[i])) {
									this.set_error(req, res, i, 'date format is incorrect.');
								}
							}
						} else if (j === "datetime_gt") {
							if (this.is_datetime(req.body[i])) {
								input_time = this.datetime_to_time(req.body[i]) / 1000;
								rule_time = rule[i][j] / 1000;
								if (input_time > 0) {
									if (input_time <= rule_time) {
										rule_dt = new Date(rule_time * 1000);
										this.set_error(req, res, i, "too short. must be greater than " + this.time_to_datetime(rule_time * 1000) + ".", req.body[i]);
									}
								}
							}
						} else if (j === "datetime_lt") {
							if (this.is_datetime(req.body[i])) {
								input_time = this.datetime_to_time(req.body[i]);
								rule_time = rule[i][j] / 1000;
								if (input_time > 0) {
									if (input_time >= rule_time) {
										this.set_error(req, res, i, "too short. must be less than " + this.time_to_datetime(rule_time * 1000) + ".", req.body[i]);
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return req.validationErrors();
};

/**
 *
 * is_datetime
 *
 */
Validate.prototype.is_datetime = function (value, strict) {
	var ret = false,
	    date_arr = [],
	    cur_date = null;
	if (typeof strict === "undefined") {
		strict = false;
	}
	if (value) {
		date_arr = value.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/);
		if (date_arr) {
			cur_date = new Date(date_arr[1], date_arr[2] - 1, date_arr[3], date_arr[4], date_arr[5], date_arr[6]);
			if ((cur_date.getFullYear() == date_arr[1]) && ((cur_date.getMonth() + 1) == date_arr[2]) && (cur_date.getDate() == date_arr[3]) && (cur_date.getHours() == date_arr[4]) && (cur_date.getMinutes() == date_arr[5]) && (cur_date.getSeconds() == date_arr[6]) ){
				ret = true ;
			}
		} else {
			if (strict === false) {
				date_arr = value.match(/^([0-9]{4})\/([0-9]{2})\/([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/);
				if (date_arr) {
					cur_date = new Date(date_arr[1], date_arr[2] - 1, date_arr[3], date_arr[4], date_arr[5], date_arr[6]);
					if ((cur_date.getFullYear() == date_arr[1]) && ((cur_date.getMonth() + 1) == date_arr[2]) && (cur_date.getDate() == date_arr[3]) && (cur_date.getHours() == date_arr[4]) && (cur_date.getMinutes() == date_arr[5]) && (cur_date.getSeconds() == date_arr[6]) ){
						ret = true ;
					}
				}
			}
		}
	}
	return ret;
};

/**
 *
 * is_date
 *
 */
Validate.prototype.is_date = function (value, strict) {
	var ret = false,
	    date_arr = [],
	    cur_date = null;
	if (typeof strict === "undefined") {
		strict = false;
	}
	if (value) {
		date_arr = value.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/);
		if (date_arr) {
			cur_date = new Date(date_arr[1], date_arr[2] - 1, date_arr[3]);
			if ((cur_date.getFullYear() == date_arr[1]) && ((cur_date.getMonth() + 1) == date_arr[2]) && (cur_date.getDate() == date_arr[3])){
				ret = true ;
			}
		} else {
			if (strict === false) {
				date_arr = value.match(/^([0-9]{4})\/([0-9]{2})\/([0-9]{2})$/);
				if (date_arr) {
					cur_date = new Date(date_arr[1], date_arr[2] - 1, date_arr[3]);
					if ((cur_date.getFullYear() == date_arr[1]) && ((cur_date.getMonth() + 1) == date_arr[2]) && (cur_date.getDate() == date_arr[3])){
						ret = true ;
					}
				}
			}
		}
	}
	return ret;
};

/**
 *
 * set error
 *
 */
Validate.prototype.set_error = function (req, res, param, msg, value) {
	var error = {
		param: param,
		msg: msg,
		value: value
	};
	if (!req.hasOwnProperty("_validationErrors")) {
		req._validationErrors = [];
	}
	req._validationErrors.push(error);
};

/**
 *
 * datetime to time
 *
 */
Validate.prototype.datetime_to_time = function (value, strict) {
	var ret = 0,
	    re = null,
	    date_arr = "",
	    cur_date = null;
	if (typeof strict === "undefined") {
		strict = false;
	}
	function _get_time (date_arr) {
		var time = 0 ;
		if (date_arr) {
			cur_date = new Date(date_arr[1], date_arr[2] - 1, date_arr[3], date_arr[4], date_arr[5], date_arr[6], 0);
			if (typeof cur_date === "object") {
				time = cur_date.getTime();
			}
		}
		return time ;
	}
	if (value) {
		date_arr = value.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/);
		if (date_arr) {
			ret = _get_time(date_arr);
		} else {
			if (strict === false) {
				date_arr = value.match(/^([0-9]{4})\/([0-9]{2})\/([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/);
				if (date_arr) {
					ret = _get_time(date_arr) ;
				}
			}
		}
	}
	return ret;
};

/**
 *
 * time to datetime
 *
 */
Validate.prototype.time_to_datetime = function (value) {
	function zero_pad(value) {
		var ret = value;
		if (value < 10) {
			ret = "0" + value;
		}
		return ret;
	}

	var ret = '',
	    dt = null,
	    month = null,
	    date = null,
	    hour = null,
	    min = null,
	    sec = null;
	dt = new Date(value);

	month = (dt.getMonth() + 1);
	month = zero_pad(month);

	date = dt.getDate();
	date = zero_pad(date);

	hour = dt.getHours();
	hour = zero_pad(hour);

	min = dt.getMinutes();
	min = zero_pad(min);

	sec = dt.getSeconds();
	sec = zero_pad(sec);

	return dt.getFullYear() + "-"
	       + month  + "-"
	       + date + " "
	       + hour + ":"
	       + min + ":"
	       + sec;
};
