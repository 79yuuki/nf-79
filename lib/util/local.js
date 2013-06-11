"use strict";
var config = require('../../config');
/**************************************************
 * [機能]	ゼロパディングを行います
 * [引数]	value	対象の文字列
 *		length	長さ
 * [戻値]	結果文字列
 **************************************************/
function comPadZero(value, length) {
	while (String(value).length < length) {
		value = String('0') + String(value);
	}
	return value;
}
module.exports = function (app) {
	app.locals({
		/**************************************************
		 * [機能]	日付オブジェクトから文字列に変換します
		 * [引数]	date	対象の日付オブジェクト
		 *		format	フォーマット
		 * [戻値]	フォーマット後の文字列
		 **************************************************/
		comDateFormat: function (date, format, timezone) {
			var result = format,
			    f,
			    rep,
			    yobi,
			    current_dt;

			if (date === null || date === undefined) {
				return "";
			}
			if (typeof date === "string") {
				return date;
			}
			if (typeof timezone !== "undefined") {
				if (typeof timezone === "number") {
					current_dt = date.getTime();
					date.setTime(current_dt + (timezone * 60 * 60 * 1000));
				}
			}

			yobi = ['日', '月', '火', '水', '木', '金', '土'];

			f = 'yyyy';
			if (result.indexOf(f) > -1) {
				rep = date.getFullYear();
				result = result.replace(/yyyy/, rep);
			}

			f = 'MM';
			if (result.indexOf(f) > -1) {
				rep = comPadZero(date.getMonth() + 1, 2);
				result = result.replace(/MM/, rep);
			}

			f = 'ddd';
			if (result.indexOf(f) > -1) {
				rep = yobi[date.getDay()];
				result = result.replace(/ddd/, rep);
			}

			f = 'dd';
			if (result.indexOf(f) > -1) {
				rep = comPadZero(date.getDate(), 2);
				result = result.replace(/dd/, rep);
			}

			f = 'HH';
			if (result.indexOf(f) > -1) {
				rep = comPadZero(date.getHours(), 2);
				result = result.replace(/HH/, rep);
			}

			f = 'mm';
			if (result.indexOf(f) > -1) {
				rep = comPadZero(date.getMinutes(), 2);
				result = result.replace(/mm/, rep);
			}

			f = 'ss';
			if (result.indexOf(f) > -1) {
				rep = comPadZero(date.getSeconds(), 2);
				result = result.replace(/ss/, rep);
			}

			f = 'fff';
			if (result.indexOf(f) > -1) {
				rep = comPadZero(date.getMilliseconds(), 3);
				result = result.replace(/fff/, rep);
			}

			return result;

		},

		/**************************************************
		 * [機能]	文字列から日付オブジェクトに変換します
		 * [引数]	date	日付を表す文字列
		 *		format	フォーマット
		 * [戻値]	変換後の日付オブジェクト
		 **************************************************/
		comDateParse: function (date, format) {

			var year = 1990,
			    month = '01',
			    day = '01',
			    hour = '00',
			    minute = '00',
			    second = '00',
			    millisecond = '000',
			    f,
			    idx,
			    result;

			f = 'yyyy';
			idx = format.indexOf(f);
			if (idx > -1) {
				year = date.substr(idx, f.length);
			}

			f = 'MM';
			idx = format.indexOf(f);
			if (idx > -1) {
				month = parseInt(date.substr(idx, f.length), 10) - 1;
			}

			f = 'dd';
			idx = format.indexOf(f);
			if (idx > -1) {
				day = date.substr(idx, f.length);
			}

			f = 'HH';
			idx = format.indexOf(f);
			if (idx > -1) {
				hour = date.substr(idx, f.length);
			}

			f = 'mm';
			idx = format.indexOf(f);
			if (idx > -1) {
				minute = date.substr(idx, f.length);
			}

			f = 'ss';
			idx = format.indexOf(f);
			if (idx > -1) {
				second = date.substr(idx, f.length);
			}

			f = 'fff';
			idx = format.indexOf(f);
			if (idx > -1) {
				millisecond = date.substr(idx, f.length);
			}

			result = new Date(year, month, day, hour, minute, second, millisecond);

			return result;

		},

		/**************************************************
		 * [機能]	お知らせの表示コードを文字列に変換します
		 * [引数]	id	表示コード
		 * [戻値]	文字列
		 **************************************************/
		convInformationDisplaySite: function (id) {
			var ret = null;
			if (id === 0) {
				ret = 'トップページ';
			} else if (id === 1) {
				ret = 'マイページ';
			}
			return ret;
		},
		/**************************************************
		 * [機能]	お知らせのタイプコードを文字列に変換します
		 * [引数]	id	タイプコード
		 * [戻値]	文字列
		 **************************************************/
		convClubbattleMatchingType: function (id) {
			var ret = null;
			if (id === 1) {
				ret = '前回バトル結果によるマッチング';
			} else if (id === 2) {
				ret = '今回のバトル経過によるマッチング';
			}
			return ret;
		},

		/**************************************************
		 * [機能]	お知らせのタイプコードを文字列に変換します
		 * [引数]	id	タイプコード
		 * [戻値]	文字列
		 **************************************************/
		convInformationType: function (id) {
			var ret = null;
			if (id === 1) {
				ret = 'おしらせ';
			} else if (id === 2) {
				ret = '重要';
			} else if (id === 3) {
				ret = 'イベント';
			} else if (id === 4) {
				ret = 'キャンペーン';
			} else if (id === 5) {
				ret = 'メンテナンス';
			} else if (id === 6) {
				ret = 'カード情報';
			}
			return ret;
		},

		/**************************************************
		 * [機能]	イベントのタイプコードを文字列に変換します
		 * [引数]	id	タイプコード
		 * [戻値]	文字列
		 **************************************************/
		convEventType: function (id) {
			var ret = null;
			if (id === 1) {
				ret = 'ミニバトル';
			} else if (id === 2) {
				ret = 'レイド';
			} else if (id === 3) {
				ret = 'S/SSレア２倍';
			} else if (id === 4) {
				ret = '強化大成功';
			} else if (id === 5) {
				ret = 'ログインスタンプ';
			} else if (id === 6) {
				ret = 'CMキャンペーン';
			} else if (id === 7) {
				ret = 'マラソン';
			} else if (id === 8) {
				ret = 'ギルドバトル';
			} else if (id === 9) {
				ret = 'アドベントカレンダー';
			} else if (id === 10) {
				ret = 'レイドクエスト';
			} else if (id === 11) {
				ret = 'レイドクエスト前半';
			} else if (id === 12) {
				ret = '闘技場';
			}
			return ret;
		},
		/**
		*
		* has validate message
		* use express-validator.
		*
		*/
		has_error: function (err_obj) {
			var ret = false;
			if (typeof err_obj !== "object") {
				return false;
			}
			if (typeof err_obj.length !== "undefined") {
				if (err_obj.length > 0) {
					ret = true;
				}
			}
			return ret;
		},
		/**
		*
		* validate message
		* use express-validator.
		*
		*/
		get_validate_message: function (err_obj, col) {
			var ret = "",
			    i = 0;
			if (typeof err_obj !== "object") {
				return null;
			}
			for (i = 0; i < err_obj.length; i = i + 1) {
				if (err_obj[i].param === col) {
					ret = err_obj[i].msg;
					break;
				}
			}
			return ret;
		},
		/**
		*
		* default value
		*
		*/
		get_default_val: function (val_obj, col) {
			var ret = "";
			if (typeof val_obj !== "object") {
				return null;
			}
			if (typeof val_obj[col] !== "undefined") {
				ret = val_obj[col];
			}
			return ret;
		},
		/**
		*
		* default value
		*
		*/
		get_default_selected: function (val_obj, col, id) {
			var ret = "";
			if (typeof val_obj !== "object") {
				return null;
			}
			if (typeof id !== "string" && typeof id !== "number") {
				return "";
			}
			id = parseInt(id, 10);
			if (typeof val_obj[col] !== "undefined") {
				if (val_obj[col] === id) {
					ret = " selected";
				}
			}
			return ret;
		},
		/**
		*
		* get config
		*
		*/
		config: config
	});
};
