// module which sets up root object and start building the flow.
window.sr_$ = window.sr_$ || (function(_shoprunner_com) {
	var sr_$ = {
		// Not used, just being used for testing... perhaps this could be used for css versioning like in PayRunner Currently.
		major_version: 4,
		version: 4,
		// Save any booleans that may be needed to the rest of the modules.
		flags: {},
		srDivs: {},
		// This needs to be depreciated, but to make the old divs currently.
		member: {
			signed_in: false
		},
		sfDir: "",
		faqURL: "",
		plugins: {},
		assetDomain: "https://www.shoprunner.com/"
	};

	var stagingPublicKey = '-----BEGIN PUBLIC KEY-----\n' +
					 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyU4N5Ft3aFdcdgFS2Q0O\n' +
					 'KDYLfE924SBWULsb+je+vw0zMmi7BRnaDI+c+MnUt1vQbX12hVLAG2KIDNaqdRCb\n' +
					 'ksltjSbgHxozyCMlk2NzHLj0ZCPF2HGQHCOTLdPNo8xzbpYIuV+7MWIg9Y6C5nCF\n' +
					 'AmJyiYx9TAENEZ5ocQmmcmVuE2s9Ce+/Ulbwukz3idkNPJX0dhOtJu8qcCexd4Yz\n' +
					 'F+ZcGEZbl6tPm3iGN8vbB9uKFEjVXkY1cimCH3pyNLIF1iHoHMlcJsMsFkMYpvaP\n' +
					 'OBP0epu2iBNwq1iS/nZpWw/nfoJZVLV+kGkGN6Kv12ATw24Hx1yZz0YKNm7J/v9C\n' +
					 'BwIDAQAB\n' +
					 '-----END PUBLIC KEY-----';



    var prodPublicKey = '-----BEGIN PUBLIC KEY-----\n' +
		                 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs8NUiDB/h4Qm8qsLs8PP\n' +
		                 'WCRfBH+RNuvntgylB4fEaLLLeQuPsQzsfoyKFDs1fTtmvmmRsqoTJevjlL+LJCbm\n' +
		                 'WYbtqVVajAv33E7m4Em9+wOxvCUEiXBkH4kaG+ecpGceUibKsXbs5vAqVp8KmK+B\n' +
		                 'rw7G8fsbNh9DVtf+1Gd8lryQHxmkZvHL/tPVbANDw6v6Yt1RhwZHgwJNuC4tZdpu\n' +
		                 'WKDPfN/ss1y1j5x/9EMvQThH48KK28i8/CGnXqTM5SQfTYuvuG6LmTGh4o3X3YY1\n' +
		                 '/dxgm8ZUJVz9MtNhb2SNlavlw0WJQxlZRG3IsVbpZCl2hhk+p3kle2QDEvPGFK/w\n' +
		                 'DwIDAQAB\n' +
		                 '-----END PUBLIC KEY-----';

	// Set Javascript Source
	if (_shoprunner_com.environmentID == 0) {
		// var sr_jsOrgURL = "https://shoprunner-staging.secure.force.com";
		sr_$.sfDir = "https://api-staging.shoprunner.com";
		sr_$.faqURL = "http://www.shoprunner.com/pikfaq/";
		sr_$.img_path = "/pikcm/files/export/assets/pik_images/";
		sr_$.member_services = "http://api-staging.shoprunner.com";
		sr_$.pixel_url = "https://pixelstg.shoprunner.com";
		sr_$.publicKey = stagingPublicKey;
	} else if (_shoprunner_com.environmentID == 1) {
		sr_$.sfDir = "https://api-staging.shoprunner.com";
		sr_$.faqURL = "https://www.shoprunner.com/pikfaq/";
		sr_$.img_path = "https://staging-content.shoprunner.com/assets/pik_images/";
		sr_$.member_services = "https://api-staging.shoprunner.com";
		sr_$.pixel_url = "https://pixelstg.shoprunner.com";
		sr_$.publicKey = stagingPublicKey;
	} else if (_shoprunner_com.environmentID == 2) {
		sr_$.sfDir = "https://api.shoprunner.com";
		sr_$.faqURL = "https://www.shoprunner.com/pikfaq/";
		sr_$.img_path = "https://content.shoprunner.com/assets/pik_images/";
		sr_$.member_services = "https://srservices.shoprunner.com";
		sr_$.pixel_url = "https://pixel.shoprunner.com";
		sr_$.publicKey = prodPublicKey;

		// JOCKEY is setting environment ID to "2" (as a string) which works fine
		// here but not in their shoprunner init, causing our staging code to
		// load. Because of the code here, login still hits the prod URL but SSO
		// uses 'sr_jsContentURL' which is set by shoprunner_init so their SSO
		// sets the staging cookie, not the production one.
		_shoprunner_com.imgPath = "https://content.shoprunner.com/assets/pik/";
		_shoprunner_com.partner_contentURL = "https://content.shoprunner.com";
		_shoprunner_com.sr_jsContentURL = "https://content.shoprunner.com";
	} else {
		sr_$.img_path = "https://staging-content.shoprunner.com/assets/pik_images/";
		sr_$.faqURL = "https://www.shoprunner.com/pikfaq/";
		sr_$.member_services = "http://api-staging.shoprunner.com";
		sr_$.pixel_url = "https://pixelstg.shoprunner.com";
		sr_$.publicKey = stagingPublicKey;
	}

	sr_$.img_path_ver = sr_$.img_path + "v" + sr_$.major_version + "/";
	_shoprunner_com.imgPath = _shoprunner_com.sr_jsContentURL + "/assets/pik/";

	if (typeof _shoprunner_com.partner_contentURL == "undefined") {
		_shoprunner_com.partner_contentURL = _shoprunner_com.sr_jsContentURL;
	}

	sr_$.hasNativeJSON = (typeof JSON == "object" && typeof JSON.parse == "function");

	// Function to check if defined.
	sr_$.na = function(value) {
		if (typeof value == "undefined")
			return true;
		else
			return false;
	};

	return sr_$;
}(_shoprunner_com));

(function(sr_$) {
	sr_$.buildId = '20160715-030519';

	sr_$.partner_info = {
		'BLOOM': {
			name: 'Bloomingdale&#x27;s'
		}
	};

}(sr_$));

// Core ShopRunner Module. Inculdes.
// <root> = sr_$
//
// root.script # facade for both ajax & script conduit layer.
// root.token # facade for SSO layering
// root.cookie # cookie CRUD methods
// root.parseURL # utility method for URL information
// root.validateTOKEN # Login business logic enpasulation for both function or URL.
(function(sr_$, _shoprunner_com, window, document, location) {

	sr_$.script = {};

	var callbacks = {};
	var defaultTimeout = 150000;

	// expose this publicly because some branding brand sites may need it (e.g. Cole Haan).
	sr_$.script.callbacks = callbacks;

	sr_$.script.call = function(url, rel, success, failure, forceType, timeout) {
		var purl = sr_$.parseURL(url);

		if (purl.host == location.host && purl.protocol == location.protocol && forceType != 'jsonp') {
			sr_$.script.ajax(url, success, failure, forceType, rel);
			return true;
		}

		rel = rel || "__blank__";

		callbacks[rel] = {onload: success};

		if (typeof success != "function") success = false;
		if (typeof failure != "function") failure = false;

		if (failure) {
			callbacks[rel].id = setTimeout(failure, timeout ? timeout : defaultTimeout);
		}

		var so = document.createElement("script");
		so.src = url;
		so.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(so);
	};

	sr_$.script.ok = function(rel, vars) {
		rel = rel || false;
		vars = vars || false;

		if (rel) {
			var callback = callbacks[rel];
			if (callback) {
				var onload = callback.onload;
				clearInterval(callback.id);
				delete callbacks[rel];

				if (typeof onload == "function") {
					onload(vars);
				}
			}
		}
	};

	/**
	 * @description: Perform an asynchronous HTTP (Ajax) request.
	 * @param url  ( retail partner URL for Ajax POST request )
	 * @param success (success callback)
	 * @param failure (failure callback)
	 * @param requestType (GET,POST)
	 * @param rel  ( source relationship for callback)
	 */
	 /*

	/*
	 * ---- IMPORTANT 'rel' parameter is used in AliPay Context. Dont remove it ----- *
	 */
	sr_$.script.ajax = function(url, success, failure, requestType, rel) {
		requestType = requestType || 'POST';
		var urlNew = url;
		var formData = '';

		if (requestType == 'POST') {
			var urlInfo = sr_$.parseURL(url);
			formData = urlInfo.query;
			urlNew = urlInfo.protocol + '//' + urlInfo.host + urlInfo.relative;
		}

		sr_$.jQ.ajax({
			url: urlNew,
			method: requestType,
			data: formData,
			success: function(data, textStatus, jqXHR) {
				sr_$.script.responseDispatcher(data, success, failure, rel);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				sr_$.track.pageView({payrunner_error: 'AE' + textStatus});
				sr_$.track.pageView({payrunner_error: 'AE' + errorThrown});
				sr_$.script.responseDispatcher(jqXHR.responseText, success, failure, rel);
			}
		});
	};

	/**
	 * @description: generic ajax resposne handler to fork to actual callback methdos
	 * @param responseText  ( retail partner response Text )
	 * @param success (success callback)
	 * @param failure (failure callback)
	 * @param rel  ( source relationship for callback)
	 */
	/*
	 * ---- IMPORTANT 'rel' parameter is used in AliPay Context. Dont remove it ----- *
	 */
	sr_$.script.responseDispatcher = function(responseText, success, failure, rel) {
		var response = sr_$.jQ.trim(responseText);
		var data;

		// Executing eval on large html page is crashing the browser. Need to do some checks before we evaluate this.
		if (guessResponseType(response) == 'SCRIPT_OK') {
			response = response.replace('sr_$.script.ok', 'sr_$.script.ajaxOk');

			(function(response) {
				try {
					data = window["eval"].call(window, response);
				} catch (e) {
					sr_$.track.pageView({payrunner_error: 'SR' + e.message});
					sr_$.track.pageView({payrunner_error: 'SR' + response});
				}
			})(response);

			if (success) {
				success(data);
			} else {
				sr_$.track.pageView({payrunner_error: 'AE-NIL_CALLBACK'});
			}
		} else {
			failure();
			sr_$.track.pageView({
				payrunner_error: 'InvalidResponse',
				response : response.replace(/"/g, "").substring(0, 750)
			});
		}
	};

	// Stop gap for refactoring. merge the actual localized version in next pass.
	function guessResponseType(response) {
		if (response == '')
			return 'VACUUM';
		else if (response.indexOf('sr_$.script.ok') > -1)
			return 'SCRIPT_OK';
		else
			return 'UNKNOWN';
	}

	sr_$.script.ajaxOk = function(rel, vars) {
		return vars;
	};

	sr_$.token = {};

	var tokenTimer = false;

	sr_$.token.response = function() {
		if (sr_$.cookie.get("token")) {
			var eventName = 'sr_sign_in';

			// set the flags to indicate the user is logged in.
			sr_$.member.signed_in = true;
			sr_$.model.member.signedIn = true;

			// store a copy of the auth token for 8 hours.
			// we want this to last as long as the sr_token cookie but not a lot longer.
			// most likely the sr_token cookie will expire within 8 hours, triggering SSO
			// the next time you land on the site and you'll get a new auth token then.
			sr_$.cookie.set("token_copy", sr_$.model.member.token, 8);

			sr_$.jQ('#sr_global', document.body).trigger(eventName);
			sr_$.events.trigger(document.body, eventName);
		}

		// the partner is overwriting this value with "0.0" which prevents us
		// from showing the MOV welcome back, the MOV popup, and shows incorrect
		// error messages in EC (e.g. "$0 minimum not met").
		if (_shoprunner_com.retailerID == "EDDIEBAUER") {
			sr_$.cookie.set("movThreshold", "25.00");
		}

		clearInterval(tokenTimer);

		if (sr_$.member.signed_in) {
			if (sr_$.model.signInInfo.ssoChecked || sr_$.model.billing.ssoChecked) {
				sr_$.sso.set(sr_$.model.member.ssoToken);
			}
			if (sr_$.model.modalState.signupFlow) {
				// Member is signed in now, so we trigger the signin callback
				sr_$.partnerCallbacks("standard_signin")
				// Function that handles all welcome functionality
				sr_$.welcome();
			} else if (sr_$.model.modalState.signInClicked) {
				// BUGBUG: we should try to combine these.
				// Call partner callback function if configured.
				if (typeof sr_$.signInCallBack == "function") {
					sr_$.signInCallBack();
				}
				// Providing callback for partners if defined.
				sr_$.partnerCallbacks("standard_signin");

				if (sr_$.model.modalState.payRunnerClicked) {
					// If partner has MOV, user is on a cart page, and they're not SSO'd in then show intermediate welcome_back modal before showing EC
					if (sr_$.mov && _shoprunner_com.cart && _shoprunner_com.cart.srSubTotal && !sr_$.model.member.isSSO) {
						sr_$.Modal.modal("welcome_back", function() {
							// update subtotals so we don't show MOV modal after EC is closed
							sr_$.mov.updateSessionSubtotal();
							sr_$.mov.updateLastSubtotal();
							sr_$.payrunner.Controller.signedin();
						});
					} else {
						sr_$.payrunner.Controller.signedin();
					}
				} else {
					sr_$.Modal.modal("welcome_back");
				}
			} else if (sr_$.model.modalState.payRunnerClicked) {
				sr_$.payrunner.Controller.signedin();
			} else {
				sr_$.refresh_page();

				// Single sign on event callback.
				sr_$.partnerCallbacks("sso_signin");
				sr_$.track.pageView({page: "rpik_sso_success"});
			}
		} else {
			sr_$.token.timeout();
		}

		return;
	};

	sr_$.token.remove = function() {
		var eventName = 'sr_sign_out';

		// clear token cookie.
		sr_$.cookie.clear('token');
		sr_$.cookie.clear('token_copy');

		// clear payrunner clicked state after sign out
		sr_$.model.modalState.payRunnerClicked = false;

		// clear user model data
		sr_$.removeModelData();
		if (sr_$.conf) sr_$.conf.email = "";

		// Set User to Signed Out
		// BUGBUG: This needs to be cleaned
		sr_$.member.signed_in = false;
		sr_$.model.member.signedIn = false;
		sr_$.model.member.state = 'signed out';

		// New Responsive Member State:
		sr_$.member.signed_in = false;

		// Refresh Divs
		sr_$.refresh_page();

		//Fire Signout Event
		sr_$.events.fire('onSignOut');
		sr_$.jQ('#sr_global', document.body).trigger(eventName);
		sr_$.events.trigger(document.body, eventName);

		// Providing Callback for Partners if defined
		sr_$.partnerCallbacks("sign_out");
	};

	sr_$.token.timeout = function() {
		// for staging, we want the error to be highly visible.
		if (_shoprunner_com.environmentID != 2) {
			alert("ShopRunner was unable to validate the login.");
			return;
		}

		if (sr_$.token.source == "sr_signin") {
			// show an error on the 'sign in' modal.
			if (sr_$.UI_manager) {
				sr_$.UI_manager.busy(false);
				sr_$.UI_manager.errors.show({
					id: "signin_error",
					html: "Sorry, we are having technical issues. Please try again."
				});
			}
		} else if (sr_$.token.source == "sr_signup") {
			// if validate token fails, the account was created so we want to leave
			// the signup flow and show the error on the 'sign in' page.
			sr_$.UI_manager.busy(false);
			sr_$.Modal.modal("sign_in");
			sr_$.UI_manager.errors.show({
				id: "signin_error",
				html: "Your account has been created but we are having technical issues. Please sign in."
			});
		} else {
			// if it happened during SSO, don't show anything.
			sr_$.alerts("Unable to authenticate, please try again.");
		}
	};

	// Events
	sr_$.events = {};

	var listeners = {};

	sr_$.events.addListener = function(type, listener) {
		if (type in listeners) {
			listeners[type].push(listener);
		} else {
			listeners[type] = [listener];
		}

		return true;
	};

	sr_$.events.fire = function(event) {

		if (typeof event == "string") {
			event = {type: event};
		}

		if (!event.type) {
			return false;
		}

		if (!event.target) {
			event.target = null;
		}

		if (listeners[event.type]) {
			var callbacks = listeners[event.type];
			for (var i = 0; i < callbacks.length; i++) {
				callbacks[i].call(event.target, event);
			}
		}

		return true;
	};

	/*
	sr_$.events.removeListener = function(type, listener) {
		if (listeners[type]) {
			var callbacks = listeners[type];
			for (var i = 0; i < callbacks.length; i++) {
				if (callbacks[i] === listener) {
					callbacks.splice(i, 1);
					break;
				}
			}
		}

		return true;
	};
	*/

	// target element, eventName string (e.g. 'sr_sign_in')
	sr_$.events.trigger = function(target, eventName) {
		try {
			var event = null;

			if (document.createEvent) {
				event = document.createEvent('HTMLEvents');
				event.initEvent(eventName, true, true);
			} else if (document.createEventObject) {
				event = document.createEventObject();
				event.eventType = eventName;
			} else if (CustomEvent) {
				event = new CustomEvent(eventName);
			}

			event.eventName = eventName;

			if (target.dispatchEvent) {
				target.dispatchEvent(event);
			}
			/*
			// what is el?
			} else if (el.fireEvent && htmlEvents['on' + eventName]) {
				el.fireEvent('on' + e.eventType, e);
			} else if (el[eventName]) {
				el[eventName]();
			} else if (el['on' + eventName]) {
				el['on' + eventName];
			}
			*/
		} catch (e) {}
	};

	sr_$.parseURL = function(url) {
		var result = {};

		//IE11 & below URLs with // having some Quirks so making it fully qualified URL
		if (url && url.indexOf('//') == 0) {
			url = window.location.protocol  + url;
		}

		// Use HTML anchor trick to parse the given url
		var anchorTag = document.createElement('a');

		var query = '';
		var index = url.indexOf('?');

		if (index > 0) {
			query = url.substring(index + 1, url.length);
			url = url.substring(0, index);
		}

		anchorTag.href = url;

		// IE sets hostname to empty string if url is a relative path so we just set href again with fully qualified path
		if (anchorTag.host === '' ) {
			anchorTag.href = window.location.protocol + '//' + window.location.hostname + url;
		}

		var isIEDefaultPort = false;

		// When creating anchor tag IE puts default port number in href object which is against WHATWG standards (https://url.spec.whatwg.org/#port-state)
		// We figure when this happens so we can use anchorTag.hostname instead of anchorTag.host for result.host value
		if ((anchorTag.protocol === 'https:' && anchorTag.port === "443") || (anchorTag.protocol === 'http:' && anchorTag.port === "80")) {
			isIEDefaultPort = true;
		}

		result.source = url;
		result.protocol = anchorTag.protocol;
		result.host = isIEDefaultPort ? anchorTag.hostname : anchorTag.host;
		result.query = query;
		result.file = (anchorTag.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1];
		result.hash = anchorTag.hash.replace('#', '');
		result.path = anchorTag.pathname.replace(/^([^\/])/, '/$1');
		result.relative = (anchorTag.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1];

		return result;
	};

	sr_$.cookie = {};

	sr_$.cookie.set = function(name, value, expiry, path) {

		var expires = "";

		if (expiry) {
			var date = new Date();

			// if the expiry value is a date, use that, otherwise treat
			// the expiry value as a number of hours.
			if (expiry instanceof Date) {
				date = expiry;
			} else {
				date.setTime(date.getTime() + (expiry * 60 * 60 * 1000));
			}

			expires = ";expires=" + date.toGMTString();
		}

		if (!path) {
			path = ";path=/";
		}

		document.cookie = "sr_" + name + "=" + value + expires + path;
	};

	sr_$.cookie.get = function(name) {
		var nameEQ = 'sr_' + name + '=';
		var ca = document.cookie.split(';');
		var nameCI = new RegExp('^' + nameEQ, 'i');

		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1, c.length);
			}

			if (nameCI.test(c)) {
				return c.substring(nameEQ.length, c.length);
			}
		}

		return null;
	};

	// clear a sr cookie
	sr_$.cookie.clear = function(name) {
		if (sr_$.cookie.get(name)) {
			sr_$.cookie.set(name, "", -24);
		}
	};

	sr_$.cookie.check = function() {
		sr_$.model.member.signedIn = (sr_$.cookie.get("token") !== null);
		sr_$.member.signed_in = sr_$.model.member.signedIn;
		return sr_$.member.signed_in;
	};

	/**
	 * @description Checks Cookie is enabled or disabled.
	 * @return {Boolean} true Cookie enabled.
	 */
	sr_$.cookie.isEnabled = function() {
		var ctime = new Date();
		ctime.setTime(ctime.getTime() + 1000);
		sr_$.cookie.setByDate('dosa', 'vada', ctime);
		return sr_$.cookie.get('dosa') ? true : false;
	};

	/**
	 * @description Sets Cookie Value By expiry date calcuated.
	 * @param {string} name of the cookie
	 * @param {string} value of the cookie
	 * @param {Date} expiry by Date Object
	 */
	sr_$.cookie.setByDate = function(name, value, expiry) {
		// cookie.set can now take a Date object.
		return sr_$.cookie.set(name, value, expiry);
	};

	/**
	 * @description Handles partner level custom event handlers method dispatch.
	 * @param {string} methodType  - required param
	 * @param {Array} Callback argument parameters. optional param
	 * @param {Function} optional callBack error function. optional param
	 * @return {Object} returns partner implemented method return value or on exception return false
	 */
	sr_$.partnerCallbacks = function(callbackType, parameters, callbackFn){
		var partnerCalls = _shoprunner_com.calls;
		var returnValue = false;
		parameters = [].concat(parameters);
		if(partnerCalls){
			function isFunction(functionName){
				return typeof(functionName) == "function";
			}
			// Callback will always match most specific matching callback.
			var callbackMap = {
				standard_signup: ["on_std_signup", "on_signup"],
				amex_signup: ["on_offer_signup", "on_signup"],
				sso_signin: ["on_single_sign_on", "on_sign_in"],
				standard_signin: ["on_sign_in"],
				sign_out: ["on_sign_out"],
				mobilizeURL : ["mobilizeURL"]   //branding brand URL override partner calls method.
			};
			for(var i = 0; i < callbackMap[callbackType].length; i++){
				var callbackName = callbackMap[callbackType][i];
				// Loop through until one is valid
				if(isFunction(partnerCalls[callbackName])){
					// Call Partner Callback
					try{
						returnValue = partnerCalls[callbackName].apply(this,parameters);
					} catch(err){
						if(isFunction(callbackFn)) {
							callbackFn(err);
						}
					}
					break;
				}
			}
		}
		return returnValue;
	}

	sr_$.encryptParams = function(params) {
		if (params.encrypted) {
			if (!sr_$.jsencrypt) {
				sr_$.jsencrypt = new sr_$.JSEncrypt();
				sr_$.jsencrypt.setPublicKey(sr_$.publicKey);
			}

			var text = JSON.stringify(params.encrypted);
			var key = sr_$.CryptoJS.enc.Hex.parse(sr_$.CryptoJS.lib.WordArray.random(128/8).toString());
			var iv = sr_$.CryptoJS.enc.Hex.parse(sr_$.CryptoJS.lib.WordArray.random(128/8).toString());

			var encrypted = sr_$.CryptoJS.AES.encrypt(text, key, {iv:iv, mode: sr_$.CryptoJS.mode.CBC})

			params.iv = encrypted.iv.toString(sr_$.CryptoJS.enc.Base64);
			params.key = sr_$.jsencrypt.encrypt(encrypted.key.toString(sr_$.CryptoJS.enc.Base64));
			// JSEncrypt sometimes returns an encrypted key with length < 344 and this causes decrypt to fail
			while (params.key.length != 344){
				params.key = sr_$.jsencrypt.encrypt(encrypted.key.toString(sr_$.CryptoJS.enc.Base64));
			}
			params.encrypted = encrypted.toString();
		}

		return sr_$.jQ.param(params);
	};

}(sr_$, _shoprunner_com, window, document, location));

// ValidateLogin simple dispatcher method for TigerDirect Vs rest of the people.
(function(sr_$, _shoprunner_com) {
	sr_$.validateLogin = function(token, rel, success, failure, forceType, timeout) {
		var loginUrl = _shoprunner_com.loginValidationURL;
		var isFunction = typeof loginUrl == 'function';

		if (isFunction) {
			loginUrl(token, success, failure); //TG
		} else {
			loginUrl = _shoprunner_com.loginValidationURL;
			var qmark = (loginUrl.indexOf('?') < 0) ? '?' : '&';
			var url = loginUrl + qmark + 'srtoken=' + (token == null ? "" : encodeURIComponent(token));
			sr_$.actions.iframe({src: url, onload: success});
		}
	};
}(sr_$, _shoprunner_com));

// Logging Module.
(function(sr_$, window, _shoprunner_com) {
	sr_$.alerts = function() {
		try {
			if (window.localStorage["debug_alerts"] == "true") {
				console.log(arguments);
			}
		} catch (e) {}
	};
}(sr_$, window, _shoprunner_com));

/*
 *
 * Execute Functions
 * Confirmation Page Data Retrieval
 *
 */
var rID = (typeof _shoprunner_com.brandID === "undefined" || _shoprunner_com.brandID === '') ?
          _shoprunner_com.retailerID : _shoprunner_com.brandID;
sr_$.confirmation = {};
sr_$.confirmation.params = "version=" + sr_$.version;
sr_$.confirmation.params += "&rID=" + rID;
sr_$.confirmation.params += "&loc=" + encodeURIComponent(location.href);
_shoprunner_com.confirmedProducts = "";
_shoprunner_com.d = "~";
_shoprunner_com.record_delim = '|';


/*
    orderSubTotal & billingSubTotal essentially means the same thing. billingSubTotal got introduced later
    because the term is clearer, but at the same time, we want to be backward compatible for existing
    client, so we will do both
 */
sr_$.confirmation.params_ref  = {
    'oID':'orderID',
    'tID':'tokenID',
    'prd':'confirmedProducts',
    'tpc':'totalProductCount',
    'epc':'eligibleProductCount',
    'tsa':'totalShippingAmount',
    'toa':'totalOrderAmount',
    'subtotal': 'orderSubTotal',
    'billingsubtotal': 'billingSubTotal',
    'ttoa':'totalTaxedOrderAmount',
    'ttype':'tenderType',
    'isMovSatisfied':'isMOVSatisfied'
};


_shoprunner_com.addPurchasedProduct = function(sku, quantity, price, shipMethod, srEligible){
    var field_delimiter = _shoprunner_com.d;
    var product_rec = [sku, quantity, price, shipMethod, srEligible].join(field_delimiter);
    _shoprunner_com.confirmedProducts = [
        _shoprunner_com.confirmedProducts,
        product_rec
    ].join(_shoprunner_com.record_delim);
};


_shoprunner_com.submitConfirmationData = function(){
    var pixel_host = 'pixelstg.shoprunner.com';

	if (_shoprunner_com.environmentID == -1) {
        pixel_host = 'localhost:2348';
	}

	if (_shoprunner_com.environmentID == 2) {
        pixel_host = 'pixel.shoprunner.com';
	}

    var confirmation_url = [
        window.parent.document.location.protocol,
        '//',
        pixel_host,
        '/track/order/confirmation?'
    ].join('');

    var _params = [];

    for (var param_key in sr_$.confirmation.params_ref) {
        var param_value = _shoprunner_com[sr_$.confirmation.params_ref[param_key]];

        // if param doesn't exist. don't send it
        if (typeof(param_value) !== 'undefined') {
            _params.push(
                [
                    param_key,
                    encodeURIComponent(param_value)
                ].join('=')
            );
        }
    }

    sr_$.confirmation.params += '&' + _params.join('&');
    sr_$.script.call(confirmation_url + sr_$.confirmation.params);
    //Getting rid of edialog code which used to be below this line

    // log the pixel to SRA also.
    sr_$.track.pageView({
        page: "rpik_order_confirmation",
        action_origin: "PIXEL",
        order_id: _shoprunner_com.orderID,
        pixel_token: _shoprunner_com.tokenID,
        auth_token: sr_$.cookie.get("token_copy")
    });
};

// iframe conduit establised for CORS information exchange.
// for certain reason iframe needs to be disabled for https pages (like TigerDirect)
// override "iframe_pipe_enabled" configuration parameter.
;(function(sr_$, window) {

	var sslRegex = /^https/i;
	var securePage = sslRegex.test(window.parent.document.location.protocol);

	sr_$.actions = {};

	var iframePipeEnabled = true;

	sr_$.actions.iframe = function(params) {

		if (!sr_$.actions.iframeEnabled()) {
			try {
				if (params.onload) {
					params.onload();
				}
			} catch (e) {}

			return false;
		}

		// if there's no src url, we can't do anything here.
		if (!params.src) {
			return false;
		}

		var iframe = document.createElement("IFRAME");

		for (var p in params) {
			iframe[p] = params[p];
		}

		// Adding title for 508 ADA Compliance
		if (params.title) {
			iframe.setAttribute("title", params.title);
		}

		iframe.setAttribute("src", params.src);

		if (params.id) {
			iframe.setAttribute("id", params.id);
		}

		var className = params.className || "";
		iframe.setAttribute("class", className + " sr_iframe_hide");

		if (params.onload) {
			iframe.onload = function() {
				if (iframe.loadedup)
					return;

				iframe.loadedup = true;
				params.onload();
			};

			iframe.onreadystatechange = function() {
				// IE
				if (iframe.readyState == "complete" || iframe.readyState == "loaded") {
					if (iframe.loadedup)
						return;

					iframe.loadedup = true;
					params.onload();
				}
			};
		}

		iframe.setAttribute("width", 0);
		iframe.setAttribute("height", 0);
		iframe.setAttribute("frameborder", 0);
		document.getElementsByTagName("head")[0].appendChild(iframe);

		return iframe;
	};

	sr_$.actions.close = function() {
		sr_$.UI_manager.close();
	};

	sr_$.actions.jsf = function(fid) {
		var url = sr_$.pixel_url + "/fraud_data?fid=" + fid;
		this.iframe({src: url});
	};

	sr_$.actions.iframeEnabled = function(url) {
		// if both condition are true then frame should be disabled. NOT - frame enabled.
		// Not using incoming URL for now.
		return !(!iframePipeEnabled && securePage);
	};

}(sr_$, window));
// add jQuery Module
// using sr_$.jQ instead of sr_$.$ to avoid previous version clashes.
// Modified version of Jquery
// - Modified jquery Global to sr_$
// - Added jquery.browers() for IE identification (adding quirks.css) etc.
/* Dependencies:
		base_module
*/
/*if(typeof(jQuery) !== 'undefined' ) {
	sr_$.jQ = jQuery;
} else {*/

   sr_$ = (function( window, undefined, sr_obj) {
// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";
var
	// The deferred used on DOM ready
	readyList,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// Support: IE<10
	// For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	location = window.location,
	document = window.document,
	docElem = document.documentElement,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "1.10.2",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler
	completed = function( event ) {

		// readyState === "complete" is good enough for us to call the dom ready in oldIE
		if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
			detach();
			jQuery.ready();
		}
	},
	// Clean-up method for dom ready events
	detach = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", completed, false );
			window.removeEventListener( "load", completed, false );

		} else {
			document.detachEvent( "onreadystatechange", completed );
			window.detachEvent( "onload", completed );
		}
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( jQuery.support.ownLast ) {
			for ( key in obj ) {
				return core_hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );
		if ( scripts ) {
			jQuery( scripts ).remove();
		}
		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: function( data ) {
		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		if ( data === null ) {
			return data;
		}

		if ( typeof data === "string" ) {

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = jQuery.trim( data );

			if ( data ) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, "@" )
					.replace( rvalidtokens, "]" )
					.replace( rvalidbraces, "")) ) {

					return ( new Function( "return " + data ) )();
				}
			}
		}

		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations.
	// Note: this method belongs to the css module but it's needed here for the support module.
	// If support gets modularized, this method should be moved back to the css module.
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
(function( window, undefined ) {

var i,
	support,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	hasDuplicate = false,
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rsibling = new RegExp( whitespace + "*[+~]" ),
	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent.attachEvent && parent !== parent.top ) {
		parent.attachEvent( "onbeforeunload", function() {
			setDocument();
		});
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Support: Opera 10-12/IE8
			// ^= $= *= and empty values
			// Should not select anything
			// Support: Windows 8 Native Apps
			// The type attribute is restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "t", "" );

			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = rnative.test( docElem.contains ) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

		if ( compare ) {
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		}

		// Not directly comparable, sort on existence of method
		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val === undefined ?
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null :
		val;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return (val = elem.getAttributeNode( name )) && val.specified ?
				val.value :
				elem[ name ] === true ? name.toLowerCase() : null;
		}
	});
}

jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function( support ) {

	var all, a, input, select, fragment, opt, eventName, isSupported, i,
		div = document.createElement("div");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// Finish early in limited (non-browser) environments
	all = div.getElementsByTagName("*") || [];
	a = div.getElementsByTagName("a")[ 0 ];
	if ( !a || !a.style || !all.length ) {
		return support;
	}

	// First batch of tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px;float:left;opacity:.5";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName("tbody").length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName("link").length;

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone = document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Will be defined later
	support.inlineBlockNeedsLayout = false;
	support.shrinkWrapBlocks = false;
	support.pixelPosition = false;
	support.deleteExpando = true;
	support.noCloneEvent = true;
	support.reliableMarginRight = true;
	support.boxSizingReliable = true;

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<9
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	// Check if we can trust getAttribute("value")
	input = document.createElement("input");
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment = document.createDocumentFragment();
	fragment.appendChild( input );

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
	for ( i in { submit: true, change: true, focusin: true }) {
		div.setAttribute( eventName = "on" + i, "t" );

		support[ i + "Bubbles" ] = eventName in window || div.attributes[ eventName ].expando === false;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: IE<9
	// Iteration over object's inherited properties before its own.
	for ( i in jQuery( support ) ) {
		break;
	}
	support.ownLast = i !== "0";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv, tds,
			divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		body.appendChild( container ).appendChild( div );

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Support: IE8
		// Check if empty table cells still have offsetWidth/Height
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior.
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			support.boxSizing = div.offsetWidth === 4;
		});

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== core_strundefined ) {
			// Support: IE<8
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Support: IE6
			// Check if elements with layout shrink-wrap their children
			div.style.display = "block";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			if ( support.inlineBlockNeedsLayout ) {
				// Prevent IE 6 from affecting layout for positioned elements #11048
				// Prevent IE from shrinking the body in IE 7 mode #12869
				// Support: IE<8
				body.style.zoom = 1;
			}
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	all = select = fragment = opt = a = input = null;

	return support;
})({});

var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function internalData( elem, name, data, pvt /* Internal Use Only */ ){
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = core_deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"applet": true,
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		// Do not set data on non-element because it will not be cleared (#8335).
		if ( elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9 ) {
			return false;
		}

		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			data = null,
			i = 0,
			elem = this[0];

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[i].name;

						if ( name.indexOf("data-") === 0 ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : null;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n\f]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	getSetInput = jQuery.support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === core_strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var ret, hooks, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// Use proper attribute retrieval(#6932, #12072)
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( jQuery(option).val(), values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === core_strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = jQuery.expr.attrHandle[ name ] || jQuery.find.attr;

	jQuery.expr.attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var fn = jQuery.expr.attrHandle[ name ],
				ret = isXML ?
					undefined :
					/* jshint eqeqeq: false */
					(jQuery.expr.attrHandle[ name ] = undefined) !=
						getter( elem, name, isXML ) ?

						name.toLowerCase() :
						null;
			jQuery.expr.attrHandle[ name ] = fn;
			return ret;
		} :
		function( elem, name, isXML ) {
			return isXML ?
				undefined :
				elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			return name === "value" || value === elem.getAttribute( name ) ?
				value :
				undefined;
		}
	};
	jQuery.expr.attrHandle.id = jQuery.expr.attrHandle.name = jQuery.expr.attrHandle.coords =
		// Some attributes are constructed with empty-string values when not defined
		function( elem, name, isXML ) {
			var ret;
			return isXML ?
				undefined :
				(ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
		};
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return ret && ret.specified ?
				ret.value :
				undefined;
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}


// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !jQuery.support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !jQuery.support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});
var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === core_strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});
var isSimple = /^.[^:#\[\.,]*$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},

	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					cur = ret.push( cur );
					break;
				}
			}
		}

		return this.pushStack( ret.length > 1 ? jQuery.unique( ret ) : ret );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: jQuery.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var
			// Snapshot the DOM in case .domManip sweeps something relevant into its fragment
			args = jQuery.map( this, function( elem ) {
				return [ elem.nextSibling, elem.parentNode ];
			}),
			i = 0;

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			var next = args[ i++ ],
				parent = args[ i++ ];

			if ( parent ) {
				// Don't use the snapshot next if it has moved (#13810)
				if ( next && next.parentNode !== parent ) {
					next = this.nextSibling;
				}
				jQuery( this ).remove();
				parent.insertBefore( elem, next );
			}
		// Allow new content to include elements from the context set
		}, true );

		// Force removal if there was no new content (e.g., from empty arguments)
		return i ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback, allowIntersection ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback, allowIntersection );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, !allowIntersection && this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery._evalUrl( node.src );
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType === 1 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !jQuery.support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( manipulation_rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== core_strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						core_deletedIds.push( id );
					}
				}
			}
		}
	},

	_evalUrl: function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	}
});
jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});
var iframe, getStyles, curCSS,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var len, styles,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, _computed ) {
		var width, minWidth, maxWidth,
			computed = _computed || getStyles( elem ),

			// getPropertyValue is only needed for .css('filter') in IE9, see #12537
			ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
			style = elem.style;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, _computed ) {
		var left, rs, rsLeft,
			computed = _computed || getStyles( elem ),
			ret = computed ? computed[ name ] : undefined,
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
			(!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});
var
	// Document location
	ajaxLocParts,
	ajaxLocation,
	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
var xhrCallbacks, xhrSupported,
	xhrId = 0,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject && function() {
		// Abort all pending requests
		var key;
		for ( key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	};

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject("Microsoft.XMLHTTP");
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
xhrSupported = jQuery.ajaxSettings.xhr();
jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = jQuery.support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( err ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, responseHeaders, statusText, responses;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									responses = {};
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									if ( typeof xhr.responseText === "string" ) {
										responses.text = xhr.responseText;
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
		left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;
			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;

// })();
if ( typeof module === "object" && module && typeof module.exports === "object" ) {
	// Expose jQuery as module.exports in loaders that implement the Node
	// module pattern (including browserify). Do not create the global, since
	// the user will be storing it themselves locally, and globals are frowned
	// upon in the Node module world.
	module.exports = jQuery;
} else {
	// Otherwise expose jQuery to the global object as usual
	sr_obj.jQ = jQuery;

	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	if ( typeof define === "function" && define.amd ) {
		define( "sr_jquery", [], function () { return jQuery; } );
	}
}

return sr_obj;
})(window, undefined, sr_$);

(function(sr_$) {
	sr_$.globals = sr_$.g = {};

	/**
	 * @description convert String to Boolean value;
	 * @methodof sr_$.globals#
	 * @param {String} value
	 * @return {Boolean}
	 */
	sr_$.globals.parseBoolean = function(value) {
		// return false if the value is falsy or is literally the string "false".
		if(!value || value == "false")
			return false;
		else
			return true;
	};

	/**
	 * checks shoprunner modal is open
	 */
	sr_$.globals.isModalOpen = function() {
		return document.getElementsByClassName('sr_UI_modal__active').length > 0
	}
}(sr_$));

(function(sr_$, window) {

	// A few vars used in non-awesome browsers.
	var intervalId;
	var lastHash;
	var cacheBust = 1;

	// A var used in awesome browsers.
	var rmCallback;

	var pReceiveMessage;

	// I couldn't get window.postMessage to actually work in Opera 9.64!
	var hasPostMessage = window.postMessage;

	sr_$.actions.postMessage = function(message, targetUrl, target) {
		if (!targetUrl) {
			return;
		}

		// Serialize the message if not a string. Note that this is the only real
		// jQuery dependency for this script. If removed, this script could be
		// written as very basic JavaScript.
		////message = typeof message === 'string' ? message : $.param(message);
		// Default to parent if unspecified.
		target = target || parent;

		if (hasPostMessage) {
			// The browser supports window.postMessage, so call it with a targetOrigin
			// set appropriately, based on the targetUrl parameter.
			target.postMessage(message, targetUrl.replace(/([^:]+:\/\/[^\/]+).*/, '$1'));
		} else if (targetUrl) {
			// The browser does not support window.postMessage, so set the location
			// of the target to targetUrl#message. A bit ugly, but it works! A cache
			// bust parameter is added to ensure that repeat messages trigger the
			// callback.
			target.location = targetUrl.replace(/#.*$/, '') + '#' + (+new Date) + (cacheBust++) + '&' + message;
		}
		return true;
	};

	sr_$.actions.receiveMessage = pReceiveMessage = function(callback, sourceOrigin, delay) {
		if (hasPostMessage) {
			// Since the browser supports window.postMessage, the callback will be
			// bound to the actual event associated with window.postMessage.
			if (callback) {
				// Unbind an existing callback if it exists.
				if (rmCallback) {
					pReceiveMessage();
				}

				// Bind the callback. A reference to the callback is stored for ease of
				// unbinding.
				rmCallback = function(e) {
					callback(e);
				};
			}

			if (window.addEventListener) {
				window[callback ? 'addEventListener' : 'removeEventListener']('message', rmCallback, false);
			} else {
				window[callback ? 'attachEvent' : 'detachEvent' ]('onmessage', rmCallback);
			}
		} else {
			// Since the browser sucks, a polling loop will be started, and the
			// callback will be called whenever the location.hash changes.
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = null;
			}

			if (callback) {

				// I guess the purpose of this is to use the second argument
				// as the delay since the 'sourceOrigin' argument is optional.
				// So, if sourceOrigin is a number, that means no origin was
				// given and the value there is really the delay.
				if (typeof sourceOrigin == "number")
					delay = sourceOrigin;
				else if (typeof delay != "number")
					delay = 300;

				intervalId = setInterval(function() {
					var hash = document.location.hash;
					var regex = /^#?\d+&/;
					if (hash !== lastHash && regex.test(hash)) {
						lastHash = hash;
						callback({
							data: hash.replace(regex, "")
						});
					}
				}, delay);
			}
		}
	};
}(sr_$, window));
sr_$ = (function(sr_$, _shoprunner_com, window) {
	sr_$.sso = {};

	var jsContentUrl = _shoprunner_com.sr_jsContentURL;
	var href = location.href;

	var ssoURL = jsContentUrl + "/sso.html?purl=" + href;
	var ssoIosURL = jsContentUrl + "/ssoios.html?purl=" + href;
	var ssoSSLURL = jsContentUrl.replace("http://", "https://") + "/sso.html?purl=" + href;
	var ssoIosSSLURL = jsContentUrl.replace("http://", "https://") + "/ssoios.html?purl=" + href;

	var ssoLoginInProgress = false;

	sr_$.sso.ssoLogin = function(message) {
		var ssoToken = sr_$.sso.parse(message.data.sso);

		if (sr_$.member.signed_in || ssoLoginInProgress || !ssoToken) {
			return;
		}

		ssoLoginInProgress = true;
		sr_$.model.signInInfo.ssoToken = ssoToken;
		sr_$.signInSubmit(true);
	};

	sr_$.sso.parse = function(ssoToken) {
		if (ssoToken && ssoToken.search(/sr_ssotoken::/i) != -1) {
			ssoToken = ssoToken.replace(/sr_ssotoken::/i, "");

			if (ssoToken != "false") {
				return ssoToken;
			}
		}

		return false;
	};

	/*
	// this appears to never be called.
	sr_$.sso.ssoEnabled = function() {
		for (var i = 0; i < sr_$.activeDivs.length; i++) {
			if (!sr_$.jQ.inArray(sr_$.activeDivs[i], sr_$.sso.divsBlackList)) {
				return true;
			}
		}
		return false;
	};
	*/

	// Set SSO Token, We only need to set token at the SSL location
	sr_$.sso.set = function(ssoToken) {
		 if (ssoToken) {
			if (sr_$.sso.isIosPlatform()) {
				// Save SSO Token for later use..
				sr_$.model.signInInfo.ssoToken = ssoToken; // Updated model in v4. @ds
			} else {
				sr_$.actions.iframe({
					src: ssoSSLURL + "&sr_ssotoken=" + "sr_ssotoken::" + ssoToken,
					onload: function() {
						if (sr_$.IE && sr_$.IE <= 6) {
							window.top.location.reload();
						}
					},
					title: "shoprunner_sso"
				});
			}
		 }
	};

	sr_$.sso.set4Ios = function() {
		// Temporary Hack for Testing....

		// I'm removing the last part of this conditional because the
		// first part will make sure it's not an empty string.
		// if (sr_$.model.member.ssoToken && sr_$.model.member.ssoToken !== "undefined" && sr_$.model.member.ssoToken !== "") {

		if (sr_$.model.member.ssoToken && sr_$.model.member.ssoToken !== "undefined") {
			pwindow({
				url: ssoIosSSLURL + "&sr_ssotoken=sr_ssotoken::" + sr_$.model.member.ssoToken
			});
		}
	};

	sr_$.sso.isIosPlatform = function() {
		var platform = navigator.platform.toLowerCase();
		var vendor = navigator.vendor;
		var userAgent = navigator.userAgent.toLowerCase();

		if (vendor) {
			vendor = vendor.toLowerCase();
		}

		var version = iosVersion();
		var ipad = platform.indexOf("ipad") != -1;
		var iphone = platform.indexOf("iphone") != -1;
		var ipod = platform.indexOf("ipod") != -1;
		var mac = platform.indexOf("mac") != -1;
		var v7 = version && version[0] >= 7;
		var safari = isSafari(userAgent, vendor);

		var mobile = (ipad || iphone || ipod) && v7 && safari;
		var desktop = mac && safari;

		if (mobile || desktop) {
			return true;
		} else {
			return false;
		}
	};

	function isSafari(userAgent, vendor) {
		if (userAgent.indexOf("safari") != -1 && vendor.indexOf("apple") != -1) {
			return true;
		} else {
			return false;
		}
	}

	function iosVersion() {
		if (/iP(hone|od|ad)/.test(navigator.platform)) {
			var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
			return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
		}
	}

	// Clear the SSO token in both secure and non-secure local storage.
	sr_$.sso.clear = function() {
		if (window.parent.document.location.protocol == "http:") {
			sr_$.actions.iframe({
				src: ssoURL + "&sr_ssotoken=false",

				/*
				// we don't support IE6 anymore.
				onload: function() {
					if (sr_$.IE && sr_$.IE <= 6)
						setTimeout("window.top.location.reload()", 100);
				},
				*/
				title: "shoprunner_sso"
			});
		}
		sr_$.actions.iframe({
			src: ssoSSLURL + "&sr_ssotoken=false",
			onload: function() {
				/*
				// we don't support IE6 anymore.
				if (sr_$.IE && sr_$.IE <= 6) {
					setTimeout(function() {
						window.top.location.reload();
					}, 100);
				}
				*/
				sr_$.token.remove();
			},
			title: "shoprunner_secure_sso"
		});
	};

	//Check should be done on SSL and Non SSL locations
	sr_$.sso.check = function() {
		if (sr_$.member.signed_in || ssoLoginInProgress) {
			return;
		}

		// if this page is running in an iframe, don't do SSO.
		try {
			if (window.self instanceof Window) {
				if (window.top instanceof Window) {
					if (window.self !== window.top) {
						return;
					}
				}
			}
		} catch (e) {}

		sr_$.actions.iframe({
			src: ssoSSLURL,
			title: "shoprunner_secure_sso"
		});
	};

	// SR POPUP For SSO
	function pwindow(params) {
		sr_ppup = window.open(params.url, "", "width=500,height=325,location=0,menubar=0,scrollbars=0,toolbar=0,status=0,titlebar=0,fullscreen=0");
	}

	return sr_$;

}(sr_$, _shoprunner_com, window));

(function(sr_$, _shoprunner_com, window, document) {

	sr_$.track = {
		analyticsUrl: _shoprunner_com.sr_jsContentURL + "/srsec/sra.html"
	};

	var NOT_INITIALIZED = 0;
	var INITIALIZING = 1;
	var INITIALIZED = 2;

	var status = NOT_INITIALIZED;
	var analyticsFrame;
	var experiments = "default";
	var initQueue = [];
	var sessionId = new Date().getTime();
	var protocol = /^https/i.test(window.location.protocol) ? "https://" : "http://";
	var flowSequenceIndex = 0;

	// checks the sr_$.experiments namespace for active experiments.
	var getExperiments = function() {

		if (!sr_$.experiments) {
			return "default";
		}

		var experiments = "";

		for (var id in sr_$.experiments) {
			if (!sr_$.experiments.hasOwnProperty(id))
				continue;

			if (experiments)
				experiments += ",";

			var version = sr_$.experiments[id].version;
			experiments += id + ":" + version;
		}

		if (experiments) {
			return experiments;
		} else {
			return "default";
		}
	};
	sr_$.track.getExperiments = getExperiments;

	sr_$.events.addListener("onMessage", function(message) {
		if (message && message.data && message.data.srBrowserId) {
			sr_$.cookie.set("browser_id", message.data.srBrowserId, 30 * 365 * 24);
		}
	});

	sr_$.track.init = function(onLoad) {
		if (typeof onLoad != "function") {
			return;
		}

		if (status == INITIALIZED) {
			onLoad();
			return;
		}

		initQueue.push(onLoad);
		if (status == INITIALIZING) {
			return;
		}

		status = INITIALIZING;

		sr_$.actions.iframe({
			src: sr_$.track.analyticsUrl,
			onload: function() {
				try {
					analyticsFrame = frames.sr_tracking_connector;
					status = INITIALIZED;
					experiments = getExperiments();
					for (var i = 0; i < initQueue.length; i++) {
						initQueue[i]();
					}
					initQueue = [];
				} catch (e) {}
			},
			id: "sr_tracking_connector",
			oclass: "sr_iframe_hide",
			name: "sr_tracking_connector"
		});
	};

	sr_$.track.pageView = function(params) {
		if (status != INITIALIZED) {
			sr_$.track.init(function() {
				sr_$.track.pageView(params);
			});
			return false;
		}

		sr_$.alerts(params);

		var url = "page_track?partner=" + _shoprunner_com.retailerID +
			"&exp_ids=" + getExperiments() +
			"&referrer=" + sr_$.model.modalState.clickLocation;

		// if we have it, record the cart total and number of items in the cart too.
		if (sr_$.rmp) {
			var cartTotal = sr_$.rmp.getCartTotal();
			var itemsInCart = sr_$.rmp.getItemsInCart();

			if (cartTotal) {
				params.cart_total = cartTotal;
			}
			if (itemsInCart) {
				params.items_in_cart = itemsInCart;
			}
		}

		for (var i in params) {
			url += "&" + i + "=" + params[i];
		}

		sr_$.track.signalMessage("page", url);
		sr_$.track.partnerAnalytics(params.page, params.payrunner_error, params.msg);
	};

	sr_$.track.signalMessage = function(type, data) {
		var message = '{"track":{"' + type + '":' + JSON.stringify(data) + ',"auth_token":"' + sr_$.track.getAuthToken() + '"}}';
		if (sr_$.actions.iframeEnabled()) {
			sr_$.actions.postMessage(message, sr_$.track.analyticsUrl, analyticsFrame);
		} else {
			sr_$.track.secureAnalytics(message);
		}

		return true;
	};

	/**
	 * @description returns AuthToken value for the logged in member from partner side token cookie or _shoprunner_com['token'].
	 * @attribute getAuthToken
	 * @returns {String} authentication token
	 */
	sr_$.track.getAuthToken = function() {
		var values = [
			_shoprunner_com.token,
			sr_$.cookie.get("token"),
			_shoprunner_com.ssotoken
		];

		for (var i = 0; i < values.length; i++) {
			var value = sr_$.jQ.trim(values[i]);

			if (value.length > 5) {
				return escape(value);
			}
		}

		return "";
	};

	sr_$.track.secureAnalytics = function(message) {
		var data = JSON.parse(message);

		flowSequenceIndex += 1;

		var url = protocol + "pixel.stg.shoprunner.com";
		if (_shoprunner_com.environmentID == 2) {
			url = protocol + "tracker.shoprunner.com";
		}

		if (data.track.page && (data.track.page.indexOf("rpik") > -1)) {
			var kind = "rpik";
			var trackImage = document.createElement("img");

			trackImage.src = url + "/logger/" + kind + "?content=" +
				escape(JSON.stringify(message)) +
				"&guid=" + sessionId +
				"&flow_seq=" + flowSequenceIndex +
				"&browser_timestamp=" + sessionId +
				"&logtype=direct";
		}
	};

	/**
	 * @description some partners needs payrunner/express checkout analytics to be shared.
	 * <br/> all accepted and reviewed analytics will be fired as part of the process.
	 * @param {String} message
	 */
	sr_$.track.partnerAnalytics = function(page, errorCode, errorMessage) {
		sr_$.pa_hook = sr_$.pa_hook || [];
		if (!page && !errorCode && !errorMessage)
			return;

		var pageHook = sr_$.pa_hook[page];
		var errorHook = sr_$.pa_hook[errorCode];

		if (pageHook) {
			pageHook(errorMessage);
		} else if (errorHook) {
			errorHook(errorMessage);
		}
	};

	// the sr_browser_id cookie is stored in the shoprunner domain
	// and we store it in the partner's domain but only after calling
	// track.pageView, so if we don't have the cookie, call pageView
	// so we'll be able to get it.
	if (!sr_$.cookie.get("browser_id")) {
		sr_$.track.pageView({page: "initialize_browser_id"});
	}
}(sr_$, _shoprunner_com, window, document));

// Intializes and Sets up Divs
sr_$ = (function(sr_$, _shoprunner_com, document) {

	// flag to make sure delayRun only runs once.
	sr_$.delayRunCalled = false;

	sr_$.defaultDelayInterval = 300; // Standard Delay Interval after the first run

	// Check the docReady in ShopRunner Init to determine if DOM ready already occurred.
	sr_$.flags.domReady = (_shoprunner_com.docReady === true) ? true : false;

	// Run Function (depreciated, I think this may be able to be simplified)
	sr_$.run = function() {
		setTimeout(sr_$.delayRun, 1);
	};

	// Delay Run Function
	sr_$.delayRun = function() {

		// if this has already run, don't do anything.
		if (sr_$.delayRunCalled) {
			return;
		}

		// Update delay run flag.
		sr_$.delayRunCalled = true;

		// Only run this once.
		sr_$.model.configureAmex();

		// Add JSON if JSON is not natively there.
		if (!sr_$.hasNativeJSON) {
			var so = document.createElement("script");
			so.src = _shoprunner_com.partner_contentURL + '/json.js';
			so.type = "text/javascript";
			document.getElementsByTagName("head")[0].appendChild(so);
		}

		// Check if the user is logged in.
		if (sr_$.cookie.get("token")) {
			sr_$.model.member.signedIn = true;
			sr_$.member.signed_in = true;
		}

		// Run Content Dynamic after Delay Run when onMessage is available.
		if (sr_$.contentDynamic) {
			sr_$.contentDynamic.init();
		}

		// Render Divs
		sr_$.delayRenderDiv(1);
		var is_ap_session = false;
		//default sr_locale cookie time = 90Days = (24 * 90) in Hours
		sr_$.cookie.set('locale', (sr_$.AliPay ? "china" : "us"), 2160);
		if (sr_$.AliPay) {
			sr_$.AliPay.processAliPay();
			is_ap_session = (sr_$.AliPay.getAPToken() != null);
		}

		sr_$.setupRootNode();
		// Touch Addon
		if ("ontouchstart" in document.documentElement) {
			var htmlNode = document.getElementsByTagName("html")[0];
			if (htmlNode) {
				htmlNode.className += " sr_touch";
			}
		}
		if(is_ap_session){
			return; //Do Not Tie SSO for AliPay flow
		}
		// Execute SSO
		// Add onMessage listener to process the SSO sign in when a message is received.
		sr_$.events.addListener("onMessage", sr_$.sso.ssoLogin);

		// Call receive message function to receive messages and process them.
		sr_$.actions.receiveMessage(function(message) {
			if (message.origin) {
				if (message.origin.indexOf(sr_$.parseURL(_shoprunner_com.sr_jsContentURL).host) < 0) {
					return;
				}
			}

			try {
				var data = JSON.parse(message.data);
			} catch (e) {
				return false;
			}

			sr_$.events.fire({
				type: "onMessage",
				message: message,
				data: data
			});
		});

		sr_$.sso.check();
		// sr_$.jQ(document).trigger("sr_delay_run");

		if (sr_$.trackPage) {
			setTimeout(sr_$.trackPage, 0);
		}
	};

	/**
	 * @description Delay RenderDiv for N Times Based on params/configuration.
	 	This is to encourage retailler js framework delays and Quirks

	 	Note: for now limit = 1 runs the renderDiv without any delay as legacy behaviour.
	 	@param limit {Integer}
	 */
	sr_$.delayRenderDiv = function(limit) {
		sr_$.renderDivs(); // default run.
		if( limit == 1) {
			return;
		}
		var debouncer = 1;
		var intervalPointer = setInterval( function() {
			if( debouncer <= limit ) {
				if ( sr_$.renderDivs() )  {
					debouncer = limit; //break the circuit
				}
				debouncer++;
			} else {
				clearInterval(intervalPointer);
			}
		}, sr_$.defaultDelayInterval);
	};

	/**
	 * @description setup sr_$.root_node (sr_globals) reference onDemand
	 */
	sr_$.setupRootNode = function() {
		// Add sr_global div to page if not already added.
		var rootNode = document.getElementById("sr_global");

		if(!rootNode && document.body){
			rootNode = document.createElement("div");
			rootNode.setAttribute("id", "sr_global");
			rootNode.className = "sr_reset";

			if (_shoprunner_com.retailerID == "NEIMAN") {
				rootNode.setAttribute("aria-live", "polite");
			}

			document.body.appendChild(rootNode);
		}
		if(rootNode) {
			// Cache root node.
			sr_$.root_node = rootNode;
			if(sr_$.jQ && !sr_$.jQ.stub) {
				sr_$.root_node = sr_$.jQ(sr_$.root_node);
			}
		}
	}

	return sr_$;
}(sr_$, _shoprunner_com, document));

// Base Controller, to contain the logic functionality for basic PIK usage (Login, Sign In, Sign Out)
sr_$ = (function(sr_$, _shoprunner_com, window, document, escape) {
	// Amex Opening.
	sr_$.amexLearn = function(location) {
		sr_$.removeModelData();

		// Update Location
		sr_$.model.modalState.clickLocation = location;

		// Open Amex Welcome Screen
		sr_$.Modal.modal("amex_eligible");
	};

	// Partner-called learn more.
	sr_$.pLearn = function(location) {
		// In case we need to do special functionality in the future
		sr_$.removeModelData();
		sr_$.learn(location);
	};

	sr_$.get_partner_data = function() {
		return {partner_name: sr_$.partner_info[_shoprunner_com.retailerID.toUpperCase()].name};
	};

	sr_$.learn = function(location) {
		sr_$.removeModelData();
		var data = sr_$.get_partner_data();

		// Update Location
		sr_$.model.modalState.clickLocation = location;

		if (sr_$.member.signed_in) {
			sr_$.Modal.modal("welcome_back", data);
		} else {
			sr_$.Modal.modal("learn_more", data);
		}
	};

	sr_$.dual_eligibility = function() {
		// Open Dual Eligibility Modal
		sr_$.Modal.modal("dual_eligibility");
	};

	// Unified welcome logic for the personalizer split.
	sr_$.welcome = function() {
		var data = sr_$.get_partner_data();

		// If PIK personalizer is enabled
		if (sr_$.model.personalizer.enabled) {
			sr_$.Modal.modal("pik_personalize", data);
		} else {
			sr_$.Modal.modal("welcome", data);
		}
	};

	sr_$.signIn = function(location) {

		sr_$.removeModelData();

		// Update Location
		sr_$.model.modalState.clickLocation = location;

		// Open Sign In Modal
		sr_$.Modal.modal("sign_in");
	};

	sr_$.signOut = function(location) {
		// If location not available, pass undefined explicitly (for partners not setup with this).
		if (!location) {
			location = "undefined";
		}

		// update location.
		sr_$.model.modalState.clickLocation = location;

		sr_$.track.pageView({page: "rpik_signout"});
		sr_$.validateLogin("", "token", sr_$.sso.clear, sr_$.sso.clear);
		sr_$.jQ(document.body).trigger("sr_sign_out");
	};

	sr_$.removeModelData = function() {
		var accountInfo = sr_$.model.account;
		var signInInfo = sr_$.model.signInInfo;
		var billingInfo = sr_$.model.billing;
		var modalState = sr_$.model.modalState;

		accountInfo.firstName =
			accountInfo.lastName =
			accountInfo.email =
			accountInfo.password =
			signInInfo.email =
			signInInfo.password =
			signInInfo.ssoChecked =
			billingInfo.firstName =
			billingInfo.middleInitial =
			billingInfo.lastName =
			billingInfo.cardNumber =
			billingInfo.expiration_month =
			billingInfo.expiration_year =
			billingInfo.cvv =
			billingInfo.address =
			billingInfo.city =
			billingInfo.state =
			billingInfo.zip =
			billingInfo.ccType =
			modalState.clickLocation =
			modalState.typeOfSignup = "";

		sr_$.model.account.acceptedTos = "";
		modalState.signInClicked = false;
		modalState.signupFlow = false;
	};

	sr_$.saveAccountInfo = function(accountObj) {
		// Data should already be validated before this step.
		var accountInfo = sr_$.model.account;
		accountInfo.firstName = accountObj.firstName;
		accountInfo.lastName = accountObj.lastName;
		accountInfo.email = accountObj.email;
		accountInfo.password = accountObj.password;
		accountInfo.membership = accountObj.membership;
	};

	sr_$.savePikPersonalizerInfo = function(personalizeObj) {
		var personalInfo = sr_$.model.personalizer;
		personalInfo.gender = personalizeObj.gender;
		personalInfo.age_to = personalizeObj.age_to;
		personalInfo.age_from = personalizeObj.age_from;
		personalInfo.shop_for = personalizeObj.shop_for;
	};

	sr_$.submitPikPersonalizerInfo = function() {
		// Submit the personalizer Info.
		var personalizer = sr_$.model.personalizer;
		var urlParams = {
			gender: personalizer.gender,
			age_to: personalizer.age_to,
			age_from: personalizer.age_from,
			shop_for: personalizer.shop_for,
			member_id: sr_$.model.member.memberId,
			gender_source: "PIK",
			responseId: "personalizer"
		};

		var serializedParams = sr_$.jQ.param(urlParams);

		sr_$.script.call(
			sr_$.member_services + "/update_profile?" + serializedParams,
			"personalizer",
			sr_$.submitPIKPersonalizerComplete,
			sr_$.submitPIKPersonalizerComplete
		);

		sr_$.UI_manager.busy(true, "updating profile");
	};

	sr_$.submitPIKPersonalizerComplete = function() {
		sr_$.Modal.modal("welcome", sr_$.get_partner_data());
	};


	sr_$.saveSignInInfo = function(signInInfoObj) {
		var signInInfo = sr_$.model.signInInfo;
		signInInfo.email = signInInfoObj.email;
		signInInfo.password = signInInfoObj.password;
		signInInfo.ssoChecked = signInInfoObj.ssoChecked;
	};

	sr_$.saveBillingInfo = function(billingObj) {
		// Data should already be validated before this step.
		var billingInfo = sr_$.model.billing;
		billingInfo.firstName = billingObj.firstName;
		billingInfo.middleInitial = billingObj.middleInitial;
		billingInfo.lastName = billingObj.lastName;
		billingInfo.cardNumber = billingObj.cardNumber;
		billingInfo.expiration_month = billingObj.expiration_month;
		billingInfo.expiration_year = billingObj.expiration_year;
		billingInfo.cvv = billingObj.cvv;
		billingInfo.address = billingObj.address;
		billingInfo.city = billingObj.city;
		billingInfo.state = billingObj.state;
		billingInfo.zip = billingObj.zip;
		billingInfo.ccType = billingObj.ccType;
		billingInfo.ssoChecked = (typeof billingObj.ssoChecked == "boolean") ? billingObj.ssoChecked : true;
		billingInfo.saveCardInfo = billingObj.saveCardInfo;
		sr_$.model.account.acceptedTos = billingObj.acceptedTos;
	};

	sr_$.saveAmexBillingInfo = function(billingObj) {
		var billingInfo = sr_$.model.billing;
		billingInfo.cardNumber = billingObj.cardNumber;
		billingInfo.ccType = billingObj.ccType;
		billingInfo.expiration_month = billingObj.expiration_month;
		billingInfo.expiration_year = billingObj.expiration_year;
		billingInfo.saveCardInfo = billingObj.saveCardInfo;
	};

	sr_$.amexEligibilitySubmit = function() {
		var billingObj = sr_$.model.billing;
		var urlParams = {
			encrypted: {
				ccnum: billingObj.cardNumber
			},
			ref: _shoprunner_com.retailerID,
			responseId: "amex_eligibility",
			mid: "",
			expm: billingObj.expiration_month,
			expy: billingObj.expiration_year
		};

		var serializedParams = sr_$.encryptParams(urlParams);

		sr_$.script.call(
			sr_$.sfDir + "/JsGetEligibility?" + serializedParams,
			"amex_eligibility",
			sr_$.amexEligibilityResponse,
			sr_$.amexEligibilityFailure
		);

		// Show the UI Manager working state.
		sr_$.UI_manager.busy(true, "verifying eligibility");
	};

	sr_$.amexEligibilityResponse = function(vars) {
		// Save something in Member object?

		// if you came through the 30-day trial signup...
		if (sr_$.model.account.firstName) {

			// if you're eligible, show the amex benefit page.
			if (vars.msgCode == "SUCCESS") {
				sr_$.model.billing.eligibilityId = vars.eligibilityId;

				// from this page they can either accept the benefit
				// or continue as a normal 30-day trial.
				sr_$.Modal.modal("amex_benefit");

			// if they're already enrolled, show an error.
			} else if (vars.msgCode == "ALREADY_ENROLLED") {
				sr_$.UI_manager.busy(false);
				sr_$.views.displaySignUpError("Your American Express Card has already been used to enroll in a complimentary ShopRunner membership.");

			// if they're not eligible, opt out of amex and save again.
			} else {
				sr_$.model.rule37OptOut = true;
				sr_$.standardSignUpSubmit();
			}

			return;
		}

		// handle the case where they came from the amex eligibility form...
		if (vars.msgCode == "SUCCESS") {
			sr_$.model.billing.eligibilityId = vars.eligibilityId;
			// Eligible
			sr_$.Modal.modal("amex_success");
		} else if (sr_$.model.account.email !== "" && sr_$.model.account.password !== "") {
			// Coming from Rule 37 flow, if not eligble, go ahead and create trial account.
			sr_$.standardSignUpSubmit();
		} else if (vars.msgCode == "NOT_ELIGIBLE") {
			// Not Eligible
			sr_$.Modal.modal("amex_not_eligible");
		} else if (vars.msgCode == "INVALID_CARD") {
			// Check if the view is the correct one.
			if (sr_$.model.modalState.activeView !== "amex_eligible") {
				sr_$.Modal.modal("amex_eligible");
			}

			// invalid card.
			sr_$.views.displaySignUpError("The card you entered is not recognized. Please try again.");
			sr_$.jQ("#sr_signup_card_number").parent("li").addClass("sr_error");

			// Remove UI Manager working state.
			sr_$.UI_manager.busy(false);

		} else if (vars.msgCode == "ALREADY_ENROLLED") {
			// already enrolled.
			sr_$.Modal.modal("amex_already_enrolled");
		} else {
			// system error.
			sr_$.Modal.modal("amex_system_error");
		}
	};

	sr_$.amexEligibilityFailure = function(vars) {
		// console.log("Amex Eligibility Failed", vars);
	};

	sr_$.standardSignUpSubmit = function() {

		sr_$.model.modalState.signupType = "std_signup";

		// References to model object.
		var billingInfo = sr_$.model.billing;
		var accountInfo = sr_$.model.account;

		// SalesForce parameters.
		var urlParams = {
			encrypted: {
				fn: accountInfo.firstName,
				ln: accountInfo.lastName,
				ccName: billingInfo.firstName + " " + billingInfo.middleInitial + " " + billingInfo.lastName,
				ccNum: billingInfo.cardNumber,
				cvv: billingInfo.cvv,
				email: accountInfo.email,
				pw: accountInfo.password
			},
			mi: billingInfo.middleInitial,
			ad1: billingInfo.address,
			ad2: "",
			city: billingInfo.city,
			state: billingInfo.state,
			country: "US",
			zip: billingInfo.zip,
			bp: "",
			ccType: billingInfo.ccType,
			expMn: billingInfo.expiration_month,
			expYr: billingInfo.expiration_year,
			emailOptIn: "",
			rid: _shoprunner_com.retailerID,
			ref: encodeURIComponent(document.referrer),
			url: encodeURIComponent(document.referrer),
			acq: sr_$.getReferrer(),
			browserId: navigator.userAgent,
			o: billingInfo.ssoChecked,
			tos: "on",
			fl: sr_$.cookie.get('browser_id'),
			cTime: (new Date()).getTime(),
			loc: "",
			m: accountInfo.membership,
			csi: billingInfo.saveCardInfo
		};

		// set certain values if they're in the spend and get experiment.
		if (sr_$.model.spendAndGet) {
			urlParams.m = "SPEND_AND_GET";
			urlParams.loc = "SPEND_AND_GET";
		}

		// For use during token check, to open welcome modal.
		sr_$.model.modalState.signupFlow = true;

		var rule37Enabled = sr_$.model.amexEnabled || sr_$.model.amexRule37Enabled === true;

		// If Amex Flow is Enabled, and ccType is Amex, Rule 37
		if (urlParams.ccType == "Amex" && rule37Enabled && !sr_$.model.rule37OptOut) {
			// Lets check amex eligibility.
			sr_$.amexEligibilitySubmit();
		} else {
			// Show 'creating account' busy screen.
			sr_$.UI_manager.busy(true, "creating account");

			var serializedParams = sr_$.encryptParams(urlParams);

			sr_$.script.call(
				sr_$.sfDir + "/JsSignUpV2?" + serializedParams,
				"signup",
				sr_$.standardSignupResponse,
				sr_$.standardSignUpFailResponse
			);
		}
	};

	sr_$.amexSignUpSubmit = function() {

		sr_$.UI_manager.busy(true, "creating account");

		// References to Model Object
		var billingInfo = sr_$.model.billing;
		var accountInfo = sr_$.model.account;

		// This is for AMEX's enrollment path tracking (30 day flow vs. amex flow).
		var enrollmentPath = "";

		if (sr_$.model.modalState.signupType == "std_signup") {
			enrollmentPath = "MPIK30DFT";
		} else {
			enrollmentPath = "MPIK";
		}

		var urlParams = {
			encrypted: {
				pwd: accountInfo.password,
				fn: accountInfo.firstName,
				ln: accountInfo.lastName,
				ccnum: billingInfo.cardNumber,
				email: accountInfo.email
			},
			ref: _shoprunner_com.retailerID,
			acq: sr_$.getReferrer(),
			eId: billingInfo.eligibilityId,
			ad1: billingInfo.address,
			city: billingInfo.city,
			state: billingInfo.state,
			zip: billingInfo.zip,
			expMn: billingInfo.expiration_month,
			expYr: billingInfo.expiration_year,
			responseID: "register",
			o: true,
			fl: sr_$.cookie.get('browser_id'),
			csi: billingInfo.saveCardInfo,
			ep: enrollmentPath
		};

		// For use during token check, to open welcome modal.
		sr_$.model.modalState.signupFlow = true;

		// this is used for tracking later on in the flow.
		sr_$.model.modalState.signupType = "amex_signup";

		var serializedParams = sr_$.encryptParams(urlParams);

		sr_$.script.call(
			sr_$.sfDir + "/JsRegisterAMember?" + serializedParams,
			"register",
			sr_$.amexSignupResponse,
			sr_$.amexSignUpFailResponse);
	};

	sr_$.amexSignupResponse = function(vars) {
		// Remove Working State
		sr_$.UI_manager.busy(false);

		// Redirect to welcome screen.
		if (vars) {
			if (vars.sr_fid && vars.sr_fid != "") {
				sr_$.actions.jsf(vars.sr_fid);
			}

			if (vars.token.length > 0) {
				sr_$.model.member.token = _shoprunner_com.token = vars.token;
				sr_$.model.member.ssoToken = vars.ssotoken;
				sr_$.token.source = "sr_signup";
				sr_$.model.modalState.typeOfSignup = "amex_signup";

				// Save Member Id
				sr_$.model.member.memberId = vars.memberId;

				sr_$.validateLogin(vars.token, "token", sr_$.token.response, sr_$.token.response);

				// Callback for amex signup.
				sr_$.partnerCallbacks("amex_signup");
			} else {
				if (vars.is_active === true) {

					// if we're doing a 30-day trial signup we have to go back to the
					// account form to show this error.
					if (sr_$.model.modalState.typeOfSignup != "amex_signup") {
						if (sr_$.model.showNewLearnMore && sr_$.nlm && sr_$.nlm() == 4) {
							sr_$.Modal.modal("signup_billing");
						} else {
							sr_$.Modal.modal("signup_account");
						}
					}

					// sr_$.views.displaySignUpError("You already have a ShopRunner account. To learn how to enroll this account in the American Express benefit, call ShopRunner at 1.888.721.7467. Or, setup a new account with a different email address.");
					sr_$.views.displaySignUpError("It seems you already have a ShopRunner account. If you want to learn how to enroll in complimentary ShopRunner membership as a benefit of your eligible American Express® Card, call ShopRunner at 1.888.721.7467.");
				} else if (vars.message.length > 0) {
					sr_$.views.displaySignUpError(vars.message);
				} else {

					// if we're doing a 30-day trial signup we have to go back to the
					// billing form to show this error.
					if (sr_$.model.modalState.typeOfSignup != "amex_signup")
						sr_$.Modal.modal("signup_billing");

					sr_$.views.displaySignUpError("Sorry, we are having technical issues. Please try again.");
				}
			}
		}
		sr_$.savePartialSignup();
	};

	sr_$.amexSignUpFailResponse = function(vars) {
	    sr_$.savePartialSignup();
	};

	sr_$.standardSignupResponse = function(vars) {

		// Remove working state.
		sr_$.UI_manager.busy(false);

		if (vars) {
			if (vars.sr_fid && vars.sr_fid != "") {
				sr_$.actions.jsf(vars.sr_fid);
			}
			if (vars.token.length > 0) {
				// For analytics purposes, also need to set this on _shoprunner_com.token
				sr_$.model.member.token = _shoprunner_com.token = vars.token;
				sr_$.model.member.ssoToken = vars.ssotoken;
				sr_$.model.modalState.typeOfSignup = "std_signup";
				sr_$.token.source = "sr_signup";

				// Save member ID.
				sr_$.model.member.memberId = vars.memberId;

				// Callback for standard signup.
				sr_$.partnerCallbacks("standard_signup");

				sr_$.validateLogin(vars.token, "token", sr_$.token.response, sr_$.token.response);
			} else {
				// in the case of Rule 37, the processing is done from the rule37 screen, which is ill prepared
				// for the error response messages. In the case a message needs to be displayed, load the billing screen first.
				if (sr_$.jQ("div#sr_modal_content_wrap > div").attr("id") != "sr_signup_billing") {
					if (sr_$.model.showNewLearnMore && sr_$.nlm && sr_$.nlm() == 4) {
						sr_$.Modal.modal("signup_billing");
					} else {
						sr_$.Modal.modal("signup_account");
					}
				}
				sr_$.views.displaySignUpError(vars.message);
			}
		} else {
			// in the case of Rule 37, the processing is done from the rule37 screen, which is ill prepared
			// for the error response messages. In the case a message needs to be displayed, load the billing screen first.
			if (sr_$.jQ("div#sr_modal_content_wrap > div").attr("id") != "sr_signup_billing") {
				sr_$.Modal.modal("signup_account");
			}

			if (vars.message.length > 0) {
				sr_$.views.displaySignUpError(vars.message);
			} else {
				sr_$.views.displaySignUpError("Sorry, we are having technical issues. Please try again.");
			}
		}
		sr_$.savePartialSignup();
	};

	sr_$.standardSignUpFailResponse = function(vars) {
	    sr_$.savePartialSignup();
		sr_$.views.displaySignInError("Sorry, we are having technical issues. Please try again.");
	};

	sr_$.signInSubmit = function(sso) {
		var signInInfo = sr_$.model.signInInfo;
		var firstLogin = false;
		// if not SSO Login && User opted for SSO Feature(via Remember Me Login)
		if( !sso && signInInfo.ssoChecked) {
			// pass browserId if found. having browserId creates deviceToken based SSO Token/
			// if not default to regular SSO.
			firstLogin = ( sr_$.cookie.check() == false ) ? sr_$.cookie.get('browser_id') : false;
		}
		var urlParams = {
			o: "true", // TODO
			fl: firstLogin,
			s: decodeURIComponent(signInInfo.ssoToken),
			rid: _shoprunner_com.retailerID,
			acq: sr_$.getReferrer(),
			url: encodeURIComponent(window.location),
			browserId: encodeURIComponent(navigator.userAgent),
			cTime: (new Date()).getTime(),
			crs: "PIK"
		};

		// only create the 'encrypted' value if there is a username/password, this way
		// SSO sign ins can work without encryption code being present.
		if (signInInfo.email || signInInfo.password) {
			urlParams.encrypted = {
				u: signInInfo.email,
				p: signInInfo.password
			};
		}

		var serializedParams = sr_$.encryptParams(urlParams);

		if (!sso) {
			sr_$.UI_manager.busy(true, "signing in");

			// we check this value to determine if a sign in error should be shown.
			// clearing this means errors will be shown in the orange bar.
			sr_$.model.signInInfo.ssoToken = "";
		}

		sr_$.script.call(
			sr_$.sfDir + "/JsTokenV2?" + serializedParams,
			"signin",
			sr_$.signInSubmitResponse,
			sr_$.signInSubmitResponse
		);
	};

	sr_$.signInSubmitResponse = function(vars) {
		if (vars) {
			if (vars.sr_fid && vars.sr_fid != "") {
				sr_$.actions.jsf(vars.sr_fid);
			}

			if (vars.token.length > 0) {
				sr_$.model.member.token = vars.token;
				_shoprunner_com.token = vars.token;
				sr_$.model.member.ssoToken = vars.ssotoken;
				sr_$.token.source = "sr_signin";
				sr_$.validateLogin(vars.token, "token", sr_$.token.response, sr_$.token.response);

				// Get MOV Value from config
				if(vars.config){
					// Create Cookie
					if(vars.config.movThreshold){
						sr_$.cookie.set("movThreshold", vars.config.movThreshold);
					}
				}
			} else {
				if (sr_$.UI_manager) {
					sr_$.UI_manager.busy(false);
				}

				if (vars.is_amex_member_cancelled === true) {
					sr_$.expiry_date = vars.expiry_date;
					sr_$.Modal.modal("amex_cancelled_member");
				} else if (sr_$.model.signInInfo.ssoToken == "") {
					// BUGBUG: Using Global Error Message, needs changed later
					sr_$.UI_manager.errors.show({
						id: "signin_error",
						html: vars.message
					});
				} else {
					sr_$.sso.clear();
				}
			}
		} else {
			if (sr_$.UI_manager) {
				sr_$.UI_manager.busy(false);
			}
			if (sr_$.model.signInInfo.ssoToken == "") {
				// BUGBUG: Using Global Error Message, needs changed later
				sr_$.UI_manager.errors.show({
					id: "signin_error",
					html: "Sorry, we are having technical issues. Please try again."
				});
			}
		}
	};

	sr_$.forgotPasswordSubmit = function(email) {
		sr_$.script.call(
			sr_$.member_services + "/pik/request_password_reset?email=" + email,
			"forgot_pass",
			sr_$.forgotPasswordSubmitResponse,
			sr_$.forgotPasswordSubmitResponse
		);
	};

	sr_$.forgotPasswordSubmitResponse = function(vars) {
		if (vars) {
			if (vars.success) {
				sr_$.Modal.modal("sign_in");
			} else {
				sr_$.UI_manager.busy(false);
				sr_$.views.displayForgotPasswordMessage(vars.success, vars.message);
			}
		} else {
			sr_$.UI_manager.busy(false);
			sr_$.UI_manager.errors.show({html: "There was a problem resetting your password. Please try again."});
		}
	};

	sr_$.savePartialSignup = function() {
		// References to Model Object
		var billingInfo = sr_$.model.billing;
		var accountInfo = sr_$.model.account;

		// This is for AMEX's enrollment path tracking (30 day flow vs. amex flow).
		var enrollmentPath = "";

		if (sr_$.model.modalState.signupType == "std_signup") {
			enrollmentPath = "MPIK30DFT";
		} else {
			enrollmentPath = "MPIK";
		}

		var urlParams = {
			ref: _shoprunner_com.retailerID,
			acq: sr_$.getReferrer(),
			email: accountInfo.email,
			fn: accountInfo.firstName,
			ln: accountInfo.lastName,
			ad1: billingInfo.address,
			city: billingInfo.city,
			state: billingInfo.state,
			zip: billingInfo.zip,
			responseID: "partial_signup",
			ep: enrollmentPath,
			stype: sr_$.model.modalState.signupType,
			bid: sr_$.cookie.get("browser_id")
		};

		var serializedParams = sr_$.jQ.param(urlParams);

		sr_$.script.call(
			sr_$.sfDir + "/save_partial_signup?" + serializedParams,
			"partial_signup");
	};

	sr_$.getReferrer = function() {
		return sr_$.cookie.get('referrer');
	}

	sr_$.setReferrer = function(referrerString) {
		// 1000 * 60 * 20  (20 mintues of expiry time for any acq.campaign based refferer)
		var referrerExpiryTime = 1/3;
		sr_$.cookie.set('referrer', referrerString, referrerExpiryTime );
	}

	return sr_$;
}(sr_$, _shoprunner_com, window, document, escape));

sr_$ = (function(sr_$, _shoprunner_com) {

	// Account/Billing Information
	sr_$.model = {
		amexEnabled: true,
		rule37OptOut: false,
		participatingStores: true,
		experiments: {
			showInterstitial: false,
			numberOfInterstitial: 0,
			hideGiftcard: false
		},
		staticData: {
			USStates: [
				'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL',
				'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA',
				'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE',
				'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR',
				'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI',
				'WV', 'WY'
			]
		},
		modalState: {
			initialized: false,
			clickLocation: "",
			typeOfSignup: "",
			learnMoreClicked: false,
			signInClicked: false,
			payRunnerClicked: false,
			// This is to replace learnMoreClicked (better representation of what was trying to be accomplished)
			signupFlow: false
		},
		signin_display_learn_more: true,
		account: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			acceptedTos: false,
			membership: ""
		},
		billing: {
			eligibilityId: "",
			firstName: "",
			middleInitial: "",
			lastName: "",
			cardNumber: "",
			expiration_month: "",
			expiration_year: "",
			cvv: "",
			address: "",
			city: "",
			state: "",
			zip: "",
			ccType: "",
			ssoChecked: false
		},
		// Personalizer State
		personalizer: {
			enabled: true,
			gender: "",
			age_to: "",
			age_from: "",
			shop_for: ""
		},
		signInInfo: {
			ssoToken: "",
			email: "",
			password: "",
			ssoChecked: false
		},
		member: {
			signedIn: false,
			ssoToken: "",
			token: "",
			memberId: "",
			isSSO: false
		},
		// Store features supported by browser
		browserData: {
			postMessage: false
		},
		// BUGBUG: Need to remove the references to below:
		configureAmex: function() {
			// this.amexEnabled = false;
		},
		// This is for backwards compatibility for v3 partners, will need to combine references and how model is setup.
		config: {
			isAmexFlowEnabled: true,
			isAmexIEFlowDisabled: false,
			assetName: (typeof _shoprunner_com.brandID == "undefined" || _shoprunner_com.brandID === "") ?
				_shoprunner_com.retailerID : _shoprunner_com.brandID
		},
        getAvailableStatesForShipping: function(){
            var cpy = this.staticData.USStates.slice(0);
            for(var idx  = 0; idx < sr_$.payrunner.Config.shipping_state_exclusion.length; idx++ ) {
                var arrayIdx = cpy.indexOf(sr_$.payrunner.Config.shipping_state_exclusion[idx]);
                // shipping_state_exclusion is used elsewhere, so it is possible to have states listed not on the stateList
                if(arrayIdx != -1){
                	cpy.splice(arrayIdx, 1);
                }
            }
            return cpy;
        }

	};

	// If Staging, always disable PIK Personalizer (URL not exposed publicly)
	if(_shoprunner_com.environmentID == 1){
		sr_$.model.personalizer.enabled = false;
	}


	return sr_$;
}(sr_$, _shoprunner_com));

/**
 * @description Render ShopRunner Module - manages shoprunner div rendering and refreshing
 * Based on configuration parameters.
 *
 * sr_pageRefreshes defaulted to false if not found.
 * Dependencies:
 * jquery_module
 * base_module
 * delayrun_module
 */

// The 'sr_pageRefreshes' property is controlled and managed by
// the retailer, if it's not found we default to false.
var sr_pageRefreshes = (typeof sr_pageRefreshes == "undefined") ? false : sr_pageRefreshes;

(function(sr_$, document, location) {

	// We keep track of the divs active on the page.
	var activeDivs = [];

	// Function to find and render divs on page if available.
	sr_$.renderDivs = function () {
		// Update mov values for use in divs.
		if(sr_$.mov){
			sr_$.mov.updateValues();
		}
		sr_$.cookie.check();

		var rendered = false;
		// get all sr divs on the page.
		var srDivs = getDivs();

		// for all divs we defined functions for, set their HTML.
		for (var name in sr_$.srDivs) {
			var divs = srDivs[name];

			// it's possible there might be no divs on the page with this name.
			if (divs) {
				var divObject = setupDiv(name);
				rendered = true;

				for (var i = 0; i < divs.length; i++) {
					divs[i].innerHTML = divObject.html;
				}

				if (typeof divObject.onload == "function") {
					divObject.onload();
				}

				// if the div object defines an impression object, use it to log the impression.
				if (divObject.impression && divObject.impression.page) {
					divObject.impression.action_origin = "IMPRESSION";
					sr_$.track.pageView(divObject.impression);
				}
			}
		}
		return rendered;
	};

	// Finds all SR divs on the page and returns an object
	// that maps div names (e.g. 'productDetailDiv') to a
	// list of elements.
	var getDivs = function() {
		var result = {};
		var divs = document.getElementsByTagName("*");

		for (var i = 0; i < divs.length; i++) {
			var div = divs[i];
			var name = div.getAttribute("name");

			// if the div's name starts with "sr_", add it to a list.
			if (name && name.substring(0, 3) == "sr_") {
				name = name.substring(3);

				// we make lists of divs grouped by name.
				if (name in result) {
					result[name].push(div);
				} else {
					result[name] = [div];
				}
			}
		}

		return result;
	}

	var divNameMapping = {
		headerDiv: "Header",
		payRunnerCartDiv: "Cart",
		expressCheckoutCartDiv: "Cart",
		productDetailDiv: "Product Detail",
		quickViewDiv: "Quick View",
		shippingOptionDiv: "Shipping Option",
		shippingSummaryDiv: "Shipping Summary",
		checkoutPageDiv: "Checkout",
		dualEligibilityDiv: "Dual Eligibility",
		cartSummaryDiv: "Cart Summary",
		cartProductDiv: "Cart Product",
		smallBannerDiv: "Small Banner",
		categoryBannerDiv: "Category Banner",
		catalogProductDiv: "Catalog Product",
		catalogProductGridDiv: "Catalog Product",
		marketing_1_Div: "Marketing 1",
		marketing_2_Div: "Marketing 2",
		marketing_3_Div: "Marketing 3",
		marketing_4_Div: "Marketing 4",
		marketing_5_Div: "Marketing 5",
		dualMarketing_1_Div: "Dual Marketing 1",
		dualMarketing_2_Div: "Dual Marketing 2",
		dualMarketing_3_Div: "Dual Marketing 3",
		dualMarketing_4_Div: "Dual Marketing 4",
		dualMarketing_5_Div: "Dual Marketing 5"
	};

	// for these divs, we log impressions by default.
	var divsThatLogImpressions = {
		"headerDiv": 1,
		"shippingOptionDiv": 1
	};

	// Generates the HTML for an SR div.
	function setupDiv(name) {
		var object = {
			html: "",
			name: divNameMapping[name]
		};

		// check if this is a div where we should log an impression.
		if (name in divsThatLogImpressions) {
			object.impression = {
				page: object.name
			};

			if (sr_$.edd) {
				object.impression.edd = sr_$.edd.internalForm;
			}
		}

		var movThreshold = 0;

		// pass in movThreshold to divs
		if(sr_$.mov) {
			movThreshold = sr_$.mov.getThreshold();
		}

		object = sr_$.srDivs[name](object, sr_$.member.signed_in, movThreshold) || object;

		if (!object.html && !object.onload && !object.impression) {
			return {html: ""};
		}

		activeDivs.push("sr_" + name);

		var oclass = object.oclass || "";
		var id = object.id || "sr_" + name;
		var html = '<div class="' + oclass + '" id="' + id + '">' + object.html + '</div>';

		return {
			html: html,
			onload: object.onload,
			impression: object.impression
		};
	}

	// Refresh page based on div availability and page refresh configuration.
	sr_$.refresh_page = function() {
		sr_$.cookie.check();

		// if there are no SR divs, we don't need to refresh.
		if (!checkDivAvailability())
			return;

		if (sr_$.model.modalState.payRunnerClicked) {
			sr_$.renderDivs();
		} else if (sr_pageRefreshes === true && !sr_$.openedPayrunnerWindow) {
			if (location.hash) {
				location.reload();
			} else {
				location.href = location.href;
			}
		} else {
			sr_$.renderDivs();
		}

		// Fire On Refresh Event
		sr_$.events.fire("onRefresh");
		sr_$.jQ(document).trigger("sr_on_refresh");
	};

	// check if there are any SR divs on the page.
	function checkDivAvailability() {
		// this returns a mapping of div names to lists of DOM elements.
		var divs = getDivs();

		for (var name in divs) {
			return true;
		}

		return false;
	}

	if (sr_$.flags.domReady) {
		setTimeout(sr_$.delayRun, 1);
	}

	// Fallback
	sr_$.jQ(document).ready(function() {
		sr_$.delayRun();
	});
}(sr_$, document, location));

// hooked for back reference.
sr_refreshMessages = sr_$.refresh_page;
sr_updateMessages = sr_$.renderDivs;

(function(sr_$) {
// Copyright (c) 2005  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Basic JavaScript BN library - subset useful for RSA encryption.

// Bits per digit
var dbits;

// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = ((canary&0xffffff)==0xefcafe);

// (public) Constructor
function BigInteger(a,b,c) {
  if(a != null)
    if("number" == typeof a) this.fromNumber(a,b,c);
    else if(b == null && "string" != typeof a) this.fromString(a,256);
    else this.fromString(a,b);
}

// return new, unset BigInteger
function nbi() { return new BigInteger(null); }

// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.

// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
function am1(i,x,w,j,c,n) {
  while(--n >= 0) {
    var v = x*this[i++]+w[j]+c;
    c = Math.floor(v/0x4000000);
    w[j++] = v&0x3ffffff;
  }
  return c;
}
// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
function am2(i,x,w,j,c,n) {
  var xl = x&0x7fff, xh = x>>15;
  while(--n >= 0) {
    var l = this[i]&0x7fff;
    var h = this[i++]>>15;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
    c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
    w[j++] = l&0x3fffffff;
  }
  return c;
}
// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
function am3(i,x,w,j,c,n) {
  var xl = x&0x3fff, xh = x>>14;
  while(--n >= 0) {
    var l = this[i]&0x3fff;
    var h = this[i++]>>14;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x3fff)<<14)+w[j]+c;
    c = (l>>28)+(m>>14)+xh*h;
    w[j++] = l&0xfffffff;
  }
  return c;
}
if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
  BigInteger.prototype.am = am2;
  dbits = 30;
}
else if(j_lm && (navigator.appName != "Netscape")) {
  BigInteger.prototype.am = am1;
  dbits = 26;
}
else { // Mozilla/Netscape seems to prefer am3
  BigInteger.prototype.am = am3;
  dbits = 28;
}

BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1<<dbits)-1);
BigInteger.prototype.DV = (1<<dbits);

var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2,BI_FP);
BigInteger.prototype.F1 = BI_FP-dbits;
BigInteger.prototype.F2 = 2*dbits-BI_FP;

// Digit conversions
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr,vv;
rr = "0".charCodeAt(0);
for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
rr = "a".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
rr = "A".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

function int2char(n) { return BI_RM.charAt(n); }
function intAt(s,i) {
  var c = BI_RC[s.charCodeAt(i)];
  return (c==null)?-1:c;
}

// (protected) copy this to r
function bnpCopyTo(r) {
  for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
  r.t = this.t;
  r.s = this.s;
}

// (protected) set from integer value x, -DV <= x < DV
function bnpFromInt(x) {
  this.t = 1;
  this.s = (x<0)?-1:0;
  if(x > 0) this[0] = x;
  else if(x < -1) this[0] = x+this.DV;
  else this.t = 0;
}

// return bigint initialized to value
function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

// (protected) set from string and radix
function bnpFromString(s,b) {
  var k;
  if(b == 16) k = 4;
  else if(b == 8) k = 3;
  else if(b == 256) k = 8; // byte array
  else if(b == 2) k = 1;
  else if(b == 32) k = 5;
  else if(b == 4) k = 2;
  else { this.fromRadix(s,b); return; }
  this.t = 0;
  this.s = 0;
  var i = s.length, mi = false, sh = 0;
  while(--i >= 0) {
    var x = (k==8)?s[i]&0xff:intAt(s,i);
    if(x < 0) {
      if(s.charAt(i) == "-") mi = true;
      continue;
    }
    mi = false;
    if(sh == 0)
      this[this.t++] = x;
    else if(sh+k > this.DB) {
      this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
      this[this.t++] = (x>>(this.DB-sh));
    }
    else
      this[this.t-1] |= x<<sh;
    sh += k;
    if(sh >= this.DB) sh -= this.DB;
  }
  if(k == 8 && (s[0]&0x80) != 0) {
    this.s = -1;
    if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
  }
  this.clamp();
  if(mi) BigInteger.ZERO.subTo(this,this);
}

// (protected) clamp off excess high words
function bnpClamp() {
  var c = this.s&this.DM;
  while(this.t > 0 && this[this.t-1] == c) --this.t;
}

// (public) return string representation in given radix
function bnToString(b) {
  if(this.s < 0) return "-"+this.negate().toString(b);
  var k;
  if(b == 16) k = 4;
  else if(b == 8) k = 3;
  else if(b == 2) k = 1;
  else if(b == 32) k = 5;
  else if(b == 4) k = 2;
  else return this.toRadix(b);
  var km = (1<<k)-1, d, m = false, r = "", i = this.t;
  var p = this.DB-(i*this.DB)%k;
  if(i-- > 0) {
    if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
    while(i >= 0) {
      if(p < k) {
        d = (this[i]&((1<<p)-1))<<(k-p);
        d |= this[--i]>>(p+=this.DB-k);
      }
      else {
        d = (this[i]>>(p-=k))&km;
        if(p <= 0) { p += this.DB; --i; }
      }
      if(d > 0) m = true;
      if(m) r += int2char(d);
    }
  }
  return m?r:"0";
}

// (public) -this
function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

// (public) |this|
function bnAbs() { return (this.s<0)?this.negate():this; }

// (public) return + if this > a, - if this < a, 0 if equal
function bnCompareTo(a) {
  var r = this.s-a.s;
  if(r != 0) return r;
  var i = this.t;
  r = i-a.t;
  if(r != 0) return (this.s<0)?-r:r;
  while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
  return 0;
}

// returns bit length of the integer x
function nbits(x) {
  var r = 1, t;
  if((t=x>>>16) != 0) { x = t; r += 16; }
  if((t=x>>8) != 0) { x = t; r += 8; }
  if((t=x>>4) != 0) { x = t; r += 4; }
  if((t=x>>2) != 0) { x = t; r += 2; }
  if((t=x>>1) != 0) { x = t; r += 1; }
  return r;
}

// (public) return the number of bits in "this"
function bnBitLength() {
  if(this.t <= 0) return 0;
  return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
}

// (protected) r = this << n*DB
function bnpDLShiftTo(n,r) {
  var i;
  for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
  for(i = n-1; i >= 0; --i) r[i] = 0;
  r.t = this.t+n;
  r.s = this.s;
}

// (protected) r = this >> n*DB
function bnpDRShiftTo(n,r) {
  for(var i = n; i < this.t; ++i) r[i-n] = this[i];
  r.t = Math.max(this.t-n,0);
  r.s = this.s;
}

// (protected) r = this << n
function bnpLShiftTo(n,r) {
  var bs = n%this.DB;
  var cbs = this.DB-bs;
  var bm = (1<<cbs)-1;
  var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
  for(i = this.t-1; i >= 0; --i) {
    r[i+ds+1] = (this[i]>>cbs)|c;
    c = (this[i]&bm)<<bs;
  }
  for(i = ds-1; i >= 0; --i) r[i] = 0;
  r[ds] = c;
  r.t = this.t+ds+1;
  r.s = this.s;
  r.clamp();
}

// (protected) r = this >> n
function bnpRShiftTo(n,r) {
  r.s = this.s;
  var ds = Math.floor(n/this.DB);
  if(ds >= this.t) { r.t = 0; return; }
  var bs = n%this.DB;
  var cbs = this.DB-bs;
  var bm = (1<<bs)-1;
  r[0] = this[ds]>>bs;
  for(var i = ds+1; i < this.t; ++i) {
    r[i-ds-1] |= (this[i]&bm)<<cbs;
    r[i-ds] = this[i]>>bs;
  }
  if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
  r.t = this.t-ds;
  r.clamp();
}

// (protected) r = this - a
function bnpSubTo(a,r) {
  var i = 0, c = 0, m = Math.min(a.t,this.t);
  while(i < m) {
    c += this[i]-a[i];
    r[i++] = c&this.DM;
    c >>= this.DB;
  }
  if(a.t < this.t) {
    c -= a.s;
    while(i < this.t) {
      c += this[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += this.s;
  }
  else {
    c += this.s;
    while(i < a.t) {
      c -= a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c -= a.s;
  }
  r.s = (c<0)?-1:0;
  if(c < -1) r[i++] = this.DV+c;
  else if(c > 0) r[i++] = c;
  r.t = i;
  r.clamp();
}

// (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
function bnpMultiplyTo(a,r) {
  var x = this.abs(), y = a.abs();
  var i = x.t;
  r.t = i+y.t;
  while(--i >= 0) r[i] = 0;
  for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
  r.s = 0;
  r.clamp();
  if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
}

// (protected) r = this^2, r != this (HAC 14.16)
function bnpSquareTo(r) {
  var x = this.abs();
  var i = r.t = 2*x.t;
  while(--i >= 0) r[i] = 0;
  for(i = 0; i < x.t-1; ++i) {
    var c = x.am(i,x[i],r,2*i,0,1);
    if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
      r[i+x.t] -= x.DV;
      r[i+x.t+1] = 1;
    }
  }
  if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
  r.s = 0;
  r.clamp();
}

// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
function bnpDivRemTo(m,q,r) {
  var pm = m.abs();
  if(pm.t <= 0) return;
  var pt = this.abs();
  if(pt.t < pm.t) {
    if(q != null) q.fromInt(0);
    if(r != null) this.copyTo(r);
    return;
  }
  if(r == null) r = nbi();
  var y = nbi(), ts = this.s, ms = m.s;
  var nsh = this.DB-nbits(pm[pm.t-1]);  // normalize modulus
  if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
  else { pm.copyTo(y); pt.copyTo(r); }
  var ys = y.t;
  var y0 = y[ys-1];
  if(y0 == 0) return;
  var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
  var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
  var i = r.t, j = i-ys, t = (q==null)?nbi():q;
  y.dlShiftTo(j,t);
  if(r.compareTo(t) >= 0) {
    r[r.t++] = 1;
    r.subTo(t,r);
  }
  BigInteger.ONE.dlShiftTo(ys,t);
  t.subTo(y,y); // "negative" y so we can replace sub with am later
  while(y.t < ys) y[y.t++] = 0;
  while(--j >= 0) {
    // Estimate quotient digit
    var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
    if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {  // Try it out
      y.dlShiftTo(j,t);
      r.subTo(t,r);
      while(r[i] < --qd) r.subTo(t,r);
    }
  }
  if(q != null) {
    r.drShiftTo(ys,q);
    if(ts != ms) BigInteger.ZERO.subTo(q,q);
  }
  r.t = ys;
  r.clamp();
  if(nsh > 0) r.rShiftTo(nsh,r);    // Denormalize remainder
  if(ts < 0) BigInteger.ZERO.subTo(r,r);
}

// (public) this mod a
function bnMod(a) {
  var r = nbi();
  this.abs().divRemTo(a,null,r);
  if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
  return r;
}

// Modular reduction using "classic" algorithm
function Classic(m) { this.m = m; }
function cConvert(x) {
  if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
  else return x;
}
function cRevert(x) { return x; }
function cReduce(x) { x.divRemTo(this.m,null,x); }
function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
function bnpInvDigit() {
  if(this.t < 1) return 0;
  var x = this[0];
  if((x&1) == 0) return 0;
  var y = x&3;      // y == 1/x mod 2^2
  y = (y*(2-(x&0xf)*y))&0xf;    // y == 1/x mod 2^4
  y = (y*(2-(x&0xff)*y))&0xff;  // y == 1/x mod 2^8
  y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;   // y == 1/x mod 2^16
  // last step - calculate inverse mod DV directly;
  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
  y = (y*(2-x*y%this.DV))%this.DV;      // y == 1/x mod 2^dbits
  // we really want the negative inverse, and -DV < y < DV
  return (y>0)?this.DV-y:-y;
}

// Montgomery reduction
function Montgomery(m) {
  this.m = m;
  this.mp = m.invDigit();
  this.mpl = this.mp&0x7fff;
  this.mph = this.mp>>15;
  this.um = (1<<(m.DB-15))-1;
  this.mt2 = 2*m.t;
}

// xR mod m
function montConvert(x) {
  var r = nbi();
  x.abs().dlShiftTo(this.m.t,r);
  r.divRemTo(this.m,null,r);
  if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
  return r;
}

// x/R mod m
function montRevert(x) {
  var r = nbi();
  x.copyTo(r);
  this.reduce(r);
  return r;
}

// x = x/R mod m (HAC 14.32)
function montReduce(x) {
  while(x.t <= this.mt2)    // pad x so am has enough room later
    x[x.t++] = 0;
  for(var i = 0; i < this.m.t; ++i) {
    // faster way of calculating u0 = x[i]*mp mod DV
    var j = x[i]&0x7fff;
    var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
    // use am to combine the multiply-shift-add into one call
    j = i+this.m.t;
    x[j] += this.m.am(0,u0,x,i,0,this.m.t);
    // propagate carry
    while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
  }
  x.clamp();
  x.drShiftTo(this.m.t,x);
  if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
}

// r = "x^2/R mod m"; x != r
function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

// r = "xy/R mod m"; x,y != r
function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

// (protected) true iff this is even
function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
function bnpExp(e,z) {
  if(e > 0xffffffff || e < 1) return BigInteger.ONE;
  var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
  g.copyTo(r);
  while(--i >= 0) {
    z.sqrTo(r,r2);
    if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
    else { var t = r; r = r2; r2 = t; }
  }
  return z.revert(r);
}

// (public) this^e % m, 0 <= e < 2^32
function bnModPowInt(e,m) {
  var z;
  if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
  return this.exp(e,z);
}

// protected
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;

// public
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;

// "constants"
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
// Copyright (c) 2005-2009  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Extended JavaScript BN functions, required for RSA private ops.

// Version 1.1: new BigInteger("0", 10) returns "proper" zero
// Version 1.2: square() API, isProbablePrime fix

// (public)
function bnClone() { var r = nbi(); this.copyTo(r); return r; }

// (public) return value as integer
function bnIntValue() {
  if(this.s < 0) {
    if(this.t == 1) return this[0]-this.DV;
    else if(this.t == 0) return -1;
  }
  else if(this.t == 1) return this[0];
  else if(this.t == 0) return 0;
  // assumes 16 < DB < 32
  return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
}

// (public) return value as byte
function bnByteValue() { return (this.t==0)?this.s:(this[0]<<24)>>24; }

// (public) return value as short (assumes DB>=16)
function bnShortValue() { return (this.t==0)?this.s:(this[0]<<16)>>16; }

// (protected) return x s.t. r^x < DV
function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }

// (public) 0 if this == 0, 1 if this > 0
function bnSigNum() {
  if(this.s < 0) return -1;
  else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
  else return 1;
}

// (protected) convert to radix string
function bnpToRadix(b) {
  if(b == null) b = 10;
  if(this.signum() == 0 || b < 2 || b > 36) return "0";
  var cs = this.chunkSize(b);
  var a = Math.pow(b,cs);
  var d = nbv(a), y = nbi(), z = nbi(), r = "";
  this.divRemTo(d,y,z);
  while(y.signum() > 0) {
    r = (a+z.intValue()).toString(b).substr(1) + r;
    y.divRemTo(d,y,z);
  }
  return z.intValue().toString(b) + r;
}

// (protected) convert from radix string
function bnpFromRadix(s,b) {
  this.fromInt(0);
  if(b == null) b = 10;
  var cs = this.chunkSize(b);
  var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
  for(var i = 0; i < s.length; ++i) {
    var x = intAt(s,i);
    if(x < 0) {
      if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
      continue;
    }
    w = b*w+x;
    if(++j >= cs) {
      this.dMultiply(d);
      this.dAddOffset(w,0);
      j = 0;
      w = 0;
    }
  }
  if(j > 0) {
    this.dMultiply(Math.pow(b,j));
    this.dAddOffset(w,0);
  }
  if(mi) BigInteger.ZERO.subTo(this,this);
}

// (protected) alternate constructor
function bnpFromNumber(a,b,c) {
  if("number" == typeof b) {
    // new BigInteger(int,int,RNG)
    if(a < 2) this.fromInt(1);
    else {
      this.fromNumber(a,c);
      if(!this.testBit(a-1))    // force MSB set
        this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this);
      if(this.isEven()) this.dAddOffset(1,0); // force odd
      while(!this.isProbablePrime(b)) {
        this.dAddOffset(2,0);
        if(this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a-1),this);
      }
    }
  }
  else {
    // new BigInteger(int,RNG)
    var x = new Array(), t = a&7;
    x.length = (a>>3)+1;
    b.nextBytes(x);
    if(t > 0) x[0] &= ((1<<t)-1); else x[0] = 0;
    this.fromString(x,256);
  }
}

// (public) convert to bigendian byte array
function bnToByteArray() {
  var i = this.t, r = new Array();
  r[0] = this.s;
  var p = this.DB-(i*this.DB)%8, d, k = 0;
  if(i-- > 0) {
    if(p < this.DB && (d = this[i]>>p) != (this.s&this.DM)>>p)
      r[k++] = d|(this.s<<(this.DB-p));
    while(i >= 0) {
      if(p < 8) {
        d = (this[i]&((1<<p)-1))<<(8-p);
        d |= this[--i]>>(p+=this.DB-8);
      }
      else {
        d = (this[i]>>(p-=8))&0xff;
        if(p <= 0) { p += this.DB; --i; }
      }
      if((d&0x80) != 0) d |= -256;
      if(k == 0 && (this.s&0x80) != (d&0x80)) ++k;
      if(k > 0 || d != this.s) r[k++] = d;
    }
  }
  return r;
}

function bnEquals(a) { return(this.compareTo(a)==0); }
function bnMin(a) { return(this.compareTo(a)<0)?this:a; }
function bnMax(a) { return(this.compareTo(a)>0)?this:a; }

// (protected) r = this op a (bitwise)
function bnpBitwiseTo(a,op,r) {
  var i, f, m = Math.min(a.t,this.t);
  for(i = 0; i < m; ++i) r[i] = op(this[i],a[i]);
  if(a.t < this.t) {
    f = a.s&this.DM;
    for(i = m; i < this.t; ++i) r[i] = op(this[i],f);
    r.t = this.t;
  }
  else {
    f = this.s&this.DM;
    for(i = m; i < a.t; ++i) r[i] = op(f,a[i]);
    r.t = a.t;
  }
  r.s = op(this.s,a.s);
  r.clamp();
}

// (public) this & a
function op_and(x,y) { return x&y; }
function bnAnd(a) { var r = nbi(); this.bitwiseTo(a,op_and,r); return r; }

// (public) this | a
function op_or(x,y) { return x|y; }
function bnOr(a) { var r = nbi(); this.bitwiseTo(a,op_or,r); return r; }

// (public) this ^ a
function op_xor(x,y) { return x^y; }
function bnXor(a) { var r = nbi(); this.bitwiseTo(a,op_xor,r); return r; }

// (public) this & ~a
function op_andnot(x,y) { return x&~y; }
function bnAndNot(a) { var r = nbi(); this.bitwiseTo(a,op_andnot,r); return r; }

// (public) ~this
function bnNot() {
  var r = nbi();
  for(var i = 0; i < this.t; ++i) r[i] = this.DM&~this[i];
  r.t = this.t;
  r.s = ~this.s;
  return r;
}

// (public) this << n
function bnShiftLeft(n) {
  var r = nbi();
  if(n < 0) this.rShiftTo(-n,r); else this.lShiftTo(n,r);
  return r;
}

// (public) this >> n
function bnShiftRight(n) {
  var r = nbi();
  if(n < 0) this.lShiftTo(-n,r); else this.rShiftTo(n,r);
  return r;
}

// return index of lowest 1-bit in x, x < 2^31
function lbit(x) {
  if(x == 0) return -1;
  var r = 0;
  if((x&0xffff) == 0) { x >>= 16; r += 16; }
  if((x&0xff) == 0) { x >>= 8; r += 8; }
  if((x&0xf) == 0) { x >>= 4; r += 4; }
  if((x&3) == 0) { x >>= 2; r += 2; }
  if((x&1) == 0) ++r;
  return r;
}

// (public) returns index of lowest 1-bit (or -1 if none)
function bnGetLowestSetBit() {
  for(var i = 0; i < this.t; ++i)
    if(this[i] != 0) return i*this.DB+lbit(this[i]);
  if(this.s < 0) return this.t*this.DB;
  return -1;
}

// return number of 1 bits in x
function cbit(x) {
  var r = 0;
  while(x != 0) { x &= x-1; ++r; }
  return r;
}

// (public) return number of set bits
function bnBitCount() {
  var r = 0, x = this.s&this.DM;
  for(var i = 0; i < this.t; ++i) r += cbit(this[i]^x);
  return r;
}

// (public) true iff nth bit is set
function bnTestBit(n) {
  var j = Math.floor(n/this.DB);
  if(j >= this.t) return(this.s!=0);
  return((this[j]&(1<<(n%this.DB)))!=0);
}

// (protected) this op (1<<n)
function bnpChangeBit(n,op) {
  var r = BigInteger.ONE.shiftLeft(n);
  this.bitwiseTo(r,op,r);
  return r;
}

// (public) this | (1<<n)
function bnSetBit(n) { return this.changeBit(n,op_or); }

// (public) this & ~(1<<n)
function bnClearBit(n) { return this.changeBit(n,op_andnot); }

// (public) this ^ (1<<n)
function bnFlipBit(n) { return this.changeBit(n,op_xor); }

// (protected) r = this + a
function bnpAddTo(a,r) {
  var i = 0, c = 0, m = Math.min(a.t,this.t);
  while(i < m) {
    c += this[i]+a[i];
    r[i++] = c&this.DM;
    c >>= this.DB;
  }
  if(a.t < this.t) {
    c += a.s;
    while(i < this.t) {
      c += this[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += this.s;
  }
  else {
    c += this.s;
    while(i < a.t) {
      c += a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += a.s;
  }
  r.s = (c<0)?-1:0;
  if(c > 0) r[i++] = c;
  else if(c < -1) r[i++] = this.DV+c;
  r.t = i;
  r.clamp();
}

// (public) this + a
function bnAdd(a) { var r = nbi(); this.addTo(a,r); return r; }

// (public) this - a
function bnSubtract(a) { var r = nbi(); this.subTo(a,r); return r; }

// (public) this * a
function bnMultiply(a) { var r = nbi(); this.multiplyTo(a,r); return r; }

// (public) this^2
function bnSquare() { var r = nbi(); this.squareTo(r); return r; }

// (public) this / a
function bnDivide(a) { var r = nbi(); this.divRemTo(a,r,null); return r; }

// (public) this % a
function bnRemainder(a) { var r = nbi(); this.divRemTo(a,null,r); return r; }

// (public) [this/a,this%a]
function bnDivideAndRemainder(a) {
  var q = nbi(), r = nbi();
  this.divRemTo(a,q,r);
  return new Array(q,r);
}

// (protected) this *= n, this >= 0, 1 < n < DV
function bnpDMultiply(n) {
  this[this.t] = this.am(0,n-1,this,0,0,this.t);
  ++this.t;
  this.clamp();
}

// (protected) this += n << w words, this >= 0
function bnpDAddOffset(n,w) {
  if(n == 0) return;
  while(this.t <= w) this[this.t++] = 0;
  this[w] += n;
  while(this[w] >= this.DV) {
    this[w] -= this.DV;
    if(++w >= this.t) this[this.t++] = 0;
    ++this[w];
  }
}

// A "null" reducer
function NullExp() {}
function nNop(x) { return x; }
function nMulTo(x,y,r) { x.multiplyTo(y,r); }
function nSqrTo(x,r) { x.squareTo(r); }

NullExp.prototype.convert = nNop;
NullExp.prototype.revert = nNop;
NullExp.prototype.mulTo = nMulTo;
NullExp.prototype.sqrTo = nSqrTo;

// (public) this^e
function bnPow(e) { return this.exp(e,new NullExp()); }

// (protected) r = lower n words of "this * a", a.t <= n
// "this" should be the larger one if appropriate.
function bnpMultiplyLowerTo(a,n,r) {
  var i = Math.min(this.t+a.t,n);
  r.s = 0; // assumes a,this >= 0
  r.t = i;
  while(i > 0) r[--i] = 0;
  var j;
  for(j = r.t-this.t; i < j; ++i) r[i+this.t] = this.am(0,a[i],r,i,0,this.t);
  for(j = Math.min(a.t,n); i < j; ++i) this.am(0,a[i],r,i,0,n-i);
  r.clamp();
}

// (protected) r = "this * a" without lower n words, n > 0
// "this" should be the larger one if appropriate.
function bnpMultiplyUpperTo(a,n,r) {
  --n;
  var i = r.t = this.t+a.t-n;
  r.s = 0; // assumes a,this >= 0
  while(--i >= 0) r[i] = 0;
  for(i = Math.max(n-this.t,0); i < a.t; ++i)
    r[this.t+i-n] = this.am(n-i,a[i],r,0,0,this.t+i-n);
  r.clamp();
  r.drShiftTo(1,r);
}

// Barrett modular reduction
function Barrett(m) {
  // setup Barrett
  this.r2 = nbi();
  this.q3 = nbi();
  BigInteger.ONE.dlShiftTo(2*m.t,this.r2);
  this.mu = this.r2.divide(m);
  this.m = m;
}

function barrettConvert(x) {
  if(x.s < 0 || x.t > 2*this.m.t) return x.mod(this.m);
  else if(x.compareTo(this.m) < 0) return x;
  else { var r = nbi(); x.copyTo(r); this.reduce(r); return r; }
}

function barrettRevert(x) { return x; }

// x = x mod m (HAC 14.42)
function barrettReduce(x) {
  x.drShiftTo(this.m.t-1,this.r2);
  if(x.t > this.m.t+1) { x.t = this.m.t+1; x.clamp(); }
  this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);
  this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);
  while(x.compareTo(this.r2) < 0) x.dAddOffset(1,this.m.t+1);
  x.subTo(this.r2,x);
  while(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
}

// r = x^2 mod m; x != r
function barrettSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

// r = x*y mod m; x,y != r
function barrettMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

Barrett.prototype.convert = barrettConvert;
Barrett.prototype.revert = barrettRevert;
Barrett.prototype.reduce = barrettReduce;
Barrett.prototype.mulTo = barrettMulTo;
Barrett.prototype.sqrTo = barrettSqrTo;

// (public) this^e % m (HAC 14.85)
function bnModPow(e,m) {
  var i = e.bitLength(), k, r = nbv(1), z;
  if(i <= 0) return r;
  else if(i < 18) k = 1;
  else if(i < 48) k = 3;
  else if(i < 144) k = 4;
  else if(i < 768) k = 5;
  else k = 6;
  if(i < 8)
    z = new Classic(m);
  else if(m.isEven())
    z = new Barrett(m);
  else
    z = new Montgomery(m);

  // precomputation
  var g = new Array(), n = 3, k1 = k-1, km = (1<<k)-1;
  g[1] = z.convert(this);
  if(k > 1) {
    var g2 = nbi();
    z.sqrTo(g[1],g2);
    while(n <= km) {
      g[n] = nbi();
      z.mulTo(g2,g[n-2],g[n]);
      n += 2;
    }
  }

  var j = e.t-1, w, is1 = true, r2 = nbi(), t;
  i = nbits(e[j])-1;
  while(j >= 0) {
    if(i >= k1) w = (e[j]>>(i-k1))&km;
    else {
      w = (e[j]&((1<<(i+1))-1))<<(k1-i);
      if(j > 0) w |= e[j-1]>>(this.DB+i-k1);
    }

    n = k;
    while((w&1) == 0) { w >>= 1; --n; }
    if((i -= n) < 0) { i += this.DB; --j; }
    if(is1) {   // ret == 1, don't bother squaring or multiplying it
      g[w].copyTo(r);
      is1 = false;
    }
    else {
      while(n > 1) { z.sqrTo(r,r2); z.sqrTo(r2,r); n -= 2; }
      if(n > 0) z.sqrTo(r,r2); else { t = r; r = r2; r2 = t; }
      z.mulTo(r2,g[w],r);
    }

    while(j >= 0 && (e[j]&(1<<i)) == 0) {
      z.sqrTo(r,r2); t = r; r = r2; r2 = t;
      if(--i < 0) { i = this.DB-1; --j; }
    }
  }
  return z.revert(r);
}

// (public) gcd(this,a) (HAC 14.54)
function bnGCD(a) {
  var x = (this.s<0)?this.negate():this.clone();
  var y = (a.s<0)?a.negate():a.clone();
  if(x.compareTo(y) < 0) { var t = x; x = y; y = t; }
  var i = x.getLowestSetBit(), g = y.getLowestSetBit();
  if(g < 0) return x;
  if(i < g) g = i;
  if(g > 0) {
    x.rShiftTo(g,x);
    y.rShiftTo(g,y);
  }
  while(x.signum() > 0) {
    if((i = x.getLowestSetBit()) > 0) x.rShiftTo(i,x);
    if((i = y.getLowestSetBit()) > 0) y.rShiftTo(i,y);
    if(x.compareTo(y) >= 0) {
      x.subTo(y,x);
      x.rShiftTo(1,x);
    }
    else {
      y.subTo(x,y);
      y.rShiftTo(1,y);
    }
  }
  if(g > 0) y.lShiftTo(g,y);
  return y;
}

// (protected) this % n, n < 2^26
function bnpModInt(n) {
  if(n <= 0) return 0;
  var d = this.DV%n, r = (this.s<0)?n-1:0;
  if(this.t > 0)
    if(d == 0) r = this[0]%n;
    else for(var i = this.t-1; i >= 0; --i) r = (d*r+this[i])%n;
  return r;
}

// (public) 1/this % m (HAC 14.61)
function bnModInverse(m) {
  var ac = m.isEven();
  if((this.isEven() && ac) || m.signum() == 0) return BigInteger.ZERO;
  var u = m.clone(), v = this.clone();
  var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
  while(u.signum() != 0) {
    while(u.isEven()) {
      u.rShiftTo(1,u);
      if(ac) {
        if(!a.isEven() || !b.isEven()) { a.addTo(this,a); b.subTo(m,b); }
        a.rShiftTo(1,a);
      }
      else if(!b.isEven()) b.subTo(m,b);
      b.rShiftTo(1,b);
    }
    while(v.isEven()) {
      v.rShiftTo(1,v);
      if(ac) {
        if(!c.isEven() || !d.isEven()) { c.addTo(this,c); d.subTo(m,d); }
        c.rShiftTo(1,c);
      }
      else if(!d.isEven()) d.subTo(m,d);
      d.rShiftTo(1,d);
    }
    if(u.compareTo(v) >= 0) {
      u.subTo(v,u);
      if(ac) a.subTo(c,a);
      b.subTo(d,b);
    }
    else {
      v.subTo(u,v);
      if(ac) c.subTo(a,c);
      d.subTo(b,d);
    }
  }
  if(v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;
  if(d.compareTo(m) >= 0) return d.subtract(m);
  if(d.signum() < 0) d.addTo(m,d); else return d;
  if(d.signum() < 0) return d.add(m); else return d;
}

var lowprimes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];
var lplim = (1<<26)/lowprimes[lowprimes.length-1];

// (public) test primality with certainty >= 1-.5^t
function bnIsProbablePrime(t) {
  var i, x = this.abs();
  if(x.t == 1 && x[0] <= lowprimes[lowprimes.length-1]) {
    for(i = 0; i < lowprimes.length; ++i)
      if(x[0] == lowprimes[i]) return true;
    return false;
  }
  if(x.isEven()) return false;
  i = 1;
  while(i < lowprimes.length) {
    var m = lowprimes[i], j = i+1;
    while(j < lowprimes.length && m < lplim) m *= lowprimes[j++];
    m = x.modInt(m);
    while(i < j) if(m%lowprimes[i++] == 0) return false;
  }
  return x.millerRabin(t);
}

// (protected) true if probably prime (HAC 4.24, Miller-Rabin)
function bnpMillerRabin(t) {
  var n1 = this.subtract(BigInteger.ONE);
  var k = n1.getLowestSetBit();
  if(k <= 0) return false;
  var r = n1.shiftRight(k);
  t = (t+1)>>1;
  if(t > lowprimes.length) t = lowprimes.length;
  var a = nbi();
  for(var i = 0; i < t; ++i) {
    //Pick bases at random, instead of starting at 2
    a.fromInt(lowprimes[Math.floor(Math.random()*lowprimes.length)]);
    var y = a.modPow(r,this);
    if(y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
      var j = 1;
      while(j++ < k && y.compareTo(n1) != 0) {
        y = y.modPowInt(2,this);
        if(y.compareTo(BigInteger.ONE) == 0) return false;
      }
      if(y.compareTo(n1) != 0) return false;
    }
  }
  return true;
}

// protected
BigInteger.prototype.chunkSize = bnpChunkSize;
BigInteger.prototype.toRadix = bnpToRadix;
BigInteger.prototype.fromRadix = bnpFromRadix;
BigInteger.prototype.fromNumber = bnpFromNumber;
BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
BigInteger.prototype.changeBit = bnpChangeBit;
BigInteger.prototype.addTo = bnpAddTo;
BigInteger.prototype.dMultiply = bnpDMultiply;
BigInteger.prototype.dAddOffset = bnpDAddOffset;
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
BigInteger.prototype.modInt = bnpModInt;
BigInteger.prototype.millerRabin = bnpMillerRabin;

// public
BigInteger.prototype.clone = bnClone;
BigInteger.prototype.intValue = bnIntValue;
BigInteger.prototype.byteValue = bnByteValue;
BigInteger.prototype.shortValue = bnShortValue;
BigInteger.prototype.signum = bnSigNum;
BigInteger.prototype.toByteArray = bnToByteArray;
BigInteger.prototype.equals = bnEquals;
BigInteger.prototype.min = bnMin;
BigInteger.prototype.max = bnMax;
BigInteger.prototype.and = bnAnd;
BigInteger.prototype.or = bnOr;
BigInteger.prototype.xor = bnXor;
BigInteger.prototype.andNot = bnAndNot;
BigInteger.prototype.not = bnNot;
BigInteger.prototype.shiftLeft = bnShiftLeft;
BigInteger.prototype.shiftRight = bnShiftRight;
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
BigInteger.prototype.bitCount = bnBitCount;
BigInteger.prototype.testBit = bnTestBit;
BigInteger.prototype.setBit = bnSetBit;
BigInteger.prototype.clearBit = bnClearBit;
BigInteger.prototype.flipBit = bnFlipBit;
BigInteger.prototype.add = bnAdd;
BigInteger.prototype.subtract = bnSubtract;
BigInteger.prototype.multiply = bnMultiply;
BigInteger.prototype.divide = bnDivide;
BigInteger.prototype.remainder = bnRemainder;
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
BigInteger.prototype.modPow = bnModPow;
BigInteger.prototype.modInverse = bnModInverse;
BigInteger.prototype.pow = bnPow;
BigInteger.prototype.gcd = bnGCD;
BigInteger.prototype.isProbablePrime = bnIsProbablePrime;

// JSBN-specific extension
BigInteger.prototype.square = bnSquare;

// BigInteger interfaces not implemented in jsbn:

// BigInteger(int signum, byte[] magnitude)
// double doubleValue()
// float floatValue()
// int hashCode()
// long longValue()
// static BigInteger valueOf(long val)
// prng4.js - uses Arcfour as a PRNG

function Arcfour() {
  this.i = 0;
  this.j = 0;
  this.S = new Array();
}

// Initialize arcfour context from key, an array of ints, each from [0..255]
function ARC4init(key) {
  var i, j, t;
  for(i = 0; i < 256; ++i)
    this.S[i] = i;
  j = 0;
  for(i = 0; i < 256; ++i) {
    j = (j + this.S[i] + key[i % key.length]) & 255;
    t = this.S[i];
    this.S[i] = this.S[j];
    this.S[j] = t;
  }
  this.i = 0;
  this.j = 0;
}

function ARC4next() {
  var t;
  this.i = (this.i + 1) & 255;
  this.j = (this.j + this.S[this.i]) & 255;
  t = this.S[this.i];
  this.S[this.i] = this.S[this.j];
  this.S[this.j] = t;
  return this.S[(t + this.S[this.i]) & 255];
}

Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;

// Plug in your RNG constructor here
function prng_newstate() {
  return new Arcfour();
}

// Pool size must be a multiple of 4 and greater than 32.
// An array of bytes the size of the pool will be passed to init()
var rng_psize = 256;
// Random number generator - requires a PRNG backend, e.g. prng4.js
var rng_state;
var rng_pool;
var rng_pptr;

// Initialize the pool with junk if needed.
if(rng_pool == null) {
  rng_pool = new Array();
  rng_pptr = 0;
  var t;
  if(window.crypto && window.crypto.getRandomValues) {
    // Extract entropy (2048 bits) from RNG if available
    var z = new Uint32Array(256);
    window.crypto.getRandomValues(z);
    for (t = 0; t < z.length; ++t)
      rng_pool[rng_pptr++] = z[t] & 255;
  }

  // Use mouse events for entropy, if we do not have enough entropy by the time
  // we need it, entropy will be generated by Math.random.
  var onMouseMoveListener = function(ev) {
    this.count = this.count || 0;
    if (this.count >= 256 || rng_pptr >= rng_psize) {
      if (window.removeEventListener)
        window.removeEventListener("mousemove", onMouseMoveListener);
      else if (window.detachEvent)
        window.detachEvent("onmousemove", onMouseMoveListener);
      return;
    }
    this.count += 1;
    var mouseCoordinates = ev.x + ev.y;
    rng_pool[rng_pptr++] = mouseCoordinates & 255;
  };
  if (window.addEventListener)
    window.addEventListener("mousemove", onMouseMoveListener);
  else if (window.attachEvent)
    window.attachEvent("onmousemove", onMouseMoveListener);

}

function rng_get_byte() {
  if(rng_state == null) {
    rng_state = prng_newstate();
    // At this point, we may not have collected enough entropy.  If not, fall back to Math.random
    while (rng_pptr < rng_psize) {
      var random = Math.floor(65536 * Math.random());
      rng_pool[rng_pptr++] = random & 255;
    }
    rng_state.init(rng_pool);
    for(rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
      rng_pool[rng_pptr] = 0;
    rng_pptr = 0;
  }
  // TODO: allow reseeding after first request
  return rng_state.next();
}

function rng_get_bytes(ba) {
  var i;
  for(i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
}

function SecureRandom() {}

SecureRandom.prototype.nextBytes = rng_get_bytes;
// Depends on jsbn.js and rng.js

// Version 1.1: support utf-8 encoding in pkcs1pad2

// convert a (hex) string to a bignum object
function parseBigInt(str,r) {
  return new BigInteger(str,r);
}

function linebrk(s,n) {
  var ret = "";
  var i = 0;
  while(i + n < s.length) {
    ret += s.substring(i,i+n) + "\n";
    i += n;
  }
  return ret + s.substring(i,s.length);
}

function byte2Hex(b) {
  if(b < 0x10)
    return "0" + b.toString(16);
  else
    return b.toString(16);
}

// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
function pkcs1pad2(s,n) {
  if(n < s.length + 11) { // TODO: fix for utf-8
    console.error("Message too long for RSA");
    return null;
  }
  var ba = new Array();
  var i = s.length - 1;
  while(i >= 0 && n > 0) {
    var c = s.charCodeAt(i--);
    if(c < 128) { // encode using utf-8
      ba[--n] = c;
    }
    else if((c > 127) && (c < 2048)) {
      ba[--n] = (c & 63) | 128;
      ba[--n] = (c >> 6) | 192;
    }
    else {
      ba[--n] = (c & 63) | 128;
      ba[--n] = ((c >> 6) & 63) | 128;
      ba[--n] = (c >> 12) | 224;
    }
  }
  ba[--n] = 0;
  var rng = new SecureRandom();
  var x = new Array();
  while(n > 2) { // random non-zero pad
    x[0] = 0;
    while(x[0] == 0) rng.nextBytes(x);
    ba[--n] = x[0];
  }
  ba[--n] = 2;
  ba[--n] = 0;
  return new BigInteger(ba);
}

// "empty" RSA key constructor
function RSAKey() {
  this.n = null;
  this.e = 0;
  this.d = null;
  this.p = null;
  this.q = null;
  this.dmp1 = null;
  this.dmq1 = null;
  this.coeff = null;
}

// Set the public key fields N and e from hex strings
function RSASetPublic(N,E) {
  if(N != null && E != null && N.length > 0 && E.length > 0) {
    this.n = parseBigInt(N,16);
    this.e = parseInt(E,16);
  }
  else
    console.error("Invalid RSA public key");
}

// Perform raw public operation on "x": return x^e (mod n)
function RSADoPublic(x) {
  return x.modPowInt(this.e, this.n);
}

// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
function RSAEncrypt(text) {
  var m = pkcs1pad2(text,(this.n.bitLength()+7)>>3);
  if(m == null) return null;
  var c = this.doPublic(m);
  if(c == null) return null;
  var h = c.toString(16);
  if((h.length & 1) == 0) return h; else return "0" + h;
}

// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
//function RSAEncryptB64(text) {
//  var h = this.encrypt(text);
//  if(h) return hex2b64(h); else return null;
//}

// protected
RSAKey.prototype.doPublic = RSADoPublic;

// public
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
//RSAKey.prototype.encrypt_b64 = RSAEncryptB64;
// Depends on rsa.js and jsbn2.js

// Version 1.1: support utf-8 decoding in pkcs1unpad2

// Undo PKCS#1 (type 2, random) padding and, if valid, return the plaintext
function pkcs1unpad2(d,n) {
  var b = d.toByteArray();
  var i = 0;
  while(i < b.length && b[i] == 0) ++i;
  if(b.length-i != n-1 || b[i] != 2)
    return null;
  ++i;
  while(b[i] != 0)
    if(++i >= b.length) return null;
  var ret = "";
  while(++i < b.length) {
    var c = b[i] & 255;
    if(c < 128) { // utf-8 decode
      ret += String.fromCharCode(c);
    }
    else if((c > 191) && (c < 224)) {
      ret += String.fromCharCode(((c & 31) << 6) | (b[i+1] & 63));
      ++i;
    }
    else {
      ret += String.fromCharCode(((c & 15) << 12) | ((b[i+1] & 63) << 6) | (b[i+2] & 63));
      i += 2;
    }
  }
  return ret;
}

// Set the private key fields N, e, and d from hex strings
function RSASetPrivate(N,E,D) {
  if(N != null && E != null && N.length > 0 && E.length > 0) {
    this.n = parseBigInt(N,16);
    this.e = parseInt(E,16);
    this.d = parseBigInt(D,16);
  }
  else
    console.error("Invalid RSA private key");
}

// Set the private key fields N, e, d and CRT params from hex strings
function RSASetPrivateEx(N,E,D,P,Q,DP,DQ,C) {
  if(N != null && E != null && N.length > 0 && E.length > 0) {
    this.n = parseBigInt(N,16);
    this.e = parseInt(E,16);
    this.d = parseBigInt(D,16);
    this.p = parseBigInt(P,16);
    this.q = parseBigInt(Q,16);
    this.dmp1 = parseBigInt(DP,16);
    this.dmq1 = parseBigInt(DQ,16);
    this.coeff = parseBigInt(C,16);
  }
  else
    console.error("Invalid RSA private key");
}

// Generate a new random private key B bits long, using public expt E
function RSAGenerate(B,E) {
  var rng = new SecureRandom();
  var qs = B>>1;
  this.e = parseInt(E,16);
  var ee = new BigInteger(E,16);
  for(;;) {
    for(;;) {
      this.p = new BigInteger(B-qs,1,rng);
      if(this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) break;
    }
    for(;;) {
      this.q = new BigInteger(qs,1,rng);
      if(this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) break;
    }
    if(this.p.compareTo(this.q) <= 0) {
      var t = this.p;
      this.p = this.q;
      this.q = t;
    }
    var p1 = this.p.subtract(BigInteger.ONE);
    var q1 = this.q.subtract(BigInteger.ONE);
    var phi = p1.multiply(q1);
    if(phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
      this.n = this.p.multiply(this.q);
      this.d = ee.modInverse(phi);
      this.dmp1 = this.d.mod(p1);
      this.dmq1 = this.d.mod(q1);
      this.coeff = this.q.modInverse(this.p);
      break;
    }
  }
}

// Perform raw private operation on "x": return x^d (mod n)
function RSADoPrivate(x) {
  if(this.p == null || this.q == null)
    return x.modPow(this.d, this.n);

  // TODO: re-calculate any missing CRT params
  var xp = x.mod(this.p).modPow(this.dmp1, this.p);
  var xq = x.mod(this.q).modPow(this.dmq1, this.q);

  while(xp.compareTo(xq) < 0)
    xp = xp.add(this.p);
  return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
}

// Return the PKCS#1 RSA decryption of "ctext".
// "ctext" is an even-length hex string and the output is a plain string.
function RSADecrypt(ctext) {
  var c = parseBigInt(ctext, 16);
  var m = this.doPrivate(c);
  if(m == null) return null;
  return pkcs1unpad2(m, (this.n.bitLength()+7)>>3);
}

// Return the PKCS#1 RSA decryption of "ctext".
// "ctext" is a Base64-encoded string and the output is a plain string.
//function RSAB64Decrypt(ctext) {
//  var h = b64tohex(ctext);
//  if(h) return this.decrypt(h); else return null;
//}

// protected
RSAKey.prototype.doPrivate = RSADoPrivate;

// public
RSAKey.prototype.setPrivate = RSASetPrivate;
RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
RSAKey.prototype.generate = RSAGenerate;
RSAKey.prototype.decrypt = RSADecrypt;
//RSAKey.prototype.b64_decrypt = RSAB64Decrypt;
// Copyright (c) 2011  Kevin M Burns Jr.
// All Rights Reserved.
// See "LICENSE" for details.
//
// Extension to jsbn which adds facilities for asynchronous RSA key generation
// Primarily created to avoid execution timeout on mobile devices
//
// http://www-cs-students.stanford.edu/~tjw/jsbn/
//
// ---

(function(){

// Generate a new random private key B bits long, using public expt E
var RSAGenerateAsync = function (B, E, callback) {
    //var rng = new SeededRandom();
    var rng = new SecureRandom();
    var qs = B >> 1;
    this.e = parseInt(E, 16);
    var ee = new BigInteger(E, 16);
    var rsa = this;
    // These functions have non-descript names because they were originally for(;;) loops.
    // I don't know about cryptography to give them better names than loop1-4.
    var loop1 = function() {
        var loop4 = function() {
            if (rsa.p.compareTo(rsa.q) <= 0) {
                var t = rsa.p;
                rsa.p = rsa.q;
                rsa.q = t;
            }
            var p1 = rsa.p.subtract(BigInteger.ONE);
            var q1 = rsa.q.subtract(BigInteger.ONE);
            var phi = p1.multiply(q1);
            if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
                rsa.n = rsa.p.multiply(rsa.q);
                rsa.d = ee.modInverse(phi);
                rsa.dmp1 = rsa.d.mod(p1);
                rsa.dmq1 = rsa.d.mod(q1);
                rsa.coeff = rsa.q.modInverse(rsa.p);
                setTimeout(function(){callback()},0); // escape
            } else {
                setTimeout(loop1,0);
            }
        };
        var loop3 = function() {
            rsa.q = nbi();
            rsa.q.fromNumberAsync(qs, 1, rng, function(){
                rsa.q.subtract(BigInteger.ONE).gcda(ee, function(r){
                    if (r.compareTo(BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
                        setTimeout(loop4,0);
                    } else {
                        setTimeout(loop3,0);
                    }
                });
            });
        };
        var loop2 = function() {
            rsa.p = nbi();
            rsa.p.fromNumberAsync(B - qs, 1, rng, function(){
                rsa.p.subtract(BigInteger.ONE).gcda(ee, function(r){
                    if (r.compareTo(BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
                        setTimeout(loop3,0);
                    } else {
                        setTimeout(loop2,0);
                    }
                });
            });
        };
        setTimeout(loop2,0);
    };
    setTimeout(loop1,0);
};
RSAKey.prototype.generateAsync = RSAGenerateAsync;

// Public API method
var bnGCDAsync = function (a, callback) {
    var x = (this.s < 0) ? this.negate() : this.clone();
    var y = (a.s < 0) ? a.negate() : a.clone();
    if (x.compareTo(y) < 0) {
        var t = x;
        x = y;
        y = t;
    }
    var i = x.getLowestSetBit(),
        g = y.getLowestSetBit();
    if (g < 0) {
        callback(x);
        return;
    }
    if (i < g) g = i;
    if (g > 0) {
        x.rShiftTo(g, x);
        y.rShiftTo(g, y);
    }
    // Workhorse of the algorithm, gets called 200 - 800 times per 512 bit keygen.
    var gcda1 = function() {
        if ((i = x.getLowestSetBit()) > 0){ x.rShiftTo(i, x); }
        if ((i = y.getLowestSetBit()) > 0){ y.rShiftTo(i, y); }
        if (x.compareTo(y) >= 0) {
            x.subTo(y, x);
            x.rShiftTo(1, x);
        } else {
            y.subTo(x, y);
            y.rShiftTo(1, y);
        }
        if(!(x.signum() > 0)) {
            if (g > 0) y.lShiftTo(g, y);
            setTimeout(function(){callback(y)},0); // escape
        } else {
            setTimeout(gcda1,0);
        }
    };
    setTimeout(gcda1,10);
};
BigInteger.prototype.gcda = bnGCDAsync;

// (protected) alternate constructor
var bnpFromNumberAsync = function (a,b,c,callback) {
  if("number" == typeof b) {
    if(a < 2) {
        this.fromInt(1);
    } else {
      this.fromNumber(a,c);
      if(!this.testBit(a-1)){
        this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this);
      }
      if(this.isEven()) {
        this.dAddOffset(1,0);
      }
      var bnp = this;
      var bnpfn1 = function(){
        bnp.dAddOffset(2,0);
        if(bnp.bitLength() > a) bnp.subTo(BigInteger.ONE.shiftLeft(a-1),bnp);
        if(bnp.isProbablePrime(b)) {
            setTimeout(function(){callback()},0); // escape
        } else {
            setTimeout(bnpfn1,0);
        }
      };
      setTimeout(bnpfn1,0);
    }
  } else {
    var x = new Array(), t = a&7;
    x.length = (a>>3)+1;
    b.nextBytes(x);
    if(t > 0) x[0] &= ((1<<t)-1); else x[0] = 0;
    this.fromString(x,256);
  }
};
BigInteger.prototype.fromNumberAsync = bnpFromNumberAsync;

})();var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad="=";

function hex2b64(h) {
  var i;
  var c;
  var ret = "";
  for(i = 0; i+3 <= h.length; i+=3) {
    c = parseInt(h.substring(i,i+3),16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if(i+1 == h.length) {
    c = parseInt(h.substring(i,i+1),16);
    ret += b64map.charAt(c << 2);
  }
  else if(i+2 == h.length) {
    c = parseInt(h.substring(i,i+2),16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  while((ret.length & 3) > 0) ret += b64pad;
  return ret;
}

// convert a base64 string to hex
function b64tohex(s) {
  var ret = ""
  var i;
  var k = 0; // b64 state, 0-3
  var slop;
  for(i = 0; i < s.length; ++i) {
    if(s.charAt(i) == b64pad) break;
    v = b64map.indexOf(s.charAt(i));
    if(v < 0) continue;
    if(k == 0) {
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 1;
    }
    else if(k == 1) {
      ret += int2char((slop << 2) | (v >> 4));
      slop = v & 0xf;
      k = 2;
    }
    else if(k == 2) {
      ret += int2char(slop);
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 3;
    }
    else {
      ret += int2char((slop << 2) | (v >> 4));
      ret += int2char(v & 0xf);
      k = 0;
    }
  }
  if(k == 1)
    ret += int2char(slop << 2);
  return ret;
}

// convert a base64 string to a byte/number array
function b64toBA(s) {
  //piggyback on b64tohex for now, optimize later
  var h = b64tohex(s);
  var i;
  var a = new Array();
  for(i = 0; 2*i < h.length; ++i) {
    a[i] = parseInt(h.substring(2*i,2*i+2),16);
  }
  return a;
}
/*! asn1-1.0.2.js (c) 2013 Kenji Urushima | kjur.github.com/jsrsasign/license
 */

var JSX = JSX || {};
JSX.env = JSX.env || {};

var L = JSX, OP = Object.prototype, FUNCTION_TOSTRING = '[object Function]',ADD = ["toString", "valueOf"];

JSX.env.parseUA = function(agent) {

    var numberify = function(s) {
        var c = 0;
        return parseFloat(s.replace(/\./g, function() {
            return (c++ == 1) ? '' : '.';
        }));
    },

    nav = navigator,
    o = {
        ie: 0,
        opera: 0,
        gecko: 0,
        webkit: 0,
        chrome: 0,
        mobile: null,
        air: 0,
        ipad: 0,
        iphone: 0,
        ipod: 0,
        ios: null,
        android: 0,
        webos: 0,
        caja: nav && nav.cajaVersion,
        secure: false,
        os: null

    },

    ua = agent || (navigator && navigator.userAgent),
    loc = window && window.location,
    href = loc && loc.href,
    m;

    o.secure = href && (href.toLowerCase().indexOf("https") === 0);

    if (ua) {

        if ((/windows|win32/i).test(ua)) {
            o.os = 'windows';
        } else if ((/macintosh/i).test(ua)) {
            o.os = 'macintosh';
        } else if ((/rhino/i).test(ua)) {
            o.os = 'rhino';
        }
        if ((/KHTML/).test(ua)) {
            o.webkit = 1;
        }
        m = ua.match(/AppleWebKit\/([^\s]*)/);
        if (m && m[1]) {
            o.webkit = numberify(m[1]);
            if (/ Mobile\//.test(ua)) {
                o.mobile = 'Apple'; // iPhone or iPod Touch
                m = ua.match(/OS ([^\s]*)/);
                if (m && m[1]) {
                    m = numberify(m[1].replace('_', '.'));
                }
                o.ios = m;
                o.ipad = o.ipod = o.iphone = 0;
                m = ua.match(/iPad|iPod|iPhone/);
                if (m && m[0]) {
                    o[m[0].toLowerCase()] = o.ios;
                }
            } else {
                m = ua.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);
                if (m) {
                    o.mobile = m[0];
                }
                if (/webOS/.test(ua)) {
                    o.mobile = 'WebOS';
                    m = ua.match(/webOS\/([^\s]*);/);
                    if (m && m[1]) {
                        o.webos = numberify(m[1]);
                    }
                }
                if (/ Android/.test(ua)) {
                    o.mobile = 'Android';
                    m = ua.match(/Android ([^\s]*);/);
                    if (m && m[1]) {
                        o.android = numberify(m[1]);
                    }
                }
            }
            m = ua.match(/Chrome\/([^\s]*)/);
            if (m && m[1]) {
                o.chrome = numberify(m[1]); // Chrome
            } else {
                m = ua.match(/AdobeAIR\/([^\s]*)/);
                if (m) {
                    o.air = m[0]; // Adobe AIR 1.0 or better
                }
            }
        }
        if (!o.webkit) {
            m = ua.match(/Opera[\s\/]([^\s]*)/);
            if (m && m[1]) {
                o.opera = numberify(m[1]);
                m = ua.match(/Version\/([^\s]*)/);
                if (m && m[1]) {
                    o.opera = numberify(m[1]); // opera 10+
                }
                m = ua.match(/Opera Mini[^;]*/);
                if (m) {
                    o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316
                }
            } else { // not opera or webkit
                m = ua.match(/MSIE\s([^;]*)/);
                if (m && m[1]) {
                    o.ie = numberify(m[1]);
                } else { // not opera, webkit, or ie
                    m = ua.match(/Gecko\/([^\s]*)/);
                    if (m) {
                        o.gecko = 1; // Gecko detected, look for revision
                        m = ua.match(/rv:([^\s\)]*)/);
                        if (m && m[1]) {
                            o.gecko = numberify(m[1]);
                        }
                    }
                }
            }
        }
    }
    return o;
};

JSX.env.ua = JSX.env.parseUA();

JSX.isFunction = function(o) {
    return (typeof o === 'function') || OP.toString.apply(o) === FUNCTION_TOSTRING;
};

JSX._IEEnumFix = (JSX.env.ua.ie) ? function(r, s) {
    var i, fname, f;
    for (i=0;i<ADD.length;i=i+1) {

        fname = ADD[i];
        f = s[fname];

        if (L.isFunction(f) && f!=OP[fname]) {
            r[fname]=f;
        }
    }
} : function(){};

JSX.extend = function(subc, superc, overrides) {
    if (!superc||!subc) {
        throw new Error("extend failed, please check that " +
                        "all dependencies are included.");
    }
    var F = function() {}, i;
    F.prototype=superc.prototype;
    subc.prototype=new F();
    subc.prototype.constructor=subc;
    subc.superclass=superc.prototype;
    if (superc.prototype.constructor == OP.constructor) {
        superc.prototype.constructor=superc;
    }

    if (overrides) {
        for (i in overrides) {
            if (L.hasOwnProperty(overrides, i)) {
                subc.prototype[i]=overrides[i];
            }
        }

        L._IEEnumFix(subc.prototype, overrides);
    }
};

/*
 * asn1.js - ASN.1 DER encoder classes
 *
 * Copyright (c) 2013 Kenji Urushima (kenji.urushima@gmail.com)
 *
 * This software is licensed under the terms of the MIT License.
 * http://kjur.github.com/jsrsasign/license
 *
 * The above copyright and license notice shall be
 * included in all copies or substantial portions of the Software.
 */

/**
 * @fileOverview
 * @name asn1-1.0.js
 * @author Kenji Urushima kenji.urushima@gmail.com
 * @version 1.0.2 (2013-May-30)
 * @since 2.1
 * license <a href="http://kjur.github.io/jsrsasign/license/">MIT License</a>
 */

/**
 * kjur's class library name space
 * <p>
 * This name space provides following name spaces:
 * <ul>
 * <li>{@link KJUR.asn1} - ASN.1 primitive hexadecimal encoder</li>
 * <li>{@link KJUR.asn1.x509} - ASN.1 structure for X.509 certificate and CRL</li>
 * <li>{@link KJUR.crypto} - Java Cryptographic Extension(JCE) style MessageDigest/Signature
 * class and utilities</li>
 * </ul>
 * </p>
 * NOTE: Please ignore method summary and document of this namespace. This caused by a bug of jsdoc2.
  * @name KJUR
 * @namespace kjur's class library name space
 */
if (typeof KJUR == "undefined" || !KJUR) KJUR = {};

/**
 * kjur's ASN.1 class library name space
 * <p>
 * This is ITU-T X.690 ASN.1 DER encoder class library and
 * class structure and methods is very similar to
 * org.bouncycastle.asn1 package of
 * well known BouncyCaslte Cryptography Library.
 *
 * <h4>PROVIDING ASN.1 PRIMITIVES</h4>
 * Here are ASN.1 DER primitive classes.
 * <ul>
 * <li>{@link KJUR.asn1.DERBoolean}</li>
 * <li>{@link KJUR.asn1.DERInteger}</li>
 * <li>{@link KJUR.asn1.DERBitString}</li>
 * <li>{@link KJUR.asn1.DEROctetString}</li>
 * <li>{@link KJUR.asn1.DERNull}</li>
 * <li>{@link KJUR.asn1.DERObjectIdentifier}</li>
 * <li>{@link KJUR.asn1.DERUTF8String}</li>
 * <li>{@link KJUR.asn1.DERNumericString}</li>
 * <li>{@link KJUR.asn1.DERPrintableString}</li>
 * <li>{@link KJUR.asn1.DERTeletexString}</li>
 * <li>{@link KJUR.asn1.DERIA5String}</li>
 * <li>{@link KJUR.asn1.DERUTCTime}</li>
 * <li>{@link KJUR.asn1.DERGeneralizedTime}</li>
 * <li>{@link KJUR.asn1.DERSequence}</li>
 * <li>{@link KJUR.asn1.DERSet}</li>
 * </ul>
 *
 * <h4>OTHER ASN.1 CLASSES</h4>
 * <ul>
 * <li>{@link KJUR.asn1.ASN1Object}</li>
 * <li>{@link KJUR.asn1.DERAbstractString}</li>
 * <li>{@link KJUR.asn1.DERAbstractTime}</li>
 * <li>{@link KJUR.asn1.DERAbstractStructured}</li>
 * <li>{@link KJUR.asn1.DERTaggedObject}</li>
 * </ul>
 * </p>
 * NOTE: Please ignore method summary and document of this namespace. This caused by a bug of jsdoc2.
 * @name KJUR.asn1
 * @namespace
 */
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) KJUR.asn1 = {};

/**
 * ASN1 utilities class
 * @name KJUR.asn1.ASN1Util
 * @classs ASN1 utilities class
 * @since asn1 1.0.2
 */
KJUR.asn1.ASN1Util = new function() {
    this.integerToByteHex = function(i) {
    var h = i.toString(16);
    if ((h.length % 2) == 1) h = '0' + h;
    return h;
    };
    this.bigIntToMinTwosComplementsHex = function(bigIntegerValue) {
    var h = bigIntegerValue.toString(16);
    if (h.substr(0, 1) != '-') {
        if (h.length % 2 == 1) {
        h = '0' + h;
        } else {
        if (! h.match(/^[0-7]/)) {
            h = '00' + h;
        }
        }
    } else {
        var hPos = h.substr(1);
        var xorLen = hPos.length;
        if (xorLen % 2 == 1) {
        xorLen += 1;
        } else {
        if (! h.match(/^[0-7]/)) {
            xorLen += 2;
        }
        }
        var hMask = '';
        for (var i = 0; i < xorLen; i++) {
        hMask += 'f';
        }
        var biMask = new BigInteger(hMask, 16);
        var biNeg = biMask.xor(bigIntegerValue).add(BigInteger.ONE);
        h = biNeg.toString(16).replace(/^-/, '');
    }
    return h;
    };
    /**
     * get PEM string from hexadecimal data and header string
     * @name getPEMStringFromHex
     * @memberOf KJUR.asn1.ASN1Util
     * @function
     * @param {String} dataHex hexadecimal string of PEM body
     * @param {String} pemHeader PEM header string (ex. 'RSA PRIVATE KEY')
     * @return {String} PEM formatted string of input data
     * @description
     * @example
     * var pem  = KJUR.asn1.ASN1Util.getPEMStringFromHex('616161', 'RSA PRIVATE KEY');
     * // value of pem will be:
     * -----BEGIN PRIVATE KEY-----
     * YWFh
     * -----END PRIVATE KEY-----
     */
    this.getPEMStringFromHex = function(dataHex, pemHeader) {
    var dataWA = sr_$.CryptoJS.enc.Hex.parse(dataHex);
    var dataB64 = sr_$.CryptoJS.enc.Base64.stringify(dataWA);
    var pemBody = dataB64.replace(/(.{64})/g, "$1\r\n");
        pemBody = pemBody.replace(/\r\n$/, '');
    return "-----BEGIN " + pemHeader + "-----\r\n" +
               pemBody +
               "\r\n-----END " + pemHeader + "-----\r\n";
    };
};

// ********************************************************************
//  Abstract ASN.1 Classes
// ********************************************************************

// ********************************************************************

/**
 * base class for ASN.1 DER encoder object
 * @name KJUR.asn1.ASN1Object
 * @class base class for ASN.1 DER encoder object
 * @property {Boolean} isModified flag whether internal data was changed
 * @property {String} hTLV hexadecimal string of ASN.1 TLV
 * @property {String} hT hexadecimal string of ASN.1 TLV tag(T)
 * @property {String} hL hexadecimal string of ASN.1 TLV length(L)
 * @property {String} hV hexadecimal string of ASN.1 TLV value(V)
 * @description
 */
KJUR.asn1.ASN1Object = function() {
    var isModified = true;
    var hTLV = null;
    var hT = '00'
    var hL = '00';
    var hV = '';

    /**
     * get hexadecimal ASN.1 TLV length(L) bytes from TLV value(V)
     * @name getLengthHexFromValue
     * @memberOf KJUR.asn1.ASN1Object
     * @function
     * @return {String} hexadecimal string of ASN.1 TLV length(L)
     */
    this.getLengthHexFromValue = function() {
    if (typeof this.hV == "undefined" || this.hV == null) {
        throw "this.hV is null or undefined.";
    }
    if (this.hV.length % 2 == 1) {
        throw "value hex must be even length: n=" + hV.length + ",v=" + this.hV;
    }
    var n = this.hV.length / 2;
    var hN = n.toString(16);
    if (hN.length % 2 == 1) {
        hN = "0" + hN;
    }
    if (n < 128) {
        return hN;
    } else {
        var hNlen = hN.length / 2;
        if (hNlen > 15) {
        throw "ASN.1 length too long to represent by 8x: n = " + n.toString(16);
        }
        var head = 128 + hNlen;
        return head.toString(16) + hN;
    }
    };

    /**
     * get hexadecimal string of ASN.1 TLV bytes
     * @name getEncodedHex
     * @memberOf KJUR.asn1.ASN1Object
     * @function
     * @return {String} hexadecimal string of ASN.1 TLV
     */
    this.getEncodedHex = function() {
    if (this.hTLV == null || this.isModified) {
        this.hV = this.getFreshValueHex();
        this.hL = this.getLengthHexFromValue();
        this.hTLV = this.hT + this.hL + this.hV;
        this.isModified = false;
        //console.error("first time: " + this.hTLV);
    }
    return this.hTLV;
    };

    /**
     * get hexadecimal string of ASN.1 TLV value(V) bytes
     * @name getValueHex
     * @memberOf KJUR.asn1.ASN1Object
     * @function
     * @return {String} hexadecimal string of ASN.1 TLV value(V) bytes
     */
    this.getValueHex = function() {
    this.getEncodedHex();
    return this.hV;
    }

    this.getFreshValueHex = function() {
    return '';
    };
};

// == BEGIN DERAbstractString ================================================
/**
 * base class for ASN.1 DER string classes
 * @name KJUR.asn1.DERAbstractString
 * @class base class for ASN.1 DER string classes
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @property {String} s internal string of value
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>str - specify initial ASN.1 value(V) by a string</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERAbstractString = function(params) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    var s = null;
    var hV = null;

    /**
     * get string value of this string object
     * @name getString
     * @memberOf KJUR.asn1.DERAbstractString
     * @function
     * @return {String} string value of this string object
     */
    this.getString = function() {
    return this.s;
    };

    /**
     * set value by a string
     * @name setString
     * @memberOf KJUR.asn1.DERAbstractString
     * @function
     * @param {String} newS value by a string to set
     */
    this.setString = function(newS) {
    this.hTLV = null;
    this.isModified = true;
    this.s = newS;
    this.hV = stohex(this.s);
    };

    /**
     * set value by a hexadecimal string
     * @name setStringHex
     * @memberOf KJUR.asn1.DERAbstractString
     * @function
     * @param {String} newHexString value by a hexadecimal string to set
     */
    this.setStringHex = function(newHexString) {
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = newHexString;
    };

    this.getFreshValueHex = function() {
    return this.hV;
    };

    if (typeof params != "undefined") {
    if (typeof params['str'] != "undefined") {
        this.setString(params['str']);
    } else if (typeof params['hex'] != "undefined") {
        this.setStringHex(params['hex']);
    }
    }
};
JSX.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
// == END   DERAbstractString ================================================

// == BEGIN DERAbstractTime ==================================================
/**
 * base class for ASN.1 DER Generalized/UTCTime class
 * @name KJUR.asn1.DERAbstractTime
 * @class base class for ASN.1 DER Generalized/UTCTime class
 * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
 * @extends KJUR.asn1.ASN1Object
 * @description
 * @see KJUR.asn1.ASN1Object - superclass
 */
KJUR.asn1.DERAbstractTime = function(params) {
    KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
    var s = null;
    var date = null;

    // --- PRIVATE METHODS --------------------
    this.localDateToUTC = function(d) {
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var utcDate = new Date(utc);
    return utcDate;
    };

    this.formatDate = function(dateObject, type) {
    var pad = this.zeroPadding;
    var d = this.localDateToUTC(dateObject);
    var year = String(d.getFullYear());
    if (type == 'utc') year = year.substr(2, 2);
    var month = pad(String(d.getMonth() + 1), 2);
    var day = pad(String(d.getDate()), 2);
    var hour = pad(String(d.getHours()), 2);
    var min = pad(String(d.getMinutes()), 2);
    var sec = pad(String(d.getSeconds()), 2);
    return year + month + day + hour + min + sec + 'Z';
    };

    this.zeroPadding = function(s, len) {
    if (s.length >= len) return s;
    return new Array(len - s.length + 1).join('0') + s;
    };

    // --- PUBLIC METHODS --------------------
    /**
     * get string value of this string object
     * @name getString
     * @memberOf KJUR.asn1.DERAbstractTime
     * @function
     * @return {String} string value of this time object
     */
    this.getString = function() {
    return this.s;
    };

    /**
     * set value by a string
     * @name setString
     * @memberOf KJUR.asn1.DERAbstractTime
     * @function
     * @param {String} newS value by a string to set such like "130430235959Z"
     */
    this.setString = function(newS) {
    this.hTLV = null;
    this.isModified = true;
    this.s = newS;
    this.hV = stohex(this.s);
    };

    /**
     * set value by a Date object
     * @name setByDateValue
     * @memberOf KJUR.asn1.DERAbstractTime
     * @function
     * @param {Integer} year year of date (ex. 2013)
     * @param {Integer} month month of date between 1 and 12 (ex. 12)
     * @param {Integer} day day of month
     * @param {Integer} hour hours of date
     * @param {Integer} min minutes of date
     * @param {Integer} sec seconds of date
     */
    this.setByDateValue = function(year, month, day, hour, min, sec) {
    var dateObject = new Date(Date.UTC(year, month - 1, day, hour, min, sec, 0));
    this.setByDate(dateObject);
    };

    this.getFreshValueHex = function() {
    return this.hV;
    };
};
JSX.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
// == END   DERAbstractTime ==================================================

// == BEGIN DERAbstractStructured ============================================
/**
 * base class for ASN.1 DER structured class
 * @name KJUR.asn1.DERAbstractStructured
 * @class base class for ASN.1 DER structured class
 * @property {Array} asn1Array internal array of ASN1Object
 * @extends KJUR.asn1.ASN1Object
 * @description
 * @see KJUR.asn1.ASN1Object - superclass
 */
KJUR.asn1.DERAbstractStructured = function(params) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    var asn1Array = null;

    /**
     * set value by array of ASN1Object
     * @name setByASN1ObjectArray
     * @memberOf KJUR.asn1.DERAbstractStructured
     * @function
     * @param {array} asn1ObjectArray array of ASN1Object to set
     */
    this.setByASN1ObjectArray = function(asn1ObjectArray) {
    this.hTLV = null;
    this.isModified = true;
    this.asn1Array = asn1ObjectArray;
    };

    /**
     * append an ASN1Object to internal array
     * @name appendASN1Object
     * @memberOf KJUR.asn1.DERAbstractStructured
     * @function
     * @param {ASN1Object} asn1Object to add
     */
    this.appendASN1Object = function(asn1Object) {
    this.hTLV = null;
    this.isModified = true;
    this.asn1Array.push(asn1Object);
    };

    this.asn1Array = new Array();
    if (typeof params != "undefined") {
    if (typeof params['array'] != "undefined") {
        this.asn1Array = params['array'];
    }
    }
};
JSX.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);


// ********************************************************************
//  ASN.1 Object Classes
// ********************************************************************

// ********************************************************************
/**
 * class for ASN.1 DER Boolean
 * @name KJUR.asn1.DERBoolean
 * @class class for ASN.1 DER Boolean
 * @extends KJUR.asn1.ASN1Object
 * @description
 * @see KJUR.asn1.ASN1Object - superclass
 */
KJUR.asn1.DERBoolean = function() {
    KJUR.asn1.DERBoolean.superclass.constructor.call(this);
    this.hT = "01";
    this.hTLV = "0101ff";
};
JSX.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);

// ********************************************************************
/**
 * class for ASN.1 DER Integer
 * @name KJUR.asn1.DERInteger
 * @class class for ASN.1 DER Integer
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>int - specify initial ASN.1 value(V) by integer value</li>
 * <li>bigint - specify initial ASN.1 value(V) by BigInteger object</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERInteger = function(params) {
    KJUR.asn1.DERInteger.superclass.constructor.call(this);
    this.hT = "02";

    /**
     * set value by Tom Wu's BigInteger object
     * @name setByBigInteger
     * @memberOf KJUR.asn1.DERInteger
     * @function
     * @param {BigInteger} bigIntegerValue to set
     */
    this.setByBigInteger = function(bigIntegerValue) {
    this.hTLV = null;
    this.isModified = true;
    this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
    };

    /**
     * set value by integer value
     * @name setByInteger
     * @memberOf KJUR.asn1.DERInteger
     * @function
     * @param {Integer} integer value to set
     */
    this.setByInteger = function(intValue) {
    var bi = new BigInteger(String(intValue), 10);
    this.setByBigInteger(bi);
    };

    /**
     * set value by integer value
     * @name setValueHex
     * @memberOf KJUR.asn1.DERInteger
     * @function
     * @param {String} hexadecimal string of integer value
     * @description
     * <br/>
     * NOTE: Value shall be represented by minimum octet length of
     * two's complement representation.
     */
    this.setValueHex = function(newHexString) {
    this.hV = newHexString;
    };

    this.getFreshValueHex = function() {
    return this.hV;
    };

    if (typeof params != "undefined") {
    if (typeof params['bigint'] != "undefined") {
        this.setByBigInteger(params['bigint']);
    } else if (typeof params['int'] != "undefined") {
        this.setByInteger(params['int']);
    } else if (typeof params['hex'] != "undefined") {
        this.setValueHex(params['hex']);
    }
    }
};
JSX.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);

// ********************************************************************
/**
 * class for ASN.1 DER encoded BitString primitive
 * @name KJUR.asn1.DERBitString
 * @class class for ASN.1 DER encoded BitString primitive
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>bin - specify binary string (ex. '10111')</li>
 * <li>array - specify array of boolean (ex. [true,false,true,true])</li>
 * <li>hex - specify hexadecimal string of ASN.1 value(V) including unused bits</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERBitString = function(params) {
    KJUR.asn1.DERBitString.superclass.constructor.call(this);
    this.hT = "03";

    /**
     * set ASN.1 value(V) by a hexadecimal string including unused bits
     * @name setHexValueIncludingUnusedBits
     * @memberOf KJUR.asn1.DERBitString
     * @function
     * @param {String} newHexStringIncludingUnusedBits
     */
    this.setHexValueIncludingUnusedBits = function(newHexStringIncludingUnusedBits) {
    this.hTLV = null;
    this.isModified = true;
    this.hV = newHexStringIncludingUnusedBits;
    };

    /**
     * set ASN.1 value(V) by unused bit and hexadecimal string of value
     * @name setUnusedBitsAndHexValue
     * @memberOf KJUR.asn1.DERBitString
     * @function
     * @param {Integer} unusedBits
     * @param {String} hValue
     */
    this.setUnusedBitsAndHexValue = function(unusedBits, hValue) {
    if (unusedBits < 0 || 7 < unusedBits) {
        throw "unused bits shall be from 0 to 7: u = " + unusedBits;
    }
    var hUnusedBits = "0" + unusedBits;
    this.hTLV = null;
    this.isModified = true;
    this.hV = hUnusedBits + hValue;
    };

    /**
     * set ASN.1 DER BitString by binary string
     * @name setByBinaryString
     * @memberOf KJUR.asn1.DERBitString
     * @function
     * @param {String} binaryString binary value string (i.e. '10111')
     * @description
     * Its unused bits will be calculated automatically by length of
     * 'binaryValue'. <br/>
     * NOTE: Trailing zeros '0' will be ignored.
     */
    this.setByBinaryString = function(binaryString) {
    binaryString = binaryString.replace(/0+$/, '');
    var unusedBits = 8 - binaryString.length % 8;
    if (unusedBits == 8) unusedBits = 0;
    for (var i = 0; i <= unusedBits; i++) {
        binaryString += '0';
    }
    var h = '';
    for (var i = 0; i < binaryString.length - 1; i += 8) {
        var b = binaryString.substr(i, 8);
        var x = parseInt(b, 2).toString(16);
        if (x.length == 1) x = '0' + x;
        h += x;
    }
    this.hTLV = null;
    this.isModified = true;
    this.hV = '0' + unusedBits + h;
    };

    /**
     * set ASN.1 TLV value(V) by an array of boolean
     * @name setByBooleanArray
     * @memberOf KJUR.asn1.DERBitString
     * @function
     * @param {array} booleanArray array of boolean (ex. [true, false, true])
     * @description
     * NOTE: Trailing falses will be ignored.
     */
    this.setByBooleanArray = function(booleanArray) {
    var s = '';
    for (var i = 0; i < booleanArray.length; i++) {
        if (booleanArray[i] == true) {
        s += '1';
        } else {
        s += '0';
        }
    }
    this.setByBinaryString(s);
    };

    /**
     * generate an array of false with specified length
     * @name newFalseArray
     * @memberOf KJUR.asn1.DERBitString
     * @function
     * @param {Integer} nLength length of array to generate
     * @return {array} array of boolean faluse
     * @description
     * This static method may be useful to initialize boolean array.
     */
    this.newFalseArray = function(nLength) {
    var a = new Array(nLength);
    for (var i = 0; i < nLength; i++) {
        a[i] = false;
    }
    return a;
    };

    this.getFreshValueHex = function() {
    return this.hV;
    };

    if (typeof params != "undefined") {
    if (typeof params['hex'] != "undefined") {
        this.setHexValueIncludingUnusedBits(params['hex']);
    } else if (typeof params['bin'] != "undefined") {
        this.setByBinaryString(params['bin']);
    } else if (typeof params['array'] != "undefined") {
        this.setByBooleanArray(params['array']);
    }
    }
};
JSX.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);

// ********************************************************************
/**
 * class for ASN.1 DER OctetString
 * @name KJUR.asn1.DEROctetString
 * @class class for ASN.1 DER OctetString
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DEROctetString = function(params) {
    KJUR.asn1.DEROctetString.superclass.constructor.call(this, params);
    this.hT = "04";
};
JSX.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);

// ********************************************************************
/**
 * class for ASN.1 DER Null
 * @name KJUR.asn1.DERNull
 * @class class for ASN.1 DER Null
 * @extends KJUR.asn1.ASN1Object
 * @description
 * @see KJUR.asn1.ASN1Object - superclass
 */
KJUR.asn1.DERNull = function() {
    KJUR.asn1.DERNull.superclass.constructor.call(this);
    this.hT = "05";
    this.hTLV = "0500";
};
JSX.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);

// ********************************************************************
/**
 * class for ASN.1 DER ObjectIdentifier
 * @name KJUR.asn1.DERObjectIdentifier
 * @class class for ASN.1 DER ObjectIdentifier
 * @param {Array} params associative array of parameters (ex. {'oid': '2.5.4.5'})
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>oid - specify initial ASN.1 value(V) by a oid string (ex. 2.5.4.13)</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERObjectIdentifier = function(params) {
    var itox = function(i) {
    var h = i.toString(16);
    if (h.length == 1) h = '0' + h;
    return h;
    };
    var roidtox = function(roid) {
    var h = '';
    var bi = new BigInteger(roid, 10);
    var b = bi.toString(2);
    var padLen = 7 - b.length % 7;
    if (padLen == 7) padLen = 0;
    var bPad = '';
    for (var i = 0; i < padLen; i++) bPad += '0';
    b = bPad + b;
    for (var i = 0; i < b.length - 1; i += 7) {
        var b8 = b.substr(i, 7);
        if (i != b.length - 7) b8 = '1' + b8;
        h += itox(parseInt(b8, 2));
    }
    return h;
    }

    KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
    this.hT = "06";

    /**
     * set value by a hexadecimal string
     * @name setValueHex
     * @memberOf KJUR.asn1.DERObjectIdentifier
     * @function
     * @param {String} newHexString hexadecimal value of OID bytes
     */
    this.setValueHex = function(newHexString) {
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = newHexString;
    };

    /**
     * set value by a OID string
     * @name setValueOidString
     * @memberOf KJUR.asn1.DERObjectIdentifier
     * @function
     * @param {String} oidString OID string (ex. 2.5.4.13)
     */
    this.setValueOidString = function(oidString) {
    if (! oidString.match(/^[0-9.]+$/)) {
        throw "malformed oid string: " + oidString;
    }
    var h = '';
    var a = oidString.split('.');
    var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
    h += itox(i0);
    a.splice(0, 2);
    for (var i = 0; i < a.length; i++) {
        h += roidtox(a[i]);
    }
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = h;
    };

    /**
     * set value by a OID name
     * @name setValueName
     * @memberOf KJUR.asn1.DERObjectIdentifier
     * @function
     * @param {String} oidName OID name (ex. 'serverAuth')
     * @since 1.0.1
     * @description
     * OID name shall be defined in 'KJUR.asn1.x509.OID.name2oidList'.
     * Otherwise raise error.
     */
    this.setValueName = function(oidName) {
    if (typeof KJUR.asn1.x509.OID.name2oidList[oidName] != "undefined") {
        var oid = KJUR.asn1.x509.OID.name2oidList[oidName];
        this.setValueOidString(oid);
    } else {
        throw "DERObjectIdentifier oidName undefined: " + oidName;
    }
    };

    this.getFreshValueHex = function() {
    return this.hV;
    };

    if (typeof params != "undefined") {
    if (typeof params['oid'] != "undefined") {
        this.setValueOidString(params['oid']);
    } else if (typeof params['hex'] != "undefined") {
        this.setValueHex(params['hex']);
    } else if (typeof params['name'] != "undefined") {
        this.setValueName(params['name']);
    }
    }
};
JSX.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);

// ********************************************************************
/**
 * class for ASN.1 DER UTF8String
 * @name KJUR.asn1.DERUTF8String
 * @class class for ASN.1 DER UTF8String
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERUTF8String = function(params) {
    KJUR.asn1.DERUTF8String.superclass.constructor.call(this, params);
    this.hT = "0c";
};
JSX.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);

// ********************************************************************
/**
 * class for ASN.1 DER NumericString
 * @name KJUR.asn1.DERNumericString
 * @class class for ASN.1 DER NumericString
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERNumericString = function(params) {
    KJUR.asn1.DERNumericString.superclass.constructor.call(this, params);
    this.hT = "12";
};
JSX.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);

// ********************************************************************
/**
 * class for ASN.1 DER PrintableString
 * @name KJUR.asn1.DERPrintableString
 * @class class for ASN.1 DER PrintableString
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERPrintableString = function(params) {
    KJUR.asn1.DERPrintableString.superclass.constructor.call(this, params);
    this.hT = "13";
};
JSX.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);

// ********************************************************************
/**
 * class for ASN.1 DER TeletexString
 * @name KJUR.asn1.DERTeletexString
 * @class class for ASN.1 DER TeletexString
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERTeletexString = function(params) {
    KJUR.asn1.DERTeletexString.superclass.constructor.call(this, params);
    this.hT = "14";
};
JSX.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);

// ********************************************************************
/**
 * class for ASN.1 DER IA5String
 * @name KJUR.asn1.DERIA5String
 * @class class for ASN.1 DER IA5String
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERIA5String = function(params) {
    KJUR.asn1.DERIA5String.superclass.constructor.call(this, params);
    this.hT = "16";
};
JSX.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);

// ********************************************************************
/**
 * class for ASN.1 DER UTCTime
 * @name KJUR.asn1.DERUTCTime
 * @class class for ASN.1 DER UTCTime
 * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
 * @extends KJUR.asn1.DERAbstractTime
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>str - specify initial ASN.1 value(V) by a string (ex.'130430235959Z')</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * <li>date - specify Date object.</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 * <h4>EXAMPLES</h4>
 * @example
 * var d1 = new KJUR.asn1.DERUTCTime();
 * d1.setString('130430125959Z');
 *
 * var d2 = new KJUR.asn1.DERUTCTime({'str': '130430125959Z'});
 *
 * var d3 = new KJUR.asn1.DERUTCTime({'date': new Date(Date.UTC(2015, 0, 31, 0, 0, 0, 0))});
 */
KJUR.asn1.DERUTCTime = function(params) {
    KJUR.asn1.DERUTCTime.superclass.constructor.call(this, params);
    this.hT = "17";

    /**
     * set value by a Date object
     * @name setByDate
     * @memberOf KJUR.asn1.DERUTCTime
     * @function
     * @param {Date} dateObject Date object to set ASN.1 value(V)
     */
    this.setByDate = function(dateObject) {
    this.hTLV = null;
    this.isModified = true;
    this.date = dateObject;
    this.s = this.formatDate(this.date, 'utc');
    this.hV = stohex(this.s);
    };

    if (typeof params != "undefined") {
    if (typeof params['str'] != "undefined") {
        this.setString(params['str']);
    } else if (typeof params['hex'] != "undefined") {
        this.setStringHex(params['hex']);
    } else if (typeof params['date'] != "undefined") {
        this.setByDate(params['date']);
    }
    }
};
JSX.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);

// ********************************************************************
/**
 * class for ASN.1 DER GeneralizedTime
 * @name KJUR.asn1.DERGeneralizedTime
 * @class class for ASN.1 DER GeneralizedTime
 * @param {Array} params associative array of parameters (ex. {'str': '20130430235959Z'})
 * @extends KJUR.asn1.DERAbstractTime
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>str - specify initial ASN.1 value(V) by a string (ex.'20130430235959Z')</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * <li>date - specify Date object.</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERGeneralizedTime = function(params) {
    KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, params);
    this.hT = "18";

    /**
     * set value by a Date object
     * @name setByDate
     * @memberOf KJUR.asn1.DERGeneralizedTime
     * @function
     * @param {Date} dateObject Date object to set ASN.1 value(V)
     * @example
     * When you specify UTC time, use 'Date.UTC' method like this:<br/>
     * var o = new DERUTCTime();
     * var date = new Date(Date.UTC(2015, 0, 31, 23, 59, 59, 0)); #2015JAN31 23:59:59
     * o.setByDate(date);
     */
    this.setByDate = function(dateObject) {
    this.hTLV = null;
    this.isModified = true;
    this.date = dateObject;
    this.s = this.formatDate(this.date, 'gen');
    this.hV = stohex(this.s);
    };

    if (typeof params != "undefined") {
    if (typeof params['str'] != "undefined") {
        this.setString(params['str']);
    } else if (typeof params['hex'] != "undefined") {
        this.setStringHex(params['hex']);
    } else if (typeof params['date'] != "undefined") {
        this.setByDate(params['date']);
    }
    }
};
JSX.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);

// ********************************************************************
/**
 * class for ASN.1 DER Sequence
 * @name KJUR.asn1.DERSequence
 * @class class for ASN.1 DER Sequence
 * @extends KJUR.asn1.DERAbstractStructured
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>array - specify array of ASN1Object to set elements of content</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERSequence = function(params) {
    KJUR.asn1.DERSequence.superclass.constructor.call(this, params);
    this.hT = "30";
    this.getFreshValueHex = function() {
    var h = '';
    for (var i = 0; i < this.asn1Array.length; i++) {
        var asn1Obj = this.asn1Array[i];
        h += asn1Obj.getEncodedHex();
    }
    this.hV = h;
    return this.hV;
    };
};
JSX.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);

// ********************************************************************
/**
 * class for ASN.1 DER Set
 * @name KJUR.asn1.DERSet
 * @class class for ASN.1 DER Set
 * @extends KJUR.asn1.DERAbstractStructured
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>array - specify array of ASN1Object to set elements of content</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERSet = function(params) {
    KJUR.asn1.DERSet.superclass.constructor.call(this, params);
    this.hT = "31";
    this.getFreshValueHex = function() {
    var a = new Array();
    for (var i = 0; i < this.asn1Array.length; i++) {
        var asn1Obj = this.asn1Array[i];
        a.push(asn1Obj.getEncodedHex());
    }
    a.sort();
    this.hV = a.join('');
    return this.hV;
    };
};
JSX.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);

// ********************************************************************
/**
 * class for ASN.1 DER TaggedObject
 * @name KJUR.asn1.DERTaggedObject
 * @class class for ASN.1 DER TaggedObject
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * Parameter 'tagNoNex' is ASN.1 tag(T) value for this object.
 * For example, if you find '[1]' tag in a ASN.1 dump,
 * 'tagNoHex' will be 'a1'.
 * <br/>
 * As for optional argument 'params' for constructor, you can specify *ANY* of
 * following properties:
 * <ul>
 * <li>explicit - specify true if this is explicit tag otherwise false
 *     (default is 'true').</li>
 * <li>tag - specify tag (default is 'a0' which means [0])</li>
 * <li>obj - specify ASN1Object which is tagged</li>
 * </ul>
 * @example
 * d1 = new KJUR.asn1.DERUTF8String({'str':'a'});
 * d2 = new KJUR.asn1.DERTaggedObject({'obj': d1});
 * hex = d2.getEncodedHex();
 */
KJUR.asn1.DERTaggedObject = function(params) {
    KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
    this.hT = "a0";
    this.hV = '';
    this.isExplicit = true;
    this.asn1Object = null;

    /**
     * set value by an ASN1Object
     * @name setString
     * @memberOf KJUR.asn1.DERTaggedObject
     * @function
     * @param {Boolean} isExplicitFlag flag for explicit/implicit tag
     * @param {Integer} tagNoHex hexadecimal string of ASN.1 tag
     * @param {ASN1Object} asn1Object ASN.1 to encapsulate
     */
    this.setASN1Object = function(isExplicitFlag, tagNoHex, asn1Object) {
    this.hT = tagNoHex;
    this.isExplicit = isExplicitFlag;
    this.asn1Object = asn1Object;
    if (this.isExplicit) {
        this.hV = this.asn1Object.getEncodedHex();
        this.hTLV = null;
        this.isModified = true;
    } else {
        this.hV = null;
        this.hTLV = asn1Object.getEncodedHex();
        this.hTLV = this.hTLV.replace(/^../, tagNoHex);
        this.isModified = false;
    }
    };

    this.getFreshValueHex = function() {
    return this.hV;
    };

    if (typeof params != "undefined") {
    if (typeof params['tag'] != "undefined") {
        this.hT = params['tag'];
    }
    if (typeof params['explicit'] != "undefined") {
        this.isExplicit = params['explicit'];
    }
    if (typeof params['obj'] != "undefined") {
        this.asn1Object = params['obj'];
        this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
    }
    }
};
JSX.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);// Hex JavaScript decoder
// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
(function (sr_$, undefined) {
"use strict";

var Hex = {},
    decoder;

Hex.decode = function(a) {
    var i;
    if (decoder === undefined) {
        var hex = "0123456789ABCDEF",
            ignore = " \f\n\r\t\u00A0\u2028\u2029";
        decoder = [];
        for (i = 0; i < 16; ++i)
            decoder[hex.charAt(i)] = i;
        hex = hex.toLowerCase();
        for (i = 10; i < 16; ++i)
            decoder[hex.charAt(i)] = i;
        for (i = 0; i < ignore.length; ++i)
            decoder[ignore.charAt(i)] = -1;
    }
    var out = [],
        bits = 0,
        char_count = 0;
    for (i = 0; i < a.length; ++i) {
        var c = a.charAt(i);
        if (c == '=')
            break;
        c = decoder[c];
        if (c == -1)
            continue;
        if (c === undefined)
            throw 'Illegal character at offset ' + i;
        bits |= c;
        if (++char_count >= 2) {
            out[out.length] = bits;
            bits = 0;
            char_count = 0;
        } else {
            bits <<= 4;
        }
    }
    if (char_count)
        throw "Hex encoding incomplete: 4 bits missing";
    return out;
};

// export globals
sr_$.Hex = Hex;
})(sr_$);// Base64 JavaScript decoder
// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
(function (sr_$, undefined) {
"use strict";

var Base64 = {},
    decoder;

Base64.decode = function (a) {
    var i;
    if (decoder === undefined) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            ignore = "= \f\n\r\t\u00A0\u2028\u2029";
        decoder = [];
        for (i = 0; i < 64; ++i)
            decoder[b64.charAt(i)] = i;
        for (i = 0; i < ignore.length; ++i)
            decoder[ignore.charAt(i)] = -1;
    }
    var out = [];
    var bits = 0, char_count = 0;
    for (i = 0; i < a.length; ++i) {
        var c = a.charAt(i);
        if (c == '=')
            break;
        c = decoder[c];
        if (c == -1)
            continue;
        if (c === undefined)
            throw 'Illegal character at offset ' + i;
        bits |= c;
        if (++char_count >= 4) {
            out[out.length] = (bits >> 16);
            out[out.length] = (bits >> 8) & 0xFF;
            out[out.length] = bits & 0xFF;
            bits = 0;
            char_count = 0;
        } else {
            bits <<= 6;
        }
    }
    switch (char_count) {
      case 1:
        throw "Base64 encoding incomplete: at least 2 bits missing";
      case 2:
        out[out.length] = (bits >> 10);
        break;
      case 3:
        out[out.length] = (bits >> 16);
        out[out.length] = (bits >> 8) & 0xFF;
        break;
    }
    return out;
};

Base64.re = /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/;
Base64.unarmor = function (a) {
    var m = Base64.re.exec(a);
    if (m) {
        if (m[1])
            a = m[1];
        else if (m[2])
            a = m[2];
        else
            throw "RegExp out of sync";
    }
    return Base64.decode(a);
};

// export globals
sr_$.Base64 = Base64;
})(sr_$);

// ASN.1 JavaScript decoder
// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
/*global oids */
(function (undefined) {
"use strict";

var hardLimit = 100,
    ellipsis = "\u2026",
    DOM = {
        tag: function (tagName, className) {
            var t = document.createElement(tagName);
            t.className = className;
            return t;
        },
        text: function (str) {
            return document.createTextNode(str);
        }
    };

function Stream(enc, pos) {
    if (enc instanceof Stream) {
        this.enc = enc.enc;
        this.pos = enc.pos;
    } else {
        this.enc = enc;
        this.pos = pos;
    }
}
Stream.prototype.get = function (pos) {
    if (pos === undefined)
        pos = this.pos++;
    if (pos >= this.enc.length)
        throw 'Requesting byte offset ' + pos + ' on a stream of length ' + this.enc.length;
    return this.enc[pos];
};
Stream.prototype.hexDigits = "0123456789ABCDEF";
Stream.prototype.hexByte = function (b) {
    return this.hexDigits.charAt((b >> 4) & 0xF) + this.hexDigits.charAt(b & 0xF);
};
Stream.prototype.hexDump = function (start, end, raw) {
    var s = "";
    for (var i = start; i < end; ++i) {
        s += this.hexByte(this.get(i));
        if (raw !== true)
            switch (i & 0xF) {
            case 0x7: s += "  "; break;
            case 0xF: s += "\n"; break;
            default:  s += " ";
            }
    }
    return s;
};
Stream.prototype.parseStringISO = function (start, end) {
    var s = "";
    for (var i = start; i < end; ++i)
        s += String.fromCharCode(this.get(i));
    return s;
};
Stream.prototype.parseStringUTF = function (start, end) {
    var s = "";
    for (var i = start; i < end; ) {
        var c = this.get(i++);
        if (c < 128)
            s += String.fromCharCode(c);
        else if ((c > 191) && (c < 224))
            s += String.fromCharCode(((c & 0x1F) << 6) | (this.get(i++) & 0x3F));
        else
            s += String.fromCharCode(((c & 0x0F) << 12) | ((this.get(i++) & 0x3F) << 6) | (this.get(i++) & 0x3F));
    }
    return s;
};
Stream.prototype.parseStringBMP = function (start, end) {
    var str = ""
    for (var i = start; i < end; i += 2) {
        var high_byte = this.get(i);
        var low_byte = this.get(i + 1);
        str += String.fromCharCode( (high_byte << 8) + low_byte );
    }

    return str;
};
Stream.prototype.reTime = /^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
Stream.prototype.parseTime = function (start, end) {
    var s = this.parseStringISO(start, end),
        m = this.reTime.exec(s);
    if (!m)
        return "Unrecognized time: " + s;
    s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];
    if (m[5]) {
        s += ":" + m[5];
        if (m[6]) {
            s += ":" + m[6];
            if (m[7])
                s += "." + m[7];
        }
    }
    if (m[8]) {
        s += " UTC";
        if (m[8] != 'Z') {
            s += m[8];
            if (m[9])
                s += ":" + m[9];
        }
    }
    return s;
};
Stream.prototype.parseInteger = function (start, end) {
    //TODO support negative numbers
    var len = end - start;
    if (len > 4) {
        len <<= 3;
        var s = this.get(start);
        if (s === 0)
            len -= 8;
        else
            while (s < 128) {
                s <<= 1;
                --len;
            }
        return "(" + len + " bit)";
    }
    var n = 0;
    for (var i = start; i < end; ++i)
        n = (n << 8) | this.get(i);
    return n;
};
Stream.prototype.parseBitString = function (start, end) {
    var unusedBit = this.get(start),
        lenBit = ((end - start - 1) << 3) - unusedBit,
        s = "(" + lenBit + " bit)";
    if (lenBit <= 20) {
        var skip = unusedBit;
        s += " ";
        for (var i = end - 1; i > start; --i) {
            var b = this.get(i);
            for (var j = skip; j < 8; ++j)
                s += (b >> j) & 1 ? "1" : "0";
            skip = 0;
        }
    }
    return s;
};
Stream.prototype.parseOctetString = function (start, end) {
    var len = end - start,
        s = "(" + len + " byte) ";
    if (len > hardLimit)
        end = start + hardLimit;
    for (var i = start; i < end; ++i)
        s += this.hexByte(this.get(i)); //TODO: also try Latin1?
    if (len > hardLimit)
        s += ellipsis;
    return s;
};
Stream.prototype.parseOID = function (start, end) {
    var s = '',
        n = 0,
        bits = 0;
    for (var i = start; i < end; ++i) {
        var v = this.get(i);
        n = (n << 7) | (v & 0x7F);
        bits += 7;
        if (!(v & 0x80)) { // finished
            if (s === '') {
                var m = n < 80 ? n < 40 ? 0 : 1 : 2;
                s = m + "." + (n - m * 40);
            } else
                s += "." + ((bits >= 31) ? "bigint" : n);
            n = bits = 0;
        }
    }
    return s;
};

function ASN1(stream, header, length, tag, sub) {
    this.stream = stream;
    this.header = header;
    this.length = length;
    this.tag = tag;
    this.sub = sub;
}
ASN1.prototype.typeName = function () {
    if (this.tag === undefined)
        return "unknown";
    var tagClass = this.tag >> 6,
        tagConstructed = (this.tag >> 5) & 1,
        tagNumber = this.tag & 0x1F;
    switch (tagClass) {
    case 0: // universal
        switch (tagNumber) {
        case 0x00: return "EOC";
        case 0x01: return "BOOLEAN";
        case 0x02: return "INTEGER";
        case 0x03: return "BIT_STRING";
        case 0x04: return "OCTET_STRING";
        case 0x05: return "NULL";
        case 0x06: return "OBJECT_IDENTIFIER";
        case 0x07: return "ObjectDescriptor";
        case 0x08: return "EXTERNAL";
        case 0x09: return "REAL";
        case 0x0A: return "ENUMERATED";
        case 0x0B: return "EMBEDDED_PDV";
        case 0x0C: return "UTF8String";
        case 0x10: return "SEQUENCE";
        case 0x11: return "SET";
        case 0x12: return "NumericString";
        case 0x13: return "PrintableString"; // ASCII subset
        case 0x14: return "TeletexString"; // aka T61String
        case 0x15: return "VideotexString";
        case 0x16: return "IA5String"; // ASCII
        case 0x17: return "UTCTime";
        case 0x18: return "GeneralizedTime";
        case 0x19: return "GraphicString";
        case 0x1A: return "VisibleString"; // ASCII subset
        case 0x1B: return "GeneralString";
        case 0x1C: return "UniversalString";
        case 0x1E: return "BMPString";
        default:   return "Universal_" + tagNumber.toString(16);
        }
    case 1: return "Application_" + tagNumber.toString(16);
    case 2: return "[" + tagNumber + "]"; // Context
    case 3: return "Private_" + tagNumber.toString(16);
    }
};
ASN1.prototype.reSeemsASCII = /^[ -~]+$/;
ASN1.prototype.content = function () {
    if (this.tag === undefined)
        return null;
    var tagClass = this.tag >> 6,
        tagNumber = this.tag & 0x1F,
        content = this.posContent(),
        len = Math.abs(this.length);
    if (tagClass !== 0) { // universal
        if (this.sub !== null)
            return "(" + this.sub.length + " elem)";
        //TODO: TRY TO PARSE ASCII STRING
        var s = this.stream.parseStringISO(content, content + Math.min(len, hardLimit));
        if (this.reSeemsASCII.test(s))
            return s.substring(0, 2 * hardLimit) + ((s.length > 2 * hardLimit) ? ellipsis : "");
        else
            return this.stream.parseOctetString(content, content + len);
    }
    switch (tagNumber) {
    case 0x01: // BOOLEAN
        return (this.stream.get(content) === 0) ? "false" : "true";
    case 0x02: // INTEGER
        return this.stream.parseInteger(content, content + len);
    case 0x03: // BIT_STRING
        return this.sub ? "(" + this.sub.length + " elem)" :
            this.stream.parseBitString(content, content + len);
    case 0x04: // OCTET_STRING
        return this.sub ? "(" + this.sub.length + " elem)" :
            this.stream.parseOctetString(content, content + len);
    //case 0x05: // NULL
    case 0x06: // OBJECT_IDENTIFIER
        return this.stream.parseOID(content, content + len);
    //case 0x07: // ObjectDescriptor
    //case 0x08: // EXTERNAL
    //case 0x09: // REAL
    //case 0x0A: // ENUMERATED
    //case 0x0B: // EMBEDDED_PDV
    case 0x10: // SEQUENCE
    case 0x11: // SET
        return "(" + this.sub.length + " elem)";
    case 0x0C: // UTF8String
        return this.stream.parseStringUTF(content, content + len);
    case 0x12: // NumericString
    case 0x13: // PrintableString
    case 0x14: // TeletexString
    case 0x15: // VideotexString
    case 0x16: // IA5String
    //case 0x19: // GraphicString
    case 0x1A: // VisibleString
    //case 0x1B: // GeneralString
    //case 0x1C: // UniversalString
        return this.stream.parseStringISO(content, content + len);
    case 0x1E: // BMPString
        return this.stream.parseStringBMP(content, content + len);
    case 0x17: // UTCTime
    case 0x18: // GeneralizedTime
        return this.stream.parseTime(content, content + len);
    }
    return null;
};
ASN1.prototype.toString = function () {
    return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + ((this.sub === null) ? 'null' : this.sub.length) + "]";
};
ASN1.prototype.print = function (indent) {
    if (indent === undefined) indent = '';
    document.writeln(indent + this);
    if (this.sub !== null) {
        indent += '  ';
        for (var i = 0, max = this.sub.length; i < max; ++i)
            this.sub[i].print(indent);
    }
};
ASN1.prototype.toPrettyString = function (indent) {
    if (indent === undefined) indent = '';
    var s = indent + this.typeName() + " @" + this.stream.pos;
    if (this.length >= 0)
        s += "+";
    s += this.length;
    if (this.tag & 0x20)
        s += " (constructed)";
    else if (((this.tag == 0x03) || (this.tag == 0x04)) && (this.sub !== null))
        s += " (encapsulates)";
    s += "\n";
    if (this.sub !== null) {
        indent += '  ';
        for (var i = 0, max = this.sub.length; i < max; ++i)
            s += this.sub[i].toPrettyString(indent);
    }
    return s;
};
ASN1.prototype.toDOM = function () {
    var node = DOM.tag("div", "node");
    node.asn1 = this;
    var head = DOM.tag("div", "head");
    var s = this.typeName().replace(/_/g, " ");
    head.innerHTML = s;
    var content = this.content();
    if (content !== null) {
        content = String(content).replace(/</g, "&lt;");
        var preview = DOM.tag("span", "preview");
        preview.appendChild(DOM.text(content));
        head.appendChild(preview);
    }
    node.appendChild(head);
    this.node = node;
    this.head = head;
    var value = DOM.tag("div", "value");
    s = "Offset: " + this.stream.pos + "<br/>";
    s += "Length: " + this.header + "+";
    if (this.length >= 0)
        s += this.length;
    else
        s += (-this.length) + " (undefined)";
    if (this.tag & 0x20)
        s += "<br/>(constructed)";
    else if (((this.tag == 0x03) || (this.tag == 0x04)) && (this.sub !== null))
        s += "<br/>(encapsulates)";
    //TODO if (this.tag == 0x03) s += "Unused bits: "
    if (content !== null) {
        s += "<br/>Value:<br/><b>" + content + "</b>";
        if ((typeof oids === 'object') && (this.tag == 0x06)) {
            var oid = oids[content];
            if (oid) {
                if (oid.d) s += "<br/>" + oid.d;
                if (oid.c) s += "<br/>" + oid.c;
                if (oid.w) s += "<br/>(warning!)";
            }
        }
    }
    value.innerHTML = s;
    node.appendChild(value);
    var sub = DOM.tag("div", "sub");
    if (this.sub !== null) {
        for (var i = 0, max = this.sub.length; i < max; ++i)
            sub.appendChild(this.sub[i].toDOM());
    }
    node.appendChild(sub);
    head.onclick = function () {
        node.className = (node.className == "node collapsed") ? "node" : "node collapsed";
    };
    return node;
};
ASN1.prototype.posStart = function () {
    return this.stream.pos;
};
ASN1.prototype.posContent = function () {
    return this.stream.pos + this.header;
};
ASN1.prototype.posEnd = function () {
    return this.stream.pos + this.header + Math.abs(this.length);
};
ASN1.prototype.fakeHover = function (current) {
    this.node.className += " hover";
    if (current)
        this.head.className += " hover";
};
ASN1.prototype.fakeOut = function (current) {
    var re = / ?hover/;
    this.node.className = this.node.className.replace(re, "");
    if (current)
        this.head.className = this.head.className.replace(re, "");
};
ASN1.prototype.toHexDOM_sub = function (node, className, stream, start, end) {
    if (start >= end)
        return;
    var sub = DOM.tag("span", className);
    sub.appendChild(DOM.text(
        stream.hexDump(start, end)));
    node.appendChild(sub);
};
ASN1.prototype.toHexDOM = function (root) {
    var node = DOM.tag("span", "hex");
    if (root === undefined) root = node;
    this.head.hexNode = node;
    this.head.onmouseover = function () { this.hexNode.className = "hexCurrent"; };
    this.head.onmouseout  = function () { this.hexNode.className = "hex"; };
    node.asn1 = this;
    node.onmouseover = function () {
        var current = !root.selected;
        if (current) {
            root.selected = this.asn1;
            this.className = "hexCurrent";
        }
        this.asn1.fakeHover(current);
    };
    node.onmouseout  = function () {
        var current = (root.selected == this.asn1);
        this.asn1.fakeOut(current);
        if (current) {
            root.selected = null;
            this.className = "hex";
        }
    };
    this.toHexDOM_sub(node, "tag", this.stream, this.posStart(), this.posStart() + 1);
    this.toHexDOM_sub(node, (this.length >= 0) ? "dlen" : "ulen", this.stream, this.posStart() + 1, this.posContent());
    if (this.sub === null)
        node.appendChild(DOM.text(
            this.stream.hexDump(this.posContent(), this.posEnd())));
    else if (this.sub.length > 0) {
        var first = this.sub[0];
        var last = this.sub[this.sub.length - 1];
        this.toHexDOM_sub(node, "intro", this.stream, this.posContent(), first.posStart());
        for (var i = 0, max = this.sub.length; i < max; ++i)
            node.appendChild(this.sub[i].toHexDOM(root));
        this.toHexDOM_sub(node, "outro", this.stream, last.posEnd(), this.posEnd());
    }
    return node;
};
ASN1.prototype.toHexString = function (root) {
    return this.stream.hexDump(this.posStart(), this.posEnd(), true);
};
ASN1.decodeLength = function (stream) {
    var buf = stream.get(),
        len = buf & 0x7F;
    if (len == buf)
        return len;
    if (len > 3)
        throw "Length over 24 bits not supported at position " + (stream.pos - 1);
    if (len === 0)
        return -1; // undefined
    buf = 0;
    for (var i = 0; i < len; ++i)
        buf = (buf << 8) | stream.get();
    return buf;
};
ASN1.hasContent = function (tag, len, stream) {
    if (tag & 0x20) // constructed
        return true;
    if ((tag < 0x03) || (tag > 0x04))
        return false;
    var p = new Stream(stream);
    if (tag == 0x03) p.get(); // BitString unused bits, must be in [0, 7]
    var subTag = p.get();
    if ((subTag >> 6) & 0x01) // not (universal or context)
        return false;
    try {
        var subLength = ASN1.decodeLength(p);
        return ((p.pos - stream.pos) + subLength == len);
    } catch (exception) {
        return false;
    }
};
ASN1.decode = function (stream) {
    if (!(stream instanceof Stream))
        stream = new Stream(stream, 0);
    var streamStart = new Stream(stream),
        tag = stream.get(),
        len = ASN1.decodeLength(stream),
        header = stream.pos - streamStart.pos,
        sub = null;
    if (ASN1.hasContent(tag, len, stream)) {
        // it has content, so we decode it
        var start = stream.pos;
        if (tag == 0x03) stream.get(); // skip BitString unused bits, must be in [0, 7]
        sub = [];
        if (len >= 0) {
            // definite length
            var end = start + len;
            while (stream.pos < end)
                sub[sub.length] = ASN1.decode(stream);
            if (stream.pos != end)
                throw "Content size is not correct for container starting at offset " + start;
        } else {
            // undefined length
            try {
                for (;;) {
                    var s = ASN1.decode(stream);
                    if (s.tag === 0)
                        break;
                    sub[sub.length] = s;
                }
                len = start - stream.pos;
            } catch (e) {
                throw "Exception while decoding undefined length content: " + e;
            }
        }
    } else
        stream.pos += len; // skip content
    return new ASN1(streamStart, header, len, tag, sub);
};
ASN1.test = function () {
    var test = [
        { value: [0x27],                   expected: 0x27     },
        { value: [0x81, 0xC9],             expected: 0xC9     },
        { value: [0x83, 0xFE, 0xDC, 0xBA], expected: 0xFEDCBA }
    ];
    for (var i = 0, max = test.length; i < max; ++i) {
        var pos = 0,
            stream = new Stream(test[i].value, 0),
            res = ASN1.decodeLength(stream);
        if (res != test[i].expected)
            document.write("In test[" + i + "] expected " + test[i].expected + " got " + res + "\n");
    }
};

// export globals
window.ASN1 = ASN1;
})();/**
 * Retrieve the hexadecimal value (as a string) of the current ASN.1 element
 * @returns {string}
 * @public
 */
ASN1.prototype.getHexStringValue = function () {
  var hexString = this.toHexString();
  var offset = this.header * 2;
  var length = this.length * 2;
  return hexString.substr(offset, length);
};

/**
 * Method to parse a pem encoded string containing both a public or private key.
 * The method will translate the pem encoded string in a der encoded string and
 * will parse private key and public key parameters. This method accepts public key
 * in the rsaencryption pkcs #1 format (oid: 1.2.840.113549.1.1.1).
 *
 * @todo Check how many rsa formats use the same format of pkcs #1.
 *
 * The format is defined as:
 * PublicKeyInfo ::= SEQUENCE {
 *   algorithm       AlgorithmIdentifier,
 *   PublicKey       BIT STRING
 * }
 * Where AlgorithmIdentifier is:
 * AlgorithmIdentifier ::= SEQUENCE {
 *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
 *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
 * }
 * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
 * RSAPublicKey ::= SEQUENCE {
 *   modulus           INTEGER,  -- n
 *   publicExponent    INTEGER   -- e
 * }
 * it's possible to examine the structure of the keys obtained from openssl using
 * an asn.1 dumper as the one used here to parse the components: http://lapo.it/asn1js/
 * @argument {string} pem the pem encoded string, can include the BEGIN/END header/footer
 * @private
 */
RSAKey.prototype.parseKey = function (pem) {
  try {
    var modulus = 0;
    var public_exponent = 0;
    var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
    var der = reHex.test(pem) ? sr_$.Hex.decode(pem) : sr_$.Base64.unarmor(pem);
    var asn1 = ASN1.decode(der);

    //Fixes a bug with OpenSSL 1.0+ private keys
    if(asn1.sub.length === 3){
        asn1 = asn1.sub[2].sub[0];
    }
    if (asn1.sub.length === 9) {

      // Parse the private key.
      modulus = asn1.sub[1].getHexStringValue(); //bigint
      this.n = parseBigInt(modulus, 16);

      public_exponent = asn1.sub[2].getHexStringValue(); //int
      this.e = parseInt(public_exponent, 16);

      var private_exponent = asn1.sub[3].getHexStringValue(); //bigint
      this.d = parseBigInt(private_exponent, 16);

      var prime1 = asn1.sub[4].getHexStringValue(); //bigint
      this.p = parseBigInt(prime1, 16);

      var prime2 = asn1.sub[5].getHexStringValue(); //bigint
      this.q = parseBigInt(prime2, 16);

      var exponent1 = asn1.sub[6].getHexStringValue(); //bigint
      this.dmp1 = parseBigInt(exponent1, 16);

      var exponent2 = asn1.sub[7].getHexStringValue(); //bigint
      this.dmq1 = parseBigInt(exponent2, 16);

      var coefficient = asn1.sub[8].getHexStringValue(); //bigint
      this.coeff = parseBigInt(coefficient, 16);

    }
    else if (asn1.sub.length === 2) {

      // Parse the public key.
      var bit_string = asn1.sub[1];
      var sequence = bit_string.sub[0];

      modulus = sequence.sub[0].getHexStringValue();
      this.n = parseBigInt(modulus, 16);
      public_exponent = sequence.sub[1].getHexStringValue();
      this.e = parseInt(public_exponent, 16);

    }
    else {
      return false;
    }
    return true;
  }
  catch (ex) {
    return false;
  }
};

/**
 * Translate rsa parameters in a hex encoded string representing the rsa key.
 *
 * The translation follow the ASN.1 notation :
 * RSAPrivateKey ::= SEQUENCE {
 *   version           Version,
 *   modulus           INTEGER,  -- n
 *   publicExponent    INTEGER,  -- e
 *   privateExponent   INTEGER,  -- d
 *   prime1            INTEGER,  -- p
 *   prime2            INTEGER,  -- q
 *   exponent1         INTEGER,  -- d mod (p1)
 *   exponent2         INTEGER,  -- d mod (q-1)
 *   coefficient       INTEGER,  -- (inverse of q) mod p
 * }
 * @returns {string}  DER Encoded String representing the rsa private key
 * @private
 */
RSAKey.prototype.getPrivateBaseKey = function () {
  var options = {
    'array': [
      new KJUR.asn1.DERInteger({'int': 0}),
      new KJUR.asn1.DERInteger({'bigint': this.n}),
      new KJUR.asn1.DERInteger({'int': this.e}),
      new KJUR.asn1.DERInteger({'bigint': this.d}),
      new KJUR.asn1.DERInteger({'bigint': this.p}),
      new KJUR.asn1.DERInteger({'bigint': this.q}),
      new KJUR.asn1.DERInteger({'bigint': this.dmp1}),
      new KJUR.asn1.DERInteger({'bigint': this.dmq1}),
      new KJUR.asn1.DERInteger({'bigint': this.coeff})
    ]
  };
  var seq = new KJUR.asn1.DERSequence(options);
  return seq.getEncodedHex();
};

/**
 * base64 (pem) encoded version of the DER encoded representation
 * @returns {string} pem encoded representation without header and footer
 * @public
 */
RSAKey.prototype.getPrivateBaseKeyB64 = function () {
  return hex2b64(this.getPrivateBaseKey());
};

/**
 * Translate rsa parameters in a hex encoded string representing the rsa public key.
 * The representation follow the ASN.1 notation :
 * PublicKeyInfo ::= SEQUENCE {
 *   algorithm       AlgorithmIdentifier,
 *   PublicKey       BIT STRING
 * }
 * Where AlgorithmIdentifier is:
 * AlgorithmIdentifier ::= SEQUENCE {
 *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
 *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
 * }
 * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
 * RSAPublicKey ::= SEQUENCE {
 *   modulus           INTEGER,  -- n
 *   publicExponent    INTEGER   -- e
 * }
 * @returns {string} DER Encoded String representing the rsa public key
 * @private
 */
RSAKey.prototype.getPublicBaseKey = function () {
  var options = {
    'array': [
      new KJUR.asn1.DERObjectIdentifier({'oid': '1.2.840.113549.1.1.1'}), //RSA Encryption pkcs #1 oid
      new KJUR.asn1.DERNull()
    ]
  };
  var first_sequence = new KJUR.asn1.DERSequence(options);

  options = {
    'array': [
      new KJUR.asn1.DERInteger({'bigint': this.n}),
      new KJUR.asn1.DERInteger({'int': this.e})
    ]
  };
  var second_sequence = new KJUR.asn1.DERSequence(options);

  options = {
    'hex': '00' + second_sequence.getEncodedHex()
  };
  var bit_string = new KJUR.asn1.DERBitString(options);

  options = {
    'array': [
      first_sequence,
      bit_string
    ]
  };
  var seq = new KJUR.asn1.DERSequence(options);
  return seq.getEncodedHex();
};

/**
 * base64 (pem) encoded version of the DER encoded representation
 * @returns {string} pem encoded representation without header and footer
 * @public
 */
RSAKey.prototype.getPublicBaseKeyB64 = function () {
  return hex2b64(this.getPublicBaseKey());
};

/**
 * wrap the string in block of width chars. The default value for rsa keys is 64
 * characters.
 * @param {string} str the pem encoded string without header and footer
 * @param {Number} [width=64] - the length the string has to be wrapped at
 * @returns {string}
 * @private
 */
RSAKey.prototype.wordwrap = function (str, width) {
  width = width || 64;
  if (!str) {
    return str;
  }
  var regex = '(.{1,' + width + '})( +|$\n?)|(.{1,' + width + '})';
  return str.match(RegExp(regex, 'g')).join('\n');
};

/**
 * Retrieve the pem encoded private key
 * @returns {string} the pem encoded private key with header/footer
 * @public
 */
RSAKey.prototype.getPrivateKey = function () {
  var key = "-----BEGIN RSA PRIVATE KEY-----\n";
  key += this.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
  key += "-----END RSA PRIVATE KEY-----";
  return key;
};

/**
 * Retrieve the pem encoded public key
 * @returns {string} the pem encoded public key with header/footer
 * @public
 */
RSAKey.prototype.getPublicKey = function () {
  var key = "-----BEGIN PUBLIC KEY-----\n";
  key += this.wordwrap(this.getPublicBaseKeyB64()) + "\n";
  key += "-----END PUBLIC KEY-----";
  return key;
};

/**
 * Check if the object contains the necessary parameters to populate the rsa modulus
 * and public exponent parameters.
 * @param {Object} [obj={}] - An object that may contain the two public key
 * parameters
 * @returns {boolean} true if the object contains both the modulus and the public exponent
 * properties (n and e)
 * @todo check for types of n and e. N should be a parseable bigInt object, E should
 * be a parseable integer number
 * @private
 */
RSAKey.prototype.hasPublicKeyProperty = function (obj) {
  obj = obj || {};
  return (
    obj.hasOwnProperty('n') &&
    obj.hasOwnProperty('e')
  );
};

/**
 * Check if the object contains ALL the parameters of an RSA key.
 * @param {Object} [obj={}] - An object that may contain nine rsa key
 * parameters
 * @returns {boolean} true if the object contains all the parameters needed
 * @todo check for types of the parameters all the parameters but the public exponent
 * should be parseable bigint objects, the public exponent should be a parseable integer number
 * @private
 */
RSAKey.prototype.hasPrivateKeyProperty = function (obj) {
  obj = obj || {};
  return (
    obj.hasOwnProperty('n') &&
    obj.hasOwnProperty('e') &&
    obj.hasOwnProperty('d') &&
    obj.hasOwnProperty('p') &&
    obj.hasOwnProperty('q') &&
    obj.hasOwnProperty('dmp1') &&
    obj.hasOwnProperty('dmq1') &&
    obj.hasOwnProperty('coeff')
  );
};

/**
 * Parse the properties of obj in the current rsa object. Obj should AT LEAST
 * include the modulus and public exponent (n, e) parameters.
 * @param {Object} obj - the object containing rsa parameters
 * @private
 */
RSAKey.prototype.parsePropertiesFrom = function (obj) {
  this.n = obj.n;
  this.e = obj.e;

  if (obj.hasOwnProperty('d')) {
    this.d = obj.d;
    this.p = obj.p;
    this.q = obj.q;
    this.dmp1 = obj.dmp1;
    this.dmq1 = obj.dmq1;
    this.coeff = obj.coeff;
  }
};

/**
 * Create a new JSEncryptRSAKey that extends Tom Wu's RSA key object.
 * This object is just a decorator for parsing the key parameter
 * @param {string|Object} key - The key in string format, or an object containing
 * the parameters needed to build a RSAKey object.
 * @constructor
 */
var JSEncryptRSAKey = function (key) {
  // Call the super constructor.
  RSAKey.call(this);
  // If a key key was provided.
  if (key) {
    // If this is a string...
    if (typeof key === 'string') {
      this.parseKey(key);
    }
    else if (
      this.hasPrivateKeyProperty(key) ||
      this.hasPublicKeyProperty(key)
    ) {
      // Set the values for the key.
      this.parsePropertiesFrom(key);
    }
  }
};

// Derive from RSAKey.
JSEncryptRSAKey.prototype = new RSAKey();

// Reset the contructor.
JSEncryptRSAKey.prototype.constructor = JSEncryptRSAKey;


/**
 *
 * @param {Object} [options = {}] - An object to customize JSEncrypt behaviour
 * possible parameters are:
 * - default_key_size        {number}  default: 1024 the key size in bit
 * - default_public_exponent {string}  default: '010001' the hexadecimal representation of the public exponent
 * - log                     {boolean} default: false whether log warn/error or not
 * @constructor
 */
var JSEncrypt = function (options) {
  options = options || {};
  this.default_key_size = parseInt(options.default_key_size) || 1024;
  this.default_public_exponent = options.default_public_exponent || '010001'; //65537 default openssl public exponent for rsa key type
  this.log = options.log || false;
  // The private and public key.
  this.key = null;
};

/**
 * Method to set the rsa key parameter (one method is enough to set both the public
 * and the private key, since the private key contains the public key paramenters)
 * Log a warning if logs are enabled
 * @param {Object|string} key the pem encoded string or an object (with or without header/footer)
 * @public
 */
JSEncrypt.prototype.setKey = function (key) {
  if (this.log && this.key) {
    console.warn('A key was already set, overriding existing.');
  }
  this.key = new JSEncryptRSAKey(key);
};

/**
 * Proxy method for setKey, for api compatibility
 * @see setKey
 * @public
 */
JSEncrypt.prototype.setPrivateKey = function (privkey) {
  // Create the key.
  this.setKey(privkey);
};

/**
 * Proxy method for setKey, for api compatibility
 * @see setKey
 * @public
 */
JSEncrypt.prototype.setPublicKey = function (pubkey) {
  // Sets the public key.
  this.setKey(pubkey);
};

/**
 * Proxy method for RSAKey object's decrypt, decrypt the string using the private
 * components of the rsa key object. Note that if the object was not set will be created
 * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
 * @param {string} string base64 encoded crypted string to decrypt
 * @return {string} the decrypted string
 * @public
 */
JSEncrypt.prototype.decrypt = function (string) {
  // Return the decrypted string.
  try {
    return this.getKey().decrypt(b64tohex(string));
  }
  catch (ex) {
    return false;
  }
};

/**
 * Proxy method for RSAKey object's encrypt, encrypt the string using the public
 * components of the rsa key object. Note that if the object was not set will be created
 * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
 * @param {string} string the string to encrypt
 * @return {string} the encrypted string encoded in base64
 * @public
 */
JSEncrypt.prototype.encrypt = function (string) {
  // Return the encrypted string.
  try {
    return hex2b64(this.getKey().encrypt(string));
  }
  catch (ex) {
    return false;
  }
};

/**
 * Getter for the current JSEncryptRSAKey object. If it doesn't exists a new object
 * will be created and returned
 * @param {callback} [cb] the callback to be called if we want the key to be generated
 * in an async fashion
 * @returns {JSEncryptRSAKey} the JSEncryptRSAKey object
 * @public
 */
JSEncrypt.prototype.getKey = function (cb) {
  // Only create new if it does not exist.
  if (!this.key) {
    // Get a new private key.
    this.key = new JSEncryptRSAKey();
    if (cb && {}.toString.call(cb) === '[object Function]') {
      this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb);
      return;
    }
    // Generate the key.
    this.key.generate(this.default_key_size, this.default_public_exponent);
  }
  return this.key;
};

/**
 * Returns the pem encoded representation of the private key
 * If the key doesn't exists a new key will be created
 * @returns {string} pem encoded representation of the private key WITH header and footer
 * @public
 */
JSEncrypt.prototype.getPrivateKey = function () {
  // Return the private representation of this key.
  return this.getKey().getPrivateKey();
};

/**
 * Returns the pem encoded representation of the private key
 * If the key doesn't exists a new key will be created
 * @returns {string} pem encoded representation of the private key WITHOUT header and footer
 * @public
 */
JSEncrypt.prototype.getPrivateKeyB64 = function () {
  // Return the private representation of this key.
  return this.getKey().getPrivateBaseKeyB64();
};


/**
 * Returns the pem encoded representation of the public key
 * If the key doesn't exists a new key will be created
 * @returns {string} pem encoded representation of the public key WITH header and footer
 * @public
 */
JSEncrypt.prototype.getPublicKey = function () {
  // Return the private representation of this key.
  return this.getKey().getPublicKey();
};

/**
 * Returns the pem encoded representation of the public key
 * If the key doesn't exists a new key will be created
 * @returns {string} pem encoded representation of the public key WITHOUT header and footer
 * @public
 */
JSEncrypt.prototype.getPublicKeyB64 = function () {
  // Return the private representation of this key.
  return this.getKey().getPublicBaseKeyB64();
};

sr_$.JSEncrypt = JSEncrypt;
})(sr_$);

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
sr_$.CryptoJS=function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=sr_$.CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=sr_$.CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=sr_$.CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
sr_$.CryptoJS.lib.Cipher||function(u){var p=sr_$.CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=sr_$.CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();

// jQuery resize event - v1.1 - 3/14/2010
// http://benalman.com/projects/jquery-resize-plugin/
// Copyright (c) 2010 "Cowboy" Ben Alman
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/

(function(sr_$, window, document) {
    sr_$.plugins.resize = {};
    sr_$.plugins.resize.init = function() {
      var $ = sr_$.jQ;

      '$:nomunge'; // Used by YUI compressor.

      // A jQuery object containing all non-window elements to which the resize
      // event is bound.
      var elems = $([]),

        // Extend $.resize if it already exists, otherwise create it.
        jq_resize = $.resize = $.extend($.resize, {}),

        timeout_id,

        // Reused strings.
        str_setTimeout = 'setTimeout',
        str_resize = 'resize',
        str_data = str_resize + '-special-event',
        str_delay = 'delay',
        str_throttle = 'throttleWindow';

      // Property: jQuery.resize.delay
      //
      // The numeric interval (in milliseconds) at which the resize event polling
      // loop executes. Defaults to 250.

      jq_resize[str_delay] = 250;

      // Property: jQuery.resize.throttleWindow
      //
      // Throttle the native window object resize event to fire no more than once
      // every <jQuery.resize.delay> milliseconds. Defaults to true.
      //
      // Because the window object has its own resize event, it doesn't need to be
      // provided by this plugin, and its execution can be left entirely up to the
      // browser. However, since certain browsers fire the resize event continuously
      // while others do not, enabling this will throttle the window resize event,
      // making event behavior consistent across all elements in all browsers.
      //
      // While setting this property to false will disable window object resize
      // event throttling, please note that this property must be changed before any
      // window object resize event callbacks are bound.

      jq_resize[str_throttle] = true;

      // Event: resize event
      //
      // Fired when an element's width or height changes. Because browsers only
      // provide this event for the window element, for other elements a polling
      // loop is initialized, running every <jQuery.resize.delay> milliseconds
      // to see if elements' dimensions have changed. You may bind with either
      // .resize( fn ) or .bind( "resize", fn ), and unbind with .unbind( "resize" ).
      //
      // Usage:
      //
      // > jQuery('selector').bind( 'resize', function(e) {
      // >   // element's width or height has changed!
      // >   ...
      // > });
      //
      // Additional Notes:
      //
      // * The polling loop is not created until at least one callback is actually
      //   bound to the 'resize' event, and this single polling loop is shared
      //   across all elements.
      //
      // Double firing issue in jQuery 1.3.2:
      //
      // While this plugin works in jQuery 1.3.2, if an element's event callbacks
      // are manually triggered via .trigger( 'resize' ) or .resize() those
      // callbacks may double-fire, due to limitations in the jQuery 1.3.2 special
      // events system. This is not an issue when using jQuery 1.4+.
      //
      // > // While this works in jQuery 1.4+
      // > $(elem).css({ width: new_w, height: new_h }).resize();
      // >
      // > // In jQuery 1.3.2, you need to do this:
      // > var elem = $(elem);
      // > elem.css({ width: new_w, height: new_h });
      // > elem.data( 'resize-special-event', { width: elem.width(), height: elem.height() } );
      // > elem.resize();

      $.event.special[str_resize] = {

        // Called only when the first 'resize' event callback is bound per element.
        setup: function() {
          // Since window has its own native 'resize' event, return false so that
          // jQuery will bind the event using DOM methods. Since only 'window'
          // objects have a .setTimeout method, this should be a sufficient test.
          // Unless, of course, we're throttling the 'resize' event for window.
          if (!jq_resize[str_throttle] && this[str_setTimeout]) {
            return false;
          }

          var elem = $(this);

          // Add this element to the list of internal elements to monitor.
          elems = elems.add(elem);

          // Initialize data store on the element.
          $.data(this, str_data, {
            w: elem.width(),
            h: elem.height()
          });

          // If this is the first element added, start the polling loop.
          if (elems.length === 1) {
            loopy();
          }
        },

        // Called only when the last 'resize' event callback is unbound per element.
        teardown: function() {
          // Since window has its own native 'resize' event, return false so that
          // jQuery will unbind the event using DOM methods. Since only 'window'
          // objects have a .setTimeout method, this should be a sufficient test.
          // Unless, of course, we're throttling the 'resize' event for window.
          if (!jq_resize[str_throttle] && this[str_setTimeout]) {
            return false;
          }

          var elem = $(this);

          // Remove this element from the list of internal elements to monitor.
          elems = elems.not(elem);

          // Remove any data stored on the element.
          elem.removeData(str_data);

          // If this is the last element removed, stop the polling loop.
          if (!elems.length) {
            clearTimeout(timeout_id);
          }
        },

        // Called every time a 'resize' event callback is bound per element (new in
        // jQuery 1.4).
        add: function(handleObj) {
          // Since window has its own native 'resize' event, return false so that
          // jQuery doesn't modify the event object. Unless, of course, we're
          // throttling the 'resize' event for window.
          if (!jq_resize[str_throttle] && this[str_setTimeout]) {
            return false;
          }

          var old_handler;

          // The new_handler function is executed every time the event is triggered.
          // This is used to update the internal element data store with the width
          // and height when the event is triggered manually, to avoid double-firing
          // of the event callback. See the "Double firing issue in jQuery 1.3.2"
          // comments above for more information.

          function new_handler(e, w, h) {
            var elem = $(this),
              data = $.data(this, str_data);

            // If called from the polling loop, w and h will be passed in as
            // arguments. If called manually, via .trigger( 'resize' ) or .resize(),
            // those values will need to be computed.
            data.w = w !== undefined ? w : elem.width();
            data.h = h !== undefined ? h : elem.height();

            old_handler.apply(this, arguments);
          };

          // This may seem a little complicated, but it normalizes the special event
          // .add method between jQuery 1.4/1.4.1 and 1.4.2+
          if ($.isFunction(handleObj)) {
            // 1.4, 1.4.1
            old_handler = handleObj;
            return new_handler;
          } else {
            // 1.4.2+
            old_handler = handleObj.handler;
            handleObj.handler = new_handler;
          }
        }

      };

      function loopy() {

        // Start the polling loop, asynchronously.
        timeout_id = window[str_setTimeout](function() {

          // Iterate over all elements to which the 'resize' event is bound.
          elems.each(function() {
            var elem = $(this),
              width = elem.width(),
              height = elem.height(),
              data = $.data(this, str_data);

            // If element size has changed since the last time, update the element
            // data store and trigger the 'resize' event.
            if (width !== data.w || height !== data.h) {
              elem.trigger(str_resize, [data.w = width, data.h = height]);
            }

          });

          // Loop.
          loopy();

        }, jq_resize[str_delay]);

      };

    }
  }(sr_$, window, document));

/**
 * @description ShopRunner Handlebars wrapper encapsulates following functions
 * <br/><ul><li> Initilize handlebars engine </li>
 * <li> fetch template (local or remote) </li>
 * <li> compile template (not completed) </li>
 * <li> cache compiled templates </li>
 * <li> register helpers used in the template </li>
 * </ul>
 * @todo remote templating
 * @todo privates Engine, cache collections, inialized flag
 * @namespace sr_$.templates
 */
(function(sr_$) {

	if (!sr_$.templates) {
		sr_$.templates = {
			// unCompiled template string collection. (contains signIn, signUp, learnmore, payrunner templates as String)
			unCompiled: {},

			// compiled template is a cached handlebars js function pointer collection.
			compiled: {},

			// uncompiled Partial templates string collection
			unCompiledPartials: {},

			// global values that can be inserted into any template using the 'global' helper.
			// these are kind of like partial templates and let us easily change small parts
			// of a template.
			globals: {}
		};
	}

	// reference to handlebars engine.
	var engine;

	var initialized = false;

	/**
	 * @description initialize handlebarjs templates wrapper by initialize handlebars js Engine.
	 * @memeberof sr_$.templates#
	 */
	sr_$.templates.initialize = function() {
		if (!initialized) {
			engine = sr_$.handlebars;

			registerHelpers();
			registerPartials();

			initialized = true;
		}
	};

	sr_$.templates.reinitialize = function() {
		initialized = false;
		sr_$.templates.initialize();
	};

	/**
	 * @description returns compiled handlebarjs function pointer based on the templateName from cache compiled collection.
	 * <br/> if requested template missing in compiled collection method attempt to look the template string from uncompiled collection
	 * <br/> compiles it, cache it and returns the cache collection.
	 * @memberof sr_$.templates#
	 * @param {String} templateName identifier
	 * @returns {function}
	 */
	sr_$.templates.getTemplate = function(templateName) {
		if (!initialized) {
			sr_$.templates.initialize();
		}

		// If a precompiled template is available
		var compiledTemplate = sr_$.templates.compiled[templateName];

		// Check if Template is available
		if (!compiledTemplate) {
			// Get Template
			setTemplate(templateName, engine.compile(sr_$.templates.getTemplateHtml(templateName)));
			compiledTemplate = sr_$.templates.compiled[templateName];
		}

		// Return the compiledTemplate Function
		return compiledTemplate;
	};

	/**
	 * @description returns template String from unCompiled collection.
	 * <br/> found none templates returns empty String
	 * @memberof sr_$.templates#
	 * @param {String} templateName identifier
	 */
	sr_$.templates.getTemplateHtml = function(templateName) {
		return sr_$.templates.unCompiled[templateName] || "";
	};

	/**
	 * @description returns partial template String from unCompiledPartials collection.
	 * <br/> found none templates returns empty String
	 * @memberof sr_$.templates#
	 * @param {String} partialTemplateName identifier
	 */
	sr_$.templates.getPartialTemplateHtml = function(partialTemplateName) {
		return sr_$.templates.unCompiledPartials[partialTemplateName] || "";
	};

	/**
	 * @description register handlebars js partials for the template passed
	 * @memberof sr_$.templates#
	 * @param {String} partialName to register
	 * @param {String} partialHtml against registered template
	 */
	sr_$.templates.registerPartial = function(partialName, partialHtml) {
		engine.registerPartial(partialName, partialHtml);
	};

	function registerPartials() {
		for (var partialName in sr_$.templates.unCompiledPartials) {
			var html = sr_$.templates.getPartialTemplateHtml(partialName);
			sr_$.templates.registerPartial(partialName, html);

			if (partialName.indexOf("sr_") == 0) {
				// Make this backward compatible with the older way we refer to partial inside
				// the template, which is w/o the sr_ prefix
				var backwardCompatibleName = partialName.replace(/^sr_/, "");
				sr_$.templates.registerPartial(backwardCompatibleName, html);
			}
		}
	}

	/**
	 * @description register bunch of helper functions to handlebars template engine.
	 */
	function registerHelpers() {
		// Template Helpers

		engine.registerHelper("global", function(name, context) {
			// globals have to be built like templates because they might
			// contain values from the context or nested globals.
			var text = "" + sr_$.templates.globals[name] || "";
			var template = engine.compile(text);

			// 'this' is the context of the template, so we want to
			// evaluate the nested stuff using the same context.
			return new engine.SafeString(template(this));
		});

		// Conditional Partial
		engine.registerHelper("dynPartial", function(template, context, opts) {
			template = template.replace(/\//g, "_");
			var f = engine.partials[template];
			if (!f) {
				return "";
			}
			// Only show partial once if unique
			if (template.substring(0, 2) === "__") {
				engine.partials[template] = "";
			}

			// we have to compile this otherwise it won't call the "global" helper.
			var subtemplate = engine.compile(f);
			return new engine.SafeString(subtemplate(context));

			// return new engine.SafeString(f);
		});

		// PayRunner Helpers

		// Helper to format currency to two decimals.
		engine.registerHelper("formatCurrency", function(value) {
			if (typeof value == "undefined" || isNaN(parseFloat(value)))
				return "$0.00";

			var x = parseFloat(value).toFixed(2);
			var parts = x.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return "$" + parts.join(".");
		});

		engine.registerHelper("lsubstr", function(value, options) {
			var opts = options.hash;
			var suffix = opts.suffix || "";
			var len = value.length - (opts.lmax || 4);
			return (suffix + value.substr(len, value.length));
		});

		engine.registerHelper("toLowerCase", function(value) {
			return typeof value != "undefined" ? value.toLowerCase() : value;
		});

		engine.registerHelper("toUpperCase", function(value) {
			return typeof value != "undefined" ? value.toUpperCase() : value;
		});

		engine.registerHelper("pluralize", function(number, single, plural) {
			if (number === 1) {
				return single;
			} else {
				return plural;
			}
		});

		engine.registerHelper("ifCond", function(v1, v2, options) {
			if (v1 == v2) {
				return options.fn(this);
			}
			return options.inverse(this);
		});

		engine.registerHelper("ifRewards", function(value, options) {
			if (value && /Virtual Dollars|Limited Rewards/i.test(value)) {
				return options.fn(this);
			} else {
				return options.inverse(this);
			}
		});

		engine.registerHelper("cardAlias", function(value) {
			var alias = value;
			if (value.toLowerCase() == "mastercard") {
				alias = "Mc";
			} else if (value.toLowerCase() == "discover") {
				alias = "Disc";
			}
			return alias.toUpperCase();
		});

		/** @description Uses same syntax as #if helper but initially returns false for falsey or empty string values. **/
		engine.registerHelper("unless_blank", function(item, block) {
			return (item && item.replace(/\s/g,"").length) ? block.fn(this) : block.inverse(this);
		});

		engine.registerHelper("ifShowItemShipping", function(isEligible, isMOVSatisfied, options) {
			if (!isEligible || (isEligible && !isMOVSatisfied)) {
				return options.fn(this);
			} else {
				return options.inverse(this);
			}
		});

		engine.registerHelper('include', function(options) {
		    var context = {},
		        mergeContext = function(obj) {
		            for(var k in obj)context[k]=obj[k];
		        };
		    mergeContext(this);
		    mergeContext(options.hash);
		    return options.fn(context);
		});
	}

	/**
	 * @description sets compiledTemplate function to cached collection.
	 * @memberof sr_$.templates#
	 * @param {String} templateName used to identifiy
	 * @param {function} compiledTemplate handlebarjs runtime engine.
	 */
	function setTemplate(templateName, compiledTemplate) {
		sr_$.templates.compiled[templateName] = compiledTemplate;
	}

}(sr_$));

// This is any utilities that need to be available to view logic.
(function(sr_$) {

	// Setup View Object
	sr_$.views = sr_$.views || {};

	sr_$.views.createViewObject = function() {
		return {
			onload: sr_$.views.noop,
			onbeforeunload: function() { return true; },
			onunload: sr_$.views.noop,
			html: ""
		};
	};

	// This is to insert a view inside a DOM element.
	sr_$.views.insertView = function(view) {
		// Call View to return viewObject
		var viewObj = sr_$.views[view]();

		// Save reference to DOM element.
		// var domElement = sr_$.jQ(viewObj.domEl);

		// Verify DOM element exists.
		if (sr_$.jQ(viewObj.domEl).length > 0) {
			// Run beforeonload
			if (viewObj.beforeonload) {
				viewObj.beforeonload();
			}

			// Replace HTML in DOM element.
			sr_$.jQ(viewObj.domEl).html(viewObj.html);

			// Run onLoad
			if (viewObj.onload) {
				viewObj.onload();
			}
		} else {
			// Dom Element not available.
		}
	};

	// TODO:
	// OpenModal and faqs are copied from PayRunnerViews.js
	// Eventually they should be pulled out of there.
	sr_$.views.openModal = function(viewName, eventName, viewData) {
		eventName = eventName || viewName + "_clk";
		sr_$.track.pageView({page: eventName});

		var viewObj = sr_$.views.getView(viewName, viewData);
		sr_$.UI_manager.busy(false);

		viewObj.type = "page";
		viewObj.id = false;
		viewObj.scope = "ec";

		if (viewName === "summary") {
			viewObj.type = "modal";
			viewObj.id = "ec";
		}

		sr_$.UI_manager.show(viewObj);
		return false;
	};

	sr_$.views.faqs = function() {
		if (!sr_$.view_template_loaded__faqs) {
			sr_$.UI_manager.busy(true, "loading FAQs");

			var url = sr_$.faqURL;

			if(sr_$.model.spendAndGet) {
				url += "?offer=spend_and_get";
			} else if(sr_$.model.account.defaultMembership == "REGULAR") {
				url += "?offer=one_year";
			}

			sr_$.script.call(
				url,
				"view_template_loaded__faqs",
				function() {
					sr_$.views.openModal("faqs");
				},
				function() {
					sr_$.UI_manager.busy(false);
					alert("Sorry, we could not load ShopRunner FAQs at this time.");
				},
				"jsonp",
				10000
			);

			return false;
		}

		var viewObj = sr_$.views.createViewObject();

		// Setup dataObject to be Passed into Template
		var dataObj = {};
		var faqTemplate = sr_$.templates.getTemplate("sr_faqs");
		viewObj.html = faqTemplate(dataObj);

		// Setup OnLoad
		viewObj.onload = function() {

			// sr_$.UI_manager.busy(false);

			// sr.com is using ids, but dont want any issues on partner sites
			sr_$.jQ(".sr_page_faq").find("[id]").not("#express").removeAttr("id");
			sr_$.jQ(".sr_page_faq").find("[a]").attr("target", "_blank");

			sr_$.track.pageView({page: "pik_faqs"});
			var faq_open = false;

			sr_$.jQ(".sr_page_faq dt").click(function() {
				if (faq_open == this) {
					sr_$.jQ(".sr_page_faq dd").slideUp(200);
					sr_$.jQ(".sr_page_faq dt").removeClass("active");
					faq_open = false;
				} else {
					sr_$.jQ(".sr_page_faq dd").slideUp(200);
					sr_$.jQ(".sr_page_faq dt").removeClass("active");
					sr_$.jQ(this).addClass("active").next("dd").slideDown(300);
					faq_open = this;
				}
			});

			if (sr_$.UI_manager.getModalScope() == "ec") {
				var p = sr_$.jQ(".sr_page_faq #express").position();

				if (p) {
					setTimeout(function() {
						sr_$.jQ(".sr_pages_content .sr_scroll").scrollTop(p.top);
					}, 100);
				}
			}
		};

		viewObj.className = "sr_page_faq sr_page_legal";
		viewObj.type = "page";

		// Setup OnUnload - Place any event unbinding here - Garbage Collecting
		viewObj.onunload = function() {};

		return viewObj;
	};

	sr_$.views.terms = function() {

		// Set Reference to Data Object
		var viewObj = sr_$.views.createViewObject();

		// Register Partial Views
		var acceptTermsTemplate = sr_$.templates.getTemplate("sr_terms");
		viewObj.html = acceptTermsTemplate({});

		// Setup OnLoad
		viewObj.onload = function() {
			if (!sr_$.legal_loaded) {
				sr_$.script.call(
					_shoprunner_com.sr_jsContentURL + "/JsLegalV4.js",
					"legal",
					viewObj.renderTerms,
					function() {
						alert("Sorry, we could not load the privacy policy at this time.");
					},
					"jsonp"
				);
			} else {
				viewObj.renderTerms();
			}
		};

		viewObj.className = "sr_page_terms sr_page_legal";
			viewObj.renderTerms = function() {
			sr_$.track.pageView({page: "pik_tos"});
			var dataObj = {};
			var termsTemplate = sr_$.templates.getTemplate("sr_terms_loaded");

			sr_$.jQ(".sr_page_terms").html(termsTemplate(dataObj));

			if(sr_$.payrunner && sr_$.payrunner.Views) {
				sr_$.jQ('[data-pane="privacy"]').bind("click", sr_$.payrunner.Views.openPrivacy);
			}
		};

		viewObj.onunload = function() {};

		return viewObj;
	};

	sr_$.views.privacy = function() {

		var viewObj = sr_$.views.createViewObject();

		var dataObj = {};
		var privacyTemplate = sr_$.templates.getTemplate("sr_privacy");
		viewObj.html = privacyTemplate(dataObj);

		viewObj.onload = function() {
			if (!sr_$.legal_loaded) {
				sr_$.script.call(
					_shoprunner_com.sr_jsContentURL + "/JsLegalV4.js",
					"legal",
					viewObj.renderPrivacy,
					function() {
						alert("Sorry, we could not load the privacy policy at this time.");
					},
					"jsonp"
				);
			} else {
				viewObj.renderPrivacy();
			}
		};

		viewObj.className = "sr_page_privacy sr_page_legal";

		viewObj.renderPrivacy = function() {
			sr_$.track.pageView({'page':'pik_privacy'});

			var dataObj = {};
			var privacyTemplate = sr_$.templates.getTemplate("sr_privacy_loaded");

			sr_$.jQ(".sr_page_privacy").html(privacyTemplate(dataObj));

			if(sr_$.payrunner && sr_$.payrunner.Views) {
				sr_$.jQ('[data-pane="terms"]').bind("click", sr_$.payrunner.Views.openTerms);
			}
		};

		viewObj.onunload = function() {};

		return viewObj;
	};

	// This is to retrieve a view.
	sr_$.views.getView = function(view, obj) {
		var viewObj = sr_$.views[view](obj);

		return viewObj;
	};

	// no operation.
	sr_$.views.noop = function() {};

}(sr_$));

// View Validation
(function(sr_$) {

	sr_$.Validators = {};

	var zipCodeRegex = new RegExp(/^\d{5}$|^\d{5}-\d{4}$|^\d{5} \d{4}$/);

	/**
	 * @description validates US zip code for 5 digit or 9 digit.
	 * @param {String} value
	 * @param {String} c (defaulted to US if not present)
	 */
	sr_$.Validators.zip = function(value, country) {
		if (!country || country == "US") {
			return zipCodeRegex.test(value);
		}

		return (z.length < 10 && z.length > 0);
	};

	/**
	 * @description validation expiration String? Date for payment method.
	 * @param {String} expiration String Date format "mm/yyyy"
	 * @method sr_$.Validators#
	 * @return {Boolean}
	 */
	sr_$.Validators.checkExpiration = function(expiration) {
		var response = {expiration: false, maxcc: false};

		if (expiration.length != 7)
			return response;

		var now = new Date();

		try {
			var month = parseInt(expiration.substring(0, 2), 10);
			if (!month)
				return response;

			var slash = expiration.substring(2, 3);
			if (!slash || slash != '/')
				return false;

			var year = parseInt(expiration.substring(3, 7));

			// these are all the conditions that can make the year/month combo invalid.
			var noYear = !year;
			var invalidMonth = month < 1 || month > 12;
			var beforeCurrentYear = year < now.getFullYear();
			var beforeCurrentMonth = year == now.getFullYear() && month <= now.getMonth();

			if (noYear || invalidMonth || beforeCurrentYear || beforeCurrentMonth) {
				return response;
			}
		} catch (ex) {
			return response;
		}

		response.expiration = true;
		response.maxcc = (parseInt(year) <= (now.getFullYear() + 10));
		return response;
	};

	// Save reference to views object.
	var viewRef = sr_$.views;

	viewRef.replace_button = function() {
		sr_$.jQ('.sr-replace-button-on-click').addClass('hide');
		sr_$.jQ('.sr-button-replacer').removeClass('hide');
		sr_$.jQ('#sr_signup_member_amex_no_thanks').addClass('disabled');
	};

	viewRef.unreplace_button = function() {
		sr_$.jQ('.sr-button-replacer').addClass('hide');
		sr_$.jQ('.sr-replace-button-on-click').removeClass('hide');
	};

	viewRef.set_textbox_in_error = function(e) {
		var objE = sr_$.jQ(e);
		objE.parent('li').addClass('sr_error');

		if (objE.hasClass('sr-textbox-pair-active')) {
			objE.siblings('.sr-textbox-pair-inactive').addClass('sr_error');
		}
		if (objE.hasClass('sr-input-has-hint')) {
			objE.siblings('.sr-input-hint').addClass('sr_error');
		}
	};

	viewRef.unset_textbox_in_error = function(e) {
		sr_$.jQ(e).parent('li').removeClass('sr_error');
		if (sr_$.jQ(e).hasClass('sr-input-has-hint')) {
			sr_$.jQ(e).siblings('.sr-input-hint').removeClass('sr_error');
		}
	};

	viewRef.validate_not_empty = function() {
		var validated = true;
		sr_$.jQ('.sr-validate-not-empty').each(function(i) {
			// Only Run this logic if Visible
			if (sr_$.jQ(this).is(':visible')) {
				var fieldValue = sr_$.jQ.trim(sr_$.jQ(this).val());
				if (fieldValue == '' || fieldValue == sr_$.jQ(this).attr('title')) {
					viewRef.set_textbox_in_error(this);
					sr_$.jQ(this).on('keydown.validate keypress.validate blur.validate', function() {
						var fieldValue = sr_$.jQ.trim(sr_$.jQ(this).val());
						if (!(fieldValue == '' || fieldValue == sr_$.jQ(this).attr('title'))) {
							viewRef.unset_textbox_in_error(this);
							sr_$.jQ(this).off('keydown.validate keypress.validate blur.validate');
						}
					});
					validated = false;
				}
			}
		});
		if (validated) {
			sr_$.jQ('.sr-validate-sname').each(function(i) {
				if (sr_$.jQ(this).is(':visible')) {
					var fieldValue = sr_$.jQ.trim(sr_$.jQ(this).val());
					if (fieldValue.length < 2) {
						viewRef.set_textbox_in_error(this);
						sr_$.jQ(this).on('keydown.validate keypress.validate blur.validate', function() {
							var fieldValue = sr_$.jQ.trim(sr_$.jQ(this).val());
							if (fieldValue.length < 2) {
								viewRef.unset_textbox_in_error(this);
								sr_$.jQ(this).off('keydown.validate keypress.validate blur.validate');
							}
						});
						validated = false;
					}
				}
			});
		}
		return validated;
	};

	viewRef.is_contain_unicode = function(str) {
		for (var i = 0, n = str.length; i < n; i++) {
			if (str.charCodeAt(i) > 255) {
				return true;
			}
		}
		return false;
	};

	viewRef.is_valid_password = function(password, defaultText) {
		return password != ''
			&& password != defaultText
			&& password.length >= 8
			&& !!password.match(/(.*\d.*)/)
			&& ! viewRef.is_contain_unicode(password);
	};

	viewRef.validate_password = function() {
		var validated = true;
		sr_$.jQ('.sr-validate-password').each(function(i) {
			var fieldValue = sr_$.jQ.trim(sr_$.jQ(this).val());
			if (!viewRef.is_valid_password(fieldValue, sr_$.jQ(this).attr('title'))) {
				viewRef.set_textbox_in_error(this);
				sr_$.jQ('#sr_signup_password').parent('li').addClass('sr_error');
				sr_$.jQ('.sr-signup-info[group="password"]').removeClass('hide');
				sr_$.jQ(this).on('keydown.validate keypress.validate blur.validate keyup.validate', function() {
					var fieldValue = sr_$.jQ.trim(sr_$.jQ(this).val());
					if (viewRef.is_valid_password(fieldValue, sr_$.jQ(this).attr('title'))) {
						viewRef.unset_textbox_in_error(this);
						sr_$.jQ('#sr_signup_password').parent('li').removeClass('sr_error');
						sr_$.jQ('.sr-signup-info[group="password"]').addClass('hide');
						sr_$.jQ(this).off('keydown.validate keypress.validate blur.validate');
					}
				});
				validated = false;
			}
		});
		return validated;
	};

	viewRef.validate_same = function() {
		var validated = true;
		sr_$.jQ('.sr-validate-same').each(function(i) {
			var fieldValue = sr_$.jQ.trim(sr_$.jQ(this).val());
			var group = sr_$.jQ(this).attr('validation-group');
			var twin = sr_$.jQ('.sr-validate-same[validation-group="' + group + '"]').not(this);
			var twinValue = sr_$.jQ.trim(twin.val());
			if (fieldValue == '' || fieldValue == sr_$.jQ(this).attr('title') || fieldValue != twinValue) {
				viewRef.set_textbox_in_error(this);
				sr_$.jQ(this).on('keydown.validate keypress.validate blur.validate', function() {
					var fieldValue = sr_$.jQ.trim(sr_$.jQ(this).val());
					var group = sr_$.jQ(this).attr('validation-group');
					var twin = sr_$.jQ('.sr-validate-same[validation-group="' + group + '"]').not(this);
					var twinValue = sr_$.jQ.trim(twin.val());
					if (!(fieldValue == '' || fieldValue == sr_$.jQ(this).attr('title') || fieldValue != twinValue)) {
						viewRef.unset_textbox_in_error(sr_$.jQ('.sr-validate-same[validation-group="' + group + '"]'));
						sr_$.jQ('.sr-validate-same[validation-group="' + group + '"]').off('keydown.validate keypress.validate blur.validate');
					}
				});
				validated = false;
			}
		});
		return validated;
	};

	viewRef.validate_checked = function() {
		var validated = true;
		sr_$.jQ('.sr-validate-checked').each(function(i) {
			var checked = sr_$.jQ(this).hasClass('selected');
			validated = checked;
			if (!validated) {
				viewRef.set_textbox_in_error(this);
				viewRef.set_textbox_in_error(sr_$.jQ(this).find('*'));
				sr_$.jQ(this).on('click.validate', function() {
					viewRef.unset_textbox_in_error(this);
					viewRef.unset_textbox_in_error(sr_$.jQ(this).find('*'));
					sr_$.jQ(this).off('click.validate');
				});
			}
		});
		return validated;
	};

	var states = [
		"AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS",
		"KY", "LA", "MA", "MD", "ME", "MH", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY",
		"OH", "OK", "OR", "PA", "PR", "PW", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"
	];
	var canadianProvinces = ["AB", "BC", "MB", "NB", "NL", "NT", "NS", "NU", "ON", "PE", "QC", "SK", "YT"];
	var statesAndProvinces = states.concat(canadianProvinces);

	// got this from partha for what is used on the old site design
	// TODO: dk: i've seen it freeze up the browser for a couple unrealistic email addresses, like
	// dsajisaodjsadoidsajasdioj@fajsiodjsaidsoj.asdjiodsajadsioj
	viewRef.checkEmail = function(emailAddress) {
		return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(sr_$.jQ.trim(emailAddress)));
	};

	viewRef.validate_email = function() {
		var validated = true;
		sr_$.jQ('.sr-validate-email').each(function(i) {
			var email = sr_$.jQ(this).val();
			validated = viewRef.checkEmail(email);
			if (!validated) {
				viewRef.set_textbox_in_error(this);
				sr_$.jQ(this).on('keydown.validate keypress.validate blur.validate', function() {
					if (viewRef.checkEmail(sr_$.jQ(this).val())) {
						viewRef.unset_textbox_in_error(this);
						sr_$.jQ(this).off('keydown.validate keypress.validate blur.validate');
					}
				});
			}
		});
		return validated;
	};

	viewRef.check_amex = function(ccn) {
		return ccn.length == 15 &&
			(ccn.substring(0, 2) == '34' || ccn.substring(0, 2) == '37');
	};

	viewRef.check_discover = function(ccn) {
		return ccn.length == 16 && ccn.substring(0, 4) == '6011';
	};

	viewRef.check_mc = function(ccn) {
		var prefix = ccn.substring(0, 2);
		return ccn.length == 16 &&
			(prefix == '51' || prefix == '52' || prefix == '53' || prefix == '54' || prefix == '55');
	};

	viewRef.check_visa = function(ccn) {
		return (ccn.length == 13 || ccn.length == 16) && ccn.substring(0, 1) == '4';
	};

	viewRef.ccType = function(ccn) {
		if (ccn == '' || sr_$.na(ccn)) {
			return false;
		}

		var type = false;

		// Visa: length 16, prefix 4, dashes optional.
		if (/^4\d{15}$/.test(ccn))
			type = "Visa";

		// Mastercard: length 16, prefix 51-55, dashes optional.
		else if (/^5[1-5]\d{14}$/.test(ccn))
			type = "MasterCard";

		// Discover: length 16, prefix 6011, dashes optional.
		else if (/^[3,6]\d{15}$/.test(ccn))
			type = "Discover";

		// American Express: length 15, prefix 34 or 37.
		else if (/^3[4,7]\d{13}$/.test(ccn))
			type = "Amex";

		return type;
	};

	viewRef.checkCreditCardNumber = function(ccn) {
		if (ccn.length != 13 && ccn.length != 15 && ccn.length != 16) {
			return false;
		}

		if (!viewRef.check_amex(ccn) && !viewRef.check_discover(ccn) &&
			!viewRef.check_mc(ccn) && !viewRef.check_visa(ccn)) {
			return false;
		}

		var iCcn = parseInt(ccn);
		if (!iCcn) return false;

		ccn = ccn.split('').reverse().join('');
		var sum = 0;
		var multiplier = 0;
		for (var i = 0; i < ccn.length; i++) {
			var d = ccn[i];
			var v = (1 + (multiplier++) % 2) * parseInt(d);
			if (v > 9) {
				v -= 9;
			}
			sum += v;
		}

		return sum % 10 == 0;
	};

	viewRef.validate_credit_card_number = function(formGroup) {
		var validated = true;
		var componentsToValidate = '.sr-validate-credit-card-number';
		if (formGroup) {
			componentsToValidate += '[form-group="' + formGroup + '"]';
		}
		sr_$.jQ(componentsToValidate).each(function(i) {
			// use sr_$.jQ.trim() instead of str.trim() because str.strim() does not work in IE8.
			validated = viewRef.checkCreditCardNumber(sr_$.jQ.trim(sr_$.jQ(this).val()));
			if (!validated) {
				viewRef.set_textbox_in_error(this);
				sr_$.jQ(this).on('keydown.validate keypress.validate blur.validate', function() {
					if (viewRef.checkCreditCardNumber(sr_$.jQ(this).val())) {
						viewRef.unset_textbox_in_error(this);
						sr_$.jQ(this).off('keydown.validate keypress.validate blur.validate');
					}
				});
			}
		});
		return validated;
	};

	viewRef.checkCVV = function(cvv, ccn) {
		// Check if a number
		if(!/^\d+$/.test(cvv)){
			return false;
		}

		if (!ccn) {
			return cvv.length == 3 || cvv.length == 4;
		}
		if (viewRef.check_amex(ccn)) {
			return cvv.length == 4;
		}
		return cvv.length == 3;
	};

	viewRef.validate_cvv = function() {
		var validated = true;
		sr_$.jQ('.sr-validate-cvv').each(function(i) {
			// use sr_$.jQ.trim() instead of str.trim() because str.strim() does not work in IE8.
			validated = viewRef.checkCVV(sr_$.jQ.trim(sr_$.jQ(this).val()), sr_$.jQ.trim(sr_$.jQ('.sr-validate-credit-card-number').val()));
			if (!validated) {
				viewRef.set_textbox_in_error(this);
				sr_$.jQ(this).on('keydown.validate keypress.validate blur.validate', function() {
					if (viewRef.checkCVV(sr_$.jQ(this).val()), sr_$.jQ('.sr-validate-credit-card-number').val()) {
						viewRef.unset_textbox_in_error(this);
						sr_$.jQ(this).off('keydown.validate keypress.validate blur.validate');
					}
				});
			}
		});
		return validated;
	};


	viewRef.validate_expiration = function(formGroup) {
		var validated = true;
		var componentsToValidate = '.sr-validate-expiration';
		if (formGroup) {
			componentsToValidate += '[form-group="' + formGroup + '"]';
		}
		sr_$.jQ(componentsToValidate).each(function(i) {
			validated = sr_$.Validators.checkExpiration(sr_$.jQ.trim(sr_$.jQ(this).val())).expiration;
			if (!validated) {
				viewRef.set_textbox_in_error(this);
				sr_$.jQ(this).on('keydown.validate keypress.validate blur.validate', function() {
					if (sr_$.Validators.checkExpiration(sr_$.jQ(this).val()).expiration) {
						viewRef.unset_textbox_in_error(this);
						sr_$.jQ(this).off('keydown.validate keypress.validate blur.validate');
					}
				});
			}
		});
		return validated;
	};


	viewRef.is_valid_state_code = function(code) {
		return sr_$.jQ.inArray(code, statesAndProvinces) > -1;
	};

	viewRef.validate_state = function() {
		var validated = true;
		sr_$.jQ('.sr-validate-state').each(function(i) {
			state = sr_$.jQ.trim(this.value).toUpperCase();
			validated = viewRef.is_valid_state_code(state);
			if (!validated) {
				viewRef.set_textbox_in_error(this);
				sr_$.jQ(this).on('keydown.validate keypress.validate blur.validate', function() {
					if (viewRef.is_valid_state_code(state)) {
						viewRef.unset_textbox_in_error(this);
						sr_$.jQ(this).off('keydown.validate keypress.validate blur.validate');
					}
				});
			}
		});
		return validated;
	};

	viewRef.validate_zip = function() {
		var validated = true;
		sr_$.jQ('.sr-validate-zip').each(function(i) {
			validated = sr_$.Validators.zip(sr_$.jQ.trim(sr_$.jQ(this).val()));
			if (!validated) {
				viewRef.set_textbox_in_error(this);
				sr_$.jQ(this).on('keydown.validate keypress.validate blur.validate', function() {
					if (sr_$.Validators.zip(sr_$.jQ(this).val())) {
						viewRef.unset_textbox_in_error(this);
						sr_$.jQ(this).off('keydown.validate keypress.validate blur.validate');
					}
				});
			}
		});
		return validated;
	};

	viewRef.sr_info_box_handler = function(e) {
		e.stopPropagation();
		sr_$.jQ('.sr-info-box-container').remove();
		var moveX = e.pageX;
		var moveY = e.pageY - 26;

		if (moveX > sr_$.jQ(window).width() / 2) {
			moveX = moveX - 300;
		} else {
			moveX = moveX - 100;
		}
		if (moveX < 0) {
			moveX = 0;
		}

		sr_$.jQ('#sr_global').append(
			'<div class="sr-info-box-container" style="left:' + moveX +
			'px"><a class="sr-info-box-container-close">X</a>' +
			sr_$.jQ(this).attr('data-info-box') + '</div>'
		);

		var height = sr_$.jQ('.sr-info-box-container').height();
		sr_$.jQ('.sr-info-box-container').css('top', (moveY - height) + "px");

		sr_$.jQ('.sr-info-box-container-close').bind('click', function(e) {
			sr_$.jQ(this).parent().remove();
		});
	};

}(sr_$));

/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2013 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
	Version: 1.3.1
*/
(function(sr_$, window, document) {
	sr_$.plugins.maskedInput = {};
	sr_$.plugins.maskedInput.init = function() {
		var $ = sr_$.jQ;

		function getPasteEvent() {
			var el = document.createElement('input'),
				name = 'onpaste';
			el.setAttribute(name, '');
			return (typeof el[name] === 'function') ? 'paste' : 'input';
		}

		var pasteEventName = getPasteEvent() + ".mask",
			ua = navigator.userAgent,
			iPhone = /iphone/i.test(ua),
			chrome = /chrome/i.test(ua),
			android = /android/i.test(ua),
			caretTimeoutId;

		$.mask = {
			//Predefined character definitions
			definitions: {
				'9': "[0-9]",
				'a': "[A-Za-z]",
				'*': "[A-Za-z0-9]"
			},
			dataName: "rawMaskFn",
			placeholder: '_',
			inActiveClass: 'sr-default-text-active'
		};

		$.fn.extend({
			//Helper Function for Caret positioning
			caret: function(begin, end) {
				var range;

				if (this.length === 0 || this.is(":hidden")) {
					return;
				}

				if (typeof begin == 'number') {
					end = (typeof end === 'number') ? end : begin;
					return this.each(function() {
						if (this.setSelectionRange) {
							this.setSelectionRange(begin, end);
						} else if (this.createTextRange) {
							range = this.createTextRange();
							range.collapse(true);
							range.moveEnd('character', end);
							range.moveStart('character', begin);
							range.select();
						}
					});
				} else {
					if (this[0].setSelectionRange) {
						begin = this[0].selectionStart;
						end = this[0].selectionEnd;
					} else if (document.selection && document.selection.createRange) {
						range = document.selection.createRange();
						begin = 0 - range.duplicate().moveStart('character', -100000);
						end = begin + range.text.length;
					}
					return {
						begin: begin,
						end: end
					};
				}
			},
			unmask: function() {
				return this.trigger("unmask");
			},
			mask: function(mask, settings) {
				var input,
					defs,
					tests,
					partialPosition,
					firstNonMaskPos,
					len;

				if (!mask && this.length > 0) {
					input = $(this[0]);
					return input.data($.mask.dataName)();
				}
				settings = $.extend({
					placeholder: $.mask.placeholder, // Load default placeholder
					completed: null,
					inActiveClass: $.mask.inActiveClass
				}, settings);


				defs = $.mask.definitions;
				tests = [];
				partialPosition = len = mask.length;
				firstNonMaskPos = null;

				$.each(mask.split(""), function(i, c) {
					if (c == '?') {
						len--;
						partialPosition = i;
					} else if (defs[c]) {
						tests.push(new RegExp(defs[c]));
						if (firstNonMaskPos === null) {
							firstNonMaskPos = tests.length - 1;
						}
					} else {
						tests.push(null);
					}
				});

				return this.trigger("unmask").each(function() {
					var input = $(this),
						buffer = $.map(
							mask.split(""),
							function(c, i) {
								if (c != '?') {
									return defs[c] ? settings.placeholder : c;
								}
							}),
						focusText = input.val();

					function seekNext(pos) {
						while (++pos < len && !tests[pos]);
						return pos;
					}

					function seekPrev(pos) {
						while (--pos >= 0 && !tests[pos]);
						return pos;
					}

					function shiftL(begin, end) {
						var i,
							j;

						if (begin < 0) {
							return;
						}

						for (i = begin, j = seekNext(end); i < len; i++) {
							if (tests[i]) {
								if (j < len && tests[i].test(buffer[j])) {
									buffer[i] = buffer[j];
									buffer[j] = settings.placeholder;
								} else {
									break;
								}

								j = seekNext(j);
							}
						}
						writeBuffer();
						input.caret(Math.max(firstNonMaskPos, begin));
					}

					function shiftR(pos) {
						var i,
							c,
							j,
							t;

						for (i = pos, c = settings.placeholder; i < len; i++) {
							if (tests[i]) {
								j = seekNext(i);
								t = buffer[i];
								buffer[i] = c;
								if (j < len && tests[j].test(t)) {
									c = t;
								} else {
									break;
								}
							}
						}
					}

					function keydownEvent(e) {
						var k = e.which,
							pos,
							begin,
							end;

						//backspace, delete, and escape get special treatment
						if (k === 8 || k === 46 || (iPhone && k === 127)) {
							pos = input.caret();
							begin = pos.begin;
							end = pos.end;

							if (end - begin === 0) {
								begin = k !== 46 ? seekPrev(begin) : (end = seekNext(begin - 1));
								end = k === 46 ? seekNext(end) : end;
							}
							clearBuffer(begin, end);
							shiftL(begin, end - 1);

							e.preventDefault();
						} else if (k == 27) { //escape
							input.val(focusText);
							input.caret(0, checkVal());
							e.preventDefault();
						}
					}

					function keypressEvent(e) {
						if (e.keyCode == 9) {
							return;
						}
						var k = e.which,
							pos = input.caret(),
							p,
							c,
							next;

						if (k == 0) {
							// unable to detect key pressed. Grab it from pos and adjust
							// this is a failsafe for mobile chrome
							// which can't detect keypress events
							// reliably
							if (pos.begin >= len) {
								input.val(input.val().substr(0, len));
								e.preventDefault();
								return false;
							}
							if (pos.begin == pos.end) {
								k = input.val().charCodeAt(pos.begin - 1);
								pos.begin--;
								pos.end--;
							}
						}

						if (e.ctrlKey || e.altKey || e.metaKey || k < 32) { //Ignore
							return;
						} else if (k) {
							if (pos.end - pos.begin !== 0) {
								clearBuffer(pos.begin, pos.end);
								shiftL(pos.begin, pos.end - 1);
							}

							p = seekNext(pos.begin - 1);
							if (p < len) {
								c = String.fromCharCode(k);
								if (tests[p].test(c)) {
									shiftR(p);

									buffer[p] = c;
									writeBuffer();
									next = seekNext(p);

									if (android) {
										setTimeout($.proxy($.fn.caret, input, next), 0);
									} else {
										input.caret(next);
									}

									if (settings.completed && next >= len) {
										settings.completed.call(input);
									}
								}
							}
							e.preventDefault();
						}
					}

					function clearBuffer(start, end) {
						var i;
						for (i = start; i < end && i < len; i++) {
							if (tests[i]) {
								buffer[i] = settings.placeholder;
							}
						}
					}

					function writeBuffer() {
						input.val(buffer.join(''));
					}

					function checkVal(allow) {
						//try to place characters where they belong
						var test = input.val(),
							lastMatch = -1,
							i,
							c;

						for (i = 0, pos = 0; i < len; i++) {
							if (tests[i]) {
								buffer[i] = settings.placeholder;
								while (pos++ < test.length) {
									c = test.charAt(pos - 1);
									if (tests[i].test(c)) {
										buffer[i] = c;
										lastMatch = i;
										break;
									}
								}
								if (pos > test.length) {
									break;
								}
							} else if (buffer[i] === test.charAt(pos) && i !== partialPosition) {
								pos++;
								lastMatch = i;
							}
						}
						if (allow) {
							writeBuffer();
						} else if (lastMatch + 1 < partialPosition) {
							input.val("");
							clearBuffer(0, len);
						} else {
							writeBuffer();
							input.val(input.val().substring(0, lastMatch + 1));
						}
						return (partialPosition ? i : firstNonMaskPos);
					}

					input.data($.mask.dataName, function() {
						return $.map(buffer, function(c, i) {
							return tests[i] && c != settings.placeholder ? c : null;
						}).join('');
					});

					if (!input.attr("readonly"))
						input
						.one("unmask", function() {
							input
								.unbind(".mask")
								.removeData($.mask.dataName);
						})
						.bind("focus.mask", function() {
							input.removeClass(settings.inActiveClass);
							clearTimeout(caretTimeoutId);
							var pos,
								moveCaret;

							focusText = input.val();
							pos = checkVal();

							caretTimeoutId = setTimeout(function() {
								writeBuffer();
								if (pos == mask.length) {
									input.caret(0, pos);
								} else {
									input.caret(pos);
								}
							}, 10);
						})
						.bind("blur.mask", function() {
							checkVal();
							if (input.val() != focusText) {
								input.change();
							}
							if (input.val() == "")
								try {
									input.addClass(settings.inActiveClass);
									if ($(this).attr('title'))
										$(this).val($(this)[0].title);
								} catch (ex) {}
						})
						.bind("keydown.mask", keydownEvent)
						.bind("keypress.mask", keypressEvent)
						.bind(pasteEventName, function() {
							setTimeout(function() {
								var pos = checkVal(true);
								input.caret(pos);
								if (settings.completed && pos == input.val().length)
									settings.completed.call(input);
							}, 0);
						}).blur();
					if (chrome && android) {
						input.bind("keyup.mask", keypressEvent);
					}
					checkVal(); //Perform initial check for existing values
				});
			}
		});
	}
}(sr_$, window, document));

// Signup Templates
(function(sr_$) {

	if (!sr_$.templates.unCompiled.base_modal_template) {
		sr_$.templates.unCompiled.base_modal_template = [
		'<div id="_SR">',
			'<div id="sr_UI">',
				'<div id="sr_modal_wrap">',
					'<div id="sr_overlay" class="sr_modal">',
						'<div class="sr_all_center">',
							'<div class="sr_td" id="sr_overlay_content">',
							'</div>',
						'</diV>',
					'</div>',
					'<div id="sr_modal" class="sr_modal" role="dialog">',
						'<div id="sr_modal_inner" tabindex="0">',
							'<div id="sr_header">',
								'<div id="sr_header_logo" class="sr_sprite"></div>',
								'<div id="sr_header_title" class="sr_title_font"></div>',
								'<div id="sr_header_close" class="sr_icon_X sr_UI_close"></div>',
								'<div id="sr_header_text_right" class="sr_title_font sr_header_text sr_fr"></div>',
								'<div id="sr_header_menu">',
									'<a id="sr_hbgr"><hr><hr><hr></a>',
									'<ul id="sr_header_links"></ul>',
								'</div>',
							'</div>',
							'<div class="sr_errors" id="sr_master_errors" role="alert">',
								'<div class="sr_errors_content">',
								'</div>',
								'<div class="sr_clear"></div>',
							'</div>',
							'<div id="sr_modal_content_wrap">',
							'</div>',
							'<div id="sr_pages" class="sr_pages sr_no_tabbing" tabindex="0">',
								'<div id="sr_pages_wrap" class="sr_pages_wrap">',
									'<div class="sr_pages_back sr_kfocus">',
										'<span class="sr_sprite sr_icon_arrowL"></span>',
										'<label id="sr_pages_back_title">back</label>',
									'</div>',
									'<div id="sr_pages_content" class="sr_pages_content">',
										'<div class="sr_page_container" data-sr-scroll="true">',
										'</div> <!-- ende data-sr-scroll-->',
										'<div class="sr_clear"></div> ',
									'</div>',
								'</div>',
							'</div>',
						'</div>',
					'</div>',
					'<div id="sr_modal_bg" class="sr_modal_bg"></div>',
					'<div id="sr_modal_bg_front" class="sr_modal_bg"></div>',
					'<div id="sr_UI_freeze"></div>',
				'</div>',
			'</div>',
		'</div>'
		].join('');
	}

	if (!sr_$.templates.unCompiled.overlay_default) {
		sr_$.templates.unCompiled.overlay_default = [
			'<div id="sr_overlay_logo"></div>',
			'<h3 aria-role="dialog" tabindex="0" {{#if ariaLabel}}aria-label="{{ariaLabel}}"{{/if}}>{{{h3}}}</h3>',
			'<div id="sr_ov_anm">',
				'<div id="sr_ov_anm1"><b></b></div>',
				'<div id="sr_ov_anm2"><b></b></div>',
				'<div id="sr_ov_anm3"><b></b></div>',
				'<div id="sr_ov_anm4"><b></b></div>',
			'</div>'
		].join('');
	}

	if (!sr_$.templates.unCompiled.sr_faqs) sr_$.templates.unCompiled.sr_faqs = '<h3>frequently asked questions</h3>Loading...';
	if (!sr_$.templates.unCompiled.sr_terms) sr_$.templates.unCompiled.sr_terms = '<h3>terms of service</h3>Loading...';
	if (!sr_$.templates.unCompiled.sr_privacy) sr_$.templates.unCompiled.sr_privacy = '<h3>privacy policy</h3><div id="pr_content">Loading Privacy Policy</div> ';
	if (!sr_$.templates.unCompiled.sr_policy) sr_$.templates.unCompiled.sr_policy = sr_$.templates.unCompiled.sr_privacy;
}(sr_$));

// Learn More Templates
(function(sr_$) {
	sr_$.templates.unCompiled.left_partial = "";

	// Base Template
	if (!sr_$.templates.unCompiled.nm_learnMore) {
		sr_$.templates.globals.learnMoreTitle = '<img src="{{img_path_ver}}learn_more/free-2-day-shipping.png" class="nm-lm-title">';
		sr_$.templates.globals.learnMoreSubtitle = '<div class="nm-lm-subtitle-parent">On <b>thousands of brands</b> at great stores!';
		sr_$.templates.globals.learnMoreCol1Text = '<div class="col_item"> Free 2-day shipping on eligible ShopRunner items<br></div>';
		sr_$.templates.globals.learnMoreCol2Text = '<div class="col_item"> No risk shipping<br> Track your returns<br></div>';
		sr_$.templates.globals.learnMoreCol3Text = '<div class="col_item"> Select ShopRunner eligible items<br> Choose ShopRunner free 2-day shipping at checkout<br></div>';
		sr_$.templates.globals.learnMoreSignupOffer = sr_$.templates.globals.learnMoreSignupOffer ||
			'<ul class="sr_cols sr_lm_row">' +
				'<li class="sr_col sr_col__3_4 sr_fullwidth_m">' +
					'<img class="sr_partner_icon" src="https://www.shoprunner.com/static/frontweb/stores/logos/{{partner_code}}.png" />' +
					'<p><strong>Try ShopRunner for 30-Days.</strong> Cancel anytime during ' +
					'your trial and you will not be charged the membership fee.</p>' +
				'</li>' +
				'<li class="sr_col sr_col__1_4 sr_fullwidth_m">' +
					'<div role="button" id="sr_try_button" class="sr_btn" tabindex="0">Try for 30-Days</div>' +
				'</li>' +
			'</ul>';

		sr_$.templates.globals.learnMoreExtraItem = '';
		sr_$.templates.globals.learnMoreAmexOffer =
			'Have an American Express<sup>&reg;</sup> Card? Sign up for complimentary ShopRunner membership as a benefit of your ' +
			'<a href="javascript:void(0);" data-info-box="Only available for US Consumer and Small Business Cards. " class="sr_info_box">eligible</a> ' +
			'Card - valued at $79 annually.';
		sr_$.templates.globals.learnMoreOfferDivider =
			'<div class="sr-or-txt">' +
				'<img src="{{img_path_ver}}learn_more/or_txt.png">' +
			'</div>';
		sr_$.templates.globals.learnMoreSecondOffer = sr_$.templates.globals.learnMoreSecondOffer ||
			'<ul class="sr_cols sr_lm_row sr_lm_row_amex">' +
				'<li class="sr_col sr_col__3_4 sr_fullwidth_m">' +
					'<div class="sr_lm_img" id="sr_lm_amex_img"></div>' +
					'<p>{{global "learnMoreAmexOffer"}}</p>' +
				'</li>' +
				'<li class="sr_col sr_col__1_4 sr_fullwidth_m">' +
					'<div role="button" id="sr_amex_signup" class="sr_btn sr_bg_romulan" tabindex="0">Get Free Membership</div>' +
				'</li>' +
			'</ul>';

		sr_$.templates.unCompiled.nm_learnMore =
			'<div data-sr-scroll="true">' +
			'<ul class="sr_cols sr_lm_content sr_fwh">' +
				'<li class="sr_col sr_scroll_col sr_fullwidth_m">' +
					'<div class="sr_pad">' +
						'<div class="nm-lm-title-parent">' +
							'{{global "learnMoreTitle"}}' +
						'</div>' +
						'{{global "learnMoreSubtitle"}}' +
						'<ul class="sr_cols">' +
							'<li class="sr_col sr_col__1_3">' +
								'<div class="col_header">Get it fast and free.</div>' +
								'<div class="clear"></div>' +
								'{{global "learnMoreCol1Text"}}' +
							'</li><li class="sr_col sr_col__1_3">' +
								'<div class="col_header">Return it free.</div>' +
								'<div class="clear"></div>' +
								'{{global "learnMoreCol2Text"}}' +
							'</li><li class="sr_col sr_col__1_3">' +
								'<div class="col_header">Super Simple.</div>' +
								'<div class="clear"></div>' +
								'{{global "learnMoreCol3Text"}}' +
							'</li>' +
							'{{global "learnMoreExtraItem"}}' +
						'</ul>' +
					'</div>' +
				'</li>' +
			'</ul>' +
			'<div class="sr_lm_hero sr_mobile_hide">' +
				'<img class="sr_fl sr_lm_side" src="{{panel_image}}"/>' +
			'</div>' +
			'<div class="sr_lm_footer">' +
				'{{global "learnMoreSignupOffer"}}' +
				'{{#ifCond amexEnabled true}}' +
					'{{global "learnMoreOfferDivider"}}' +
					'{{global "learnMoreSecondOffer"}}' +
				'{{/ifCond}}' +
				'<div class="sr_clear"></div>' +
			'</div>' +
		'</div>';
	}

	if (!sr_$.templates.unCompiled.base_template) {
		sr_$.templates.unCompiled.base_template = '' +
		'<div class="body-sr-signup-account myriad-light" style="float: left">' +
			// Mobile Header Start
			'<div id="sr-header" class="sr_header_logo_only">' +
				'<table cellspacing="0" cellpadding="0" class="menu-container">' +
					'<tbody>' +
						'<tr>' +
							'<td class="sr-logo">' +
								'<div style="margin-left: 23px;">' +
									'<a class="sr-left" href="javascript:void(0)">' +
										'<div class="sr-header-sr-logo sr_sprite"></div>' +
									'</a>' +
								'</div>' +
								'<div id="mobile_header_close_button" class="sr-right hand" style="font-family: Arial; font-weight: bold; padding-right: 15px; padding-top: 4px; padding-bottom: 6px; display: none;">' +
									'<img class="sr_close_x_img" src="' + _shoprunner_com.imgPath + 'nm_learnmore/close_x.png"/>' +
								'</div>' +
							'</td>' +
						'</tr>' +
					'</tbody>' +
				'</table>' +
				'<div class="clear"><\/div>' +
			'<\/div>' +
			// Mobile Header End
			// Left Panel - Start
			'<div class="sr-signup-sidebar sr-signup-sidebar-dark sr-left">' +
				// Left Panel Title
				'<div class="sr-signup-sidebar-heading">' +
					'Learn More' +
				'<\/div>' +
				// Left Panel Bullets
				'<ul class="sr-signup-sidebar-bullets">' +
					'<li class="sr-signup-sidebar-bullet">' +
						'{{this.name}}' +
						'<div class="sr-signup-sidebar-bullet-disk sr-right"><\/div>' +
						'<div class="clear"><\/div>' +
					'<\/li>' +
				'<\/ul>' +
				// Left Note
				'<div class="sr-signup-sidebar-note-default" style="padding-top: 2px; padding-bottom: 0;">' +
					'* Order by the retailer\'s daily cut-off and receive your order in typically two business days.' +
					'<a href="\/faq\/?specific_faq=2_day_shipping" style="text-decoration: underline" target="_blank">See Details<\/a>' +
				'<\/div>' +
				'{{dynPartial "__LeftPartial" this}}' +
			'<\/div>' +
			// Left Panel End
			// Right Panel Start
			'<div class="sr-signup-form sr-left sr-signup-form-account">' +
				// Form or other content goes here

				// Start Button Area
				'<div class="sr-signup-continue">' +
					'<div id="sr_signup_account_btn" type="button" class="sr-continue-btn sr-signup-continue-btn sr-signup-next-btn sr-signup-btn sr-right" style="margin-bottom: 10px;">' +
						'<div class="sr-centered-text-container-area">' +
							'<div class="sr-centered-text-container-bubble">' +
								' <div class="sr-centered-text-container-text">' +
									' <div class="sr-continue-btn-text" style="white-space: nowrap; display: inline-block">standard signup<\/div>' +
									' <div class="sr-right-arrow" style="white-space: nowrap; display: inline-block"><\/div>' +
								'<\/div>' +
							'<\/div>' +
						'<\/div>' +
					'<\/div>' +
					'<div id="sr_signup__amex_account_btn" type="button" class="sr-continue-btn sr-signup-continue-btn sr-signup-next-btn sr-signup-btn sr-right" style="margin-bottom: 10px; ">' +
						'<div class="sr-centered-text-container-area">' +
							'<div class="sr-centered-text-container-bubble">' +
								' <div class="sr-centered-text-container-text">' +
									' <div class="sr-continue-btn-text" style="white-space: nowrap; display: inline-block">amex signup<\/div>' +
									' <div class="sr-right-arrow" style="white-space: nowrap; display: inline-block"><\/div>' +
								'<\/div>' +
							'<\/div>' +
						'<\/div>' +
					'<\/div>' +
				'<\/div>' +
				// End Button Area

			'<\/div>' +
			// Right Panel End
			'<div class="clear"><\/div>' +
		'<\/div>';
	}

}(sr_$));

// Signup Templates
(function(sr_$, _shoprunner_com) {

	if (!sr_$.templates.unCompiled.base_signup_template) {
		sr_$.templates.unCompiled.base_signup_template = '' +
			'<div data-sr-scroll="true">' +
				'<ul class="sr_cols sr_fwh">' +
					'<li class="sr_col sr_col__2_5 sr_fullwidth_m sr_signup_leftcol" style="background: black;">' +
						'<div class="sr_pad">' +
						'<h1>{{{modal.title}}}</h1>' +
						// Left Panel Bullets
						'{{#if modal.list}}' +
						'<ul class="sr_signup_sidebar_highlights sr_signup_sidebar_bullets">' +
							'{{#each modal.list}}' +
								'<li class="sr_signup_sidebar_bullet">' +
									'{{{this.text}}}' +
								'<\/li>' +
							'{{/each}}' +
						'<\/ul>' +
						'{{/if}}' +
						'{{dynPartial "__LeftPartial" this}}' +
						'</div>' +
					'</li>' +
					'<li class="sr_col sr_col__3_5 sr_fullwidth_m sr_signup_rightcol">' +
					'{{dynPartial "__RightPartial" this}}' +
					'</li>' +
				'<ul>' +
			'</div>';
	}

	if (!sr_$.templates.unCompiled.signup_account_left) {
		sr_$.templates.unCompiled.signup_account_left = "" +
			"<div class='sr_signup_sidebar_highlights'>" +
				"<img class='sr_amex_logo' src='" + _shoprunner_com.imgPath + "amex_logo/axp_bb_rgb_51x45.png'>" +
				"<div class='sr-amex-title'>" +
					"Have an American Express<sup>&reg;</sup> Card? Enroll in complimentary ShopRunner membership as a benefit of " +
					"your <a href='javascript:void(0);' data-info-box='Only available for US Consumer and Small Business Cards. ' class='sr_info_box'>eligible</a> Card." +
				"</div>" +
				"<div role='button' id='sr_signup_sidebar_amex_try_btn' class='sr_btn sr_bg_romulan' tabindex='0'>Enroll Now</div>" +
				/*
				"<div id='sr_signup_sidebar_amex_try_btn' type='button' class='sr-continue-btn sr-signup-btn sr-show-signup-popup-amex sr-signup-amex-try-action-interstitial' style='margin-bottom: 10px; margin-top: 6px; height: 35px; font-size:.9em;'>" +
					"<div class='sr_box_border sr_kfocus sr_center'>Enroll Now</div>" +
					"<div class='sr_centered_text_container_area'>" +
						"<div class='sr-centered-text-container-bubble'>" +
							"<div class='sr-centered-text-container-text'>" +
								"<div class='sr-continue-btn-text' style='white-space: nowrap; display: inline-block'>" +
									"Enroll Now" +
								"</div>" +

							"</div>" +
						"</div>" +
					"</div>" +
				"</div>" +
				*/
			"</div>";
	}

	if (!sr_$.templates.unCompiled.signup_account_right) {
		sr_$.templates.globals.signupAccountButton = "add payment";
		sr_$.templates.globals.signupAccountBottomMessage =
			"<div>Cancel anytime during your trial and you will not be charged the " +
			"<strong>membership fee.</strong> " +
			"<div class='sr_question sr_white sr_info_box' data-info-box='After your free 30 day trial ends<br> $8.95 monthly or $79 for a full year' tabindex='0'>?</div></div>";

		sr_$.templates.globals.signupAccountBottomMessageMobile =
			"<div>Cancel anytime during your trial and you will not be charged " +
			"the <strong>membership fee.</strong></div>";

		sr_$.templates.unCompiled.signup_account_right = "" +
			"<div class='sr_pad'>" +
				"<form id='sr_signup_account'>" +
					"<h2>Sign-Up With Email</h2>" +
					"<ul class='sr_form_ul sr_cols sr_cols_flex'>" +
						"<li class='sr_col sr_error'>" +
							"<span id='sr_signup_error' role='alert'></span>" +
						"</li>" +
						"<li class='sr_col sr_col__1_2 js-label'>" +
							"<label>first name</label>" +
							"<input placeholder='first name' type='text' value='' title='first name' class='sr-validate-not-empty' id='sr_signup_first_name'>" +
						"</li>" +
						"<li class='sr_col sr_col__1_2 js-label'>" +
							"<label>last name</label>" +
							"<input placeholder='last name' type='text' value='' title='last name' class='sr-validate-not-empty sr-validate-sname' id='sr_signup_last_name'>" +
						"</li>" +
						"<li class='sr_col js-label'>" +
							"<label>email</label>" +
							"<input placeholder='email' type='text' value='' title='email' class='sr-validate-not-empty sr-validate-same sr-validate-email' id='sr_signup_email' validation-group='email'>" +
						"</li>" +
						"<li class='sr_col js-label'>" +
							"<label>confirm email</label>" +
							"<input placeholder='confirm email' type='text' value='' title='confirm email' class='sr-validate-not-empty sr-validate-same sr-validate-email' id='sr_signup_email_2' validation-group='email'>" +
						"</li>" +
						"<li class='sr_col js-label'>" +
							"<label>choose password (minimum 8 characters, at least one number)</label>" +
							"<input placeholder='choose password' type='password' value='' title='choose password' class='sr-validate-not-empty sr-validate-password' id='sr_signup_password'>" +
						"</li>" +
					"</ul>" +
					"<div class='sr-signup-sidebar-note-default sr_mobile_hide' style='padding-top: 10px'>" +
						"{{global 'signupAccountBottomMessage'}}" +
					"</div>" +
					"{{#if modal.lastStep}}" +
					"<div class='sr_col' style='margin: 10px 0;'>" +
						"<div class='sr_checkbox_wrap sr_kfocus' tabindex='0'>" +
							"<div class='sr_box_border sr_checkbox sr_fl' style='margin-right: 10px;'>" +
								"<div class='sr_checkbox_state'></div>" +
								"<input border='0' value='true' id='sr_agreeTOS' type='checkbox' tabindex='-1'>" +
							"</div>" +
						"</div>" +
						"<span style='margin-top: 4px; display: inline-block;'> I agree to the <a href='javascript:void(0);' style='text-decoration: underline;' data-action='terms'>Terms of Service</a> and <a href='javascript:void(0);' style='text-decoration: underline;' data-action='privacy'>Privacy Policy</a></span>" +
					"</div>" +
					"{{/if}}" +
					"<input type='submit' value='{{global 'signupAccountButton'}}' id='sr_signup_account_btn' class='sr_btn sr_kfocus sr_fr' aria-label='go to the next step of the sign up process'>" +
					"{{#if amexEnabled}}" +
					"<div class='sr_clear'></div><div class='sr_hide sr_mobile_show sr_ft_terms'>" +
						"*Only available for US Consumer and Small Business Cards. <span class='show-terms-popup'>See Benefit Terms &amp; Conditions</span>" +
					"</div>" +
					"{{/if}}" +
					"<div class='sr_hide sr_mobile_show sr_ft_terms'>" +
						"{{global 'signupAccountBottomMessageMobile'}}" +
					"</div>" +
					"<div class='clear'></div>" +
				"</form>" +
			"</div>";
	}

	if (!sr_$.templates.unCompiled.signup_billing_right) {
		sr_$.templates.globals.signupBillingTitle = "Try it Free for 30-days";
		sr_$.templates.globals.signupBillingSubtitle = "<h5>After the Free Trial ShopRunner is $79/year</h5>";
		sr_$.templates.globals.signupBillingFormTitle = "<h3>Enter Credit Card Info</h3>";
		sr_$.templates.globals.signupBillingButton = "start your 30-day free trial";

		sr_$.templates.unCompiled.signup_billing_right = "" +
			"<div class='sr_pad'>" +
				"<form id='sr_signup_billing'>" +
					"<h2>{{global 'signupBillingTitle'}}</h2>" +
					"{{global 'signupBillingSubtitle'}}" +
					"{{global 'signupBillingFormTitle'}}" +
					"<ul class='sr_form_ul sr_cols sr_cols_flex'>" +
						"<li class='sr_col sr_error'>" +
							"<span id='sr_signup_error' role='alert'></span>" +
						"</li>" +
						"<li class='sr_col sr_col__1_2 sr_fullwidth_m js-label'>" +
							"<label>card number</label>" +
							"<input placeholder='card number' type='text' value='' title='credit card number' class='sr-validate-not-empty sr-validate-credit-card-number' id='sr_signup_card_number'>" +
						"</li>" +
						"<li class='sr_col sr_col__1_4 sr_col__1_2_m js-label'>" +
							"<label>mm/yyyy</label>" +
							"<input placeholder='mm/yyyy' type='text' value='' title='expiration month and year' class='sr-validate-not-empty sr-validate-expiration' id='sr_signup_expiration'>" +
						"</li>" +
						"<li class='sr_col sr_col__1_4 sr_col__1_2_m js-label'>" +
							"<label>cvv/csc</label>" +
							"<input placeholder='cvv/csc' type='text' value='' title='cvv or csc' class='sr-validate-not-empty sr-validate-cvv' id='sr_signup_cvv'>" +
						"</li>" +
						"<li class='sr_col js-label'>" +
							"<label>address</label>" +
							"<input placeholder='address' type='text' value='' title='street address' class='sr-validate-not-empty' id='sr_signup_address'>" +
						"</li>" +
						"<li class='sr_col sr_col__3_5 js-label'>" +
							"<label>city</label>" +
							"<input placeholder='city' type='text' value='' title='city' class='sr-validate-not-empty' id='sr_signup_city'>" +
						"</li>" +
						"<li class='sr_col sr_col__1_5 sr_col__1_2_m js-label'>" +
							"<label>state</label>" +
							"<input placeholder='state' type='text' value='' title='state' maxlength='2' class='sr-validate-not-empty sr-validate-state' id='sr_signup_state'>" +
						"</li>" +
						"<li class='sr_col sr_col__1_5 sr_col__1_2_m js-label'>" +
							"<label>zip</label>" +
							"<input placeholder='zip' type='text' value='' title='zip code' class='sr-validate-not-empty sr-validate-zip' id='sr_signup_zip'>" +
						"</li>" +
						"<li class='sr_col js-label'>" +
							"<div class='sr_checkbox_wrap sr_kfocus' tabindex='0'>" +
								"<div class='sr_box_border sr_checkbox sr_fl'>" +
									"<div class='sr_checkbox_state'></div>" +
									"<input border='0' value='false' id='sr_agreeTOS' type='checkbox' tabindex='-1'>" +
								"</div>" +
								"<span>I agree to the <a href='javascript:void(0);' data-action='terms'>Terms of Service</a> and <a href='javascript:void(0);' data-action='privacy'>Privacy Policy</a></span>" +
							"</div>" +
						"</li>" +
						"<li class='sr_col sr_makedefault js-label'>" +
							"<div class='sr_checkbox_wrap sr_kfocus' tabindex='0'>" +
								"<div class='sr_box_border sr_checkbox sr_fl'>" +
									"<div class='sr_checkbox_state sr_checked'></div>" +
									"<input border='0' value='true' id='sr_keepSignedIn' type='checkbox' checked='checked' tabindex='-1'>" +
								"</div>" +
								"<span>keep me signed in</span>" +
							"</div>" +
						"</li>" +
					"</ul>" +
					"<input type='submit' value='{{global 'signupBillingButton'}}' id='sr_signup_credit_card_btn' class='sr_btn sr_kfocus sr_fr'>" +
				"</form>" +
			"</div>";
	}

	if (!sr_$.templates.unCompiled.welcome) {
		sr_$.templates.globals.welcomeStandardMessage =
			"{{#if isStandardSignup }}" +
				"<font style='font-size:24px'>Your ShopRunner account is now active.</font><br/>" +
				"<div class='clear' style='padding-top:20px;'></div>" +
				"<h3>Enjoy free 2-day shipping on {{{partner_name}}} and 140+ retailers." + "</h3>" +
			"{{/if}}" +
			"<font style='font-size:24px'>{{welcomeMessage}}</font><br/>" +
			"<div class='clear' style='padding-top:20px;'></div>" +
			"<h3>{{message}}</h3>" +
			"<div class='clear' style='padding-top:30px;'></div>";

		sr_$.templates.globals.welcomeButton = "Back to {{{partner_name}}}";

		sr_$.templates.unCompiled.welcome = "" +
			"<ul class='sr_cols sr_fwh'>" +
				"<li class='sr_col sr_col__1_3 sr_mobile_hide sr_oh'>" +
					"<img class='sr_fr' src='{{hero_img}}' style='height: 540px;' />" +
				"</li>" +
				"<li class='sr_col sr_scroll_col sr_col__2_3 sr_fullwidth_m'>" +
					"<div class='sr_pad ' data-sr-scroll='true'>" +
						// BUGBUG: We need to add name in here in the future
						//"<h3>Homer,</h3>" +
						"<div class='clear' style='padding-top:30px;'></div>" +
						"{{#if isAmexSignup }}" +
							"<font style='font-size:24px'>Done! You now have complimentary ShopRunner membership.</font><br/>" +
							"<div class='clear' style='padding-top:20px;'></div>" +
							"<h3>You can continue to enjoy FREE 2-Day Shipping and FREE Return Shipping on eligible items as long as you have an " +
							"<span tabindex='0' class='sr_info_box' data-info-box='Only available for US Consumer and Small Business Cards. See Benefit Terms &amp; Conditions.'>eligible</span>" +
							" American Express<sup>&reg;</sup> Card. <br/><br/>You're logged in, now continue shopping!</h3>" +
						"{{else}}" +
							"{{global 'welcomeStandardMessage'}}" +
						"{{/if}}" +
						"<input type='button' class='sr_btn sr_kfocus sr_fr sr_UI_close' value='{{global 'welcomeButton'}}' tabindex='0'>" +
						"</div>" +
				"</li>" +
			"</ul>";
	}

	if (!sr_$.templates.unCompiled.pik_personalize) {
		sr_$.templates.globals.personalizerButton = "finish";

		sr_$.templates.unCompiled.pik_personalize = "" +
			"<ul class='sr_cols sr_fwh'>" +
				"<li class='sr_col sr_col__2_5 sr_fullwidth_m sr_signup_leftcol' style='background: black;'>" +
					"<div class='sr_pad'>" +
						"<h1>Personalize<br>Your<br>Experience</h1>" +
						"<ul class=\"sr_signup_sidebar_highlights sr_signup_sidebar_bullets\">" +
							"<p>Make the most of your ShopRunner membership by answering just 3 questions.</p>" +
						"<\/ul>" +
					"</div>" +
				"</li>" +
				"<li class='sr_col sr_col__3_5 sr_fullwidth_m sr_signup_rightcol'>" +
					// Form
					"<div class='sr_pad'>" +
						"<form id='sr_pik_personalize'>" +
							"<ul class='sr_form_ul sr_cols sr_cols_flex'>" +
								"<li class='sr_col sr_fullwidth_m js-label'>" +
									"<h2>I am a</h2>" +
								"</li>" +
								"<li class='sr_col sr_col__1_3 sr_col__1_3_m js-label'>" +
									"<a role='button' href='javascript:void(0)' class='sr_personal_gender sr_btn_toggle' data_val='F'>woman</a>"+
								"</li>" +
								"<li class='sr_col sr_col__1_3 sr_col__1_3_m js-label'>" +
									"<a role='button' href='javascript:void(0)' class='sr_personal_gender sr_btn_toggle' data_val='M'>man</a>"+
								"</li>" +
								"<li class='sr_col sr_fullwidth_m js-label'>" +
									"<h2>Age</h2>" +
								"</li>" +
								"<li class='sr_col sr_col__1_3 sr_col__1_3_m js-label'>" +
									"<label>age</label>"+
									"<div class='sr-left sr_select_wrap'>"+
										"<label>age</label>"+
										"<div class='sr_select_arw_wrap'><div class='sr_icon_downArrow'></div></div>"+
										"<select tabindex='0' name='age' id='age' class='sr_personal_age'><option data_min='0' data_max='21'>under 21</option><option data_min='20' data_max='24'>21 to 24</option><option data_min='25' data_max='29'>25 to 29</option><option data_min='30' data_max='34'>30 to 34</option><option data_min='35' data_max='39'>35 to 39</option><option data_min='40' data_max='44'>40 to 44</option><option data_min='45' data_max='49'>45 to 49</option><option data_min='50' data_max='54'>50 to 54</option><option data_min='55' data_max='59'>55 to 59</option><option data_min='60' data_max='64'>60 to 64</option><option data_min='65' data_max='100'>over 65</option></select>"+
										"</div>"+
								"</li>" +
								"<li class='sr_col sr_fullwidth_m js-label'>" +
									"<h2>And I shop for</h2>" +
									"<span>(select all that apply)</span>" +
								"</li>" +
								"<li class='sr_col sr_col__1_3 sr_fullwidth_m js-label'>" +
									"<a role='button' href='javascript:void(0)' class='sr_btn_toggle sr_personal_shopfor' data_val='myself'>myself</a>"+
								"</li>" +
								"<li class='sr_col sr_col__1_3 sr_fullwidth_m js-label'>" +
									"<a role='button' href='javascript:void(0)' class='sr_btn_toggle sr_personal_shopfor' data_val='my significant other'>my significant other</a>"+
								"</li>" +
								"<li class='sr_col sr_col__1_3 sr_fullwidth_m js-label'>" +
									"<a role='button' href='javascript:void(0)' class='sr_btn_toggle sr_personal_shopfor' data_val='my children'>my children</a>"+
								"</li>" +
								"<li class='sr_col sr_col__1_3 sr_fullwidth_m js-label'>" +
									"<a role='button' href='javascript:void(0)' class='sr_btn_toggle sr_personal_shopfor' data_val='friends and family'>friends and family</a>"+
								"</li>" +
								"<li class='sr_col sr_col__2_3 js-label' style='height:58px;'>&nbsp;</li>" +
								"<li class='sr_col sr_col__3_5 sr_fullwidth_m js-label'>" +
									"<span class='sr_pik_skip_step'>Skip this step.<br><a href='javascript:void(0);' id='sr_back_to_partner' class='sr_UI_close'>Take me back to {{{partner_name}}}</a></span>" +
								"</li>" +
								"<li class='sr_col sr_col__2_5 sr_fullwidth_m js-label'>" +
									"<input type='submit' value='{{global 'personalizerButton'}}' id='sr_finish_personalizer' class='sr_btn sr_kfocus sr_fr'>" +
								"</li>" +
							"</ul>" +
						"</form>" +
					"</div>" +
				"</li>" +
			"<ul>";
	}

}(sr_$, _shoprunner_com));

// Signup Templates
(function(sr_$) {

	if (!sr_$.templates.unCompiled.signin_template) {
		sr_$.templates.unCompiled.signin_template = "" +
			"<ul class='sr_cols sr_fwh'>" +
				"<li class='sr_col sr_col__1_3 sr_mobile_hide sr_oh'>" +
					"<img class='sr_fr sr_mw sr_panel_img' src='{{hero_img}}'/>" +
				"</li>" +
				"<li class='sr_col sr_scroll_col sr_col__2_3 sr_fullwidth_m'>" +
					"<div class='sr_pad ' data-sr-scroll='true'>" +
						// BUGBUG: We need to add name in here in the future
						//"<h3>Homer,</h3>" +
						"<h3>{{{header_text}}}</h3>" +
						"<form id='sr_loginForm_box'>" +
							"<ul class='sr_form_ul sr_cols sr_cols_flex'>" +
								"<li class='sr_col'>" +
									"<label>email</label>" +
									"<input placeholder='email' type='text' value='{{email}}' title='email' class='sr-validate-not-empty' id='sr_signin_email' aria-label='Please sign in to ShopRunner to continue'>" +
								"</li>" +
								"<li class='sr_col'>" +
									"<label>password</label>" +
									"<input type='password' placeholder='password' style='display: block;' title='enter password' class='sr-default-text sr-validate-not-empty' id='sr_signin_password'>" +
								"</li>" +
								"{{#if keep_me_signed_in }}<li class='sr_col sr_makedefault'>" +
								"<div class='sr_checkbox_wrap sr_kfocus' tabindex='0'>"+
									"<div class='sr_box_border sr_checkbox sr_fl'>" +
										"<div class='sr_checkbox_state sr_checked'></div>" +
										"<input border='0' value='true' id='sr_keepSignedIn' type='checkbox' checked='checked' tabindex='-1'>" +
									"</div>" +
									"<span>keep me signed in</span></div>" +
								"</li>{{/if}}" +
								"<li class='sr_col'>" +
									"<input type='submit' value='secure sign in' id='sr_sign_in_button' class='sr_btn sr_kfocus'>" +
								"</li>" +
								"<li class='sr_col sr_kfocus'>" +
									"<p>forgot your password? <a id='sr_forgot_pwd_link' class='sr_linked' title='forgot password?' tabindex='0'>click here</a> </p>" +
								"</li>" +
								"{{#if signin_learn_more_link_allowed }}<li class='sr_col sr_kfocus'>" +
									"<p>not a ShopRunner member? <a class='sr_linked sr_action__lm' title='learn more about ShopRunner' tabindex='0'>Learn more</a> </p>" +
								"</li>{{/if}}" +
							"</ul><div class='sr_clear'></div><Br/><Br/>" +
						"</form>" +
					"</div>" +
				"</li>" +
			"</ul>";
	}

	if (!sr_$.templates.unCompiled.dual_eligibility) {
		sr_$.templates.unCompiled.dual_eligibility = "" +
			"<div class='sr_pad'>"+
				"<h1>Item Eligibility</h1>" +
				"<p>It is ShopRunner's goal to provide you with the lowest possible 2-day shipping price. Some items however are not eligible for FREE 2-day Shipping due to the following criteria:</p>" +
				"<ul style='list-style: disc;list-style-position: inside;margin-left: 20px;'>" +
					"<li>Ship Origin (fulfillment ship location)</li>" +
					"<li>Customer Zip Code</li>" +
					"<li>Weight of shipping box</li>" +
					"<li>Dimension of shipping box</li>" +
				"</ul>" +
				"<ul class='sr_form_ul sr_cols sr_cols_flex'>" +
					"<li style='float:right'>" +
						"<br/><a role='button' href='javascript:void(0);' style='width:100%' id='sr_continue' class='sr_btn sr_kfocus sr_fr'>continue shopping</a>" +
					"</li>" +
					"<li class='sr_col__3_4'></li>" +
				"</ul>" +
				"<div class='sr_clear'></div>" +
			"</div>";
	}

	if (!sr_$.templates.unCompiled.signed_in_modal) {
		sr_$.templates.unCompiled.signed_in_modal = "" +
			"<div class='sr_pad'>" +
				"<h1>Welcome Back!</h1>" +
				"<p class='sr_center'>You are signed in to ShopRunner!<br/><br/>FREE 2-Day Shipping will automatically be applied to eligible items.</p>" +
				"<ul class='sr_form_ul sr_cols sr_cols_flex' style='max-width:none'>" +
					"<li style='float:right'>" +
						"<br/><a role='button' href='javascript:void(0);' style='width:100%' id='sr_amex_welcome_continue' class='sr_btn sr_kfocus sr_fr'>continue shopping</a>" +
					"</li>" +
					"<li class='sr_col__3_4'></li>" +
				"</ul>" +
				"<div class='sr_clear'></div>" +
			"</div>";
	}

	if (!sr_$.templates.unCompiled.signin_welcome) {
		sr_$.templates.unCompiled.signin_welcome = '' +
			'<div class="sr-signup-form-content">' +
				'<div class="sr-signup-alignment-container">' +
					'<div class="sr-signup-heading">Welcome Back!</div>' +
					'<div>Welcome Back!</div>' +
					'<a href="javascript:void(0);" class="sr_button_fixed sr_bg_blue" id="sr_close">Continue Shopping</a><br><br>' +
				'</div>' +
			'</div>';
	}

	if (!sr_$.templates.unCompiled.welcome_back) {
		sr_$.templates.globals.welcomeBackMessage = sr_$.templates.globals.welcomeBackMessage ||
			"<p>FREE 2-Day Shipping will automatically be applied to eligible items.</p>";
		sr_$.templates.unCompiled.welcome_back = "" +
			"<ul class='sr_cols sr_fwh'>" +
				"<li class='sr_col sr_col__1_3 sr_mobile_hide sr_oh'>" +
					"<img class='sr_fr sr_mw sr_panel_img' src='{{hero_img}}'/>" +
				"</li>" +
				"<li class='sr_col sr_col__2_3 sr_fullwidth_m'>" +
					"<div class='sr_pad'>" +
						"<h3>Welcome Back!</h3>" +
						"<p>You are signed in to ShopRunner!</p>" +
						"{{global 'welcomeBackMessage'}}" +
							"<ul class='sr_form_ul sr_cols sr_cols_flex'>" +
								"<li class='sr_col'>" +
									"<input id='sr_close' type='submit' value='Continue Shopping' class='sr_btn sr_kfocus'>" +
								"</li>" +
							"</ul>" +
					"</div>" +
				"</li>" +
			"</ul>";
	}

	if (!sr_$.templates.unCompiled.forgot_password) {
		sr_$.templates.unCompiled.forgot_password = "" +
			"<ul class='sr_cols sr_fwh'>" +
				"<li class='sr_col sr_col__1_3 sr_mobile_hide sr_oh'>" +
					"<img class='sr_fr sr_mw sr_panel_img' src='{{hero_img}}'/>" +
				"</li>" +
				"<li class='sr_col sr_scroll_col sr_col__2_3 sr_fullwidth_m'>" +
					"<div class='sr_pad ' data-sr-scroll='true'>" +
						// BUGBUG: We need to add name in here in the future
						//"<h3>Homer,</h3>" +
						"<h3>Forgot your ShopRunner password?</h3>" +
						"<p>Please enter your email address here and we will email you a link to reset your password. </p>" +
						"<form id='sr_forgotPassword_form'>" +
							"<ul class='sr_form_ul sr_cols sr_cols_flex'>" +
								"<li class='sr_col'>" +
									"<label>email</label>" +
									"<input placeholder='email' type='text' value='{{email}}' title='email' class='sr-validate-email sr-validate-not-empty' id='sr_forgot_email'>" +
								"</li>" +

								"<li class='sr_col'>" +
									"<input type='submit' value='reset password' class='sr_btn sr_kfocus'>" +
								"</li>" +

							"</ul>" +
						"</form>" +
						"<div class='sr_clear'></div>" +
						"<br/><br/><br/>" +
						"<p>" +
							"<b>Having Trouble?</b> Call us at 1 (888) 721-7467 or email us anytime at MemberServices@shoprunner.com" +
						"</p>" +
					"</div>" +
				"</li>" +
			"</ul>";
	}

	if (!sr_$.templates.unCompiled.sr_amex_cancelled_member) {
		sr_$.templates.unCompiled.sr_amex_cancelled_member = "" +
			"<div class='sr_partners_box'>"+
				"<div class='sr_partners_container' style='margin-left:10px'>" +
					" <div class='sr_amex_oops' style='font-size: 6.7em; color: #fb7e04;'>Oops!</div>"+
					" <div class='sr_amex_message' style='font-size: 3.7em; color: #464646;'> "+
						" Your ShopRunner account <br/>"+
						" is no longer active as of {{expiry_date}}."+
					" </div>"+
				"</div>"+
			"</div>";
	}

	if (!sr_$.templates.unCompiled.participating_stores) {
		sr_$.templates.unCompiled.participating_stores = "" +
			"<ul class='sr_cols sr_cols_flex'>" +
				"<h1>Our Partner Retailers</h1>" +
				"{{#each partnerList.featured}}" +
					"<li class='sr_col sr_col__1_4'><div class='sr_stores_tile'><img class='sr_fullwidth' src='{{this.url}}'></div></li>" +
				"{{/each}}" +
				"{{#each colData}}" +
					"<li class='sr_stores_list sr_col sr_col__1_4'>" +
						"{{#each this}}" +
							"{{this.name}} <br />" +
						"{{/each}}" +
					"</li>" +
				"{{/each}}" +
			"</ul>";
	}

}(sr_$));

// These are views that dont support the amex or signup flow. So any other views not related.
(function(sr_$, _shoprunner_com, window) {

	// Save Reference to View Object
	var viewRef = sr_$.views;

	// Learn More View
	viewRef.learn_more = function() {
		// Setup generic view object and defaults
		if (typeof sr_$.learnMoreClickCallBack == "function") {
			sr_$.learnMoreClickCallBack();
		}

		var partnerCode = _shoprunner_com.retailerID.toUpperCase();
		var retailerName = sr_$.partner_info[partnerCode].name;

		var viewObj = viewRef.createViewObject();
		var modalData = {
			modal: {
				title: "Learn More",
				list: [
					{text: "This is the first bullet"},
					{text: "This is the second bullet"}
				]
			},
			amexEnabled: sr_$.model.amexEnabled,
			img_path_ver: sr_$.img_path_ver,
			img_path: sr_$.img_path,
			partner_code: partnerCode,
			retailerName: retailerName,
			panel_image: sr_$.cardImage || (sr_$.assetDomain + "static/frontweb/stores/cards/" + sr_$.model.config.assetName + "@2x.jpg")
		};

		// Setup template
		var newLearnMoreGroup, template;

		if (sr_$.model.showNewLearnMore) {
			// load your group assignment or pick one if you haven't been assigned.
			newLearnMoreGroup = sr_$.nlm && sr_$.nlm();

			// groups 1-4 see a version of the new learn more.
			// groups 5-6 see the cart runner modal as the learn more.
			if (newLearnMoreGroup <= 4) {
				template = sr_$.templates.getTemplate("nm_new_learnMore");
			} else {
				template = sr_$.templates.getTemplate("cr_new_learnMore");
			}

			modalData.nlm_a = (newLearnMoreGroup == 1 || newLearnMoreGroup == 2);
			modalData.nlm_c = (newLearnMoreGroup == 3 || newLearnMoreGroup == 4);
			modalData.nlm_radio_buttons = modalData.nlm_c;
		} else {
			template = sr_$.templates.getTemplate("nm_learnMore");
		}

		// Compile Template with Partials and Data
		viewObj.html = template(modalData);

		// Onload Function is available if needed
		viewObj.onload = function() {
			sr_$.track.pageView({page: 'rpik_learn'});
			sr_$.jQ('#sr_modal').on('click', '#mobile_header_close_button', function() {
				sr_$.Modal.close();
			});
			// Load Partner List Remotely
			if (typeof sr_$.partnerList == "undefined") {
				// If Partner List is empty (Some partners might have list already) load it remotely.
				sr_$.script.call(
					_shoprunner_com.partner_contentURL + "/partner_list.js",
					"partnerlist",
					function() {},
					function() {},
					"GET"
				);
			}

			// if the S&G offer shows the partner logo, set its margins.
			var partnerLogo = sr_$.jQ("#sr_modal .sr_partner_icon");
			if (partnerLogo.length) {
				var setPartnerLogoHeight = function() {
					var rawWidth = partnerLogo.width();
					var rawHeight = partnerLogo.height();

					if (rawWidth) {
						// the higher the aspect ratio, the wider the image should
						// be (to a max width of 140px).
						var ratio = rawWidth / rawHeight;
						var width = Math.min(140, 50 + 10 * ratio);
						var height = width / ratio;

						// adjust the margin on the partner logo element.
						var marginTop = (81 - height) / 2;
						partnerLogo.css("margin", marginTop + "px 20px " + marginTop + "px");
						partnerLogo.css("width", width);

						// set the padding for the S&G offer text.
						partnerLogo.next("p").css("padding-left", width + 40);

						// set the margin and padding for the amex logo and amex offer text.
						var amexLogo = sr_$.jQ("#sr_modal .sr_lm_row_amex .sr_lm_img")
						amexLogo.css("margin", "15px " + (width - 10) / 2 + "px");
						amexLogo.next("p").css("padding-left", width + 40);
					}
				};

				partnerLogo.on("load", setPartnerLogoHeight);
				setTimeout(setPartnerLogoHeight, 1);
			}

			// mkae the "100+ stores" links trigger the new stores page.
			sr_$.jQ('.sr_stores_popup').bind('click', function() {
				var modalData = {
					partnerList: sr_$.partnerList,
					categories: {}
				};

				for (var i = 0; i < sr_$.partnerList.stores.length; i++) {
					var category = sr_$.partnerList.stores[i].desc;
					if (category in modalData.categories) {
						modalData.categories[category].push(sr_$.partnerList.stores[i].name);
					} else {
						modalData.categories[category] = [sr_$.partnerList.stores[i].name];
					}
				}

				template = sr_$.templates.getTemplate('participating_stores_new');
				sr_$.jQ('#sr_stores').html(template(modalData)).addClass('sr_stores_appear');
				sr_$.track.pageView({page: 'rpik_new_stores_page'});

				sr_$.jQ('#sr_stores').find('[data-sr-scroll]').each(function() {
					this.sr_scroll = new sr_$.UI_manager.scroll(this);
				});

				// hide the scrollable list of store names because initially we
				// only show the logos.
				sr_$.jQ(".sr_stores_container .sr_scroll_wrap:last-child").hide()

				// make the signup button on the stores page work.
				sr_$.jQ('#sr_stores #sr_try_button').bind('click', function() {
					sr_$.track.pageView({page: 'rpik_lm_signup_stores_click'});
					sr_$.Modal.modal('signup_account');
				});

				sr_$.jQ('.sr_stores_top .sr_go_back').bind('click', function() {
					sr_$.jQ('#sr_stores').removeClass('sr_stores_appear');
				});

				// make the 'view as list/logos' button work.
				sr_$.jQ('.sr_stores_top .sr_view_toggle').bind('click', function() {
					sr_$.jQ(".sr_stores_container").toggleClass("sr_show_list");

					if (sr_$.jQ(".sr_stores_container.sr_show_list").length) {
						sr_$.jQ(".sr_stores").closest(".sr_scroll_wrap").hide();
						sr_$.jQ(".sr_store_names").show().closest(".sr_scroll_wrap").show();
						sr_$.jQ('.sr_stores_top .sr_view_toggle').html('view as logos');
						sr_$.track.pageView({page: 'rpik_new_stores_view_list'});
					} else {
						sr_$.jQ(".sr_stores").closest(".sr_scroll_wrap").show();
						sr_$.jQ(".sr_store_names").closest(".sr_scroll_wrap").hide();
						sr_$.jQ('.sr_stores_top .sr_view_toggle').html('view as list');
						sr_$.track.pageView({page: 'rpik_new_stores_view_logos'});
					}
				});
			});

			// make the signup form for NLM:D work.
			sr_$.jQ(".sr_lm_cd form").bind("submit", function() {
				var proceed = true;
				var nextPage = "signup_account";

				if (modalData.nlm_signup) {
					// there are 2 email inputs and 2 password inputs (for desktop and mobile)
					// so we need to copy values from the ones that are visible to the ones that
					// aren't so validation can pass (otherwise the hidden ones make it fail).
					var email = sr_$.jQ("#_SR .sr-validate-email:visible").val();
					var password = sr_$.jQ("#_SR .sr-validate-password:visible").val();

					sr_$.jQ("#_SR .sr-validate-email").val(email);
					sr_$.jQ("#_SR .sr-validate-password").val(password);

					// validate the email address and password.
					var emailOk = viewRef.validate_email();
					var passwordOk = viewRef.validate_password();

					// go to signup step 2.
					if (emailOk && passwordOk) {
						sr_$.saveAccountInfo({
							firstName: "",
							lastName: "",
							email: email,
							password: password,
							membership: sr_$.jQ.trim(sr_$.model.account.defaultMembership)
						});

						// if you're in spend and get group 2, go to the normal signup step 1.
						if (sr_$.model.spendAndGet && sr_$.model.spendAndGet.group == 2) {
							nextPage = "signup_account"
						} else {
							nextPage = "signup_billing";
						}
					} else {
						proceed = false;
					}
				}

				if (proceed) {
					// enter the selected flow, if no option is selected show an error.
					if (sr_$.jQ("[data-offer=amex]:visible").prop("checked")) {
						sr_$.track.pageView({page: "rpik_lm_amex_click"});
						sr_$.Modal.modal("amex_eligible");
					} else if (sr_$.jQ("[data-offer=sng]:visible").prop("checked")) {
						sr_$.track.pageView({page: "rpik_lm_signup_click"});
						sr_$.Modal.modal(nextPage);
					} else {
						sr_$.jQ("#sr_nlm_error").css("display", "block");
						sr_$.jQ(".sr_lm_offers input[type=radio]").css("box-shadow", "#de7c1f 0 0 1px 2px");
					}
				}

				return false;
			});

			sr_$.jQ('.sr_faqs_link').bind('click', function() {
				if (!window.focus) {
					return true;
				}
				window.open(
					'https://www.shoprunner.com/memberfaq?pik=1',
					'',
					'width=650,height=450,toolbar=no,scrollbars=yes'
				);
				return false;
			});

			sr_$.jQ('#sr_pop_up_tos').bind('click', function() {
				if (!window.focus) {
					return true;
				}
				window.open(
					'https://www.shoprunner.com/terms/amex/?pik=1',
					'',
					'width=650,height=450,toolbar=no,scrollbars=yes'
				);
				return false;
			});

			sr_$.jQ('.sr_stores_link').bind('click', function() {
				sr_$.Modal.modal('participating_stores');
			});

			sr_$.jQ('#sr_try_button,#try_shoprunner,#sr_try_now,#sr_sign_up').bind('click', function() {
				sr_$.track.pageView({page: 'rpik_lm_signup_click'});
				sr_$.Modal.modal('signup_account');
			});
			sr_$.jQ('.lm_sign_in').bind('click',function() {
				sr_$.Modal.modal('sign_in');
			});
			sr_$.jQ('#sr_amex_signup,#mobile_amex_btn,.sr_btn_amex').bind('click', function() {
				sr_$.track.pageView({page: 'rpik_lm_amex_click'});
				sr_$.Modal.modal('amex_eligible');
			});
		};

		// Unload Function is available if needed
		viewObj.onunload = function() {
		};

		if (sr_$.model.participatingStores) {
			viewObj.header = {
				links: [
					'<a class="lm_sign_in" id="sr_signIn_header" href="javascript:void(0)">sign in</a>',
					'<a href="javascript:void(0)" data-action="participating_stores">stores</a>',
					'<a href="javascript:void(0)" data-action="faqs">faqs</a>'
				]
			};
		} else {
			viewObj.header = {
				links:[
					'<a class="lm_sign_in" id="sr_signIn_header" href="javascript:void(0)">sign in</a>',
					'<a href="javascript:void(0)" data-action="faqs">faqs</a>'
				]
			};
		}

		viewObj.type = 'modal';
		viewObj.scope = 'learn_more';

		// Adding class if Amex Flow.
		if (sr_$.model.amexEnabled) {
			viewObj.className = 'sr_modal_transactional';
		} else {
			viewObj.className = 'sr_modal_transactional sr_amex_disabled';
		}

		if (sr_$.model.showNewLearnMore) {
			if (newLearnMoreGroup <= 4) {
				viewObj.className += ' sr_new_learn_more sr_new_learn_more' + newLearnMoreGroup;
			} else {
				viewObj.header = {type: 'overlay_no_logo'};
				viewObj.className += ' sr_lm_cart_runner';
			}
		}

		return viewObj;
	};

	viewRef.participating_stores = function() {
		// Setup generic view object and defaults
		var viewObj = viewRef.createViewObject();

		// Split partner list into 4 for visual purposes.
		var storesCol = Math.ceil(sr_$.partnerList.stores.length / 4);
		var colData = {1: [], 2: [], 3: [], 4: []};
		var colNum = 1;

		for (var i = 0; i < sr_$.partnerList.stores.length; i++) {
			if (i !== 0  && i % storesCol == 0) {
				colNum++;
			}
			colData[colNum].push(sr_$.partnerList.stores[i]);
		}

		// lowercase Partner Codes
		for (var i = 0; i < sr_$.partnerList.featured.length; i++) {
			sr_$.partnerList.featured[i].url = sr_$.assetDomain +"static/frontweb/storecards/" + sr_$.partnerList.featured[i].code.toLowerCase() + "@2x.jpg";
		}

		var modalData = {
			partnerList: sr_$.partnerList,
			colData: colData
		};

		// Setup Base Template
		var template = sr_$.templates.getTemplate("participating_stores");

		viewObj.viewClass = "";

		// Compile template with partials and data.
		viewObj.html = template(modalData);

		// Onload function is available if needed.
		viewObj.onload = function() {
			sr_$.track.pageView({page: 'pik_participating_stores'});
		};

		return viewObj;
	};
}(sr_$, _shoprunner_com, window));

// These are views that support the signup flow.
(function(sr_$, _shoprunner_com) {

	// Save Reference to View Object
	var viewRef = sr_$.views;

	viewRef.welcome = function() {
		// Setup generic view object and defaults
		var viewObj = viewRef.createViewObject();
		var partnerInfo = sr_$.partner_info[_shoprunner_com.retailerID.toUpperCase()];
		var modalData = {
			hero_img: sr_$.panelImage || (sr_$.assetDomain + "static/frontweb/stores/panels/" + _shoprunner_com.retailerID + ".jpg"),
			partner_name : (partnerInfo.domain) ? partnerInfo.domain : partnerInfo.name,
			isStandardSignup: (sr_$.model.modalState.typeOfSignup != "amex_signup"),
			isAmexSignup: (sr_$.model.modalState.typeOfSignup == "amex_signup")
		};
		var template = sr_$.templates.getTemplate("welcome");

		// Compile Template with Partials and Data
		viewObj.html = template(modalData);

		viewObj.onload = function() {
			sr_$.track.pageView({page: "rpik_" + sr_$.model.modalState.signupType + "_success"});

			// If MOV is active we show MOV modal after user closes 'welcome' modal if below threshold otherwise close 'welcome' modal
			sr_$.jQ(".sr_UI_close,#mobile_header_close_button, .sr_signup_amex_try_btn").bind("click", function(evt) {
				if (sr_$.sso.isIosPlatform()) {
					sr_$.sso.set4Ios();
					sr_$.actions.close();
				}
				if (sr_$.mov && _shoprunner_com.cart && _shoprunner_com.cart.srSubTotal && sr_$.mov.getBalance() > 0) {
					evt.stopPropagation();
					sr_$.Modal.modal('mov');
					sr_$.mov.updateSessionSubtotal();
					sr_$.mov.updateLastSubtotal();
				} else {
					sr_$.Modal.close();
				}

				sr_$.refresh_page();
			});
		};

		// Return object
		viewObj.type = "modal";
		viewObj.className = "sr_signup";

		return viewObj;
	};

	viewRef.pik_personalize = function() {
		// Setup generic view object and defaults
		var viewObj = viewRef.createViewObject();

		// load your group assignment or pick one if you haven't been assigned.
		var newLearnMoreGroup = sr_$.model.showNewLearnMore && sr_$.nlm && sr_$.nlm();

		var modalData = {
			partner_name : sr_$.partner_info[_shoprunner_com.retailerID.toUpperCase()].name
		};

		var template = sr_$.templates.getTemplate("pik_personalize");

		// Compile Template with Partials and Data
		viewObj.html = template(modalData);

		viewObj.onload = function() {
			sr_$.track.pageView({page: "rpik_pik_personalize"});

			// Bind to Skip
			sr_$.jQ(".sr_UI_close").bind("click", function(event) {
				sr_$.Modal.modal("welcome");
				sr_$.track.pageView({page: "rpik_pik_personalize_skipped"});
				event.stopPropagation();
			});

			sr_$.jQ(".sr_btn_toggle").not(".sr_personal_gender").bind("click", function() {
				// If one is selected
				if (sr_$.jQ(".sr_personal_gender").filter(".sr_btn_toggle_selected").length) {
					sr_$.jQ(this).toggleClass("sr_btn_toggle_selected");
				} else {

				}
			});
			sr_$.jQ(".sr_personal_gender").bind("click", function() {
				if (sr_$.jQ(".sr_personal_gender").filter(".sr_btn_toggle_selected").length > 0) {
					sr_$.jQ(".sr_personal_gender").toggleClass("sr_btn_toggle_selected");
				} else {
					sr_$.jQ(this).toggleClass("sr_btn_toggle_selected");
				}
			});

			sr_$.jQ("#sr_pik_personalize").bind("submit", function() {
				// Get Values
				var personalizerObj = {
					gender: "",
					shop_for: "",
					age_to: "",
					age_from: ""
				};

				personalizerObj.gender = sr_$.jQ(".sr_personal_gender").filter(".sr_btn_toggle_selected").attr("data_val");
				sr_$.jQ(".sr_personal_shopfor").filter(".sr_btn_toggle_selected").each(function(item) {
					if (personalizerObj.shop_for != "") {
						personalizerObj.shop_for += ",";
					}
					personalizerObj.shop_for += sr_$.jQ(this).attr("data_val");
				});

				var selectedAge = sr_$.jQ(".sr_personal_age option:selected");
				personalizerObj.age_from = selectedAge.attr("data_min");
				personalizerObj.age_to = selectedAge.attr("data_max");

				// Validation
				// If data is empty, assume skipping
				if (personalizerObj.gender == "" || typeof personalizerObj.gender == "undefined") {
					// Goto Welcome Screen
					sr_$.Modal.modal("welcome");
					sr_$.track.pageView({page: "rpik_pik_personalize_skipped"});
				} else {
					// Save
					sr_$.savePikPersonalizerInfo(personalizerObj);

					// Submit
					sr_$.submitPikPersonalizerInfo();

					// Completed Info Analytics
					sr_$.track.pageView({page: "rpik_pik_personalize_submitted"});
				}

				return false;
			});
		};

		// Return object
		viewObj.type = "modal";
		viewObj.className = "sr_signup sr_personalize";

		if (newLearnMoreGroup != 4) {
			viewObj.header = {type: "overlay_white_logo"};
		} else {
			viewObj.className += " sr_nlm_personalize";
		}

		return viewObj;
	};

	// Standard Signup Account Information
	viewRef.signup_account = function() {
		// Setup generic view object and defaults
		var viewObj = viewRef.createViewObject();

		var modalData = {};

		// Setup Base Template
		var template = sr_$.templates.getTemplate("base_signup_template");

		viewObj.viewClass = "body-sr-signup-account";

		// Setup Partial Templates
		if (sr_$.model.amexEnabled) {
			modalData = {
				modal: {
					title: ""
				},
				amexEnabled: sr_$.model.amexEnabled
			};
			sr_$.templates.registerPartial("__LeftPartial", sr_$.templates.getTemplateHtml("signup_account_left"));
		} else {
			modalData = {
				modal: {
					title: "Set-Up Payment & Address",
					list: [
						{text: "Free 2-Day Shipping on Eligible Items"},
						{text: "Free Shipping on Returns"},
						{text: "Shop Thousands of Brands"}
					]
				}
			};
		}

		modalData.retailerName = sr_$.partner_info[_shoprunner_com.retailerID.toUpperCase()].name;

		if (sr_$.model.spendAndGet) {
			if (!sr_$.model.amexEnabled) {
				modalData.modal.title = "Set-Up Your Account";
			}

			if (sr_$.model.spendAndGet.group == 2) {
				modalData.modal.lastStep = true;
			}
		}

		// Left Lower Partial

		// Right Partial
		sr_$.templates.registerPartial("__RightPartial", sr_$.templates.getTemplateHtml("signup_account_right"));

		// Compile Template with Partials and Data
		viewObj.html = template(modalData);

		// Onload Function is available if needed
		viewObj.onload = function() {
			sr_$.track.pageView({page: "rpik_std_signup_step1_mbr_info"});

			sr_$.jQ(".sr-info-box").bind("click", viewRef.sr_info_box_handler);

			// BInd the See if you are eligible button
			sr_$.jQ("#sr_signup_sidebar_amex_try_btn").bind("click", function() {
				sr_$.Modal.modal("amex_eligible");
			});

			// if you're in spend and get group 2, we need to wire up the TOS checkbox.
			if (sr_$.model.spendAndGet && sr_$.model.spendAndGet.group == 2) {
				// Bind to TOS Checkbox
				var tosCheck = function() {
					if (sr_$.jQ(this).attr("checked")) {
						sr_$.jQ("#sr_agreeTOS").closest("form").find("input[type=submit]").removeClass("sr_disabled");
					} else {
						sr_$.jQ("#sr_agreeTOS").closest("form").find("input[type=submit]").addClass("sr_disabled");
					}
				};

				// Bind to Checkbox Change
				sr_$.jQ("#sr_signup_account").find("#sr_agreeTOS").bind("change", tosCheck);

				// Setup the Disabled Button Correctly
				tosCheck();
			}

			// if you're in nlm3 group 5, fill in the email and password fields.
			var newLearnMoreGroup = sr_$.nlm && sr_$.nlm();
			if (newLearnMoreGroup == 5) {
				setTimeout(function() {
					sr_$.jQ('#sr_signup_email').val(sr_$.model.account.email);
					sr_$.jQ('#sr_signup_password').val(sr_$.model.account.password);

					// if chrome autofills the email confirmation field, overwrite it
					// because it might've been autofilled incorrectly.
					if (sr_$.jQ('#sr_signup_email_2').val()) {
						sr_$.jQ('#sr_signup_email_2').val(sr_$.model.account.email);
					}
				}, 20);
			}

			// Bind the Submit Button to goto the next view temporarily
			sr_$.jQ("#sr_signup_account").bind("submit", function() {

				var passwordValidated = viewRef.validate_password();
				if (passwordValidated) {
					sr_$.jQ("#sr_signup_password_info").removeClass("sr-error");
				} else {
					sr_$.jQ("#sr_signup_password_info").addClass("sr-error");
				}

				var validated = (
					viewRef.validate_not_empty() &&
					passwordValidated &&
					viewRef.validate_same() &&
					viewRef.validate_email()
				);

				if (validated) {
					// Save Valid Data
					accountInfo = {
						firstName: sr_$.jQ("#sr_signup_first_name").val(),
						lastName: sr_$.jQ("#sr_signup_last_name").val(),
						email: sr_$.jQ("#sr_signup_email").val(),
						password: sr_$.jQ("#sr_signup_password").val(),
						membership: sr_$.jQ.trim(sr_$.model.account.defaultMembership)
					};

					// Save Account Info
					sr_$.saveAccountInfo(accountInfo);

					// if you're in spend and get group 2, this is the last signup step.
					if (sr_$.model.spendAndGet && sr_$.model.spendAndGet.group == 2) {
						if (!sr_$.jQ("#sr_agreeTOS").prop("checked")) {
							return false;
						}
						sr_$.standardSignUpSubmit();
					} else {
						// Goto Next Modal
						sr_$.Modal.modal("signup_billing");
					}
				}
				return false;
			});
		};

		viewObj.type = "modal";
		viewObj.className = "sr_signup";
		viewObj.header = {type: "overlay_white_logo"};

		return viewObj;
	};

	// Standard signup billing information.
	viewRef.signup_billing = function() {
        //Call pik proxy for partial signup on second page load.
        sr_$.savePartialSignup();

		// Setup generic view object and defaults
		var viewObj = viewRef.createViewObject();
		viewObj.header = {type: "overlay_white_logo"};

		var modalData;

		// BUGBUG: This needs to be refactored
		if (sr_$.model.spendAndGet) {
			// Spend and Get
			modalData = {
				modal: {
					title: "Why Are We Asking For Your Credit Card?"
				}
			};
		} else if (sr_$.model.account.defaultMembership == "REGULAR") {
			// $79 Member Type
			modalData = {
				modal: {
					title: "Set-Up Payment & Address",
					list: [
						{text: "Free 2-Day Shipping on Eligible Items"},
						{text: "Free Shipping on Returns"},
						{text: "Shop Thousands of Brands"}
					]
				}
			};
		} else {
			// Default Membership
			modalData = {
				modal: {
					title: "Set-Up Payment & Address",
					list: [
						{text: "Free 2-Day Shipping on Eligible Items"},
						{text: "Free Shipping on Returns"},
						{text: "Shop Thousands of Brands"},
						{text: "<b>Try it Free for 30-Days</b>"}
					]
				}
			};
		}

		// Setup base template.
		var template;

		var newLearnMoreGroup = sr_$.nlm && sr_$.nlm();
		template = sr_$.templates.getTemplate("base_signup_template");

		viewObj.viewClass = "body-sr-signup-credit-card myriad-light";

		// Setup partial templates.
		// Left Partial
		sr_$.templates.registerPartial("__LeftPartial", sr_$.templates.getTemplateHtml("signup_billing_left"));

		// Right Partial
		sr_$.templates.registerPartial("__RightPartial", sr_$.templates.getTemplateHtml("signup_billing_right"));

		// Compile Template with Partials and Data
		viewObj.html = template(modalData);

		// Onload Function is available if needed
		viewObj.onload = function() {

			sr_$.track.pageView({page: "rpik_std_signup_step2_cc_info"});

			// Expiration
			sr_$.jQ('#sr_signup_expiration').mask("99/9999");

			// Bind to TOS Checkbox
			var tosCheck = function() {
				if (sr_$.jQ(this).attr("checked")) {
					sr_$.jQ("#sr_agreeTOS").closest("form").find(":submit").removeClass("sr_disabled");
				} else {
					sr_$.jQ("#sr_agreeTOS").closest("form").find(":submit").addClass("sr_disabled");
				}
			};

			// Bind to Checkbox Change
			sr_$.jQ("#sr_signup_billing").find("#sr_agreeTOS").bind("change",tosCheck);

			// Setup the Disabled Button Correctly
			tosCheck();

			// Bind the Submit Button to goto the next view temporarily
			sr_$.jQ("#sr_signup_billing").bind("submit", function() {
				// Validation
				if (!sr_$.jQ("#sr_agreeTOS").attr("checked")) {
					return false;
				}

				var ccn = sr_$.jQ("#sr_signup_card_number").val();
				var cvv = sr_$.jQ("#sr_signup_cvv").val() || "";

				var isTestCard = (
					ccn == "372700997251001" ||
					ccn == "372700997251002" ||
					ccn == "372700997251003" ||
					ccn == "372700997251004" ||
					ccn == "372700997251005"
				);

				var validatedCreditCardNumber = isTestCard || viewRef.validate_credit_card_number();

				if (!validatedCreditCardNumber) {
					sr_$.jQ("#sr_signup_error").text("The credit card number does not seem correct. We accept American Express, Visa, MasterCard, and Discover.");
					sr_$.jQ(".sr-signup-info").addClass("hide");
				}

				var validatedZip = !sr_$.jQ("#sr_signup_zip").is(":visible") || viewRef.validate_zip();

				var validated = (
					validatedCreditCardNumber &&
					viewRef.validate_cvv() &&
					viewRef.validate_expiration() &&
					viewRef.validate_not_empty() &&
					viewRef.validate_checked() &&
					viewRef.validate_state() &&
					validatedZip
				);

				if (validated) {
					// Get Data
					var expiration = sr_$.jQ("#sr_signup_expiration").val();

					// splitting should be safe here since we've passed validate_expiration()
					var expirationMonth = expiration.split("/")[0];
					var expirationYear = expiration.split("/")[1];

					viewRef.replace_button();

					var getValue = function(element) {
						return sr_$.jQ.trim(sr_$.jQ(element).val());
					};

					var firstName = getValue("#sr_signup_first_name");
					var middleInitial = getValue("#sr_signup_middle_initial");
					var lastName = getValue("#sr_signup_last_name");
					var cardNumber = getValue("#sr_signup_card_number");
					cvv = getValue("#sr_signup_cvv");
					var address = getValue("#sr_signup_address");
					var city = getValue("#sr_signup_city");
					var state = getValue("#sr_signup_state");
					var zip = getValue("#sr_signup_zip");
					var acceptedTos = sr_$.jQ("#sr_tos_checkbox").hasClass("selected");
					var ccType = viewRef.ccType(cardNumber);

					var billingInfo = {
						firstName: firstName,
						middleInitial: middleInitial,
						lastName: lastName,
						cardNumber: cardNumber,
						expiration_month: expirationMonth,
						expiration_year: expirationYear,
						cvv: cvv,
						address: address,
						city: city,
						state: state,
						zip: zip,
						acceptedTos: acceptedTos,
						ccType: ccType,
						ssoChecked: (sr_$.jQ("#sr_keepSignedIn").attr("checked")) ? true : false
					};

					// Save Billing Info
					sr_$.saveBillingInfo(billingInfo);
					sr_$.model.learnMoreClicked = true;
					sr_$.model.signInClicked = false;

					// Submit Signup (Add Data is available)
					sr_$.standardSignUpSubmit();
				}
				return false;
			});
		};

		viewObj.type = "modal";
		viewObj.className = "sr_signup";

		return viewObj;
	};

	// Input Hint Functionality
	viewRef.init_input_hint = function() {
		sr_$.jQ(".sr-input-has-hint").each(function(i, e) {
			if (sr_$.jQ(this).val() != "") {
				sr_$.jQ(this).siblings(".sr-input-hint").hide();
			}
		});
		sr_$.jQ(".sr-input-has-hint").on("input keypress", function() {
			if (sr_$.jQ(this).val() != "") {
				sr_$.jQ(this).siblings(".sr-input-hint").hide();
			}
		});
		sr_$.jQ(".sr-input-has-hint").on("input keyup", function() {
			if (sr_$.jQ(this).val() == "") {
				sr_$.jQ(this).siblings(".sr-input-hint").show();
			}
		});
		sr_$.jQ(".sr-input-hint").click(function() {
			sr_$.jQ(this).siblings(".sr-input-has-hint").focus();
		});

		sr_$.jQ(".sr-signup-info-button").on("click", function() {
			var group = sr_$.jQ(this).attr("group");
			sr_$.jQ('.sr-signup-info[group="' + group + '"]').toggleClass('hide');
			sr_$.jQ('#sr_signup_error').text('');
		});
	};

	viewRef.displaySignUpError = function(errorText) {
		if (sr_$.jQ("#sr_signup_error")) {
			sr_$.jQ("#sr_signup_error").text(errorText);
		}
	};

}(sr_$, _shoprunner_com));

// These are views that support the signin flow.
(function(sr_$) {

	// Save Reference to View Object
	var viewRef = sr_$.views;

	viewRef.signed_in = function() {
		var viewObj = viewRef.createViewObject();
		var template = sr_$.templates.getTemplate("signed_in_modal");

		viewObj.html = template({});
		viewObj.onload = function() {
			sr_$.jQ("#sr_amex_welcome_continue").bind("click", function() {
				sr_$.Modal.close();
			});
		};

		viewObj.type = "modal";
		viewObj.className = "sr_signup sr_amex sr_amex_title";

		return viewObj;
	};

	viewRef.dual_eligibility = function() {
		var viewObj = viewRef.createViewObject();
		var template = sr_$.templates.getTemplate("dual_eligibility");

		viewObj.html = template({});
		viewObj.onload = function() {
			sr_$.jQ("#sr_continue").bind("click", function() {
				sr_$.Modal.close();
			});
		};

		viewObj.type = "modal";
		viewObj.className = "sr_signup sr_amex sr_amex_title";

		return viewObj;
	};

	// Standard Signup Account Information
	viewRef.sign_in = function(data) {
		if (typeof sr_$.signInClickCallBack == "function") {
			sr_$.signInClickCallBack();
		}

		// Setup generic view object and defaults.
		var viewObj = viewRef.createViewObject();

		var assetName = sr_$.model.config.signInAssetName || sr_$.model.config.assetName;

		var modalData = {
			hero_img: sr_$.panelImage || (sr_$.assetDomain + "static/frontweb/stores/panels/" + assetName + ".jpg"),
			keep_me_signed_in : true,
			signin_learn_more_link_allowed : sr_$.model.signin_display_learn_more,
			email : sr_$.conf ? sr_$.conf.email : ""
		};

		// get the current scope. kind of like the referrer.
		var prevScope = sr_$.UI_manager.getModalScope();

		if (prevScope == "ec") {
			modalData.header_text = "You're just <b>2 clicks</b> away from your purchase! Please sign in to ShopRunner to continue.";
			modalData.keep_me_signed_in = false;
			modalData.not_a_member = false;
		} else if (prevScope == "forgot_password") {
			modalData.header_text = "<b>Your password has been reset!</b><br/> Please check your email to continue resetting your password.";

		} else {
			modalData.header_text = "Welcome back!<br/> Please sign in to ShopRunner to continue.";
		}

		if (typeof data != "undefined") {
			modalData = data;
			viewObj.header = data.header;
		}
        var signin_experiment = false;
        var cart;
        try{
            signin_experiment = parseInt(sr_$.experiments.ssc.version);
            cart = getPRCart()['cart'];
            if (cart.products.length == 0)
                signin_experiment = false;
            if(sr_$.model.modalState.clickLocation != 'cart')
                signin_experiment = false;
        }
        catch(err){
            signin_experiment = false;
        }
        var template;
        if (signin_experiment){
            // Setup generic summary view object and defaults.
            modalData = sr_$.payrunner.Views.createSummaryData();
            modalData.keep_me_signed_in = true;
            modalData.signin_learn_more_link_allowed = sr_$.model.signin_display_learn_more;
            modalData.email = sr_$.conf ? sr_$.conf.email : "";
            modalData['cartInfo'] = getPRCart()['cart'];
            modalData.cartInfo.hidePrices = true;
            // Setup Base Template
            template = sr_$.templates.getTemplate("sr_SigninSummary");
		    viewObj.className = "xc_signin_summary";

        }
        else{
            // Setup Base Template
            template = sr_$.templates.getTemplate("signin_template");
		    viewObj.className = "sr_modal_transactional";
        }

		// Compile template with partials and data.
		viewObj.html = template(modalData);
		viewObj.type = "modal";
		viewObj.scope = "sign_in";

		// Onload function is available if needed.
		viewObj.onload = function() {
			sr_$.track.pageView({page: "rpik_signin"});
			sr_$.jQ("#sr_modal").on("click", "#mobile_header_close_button", function() {
				sr_$.Modal.close();
			});

			sr_$.jQ("#sr_forgot_pwd_link").on("click", function() {
				sr_$.forgot_password_email = sr_$.jQ("#sr_signin_email").val();
				sr_$.Modal.modal("forgot_password");
			});
			sr_$.jQ(".sr_action__lm").on("click", function() {
				sr_$.Modal.modal("learn_more");
			});


			// Initialize input hints.
			viewRef.init_input_hint();

			var formSubmit = function(event) {
				var validated = viewRef.validate_not_empty() && viewRef.validate_email();

				if (validated) {
					viewRef.replace_button();
					var signInInfo = {
						ssoToken: "",
						email: sr_$.jQ.trim(sr_$.jQ("#sr_signin_email").val()),
						password: sr_$.jQ.trim(sr_$.jQ("#sr_signin_password").val()),
						ssoChecked: sr_$.jQ("#sr_keepSignedIn").attr("checked") == "checked"
					};

					sr_$.saveSignInInfo(signInInfo);
					sr_$.model.modalState.signInClicked = true;
					sr_$.model.modalState.learnMoreClicked = false;
					sr_$.signInSubmit();
				}

				event.preventDefault();
			};

			// Bind the Submit Button to goto the next view temporarily.
			sr_$.jQ("#sr_sign_in_button").bind("click", formSubmit);
			sr_$.jQ("#sr_loginForm_box").bind("submit", formSubmit);
		};

		// Return object
		return viewObj;
	};

	viewRef.forgot_password = function() {
		// Setup generic view object and defaults
		var viewObj = viewRef.createViewObject();

		var assetName = sr_$.model.config.signInAssetName || sr_$.model.config.assetName;

		var modalData = {
			hero_img: sr_$.panelImage || (sr_$.assetDomain +"static/frontweb/stores/panels/" + assetName + ".jpg"),
			email : sr_$.forgot_password_email
		};

		// Setup base template.
		var template = sr_$.templates.getTemplate("forgot_password");

		viewObj.viewClass = "body-sr-signup-account myriad-light";

		// Compile template with partials and data.
		viewObj.html = template(modalData);

		viewObj.scope = "forgot_password";

		// Onload function is available if needed.
		viewObj.onload = function() {
			sr_$.track.pageView({page: "rpik_forgot_password"});
			sr_$.jQ("#mobile_header_close_button").on("click", function() {
				sr_$.Modal.close();
			});

			sr_$.jQ("#sr_return_signin_btn").bind("click", function() {
				sr_$.Modal.modal("sign_in");
			});

			// Bind the Submit Button to goto the next view temporarily.
			sr_$.jQ("#sr_forgotPassword_form").bind("submit", function() {
				var validated = viewRef.validate_not_empty() && viewRef.validate_email();

				if (validated) {
					// viewRef.replace_button();
					sr_$.UI_manager.busy(true, "resetting password");
					sr_$.forgotPasswordSubmit(sr_$.jQ("#sr_forgot_email").val());
				}
				return false;
			});

			// Initialize input hints.
			viewRef.init_input_hint();
		};

		viewObj.className = "sr_modal_transactional";

		// Return object
		return viewObj;
	};

	// use closeCallback to use a custom function for when user closes the welcome back modal
	viewRef.welcome_back = function(closeCallback) {
		// Setup generic view object and defaults
		var viewObj = viewRef.createViewObject();

		//amountNeeded only set if partner has MOV module
		if (sr_$.mov) {
			var amountNeeded = sr_$.mov.getBalance();
		}

		var modalData = {
			hero_img: sr_$.panelImage || (sr_$.assetDomain +"static/frontweb/stores/panels/" + sr_$.model.config.assetName + ".jpg"),
			amountNeeded: amountNeeded,
			showMov: _shoprunner_com.cart && amountNeeded > 0
		};

		// Setup Base Template
		var template = sr_$.templates.getTemplate("welcome_back");

		// Compile Template with Partials and Data
		viewObj.html = template(modalData);

		// Onload Function is available if needed
		viewObj.onload = function() {
			sr_$.track.pageView({page: "rpik_welcome_back"});

			var modalClose;
			var onClose = function() {
				if (modalClose) {
					clearTimeout(modalClose);
				}

				if (sr_$.sso.isIosPlatform()) {
					sr_$.sso.set4Ios();
				}

				if (sr_$.jQ.isFunction(closeCallback)) {
					closeCallback();
				}

				sr_$.refresh_page();
				sr_$.actions.close();
				return false;
			};

			sr_$.jQ("#sr_close, #sr_header_close").bind("click", onClose);

			if (!sr_$.sso.isIosPlatform()) {
				modalClose = setTimeout(onClose, 6000);
			}
		};
		viewObj.className = "sr_modal_transactional";

		// Return object
		return viewObj;

	};


	viewRef.displaySignInError = function(errorText) {
		if (sr_$.jQ("#sr_signup_error")) {
			sr_$.jQ("#sr_signup_error").text(errorText);
			sr_$.jQ(".sr-signup-info").addClass("hide");
			viewRef.unreplace_button();
		}
	};

	viewRef.displayForgotPasswordMessage = function(status, message) {
		if (status) {
			sr_$.Modal.modal("signup_account");
		} else {
			sr_$.UI_manager.errors.clear(true);
			sr_$.UI_manager.errors.show({html: message});
			viewRef.unreplace_button();
		}
	};

	viewRef.amex_cancelled_member = function() {
		var viewObj = viewRef.createViewObject();
		var flt = sr_$.templates.getTemplate("sr_amex_cancelled_member");
		viewObj.html = flt({expiry_date: sr_$.expiry_date});
		return viewObj;
	};

}(sr_$));

// Add Handlebars Templating Engine
sr_$ = (function (sr_obj) {
    //HandleBars-1.0.0 version
    sr_obj.handlebars = (function () {
        // handlebars/safe-string.js
        var __module4__ = (function () {
            "use strict";
            var __exports__;
            // Build out our basic SafeString type
            function SafeString(string) {
                this.string = string;
            }

            SafeString.prototype.toString = function () {
                return "" + this.string;
            };

            __exports__ = SafeString;
            return __exports__;
        })();

        // handlebars/utils.js
        var __module3__ = (function (__dependency1__) {
            "use strict";
            var __exports__ = {};
            /*jshint -W004 */
            var SafeString = __dependency1__;

            var escape = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            };

            var badChars = /[&<>"'`]/g;
            var possible = /[&<>"'`]/;

            function escapeChar(chr) {
                return escape[chr] || "&amp;";
            }

            function extend(obj, value) {
                for (var key in value) {
                    if (Object.prototype.hasOwnProperty.call(value, key)) {
                        obj[key] = value[key];
                    }
                }
            }

            __exports__.extend = extend;
            var toString = Object.prototype.toString;
            __exports__.toString = toString;
            // Sourced from lodash
            // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
            var isFunction = function (value) {
                return typeof value === 'function';
            };
            // fallback for older versions of Chrome and Safari
            if (isFunction(/x/)) {
                isFunction = function (value) {
                    return typeof value === 'function' && toString.call(value) === '[object Function]';
                };
            }
            var isFunction;
            __exports__.isFunction = isFunction;
            var isArray = Array.isArray || function (value) {
                    return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
                };
            __exports__.isArray = isArray;

            function escapeExpression(string) {
                // don't escape SafeStrings, since they're already safe
                if (string instanceof SafeString) {
                    return string.toString();
                } else if (!string && string !== 0) {
                    return "";
                }

                // Force a string conversion as this will be done by the append regardless and
                // the regex test will do this transparently behind the scenes, causing issues if
                // an object's to string has escaped characters in it.
                string = "" + string;

                if (!possible.test(string)) {
                    return string;
                }
                return string.replace(badChars, escapeChar);
            }

            __exports__.escapeExpression = escapeExpression;

            function isEmpty(value) {
                if (!value && value !== 0) {
                    return true;
                } else if (isArray(value) && value.length === 0) {
                    return true;
                } else {
                    return false;
                }
            }

            __exports__.isEmpty = isEmpty;
            return __exports__;
        })(__module4__);

        // handlebars/exception.js
        var __module5__ = (function () {
            "use strict";
            var __exports__;

            var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

            function Exception(message, node) {
                var line;
                if (node && node.firstLine) {
                    line = node.firstLine;

                    message += ' - ' + line + ':' + node.firstColumn;
                }

                var tmp = Error.prototype.constructor.call(this, message);

                // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
                for (var idx = 0; idx < errorProps.length; idx++) {
                    this[errorProps[idx]] = tmp[errorProps[idx]];
                }

                if (line) {
                    this.lineNumber = line;
                    this.column = node.firstColumn;
                }
            }

            Exception.prototype = new Error();

            __exports__ = Exception;
            return __exports__;
        })();

        // handlebars/base.js
        var __module2__ = (function (__dependency1__, __dependency2__) {
            "use strict";
            var __exports__ = {};
            var Utils = __dependency1__;
            var Exception = __dependency2__;

            var VERSION = "1.3.0";
            __exports__.VERSION = VERSION;
            var COMPILER_REVISION = 4;
            __exports__.COMPILER_REVISION = COMPILER_REVISION;
            var REVISION_CHANGES = {
                1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
                2: '== 1.0.0-rc.3',
                3: '== 1.0.0-rc.4',
                4: '>= 1.0.0'
            };
            __exports__.REVISION_CHANGES = REVISION_CHANGES;
            var isArray = Utils.isArray,
                isFunction = Utils.isFunction,
                toString = Utils.toString,
                objectType = '[object Object]';

            function HandlebarsEnvironment(helpers, partials) {
                this.helpers = helpers || {};
                this.partials = partials || {};

                registerDefaultHelpers(this);
            }

            __exports__.HandlebarsEnvironment = HandlebarsEnvironment;
            HandlebarsEnvironment.prototype = {
                constructor: HandlebarsEnvironment,

                logger: logger,
                log: log,

                registerHelper: function (name, fn, inverse) {
                    if (toString.call(name) === objectType) {
                        if (inverse || fn) {
                            throw new Exception('Arg not supported with multiple helpers');
                        }
                        Utils.extend(this.helpers, name);
                    } else {
                        if (inverse) {
                            fn.not = inverse;
                        }
                        this.helpers[name] = fn;
                    }
                },

                registerPartial: function (name, str) {
                    if (toString.call(name) === objectType) {
                        Utils.extend(this.partials, name);
                    } else {
                        this.partials[name] = str;
                    }
                }
            };

            function registerDefaultHelpers(instance) {
                instance.registerHelper('helperMissing', function (arg) {
                    if (arguments.length === 2) {
                        return undefined;
                    } else {
                        throw new Exception("Missing helper: '" + arg + "'");
                    }
                });

                instance.registerHelper('blockHelperMissing', function (context, options) {
                    var inverse = options.inverse || function () {}, fn = options.fn;

                    if (isFunction(context)) {
                        context = context.call(this);
                    }

                    if (context === true) {
                        return fn(this);
                    } else if (context === false || context == null) {
                        return inverse(this);
                    } else if (isArray(context)) {
                        if (context.length > 0) {
                            return instance.helpers.each(context, options);
                        } else {
                            return inverse(this);
                        }
                    } else {
                        return fn(context);
                    }
                });

                instance.registerHelper('each', function (context, options) {
                    var fn = options.fn,
                        inverse = options.inverse;
                    var i = 0,
                        ret = "",
                        data;

                    if (isFunction(context)) {
                        context = context.call(this);
                    }

                    if (options.data) {
                        data = createFrame(options.data);
                    }

                    if (context && typeof context === 'object') {
                        if (isArray(context)) {
                            for (var j = context.length; i < j; i++) {
                                if (data) {
                                    data.index = i;
                                    data.first = (i === 0);
                                    data.last = (i === (context.length - 1));
                                }
                                ret = ret + fn(context[i], {
                                    data: data
                                });
                            }
                        } else {
                            for (var key in context) {
                                if (context.hasOwnProperty(key)) {
                                    if (data) {
                                        data.key = key;
                                        data.index = i;
                                        data.first = (i === 0);
                                    }
                                    ret = ret + fn(context[key], {
                                        data: data
                                    });
                                    i++;
                                }
                            }
                        }
                    }

                    if (i === 0) {
                        ret = inverse(this);
                    }

                    return ret;
                });

                instance.registerHelper('if', function (conditional, options) {
                    if (isFunction(conditional)) {
                        conditional = conditional.call(this);
                    }

                    // Default behavior is to render the positive path if the value is truthy and not empty.
                    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
                    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
                    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
                        return options.inverse(this);
                    } else {
                        return options.fn(this);
                    }
                });

                instance.registerHelper('unless', function (conditional, options) {
                    return instance.helpers['if'].call(this, conditional, {
                        fn: options.inverse,
                        inverse: options.fn,
                        hash: options.hash
                    });
                });

                instance.registerHelper('with', function (context, options) {
                    if (isFunction(context)) {
                        context = context.call(this);
                    }

                    if (!Utils.isEmpty(context)) return options.fn(context);
                });

                instance.registerHelper('log', function (context, options) {
                    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
                    instance.log(level, context);
                });
            }

            var logger = {
                methodMap: {
                    0: 'debug',
                    1: 'info',
                    2: 'warn',
                    3: 'error'
                },

                // State enum
                DEBUG: 0,
                INFO: 1,
                WARN: 2,
                ERROR: 3,
                level: 3,

                // can be overridden in the host environment
                log: function (level, obj) {
                    if (logger.level <= level) {
                        var method = logger.methodMap[level];
                        if (typeof console !== 'undefined' && console[method]) {
                            console[method].call(console, obj);
                        }
                    }
                }
            };
            __exports__.logger = logger;

            function log(level, obj) {
                logger.log(level, obj);
            }

            __exports__.log = log;
            var createFrame = function (object) {
                var obj = {};
                Utils.extend(obj, object);
                return obj;
            };
            __exports__.createFrame = createFrame;
            return __exports__;
        })(__module3__, __module5__);

        // handlebars/runtime.js
        var __module6__ = (function (__dependency1__, __dependency2__, __dependency3__) {
            "use strict";
            var __exports__ = {};
            var Utils = __dependency1__;
            var Exception = __dependency2__;
            var COMPILER_REVISION = __dependency3__.COMPILER_REVISION;
            var REVISION_CHANGES = __dependency3__.REVISION_CHANGES;

            function checkRevision(compilerInfo) {
                var compilerRevision = compilerInfo && compilerInfo[0] || 1,
                    currentRevision = COMPILER_REVISION;

                if (compilerRevision !== currentRevision) {
                    if (compilerRevision < currentRevision) {
                        var runtimeVersions = REVISION_CHANGES[currentRevision],
                            compilerVersions = REVISION_CHANGES[compilerRevision];
                        throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. " +
                            "Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ").");
                    } else {
                        // Use the embedded version info since the runtime doesn't know about this revision yet
                        throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. " +
                            "Please update your runtime to a newer version (" + compilerInfo[1] + ").");
                    }
                }
            }

            __exports__.checkRevision = checkRevision; // TODO: Remove this line and break up compilePartial

            function template(templateSpec, env) {
                if (!env) {
                    throw new Exception("No environment passed to template");
                }

                // Note: Using env.VM references rather than local var references throughout this section to allow
                // for external users to override these as psuedo-supported APIs.
                var invokePartialWrapper = function (partial, name, context, helpers, partials, data) {
                    var result = env.VM.invokePartial.apply(this, arguments);
                    if (result != null) {
                        return result;
                    }

                    if (env.compile) {
                        var options = {
                            helpers: helpers,
                            partials: partials,
                            data: data
                        };
                        partials[name] = env.compile(partial, {
                            data: data !== undefined
                        }, env);
                        return partials[name](context, options);
                    } else {
                        throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
                    }
                };

                // Just add water
                var container = {
                    escapeExpression: Utils.escapeExpression,
                    invokePartial: invokePartialWrapper,
                    programs: [],
                    program: function (i, fn, data) {
                        var programWrapper = this.programs[i];
                        if (data) {
                            programWrapper = program(i, fn, data);
                        } else if (!programWrapper) {
                            programWrapper = this.programs[i] = program(i, fn);
                        }
                        return programWrapper;
                    },
                    merge: function (param, common) {
                        var ret = param || common;

                        if (param && common && (param !== common)) {
                            ret = {};
                            Utils.extend(ret, common);
                            Utils.extend(ret, param);
                        }
                        return ret;
                    },
                    programWithDepth: env.VM.programWithDepth,
                    noop: env.VM.noop,
                    compilerInfo: null
                };

                return function (context, options) {
                    options = options || {};
                    var namespace = options.partial ? options : env,
                        helpers,
                        partials;

                    if (!options.partial) {
                        helpers = options.helpers;
                        partials = options.partials;
                    }
                    var result = templateSpec.call(
                        container,
                        namespace, context,
                        helpers,
                        partials,
                        options.data);

                    if (!options.partial) {
                        env.VM.checkRevision(container.compilerInfo);
                    }

                    return result;
                };
            }

            __exports__.template = template;

            function programWithDepth(i, fn, data /*, $depth */ ) {
                var args = Array.prototype.slice.call(arguments, 3);

                var prog = function (context, options) {
                    options = options || {};

                    return fn.apply(this, [context, options.data || data].concat(args));
                };
                prog.program = i;
                prog.depth = args.length;
                return prog;
            }

            __exports__.programWithDepth = programWithDepth;

            function program(i, fn, data) {
                var prog = function (context, options) {
                    options = options || {};

                    return fn(context, options.data || data);
                };
                prog.program = i;
                prog.depth = 0;
                return prog;
            }

            __exports__.program = program;

            function invokePartial(partial, name, context, helpers, partials, data) {
                var options = {
                    partial: true,
                    helpers: helpers,
                    partials: partials,
                    data: data
                };

                if (partial === undefined) {
                    throw new Exception("The partial " + name + " could not be found");
                } else if (partial instanceof Function) {
                    return partial(context, options);
                }
            }

            __exports__.invokePartial = invokePartial;

            function noop() {
                return "";
            }

            __exports__.noop = noop;
            return __exports__;
        })(__module3__, __module5__, __module2__);

        // handlebars.runtime.js
        var __module1__ = (function (__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
            "use strict";
            var __exports__;
            /*globals Handlebars: true */
            var base = __dependency1__;

            // Each of these augment the Handlebars object. No need to setup here.
            // (This is done to easily share code between commonjs and browse envs)
            var SafeString = __dependency2__;
            var Exception = __dependency3__;
            var Utils = __dependency4__;
            var runtime = __dependency5__;

            // For compatibility and usage outside of module systems, make the Handlebars object a namespace
            var create = function () {
                var hb = new base.HandlebarsEnvironment();

                Utils.extend(hb, base);
                hb.SafeString = SafeString;
                hb.Exception = Exception;
                hb.Utils = Utils;

                hb.VM = runtime;
                hb.template = function (spec) {
                    return runtime.template(spec, hb);
                };

                return hb;
            };

            var Handlebars = create();
            Handlebars.create = create;

            __exports__ = Handlebars;
            return __exports__;
        })(__module2__, __module4__, __module5__, __module3__, __module6__);

        // handlebars/compiler/ast.js
        var __module7__ = (function (__dependency1__) {
            "use strict";
            var __exports__;
            var Exception = __dependency1__;

            function LocationInfo(locInfo) {
                locInfo = locInfo || {};
                this.firstLine = locInfo.first_line;
                this.firstColumn = locInfo.first_column;
                this.lastColumn = locInfo.last_column;
                this.lastLine = locInfo.last_line;
            }

            var AST = {
                ProgramNode: function (statements, inverseStrip, inverse, locInfo) {
                    var inverseLocationInfo, firstInverseNode;
                    if (arguments.length === 3) {
                        locInfo = inverse;
                        inverse = null;
                    } else if (arguments.length === 2) {
                        locInfo = inverseStrip;
                        inverseStrip = null;
                    }

                    LocationInfo.call(this, locInfo);
                    this.type = "program";
                    this.statements = statements;
                    this.strip = {};

                    if (inverse) {
                        firstInverseNode = inverse[0];
                        if (firstInverseNode) {
                            inverseLocationInfo = {
                                first_line: firstInverseNode.firstLine,
                                last_line: firstInverseNode.lastLine,
                                last_column: firstInverseNode.lastColumn,
                                first_column: firstInverseNode.firstColumn
                            };
                            this.inverse = new AST.ProgramNode(inverse, inverseStrip, inverseLocationInfo);
                        } else {
                            this.inverse = new AST.ProgramNode(inverse, inverseStrip);
                        }
                        this.strip.right = inverseStrip.left;
                    } else if (inverseStrip) {
                        this.strip.left = inverseStrip.right;
                    }
                },

                MustacheNode: function (rawParams, hash, open, strip, locInfo) {
                    LocationInfo.call(this, locInfo);
                    this.type = "mustache";
                    this.strip = strip;

                    // Open may be a string parsed from the parser or a passed boolean flag
                    if (open != null && open.charAt) {
                        // Must use charAt to support IE pre-10
                        var escapeFlag = open.charAt(3) || open.charAt(2);
                        this.escaped = escapeFlag !== '{' && escapeFlag !== '&';
                    } else {
                        this.escaped = !! open;
                    }

                    if (rawParams instanceof AST.SexprNode) {
                        this.sexpr = rawParams;
                    } else {
                        // Support old AST API
                        this.sexpr = new AST.SexprNode(rawParams, hash);
                    }

                    this.sexpr.isRoot = true;

                    // Support old AST API that stored this info in MustacheNode
                    this.id = this.sexpr.id;
                    this.params = this.sexpr.params;
                    this.hash = this.sexpr.hash;
                    this.eligibleHelper = this.sexpr.eligibleHelper;
                    this.isHelper = this.sexpr.isHelper;
                },

                SexprNode: function (rawParams, hash, locInfo) {
                    LocationInfo.call(this, locInfo);

                    this.type = "sexpr";
                    this.hash = hash;

                    var id = this.id = rawParams[0];
                    var params = this.params = rawParams.slice(1);

                    // a mustache is an eligible helper if:
                    // * its id is simple (a single part, not `this` or `..`)
                    var eligibleHelper = this.eligibleHelper = id.isSimple;

                    // a mustache is definitely a helper if:
                    // * it is an eligible helper, and
                    // * it has at least one parameter or hash segment
                    this.isHelper = eligibleHelper && (params.length || hash);

                    // if a mustache is an eligible helper but not a definite
                    // helper, it is ambiguous, and will be resolved in a later
                    // pass or at runtime.
                },

                PartialNode: function (partialName, context, strip, locInfo) {
                    LocationInfo.call(this, locInfo);
                    this.type = "partial";
                    this.partialName = partialName;
                    this.context = context;
                    this.strip = strip;
                },

                BlockNode: function (mustache, program, inverse, close, locInfo) {
                    LocationInfo.call(this, locInfo);

                    if (mustache.sexpr.id.original !== close.path.original) {
                        throw new Exception(mustache.sexpr.id.original + " doesn't match " + close.path.original, this);
                    }

                    this.type = 'block';
                    this.mustache = mustache;
                    this.program = program;
                    this.inverse = inverse;

                    this.strip = {
                        left: mustache.strip.left,
                        right: close.strip.right
                    };

                    (program || inverse).strip.left = mustache.strip.right;
                    (inverse || program).strip.right = close.strip.left;

                    if (inverse && !program) {
                        this.isInverse = true;
                    }
                },

                ContentNode: function (string, locInfo) {
                    LocationInfo.call(this, locInfo);
                    this.type = "content";
                    this.string = string;
                },

                HashNode: function (pairs, locInfo) {
                    LocationInfo.call(this, locInfo);
                    this.type = "hash";
                    this.pairs = pairs;
                },

                IdNode: function (parts, locInfo) {
                    LocationInfo.call(this, locInfo);
                    this.type = "ID";

                    var original = "",
                        dig = [],
                        depth = 0;

                    for (var i = 0, l = parts.length; i < l; i++) {
                        var part = parts[i].part;
                        original += (parts[i].separator || '') + part;

                        if (part === ".." || part === "." || part === "this") {
                            if (dig.length > 0) {
                                throw new Exception("Invalid path: " + original, this);
                            } else if (part === "..") {
                                depth++;
                            } else {
                                this.isScoped = true;
                            }
                        } else {
                            dig.push(part);
                        }
                    }

                    this.original = original;
                    this.parts = dig;
                    this.string = dig.join('.');
                    this.depth = depth;

                    // an ID is simple if it only has one part, and that part is not
                    // `..` or `this`.
                    this.isSimple = parts.length === 1 && !this.isScoped && depth === 0;

                    this.stringModeValue = this.string;
                },

                PartialNameNode: function (name, locInfo) {
                    LocationInfo.call(this, locInfo);
                    this.type = "PARTIAL_NAME";
                    this.name = name.original;
                },

                DataNode: function (id, locInfo) {
                    LocationInfo.call(this, locInfo);
                    this.type = "DATA";
                    this.id = id;
                },

                StringNode: function (string, locInfo) {
                    LocationInfo.call(this, locInfo);
                    this.type = "STRING";
                    this.original =
                        this.string =
                        this.stringModeValue = string;
                },

                IntegerNode: function (integer, locInfo) {
                    LocationInfo.call(this, locInfo);
                    this.type = "INTEGER";
                    this.original =
                        this.integer = integer;
                    this.stringModeValue = Number(integer);
                },

                BooleanNode: function (bool, locInfo) {
                    LocationInfo.call(this, locInfo);
                    this.type = "BOOLEAN";
                    this.bool = bool;
                    this.stringModeValue = bool === "true";
                },

                CommentNode: function (comment, locInfo) {
                    LocationInfo.call(this, locInfo);
                    this.type = "comment";
                    this.comment = comment;
                }
            };

            // Must be exported as an object rather than the root of the module as the jison lexer
            // most modify the object to operate properly.
            __exports__ = AST;
            return __exports__;
        })(__module5__);

        // handlebars/compiler/parser.js
        var __module9__ = (function () {
            "use strict";
            var __exports__;
            /* jshint ignore:start */
            /* Jison generated parser */
            var handlebars = (function () {
                var parser = {
                    trace: function trace() {},
                    yy: {},
                    symbols_: {
                        "error": 2,
                        "root": 3,
                        "statements": 4,
                        "EOF": 5,
                        "program": 6,
                        "simpleInverse": 7,
                        "statement": 8,
                        "openInverse": 9,
                        "closeBlock": 10,
                        "openBlock": 11,
                        "mustache": 12,
                        "partial": 13,
                        "CONTENT": 14,
                        "COMMENT": 15,
                        "OPEN_BLOCK": 16,
                        "sexpr": 17,
                        "CLOSE": 18,
                        "OPEN_INVERSE": 19,
                        "OPEN_ENDBLOCK": 20,
                        "path": 21,
                        "OPEN": 22,
                        "OPEN_UNESCAPED": 23,
                        "CLOSE_UNESCAPED": 24,
                        "OPEN_PARTIAL": 25,
                        "partialName": 26,
                        "partial_option0": 27,
                        "sexpr_repetition0": 28,
                        "sexpr_option0": 29,
                        "dataName": 30,
                        "param": 31,
                        "STRING": 32,
                        "INTEGER": 33,
                        "BOOLEAN": 34,
                        "OPEN_SEXPR": 35,
                        "CLOSE_SEXPR": 36,
                        "hash": 37,
                        "hash_repetition_plus0": 38,
                        "hashSegment": 39,
                        "ID": 40,
                        "EQUALS": 41,
                        "DATA": 42,
                        "pathSegments": 43,
                        "SEP": 44,
                        "$accept": 0,
                        "$end": 1
                    },
                    terminals_: {
                        2: "error",
                        5: "EOF",
                        14: "CONTENT",
                        15: "COMMENT",
                        16: "OPEN_BLOCK",
                        18: "CLOSE",
                        19: "OPEN_INVERSE",
                        20: "OPEN_ENDBLOCK",
                        22: "OPEN",
                        23: "OPEN_UNESCAPED",
                        24: "CLOSE_UNESCAPED",
                        25: "OPEN_PARTIAL",
                        32: "STRING",
                        33: "INTEGER",
                        34: "BOOLEAN",
                        35: "OPEN_SEXPR",
                        36: "CLOSE_SEXPR",
                        40: "ID",
                        41: "EQUALS",
                        42: "DATA",
                        44: "SEP"
                    },
                    productions_: [0, [3, 2],
                        [3, 1],
                        [6, 2],
                        [6, 3],
                        [6, 2],
                        [6, 1],
                        [6, 1],
                        [6, 0],
                        [4, 1],
                        [4, 2],
                        [8, 3],
                        [8, 3],
                        [8, 1],
                        [8, 1],
                        [8, 1],
                        [8, 1],
                        [11, 3],
                        [9, 3],
                        [10, 3],
                        [12, 3],
                        [12, 3],
                        [13, 4],
                        [7, 2],
                        [17, 3],
                        [17, 1],
                        [31, 1],
                        [31, 1],
                        [31, 1],
                        [31, 1],
                        [31, 1],
                        [31, 3],
                        [37, 1],
                        [39, 3],
                        [26, 1],
                        [26, 1],
                        [26, 1],
                        [30, 2],
                        [21, 1],
                        [43, 3],
                        [43, 1],
                        [27, 0],
                        [27, 1],
                        [28, 0],
                        [28, 2],
                        [29, 0],
                        [29, 1],
                        [38, 1],
                        [38, 2]
                    ],
                    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {

                        var $0 = $$.length - 1;
                        switch (yystate) {
                        case 1:
                            return new yy.ProgramNode($$[$0 - 1], this._$);
                            break;
                        case 2:
                            return new yy.ProgramNode([], this._$);
                            break;
                        case 3:
                            this.$ = new yy.ProgramNode([], $$[$0 - 1], $$[$0], this._$);
                            break;
                        case 4:
                            this.$ = new yy.ProgramNode($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
                            break;
                        case 5:
                            this.$ = new yy.ProgramNode($$[$0 - 1], $$[$0], [], this._$);
                            break;
                        case 6:
                            this.$ = new yy.ProgramNode($$[$0], this._$);
                            break;
                        case 7:
                            this.$ = new yy.ProgramNode([], this._$);
                            break;
                        case 8:
                            this.$ = new yy.ProgramNode([], this._$);
                            break;
                        case 9:
                            this.$ = [$$[$0]];
                            break;
                        case 10:
                            $$[$0 - 1].push($$[$0]);
                            this.$ = $$[$0 - 1];
                            break;
                        case 11:
                            this.$ = new yy.BlockNode($$[$0 - 2], $$[$0 - 1].inverse, $$[$0 - 1], $$[$0], this._$);
                            break;
                        case 12:
                            this.$ = new yy.BlockNode($$[$0 - 2], $$[$0 - 1], $$[$0 - 1].inverse, $$[$0], this._$);
                            break;
                        case 13:
                            this.$ = $$[$0];
                            break;
                        case 14:
                            this.$ = $$[$0];
                            break;
                        case 15:
                            this.$ = new yy.ContentNode($$[$0], this._$);
                            break;
                        case 16:
                            this.$ = new yy.CommentNode($$[$0], this._$);
                            break;
                        case 17:
                            this.$ = new yy.MustacheNode($$[$0 - 1], null, $$[$0 - 2], stripFlags($$[$0 - 2], $$[$0]), this._$);
                            break;
                        case 18:
                            this.$ = new yy.MustacheNode($$[$0 - 1], null, $$[$0 - 2], stripFlags($$[$0 - 2], $$[$0]), this._$);
                            break;
                        case 19:
                            this.$ = {
                                path: $$[$0 - 1],
                                strip: stripFlags($$[$0 - 2], $$[$0])
                            };
                            break;
                        case 20:
                            this.$ = new yy.MustacheNode($$[$0 - 1], null, $$[$0 - 2], stripFlags($$[$0 - 2], $$[$0]), this._$);
                            break;
                        case 21:
                            this.$ = new yy.MustacheNode($$[$0 - 1], null, $$[$0 - 2], stripFlags($$[$0 - 2], $$[$0]), this._$);
                            break;
                        case 22:
                            this.$ = new yy.PartialNode($$[$0 - 2], $$[$0 - 1], stripFlags($$[$0 - 3], $$[$0]), this._$);
                            break;
                        case 23:
                            this.$ = stripFlags($$[$0 - 1], $$[$0]);
                            break;
                        case 24:
                            this.$ = new yy.SexprNode([$$[$0 - 2]].concat($$[$0 - 1]), $$[$0], this._$);
                            break;
                        case 25:
                            this.$ = new yy.SexprNode([$$[$0]], null, this._$);
                            break;
                        case 26:
                            this.$ = $$[$0];
                            break;
                        case 27:
                            this.$ = new yy.StringNode($$[$0], this._$);
                            break;
                        case 28:
                            this.$ = new yy.IntegerNode($$[$0], this._$);
                            break;
                        case 29:
                            this.$ = new yy.BooleanNode($$[$0], this._$);
                            break;
                        case 30:
                            this.$ = $$[$0];
                            break;
                        case 31:
                            $$[$0 - 1].isHelper = true;
                            this.$ = $$[$0 - 1];
                            break;
                        case 32:
                            this.$ = new yy.HashNode($$[$0], this._$);
                            break;
                        case 33:
                            this.$ = [$$[$0 - 2], $$[$0]];
                            break;
                        case 34:
                            this.$ = new yy.PartialNameNode($$[$0], this._$);
                            break;
                        case 35:
                            this.$ = new yy.PartialNameNode(new yy.StringNode($$[$0], this._$), this._$);
                            break;
                        case 36:
                            this.$ = new yy.PartialNameNode(new yy.IntegerNode($$[$0], this._$));
                            break;
                        case 37:
                            this.$ = new yy.DataNode($$[$0], this._$);
                            break;
                        case 38:
                            this.$ = new yy.IdNode($$[$0], this._$);
                            break;
                        case 39:
                            $$[$0 - 2].push({
                                part: $$[$0],
                                separator: $$[$0 - 1]
                            });
                            this.$ = $$[$0 - 2];
                            break;
                        case 40:
                            this.$ = [{
                                part: $$[$0]
                            }];
                            break;
                        case 43:
                            this.$ = [];
                            break;
                        case 44:
                            $$[$0 - 1].push($$[$0]);
                            break;
                        case 47:
                            this.$ = [$$[$0]];
                            break;
                        case 48:
                            $$[$0 - 1].push($$[$0]);
                            break;
                        }
                    },
                    table: [{
                        3: 1,
                        4: 2,
                        5: [1, 3],
                        8: 4,
                        9: 5,
                        11: 6,
                        12: 7,
                        13: 8,
                        14: [1, 9],
                        15: [1, 10],
                        16: [1, 12],
                        19: [1, 11],
                        22: [1, 13],
                        23: [1, 14],
                        25: [1, 15]
                    }, {
                        1: [3]
                    }, {
                        5: [1, 16],
                        8: 17,
                        9: 5,
                        11: 6,
                        12: 7,
                        13: 8,
                        14: [1, 9],
                        15: [1, 10],
                        16: [1, 12],
                        19: [1, 11],
                        22: [1, 13],
                        23: [1, 14],
                        25: [1, 15]
                    }, {
                        1: [2, 2]
                    }, {
                        5: [2, 9],
                        14: [2, 9],
                        15: [2, 9],
                        16: [2, 9],
                        19: [2, 9],
                        20: [2, 9],
                        22: [2, 9],
                        23: [2, 9],
                        25: [2, 9]
                    }, {
                        4: 20,
                        6: 18,
                        7: 19,
                        8: 4,
                        9: 5,
                        11: 6,
                        12: 7,
                        13: 8,
                        14: [1, 9],
                        15: [1, 10],
                        16: [1, 12],
                        19: [1, 21],
                        20: [2, 8],
                        22: [1, 13],
                        23: [1, 14],
                        25: [1, 15]
                    }, {
                        4: 20,
                        6: 22,
                        7: 19,
                        8: 4,
                        9: 5,
                        11: 6,
                        12: 7,
                        13: 8,
                        14: [1, 9],
                        15: [1, 10],
                        16: [1, 12],
                        19: [1, 21],
                        20: [2, 8],
                        22: [1, 13],
                        23: [1, 14],
                        25: [1, 15]
                    }, {
                        5: [2, 13],
                        14: [2, 13],
                        15: [2, 13],
                        16: [2, 13],
                        19: [2, 13],
                        20: [2, 13],
                        22: [2, 13],
                        23: [2, 13],
                        25: [2, 13]
                    }, {
                        5: [2, 14],
                        14: [2, 14],
                        15: [2, 14],
                        16: [2, 14],
                        19: [2, 14],
                        20: [2, 14],
                        22: [2, 14],
                        23: [2, 14],
                        25: [2, 14]
                    }, {
                        5: [2, 15],
                        14: [2, 15],
                        15: [2, 15],
                        16: [2, 15],
                        19: [2, 15],
                        20: [2, 15],
                        22: [2, 15],
                        23: [2, 15],
                        25: [2, 15]
                    }, {
                        5: [2, 16],
                        14: [2, 16],
                        15: [2, 16],
                        16: [2, 16],
                        19: [2, 16],
                        20: [2, 16],
                        22: [2, 16],
                        23: [2, 16],
                        25: [2, 16]
                    }, {
                        17: 23,
                        21: 24,
                        30: 25,
                        40: [1, 28],
                        42: [1, 27],
                        43: 26
                    }, {
                        17: 29,
                        21: 24,
                        30: 25,
                        40: [1, 28],
                        42: [1, 27],
                        43: 26
                    }, {
                        17: 30,
                        21: 24,
                        30: 25,
                        40: [1, 28],
                        42: [1, 27],
                        43: 26
                    }, {
                        17: 31,
                        21: 24,
                        30: 25,
                        40: [1, 28],
                        42: [1, 27],
                        43: 26
                    }, {
                        21: 33,
                        26: 32,
                        32: [1, 34],
                        33: [1, 35],
                        40: [1, 28],
                        43: 26
                    }, {
                        1: [2, 1]
                    }, {
                        5: [2, 10],
                        14: [2, 10],
                        15: [2, 10],
                        16: [2, 10],
                        19: [2, 10],
                        20: [2, 10],
                        22: [2, 10],
                        23: [2, 10],
                        25: [2, 10]
                    }, {
                        10: 36,
                        20: [1, 37]
                    }, {
                        4: 38,
                        8: 4,
                        9: 5,
                        11: 6,
                        12: 7,
                        13: 8,
                        14: [1, 9],
                        15: [1, 10],
                        16: [1, 12],
                        19: [1, 11],
                        20: [2, 7],
                        22: [1, 13],
                        23: [1, 14],
                        25: [1, 15]
                    }, {
                        7: 39,
                        8: 17,
                        9: 5,
                        11: 6,
                        12: 7,
                        13: 8,
                        14: [1, 9],
                        15: [1, 10],
                        16: [1, 12],
                        19: [1, 21],
                        20: [2, 6],
                        22: [1, 13],
                        23: [1, 14],
                        25: [1, 15]
                    }, {
                        17: 23,
                        18: [1, 40],
                        21: 24,
                        30: 25,
                        40: [1, 28],
                        42: [1, 27],
                        43: 26
                    }, {
                        10: 41,
                        20: [1, 37]
                    }, {
                        18: [1, 42]
                    }, {
                        18: [2, 43],
                        24: [2, 43],
                        28: 43,
                        32: [2, 43],
                        33: [2, 43],
                        34: [2, 43],
                        35: [2, 43],
                        36: [2, 43],
                        40: [2, 43],
                        42: [2, 43]
                    }, {
                        18: [2, 25],
                        24: [2, 25],
                        36: [2, 25]
                    }, {
                        18: [2, 38],
                        24: [2, 38],
                        32: [2, 38],
                        33: [2, 38],
                        34: [2, 38],
                        35: [2, 38],
                        36: [2, 38],
                        40: [2, 38],
                        42: [2, 38],
                        44: [1, 44]
                    }, {
                        21: 45,
                        40: [1, 28],
                        43: 26
                    }, {
                        18: [2, 40],
                        24: [2, 40],
                        32: [2, 40],
                        33: [2, 40],
                        34: [2, 40],
                        35: [2, 40],
                        36: [2, 40],
                        40: [2, 40],
                        42: [2, 40],
                        44: [2, 40]
                    }, {
                        18: [1, 46]
                    }, {
                        18: [1, 47]
                    }, {
                        24: [1, 48]
                    }, {
                        18: [2, 41],
                        21: 50,
                        27: 49,
                        40: [1, 28],
                        43: 26
                    }, {
                        18: [2, 34],
                        40: [2, 34]
                    }, {
                        18: [2, 35],
                        40: [2, 35]
                    }, {
                        18: [2, 36],
                        40: [2, 36]
                    }, {
                        5: [2, 11],
                        14: [2, 11],
                        15: [2, 11],
                        16: [2, 11],
                        19: [2, 11],
                        20: [2, 11],
                        22: [2, 11],
                        23: [2, 11],
                        25: [2, 11]
                    }, {
                        21: 51,
                        40: [1, 28],
                        43: 26
                    }, {
                        8: 17,
                        9: 5,
                        11: 6,
                        12: 7,
                        13: 8,
                        14: [1, 9],
                        15: [1, 10],
                        16: [1, 12],
                        19: [1, 11],
                        20: [2, 3],
                        22: [1, 13],
                        23: [1, 14],
                        25: [1, 15]
                    }, {
                        4: 52,
                        8: 4,
                        9: 5,
                        11: 6,
                        12: 7,
                        13: 8,
                        14: [1, 9],
                        15: [1, 10],
                        16: [1, 12],
                        19: [1, 11],
                        20: [2, 5],
                        22: [1, 13],
                        23: [1, 14],
                        25: [1, 15]
                    }, {
                        14: [2, 23],
                        15: [2, 23],
                        16: [2, 23],
                        19: [2, 23],
                        20: [2, 23],
                        22: [2, 23],
                        23: [2, 23],
                        25: [2, 23]
                    }, {
                        5: [2, 12],
                        14: [2, 12],
                        15: [2, 12],
                        16: [2, 12],
                        19: [2, 12],
                        20: [2, 12],
                        22: [2, 12],
                        23: [2, 12],
                        25: [2, 12]
                    }, {
                        14: [2, 18],
                        15: [2, 18],
                        16: [2, 18],
                        19: [2, 18],
                        20: [2, 18],
                        22: [2, 18],
                        23: [2, 18],
                        25: [2, 18]
                    }, {
                        18: [2, 45],
                        21: 56,
                        24: [2, 45],
                        29: 53,
                        30: 60,
                        31: 54,
                        32: [1, 57],
                        33: [1, 58],
                        34: [1, 59],
                        35: [1, 61],
                        36: [2, 45],
                        37: 55,
                        38: 62,
                        39: 63,
                        40: [1, 64],
                        42: [1, 27],
                        43: 26
                    }, {
                        40: [1, 65]
                    }, {
                        18: [2, 37],
                        24: [2, 37],
                        32: [2, 37],
                        33: [2, 37],
                        34: [2, 37],
                        35: [2, 37],
                        36: [2, 37],
                        40: [2, 37],
                        42: [2, 37]
                    }, {
                        14: [2, 17],
                        15: [2, 17],
                        16: [2, 17],
                        19: [2, 17],
                        20: [2, 17],
                        22: [2, 17],
                        23: [2, 17],
                        25: [2, 17]
                    }, {
                        5: [2, 20],
                        14: [2, 20],
                        15: [2, 20],
                        16: [2, 20],
                        19: [2, 20],
                        20: [2, 20],
                        22: [2, 20],
                        23: [2, 20],
                        25: [2, 20]
                    }, {
                        5: [2, 21],
                        14: [2, 21],
                        15: [2, 21],
                        16: [2, 21],
                        19: [2, 21],
                        20: [2, 21],
                        22: [2, 21],
                        23: [2, 21],
                        25: [2, 21]
                    }, {
                        18: [1, 66]
                    }, {
                        18: [2, 42]
                    }, {
                        18: [1, 67]
                    }, {
                        8: 17,
                        9: 5,
                        11: 6,
                        12: 7,
                        13: 8,
                        14: [1, 9],
                        15: [1, 10],
                        16: [1, 12],
                        19: [1, 11],
                        20: [2, 4],
                        22: [1, 13],
                        23: [1, 14],
                        25: [1, 15]
                    }, {
                        18: [2, 24],
                        24: [2, 24],
                        36: [2, 24]
                    }, {
                        18: [2, 44],
                        24: [2, 44],
                        32: [2, 44],
                        33: [2, 44],
                        34: [2, 44],
                        35: [2, 44],
                        36: [2, 44],
                        40: [2, 44],
                        42: [2, 44]
                    }, {
                        18: [2, 46],
                        24: [2, 46],
                        36: [2, 46]
                    }, {
                        18: [2, 26],
                        24: [2, 26],
                        32: [2, 26],
                        33: [2, 26],
                        34: [2, 26],
                        35: [2, 26],
                        36: [2, 26],
                        40: [2, 26],
                        42: [2, 26]
                    }, {
                        18: [2, 27],
                        24: [2, 27],
                        32: [2, 27],
                        33: [2, 27],
                        34: [2, 27],
                        35: [2, 27],
                        36: [2, 27],
                        40: [2, 27],
                        42: [2, 27]
                    }, {
                        18: [2, 28],
                        24: [2, 28],
                        32: [2, 28],
                        33: [2, 28],
                        34: [2, 28],
                        35: [2, 28],
                        36: [2, 28],
                        40: [2, 28],
                        42: [2, 28]
                    }, {
                        18: [2, 29],
                        24: [2, 29],
                        32: [2, 29],
                        33: [2, 29],
                        34: [2, 29],
                        35: [2, 29],
                        36: [2, 29],
                        40: [2, 29],
                        42: [2, 29]
                    }, {
                        18: [2, 30],
                        24: [2, 30],
                        32: [2, 30],
                        33: [2, 30],
                        34: [2, 30],
                        35: [2, 30],
                        36: [2, 30],
                        40: [2, 30],
                        42: [2, 30]
                    }, {
                        17: 68,
                        21: 24,
                        30: 25,
                        40: [1, 28],
                        42: [1, 27],
                        43: 26
                    }, {
                        18: [2, 32],
                        24: [2, 32],
                        36: [2, 32],
                        39: 69,
                        40: [1, 70]
                    }, {
                        18: [2, 47],
                        24: [2, 47],
                        36: [2, 47],
                        40: [2, 47]
                    }, {
                        18: [2, 40],
                        24: [2, 40],
                        32: [2, 40],
                        33: [2, 40],
                        34: [2, 40],
                        35: [2, 40],
                        36: [2, 40],
                        40: [2, 40],
                        41: [1, 71],
                        42: [2, 40],
                        44: [2, 40]
                    }, {
                        18: [2, 39],
                        24: [2, 39],
                        32: [2, 39],
                        33: [2, 39],
                        34: [2, 39],
                        35: [2, 39],
                        36: [2, 39],
                        40: [2, 39],
                        42: [2, 39],
                        44: [2, 39]
                    }, {
                        5: [2, 22],
                        14: [2, 22],
                        15: [2, 22],
                        16: [2, 22],
                        19: [2, 22],
                        20: [2, 22],
                        22: [2, 22],
                        23: [2, 22],
                        25: [2, 22]
                    }, {
                        5: [2, 19],
                        14: [2, 19],
                        15: [2, 19],
                        16: [2, 19],
                        19: [2, 19],
                        20: [2, 19],
                        22: [2, 19],
                        23: [2, 19],
                        25: [2, 19]
                    }, {
                        36: [1, 72]
                    }, {
                        18: [2, 48],
                        24: [2, 48],
                        36: [2, 48],
                        40: [2, 48]
                    }, {
                        41: [1, 71]
                    }, {
                        21: 56,
                        30: 60,
                        31: 73,
                        32: [1, 57],
                        33: [1, 58],
                        34: [1, 59],
                        35: [1, 61],
                        40: [1, 28],
                        42: [1, 27],
                        43: 26
                    }, {
                        18: [2, 31],
                        24: [2, 31],
                        32: [2, 31],
                        33: [2, 31],
                        34: [2, 31],
                        35: [2, 31],
                        36: [2, 31],
                        40: [2, 31],
                        42: [2, 31]
                    }, {
                        18: [2, 33],
                        24: [2, 33],
                        36: [2, 33],
                        40: [2, 33]
                    }],
                    defaultActions: {
                        3: [2, 2],
                        16: [2, 1],
                        50: [2, 42]
                    },
                    parseError: function parseError(str, hash) {
                        throw new Error(str);
                    },
                    parse: function parse(input) {
                        var self = this,
                            stack = [0],
                            vstack = [null],
                            lstack = [],
                            table = this.table,
                            yytext = "",
                            yylineno = 0,
                            yyleng = 0,
                            recovering = 0,
                            TERROR = 2,
                            EOF = 1;
                        this.lexer.setInput(input);
                        this.lexer.yy = this.yy;
                        this.yy.lexer = this.lexer;
                        this.yy.parser = this;
                        if (typeof this.lexer.yylloc == "undefined")
                            this.lexer.yylloc = {};
                        var yyloc = this.lexer.yylloc;
                        lstack.push(yyloc);
                        var ranges = this.lexer.options && this.lexer.options.ranges;
                        if (typeof this.yy.parseError === "function")
                            this.parseError = this.yy.parseError;

                        function popStack(n) {
                            stack.length = stack.length - 2 * n;
                            vstack.length = vstack.length - n;
                            lstack.length = lstack.length - n;
                        }

                        function lex() {
                            var token;
                            token = self.lexer.lex() || 1;
                            if (typeof token !== "number") {
                                token = self.symbols_[token] || token;
                            }
                            return token;
                        }
                        var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
                        while (true) {
                            state = stack[stack.length - 1];
                            if (this.defaultActions[state]) {
                                action = this.defaultActions[state];
                            } else {
                                if (symbol === null || typeof symbol == "undefined") {
                                    symbol = lex();
                                }
                                action = table[state] && table[state][symbol];
                            }
                            if (typeof action === "undefined" || !action.length || !action[0]) {
                                var errStr = "";
                                if (!recovering) {
                                    expected = [];
                                    for (p in table[state])
                                        if (this.terminals_[p] && p > 2) {
                                            expected.push("'" + this.terminals_[p] + "'");
                                        }
                                    if (this.lexer.showPosition) {
                                        errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                                    } else {
                                        errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                                    }
                                    this.parseError(errStr, {
                                        text: this.lexer.match,
                                        token: this.terminals_[symbol] || symbol,
                                        line: this.lexer.yylineno,
                                        loc: yyloc,
                                        expected: expected
                                    });
                                }
                            }
                            if (action[0] instanceof Array && action.length > 1) {
                                throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
                            }
                            switch (action[0]) {
                            case 1:
                                stack.push(symbol);
                                vstack.push(this.lexer.yytext);
                                lstack.push(this.lexer.yylloc);
                                stack.push(action[1]);
                                symbol = null;
                                if (!preErrorSymbol) {
                                    yyleng = this.lexer.yyleng;
                                    yytext = this.lexer.yytext;
                                    yylineno = this.lexer.yylineno;
                                    yyloc = this.lexer.yylloc;
                                    if (recovering > 0)
                                        recovering--;
                                } else {
                                    symbol = preErrorSymbol;
                                    preErrorSymbol = null;
                                }
                                break;
                            case 2:
                                len = this.productions_[action[1]][1];
                                yyval.$ = vstack[vstack.length - len];
                                yyval._$ = {
                                    first_line: lstack[lstack.length - (len || 1)].first_line,
                                    last_line: lstack[lstack.length - 1].last_line,
                                    first_column: lstack[lstack.length - (len || 1)].first_column,
                                    last_column: lstack[lstack.length - 1].last_column
                                };
                                if (ranges) {
                                    yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                                }
                                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                                if (typeof r !== "undefined") {
                                    return r;
                                }
                                if (len) {
                                    stack = stack.slice(0, -1 * len * 2);
                                    vstack = vstack.slice(0, -1 * len);
                                    lstack = lstack.slice(0, -1 * len);
                                }
                                stack.push(this.productions_[action[1]][0]);
                                vstack.push(yyval.$);
                                lstack.push(yyval._$);
                                newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                                stack.push(newState);
                                break;
                            case 3:
                                return true;
                            }
                        }
                        return true;
                    }
                };


                function stripFlags(open, close) {
                    return {
                        left: open.charAt(2) === '~',
                        right: close.charAt(0) === '~' || close.charAt(1) === '~'
                    };
                }

                /* Jison generated lexer */
                var lexer = (function () {
                    var lexer = ({
                        EOF: 1,
                        parseError: function parseError(str, hash) {
                            if (this.yy.parser) {
                                this.yy.parser.parseError(str, hash);
                            } else {
                                throw new Error(str);
                            }
                        },
                        setInput: function (input) {
                            this._input = input;
                            this._more = this._less = this.done = false;
                            this.yylineno = this.yyleng = 0;
                            this.yytext = this.matched = this.match = '';
                            this.conditionStack = ['INITIAL'];
                            this.yylloc = {
                                first_line: 1,
                                first_column: 0,
                                last_line: 1,
                                last_column: 0
                            };
                            if (this.options.ranges) this.yylloc.range = [0, 0];
                            this.offset = 0;
                            return this;
                        },
                        input: function () {
                            var ch = this._input[0];
                            this.yytext += ch;
                            this.yyleng++;
                            this.offset++;
                            this.match += ch;
                            this.matched += ch;
                            var lines = ch.match(/(?:\r\n?|\n).*/g);
                            if (lines) {
                                this.yylineno++;
                                this.yylloc.last_line++;
                            } else {
                                this.yylloc.last_column++;
                            }
                            if (this.options.ranges) this.yylloc.range[1]++;

                            this._input = this._input.slice(1);
                            return ch;
                        },
                        unput: function (ch) {
                            var len = ch.length;
                            var lines = ch.split(/(?:\r\n?|\n)/g);

                            this._input = ch + this._input;
                            this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
                            //this.yyleng -= len;
                            this.offset -= len;
                            var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                            this.match = this.match.substr(0, this.match.length - 1);
                            this.matched = this.matched.substr(0, this.matched.length - 1);

                            if (lines.length - 1) this.yylineno -= lines.length - 1;
                            var r = this.yylloc.range;

                            this.yylloc = {
                                first_line: this.yylloc.first_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.first_column,
                                last_column: lines ?
                                    (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                            };

                            if (this.options.ranges) {
                                this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                            }
                            return this;
                        },
                        more: function () {
                            this._more = true;
                            return this;
                        },
                        less: function (n) {
                            this.unput(this.match.slice(n));
                        },
                        pastInput: function () {
                            var past = this.matched.substr(0, this.matched.length - this.match.length);
                            return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
                        },
                        upcomingInput: function () {
                            var next = this.match;
                            if (next.length < 20) {
                                next += this._input.substr(0, 20 - next.length);
                            }
                            return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
                        },
                        showPosition: function () {
                            var pre = this.pastInput();
                            var c = new Array(pre.length + 1).join("-");
                            return pre + this.upcomingInput() + "\n" + c + "^";
                        },
                        next: function () {
                            if (this.done) {
                                return this.EOF;
                            }
                            if (!this._input) this.done = true;

                            var token,
                                match,
                                tempMatch,
                                index,
                                col,
                                lines;
                            if (!this._more) {
                                this.yytext = '';
                                this.match = '';
                            }
                            var rules = this._currentRules();
                            for (var i = 0; i < rules.length; i++) {
                                tempMatch = this._input.match(this.rules[rules[i]]);
                                if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                                    match = tempMatch;
                                    index = i;
                                    if (!this.options.flex) break;
                                }
                            }
                            if (match) {
                                lines = match[0].match(/(?:\r\n?|\n).*/g);
                                if (lines) this.yylineno += lines.length;
                                this.yylloc = {
                                    first_line: this.yylloc.last_line,
                                    last_line: this.yylineno + 1,
                                    first_column: this.yylloc.last_column,
                                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                                };
                                this.yytext += match[0];
                                this.match += match[0];
                                this.matches = match;
                                this.yyleng = this.yytext.length;
                                if (this.options.ranges) {
                                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                                }
                                this._more = false;
                                this._input = this._input.slice(match[0].length);
                                this.matched += match[0];
                                token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
                                if (this.done && this._input) this.done = false;
                                if (token) return token;
                                else return;
                            }
                            if (this._input === "") {
                                return this.EOF;
                            } else {
                                return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                                    text: "",
                                    token: null,
                                    line: this.yylineno
                                });
                            }
                        },
                        lex: function lex() {
                            var r = this.next();
                            if (typeof r !== 'undefined') {
                                return r;
                            } else {
                                return this.lex();
                            }
                        },
                        begin: function begin(condition) {
                            this.conditionStack.push(condition);
                        },
                        popState: function popState() {
                            return this.conditionStack.pop();
                        },
                        _currentRules: function _currentRules() {
                            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                        },
                        topState: function () {
                            return this.conditionStack[this.conditionStack.length - 2];
                        },
                        pushState: function begin(condition) {
                            this.begin(condition);
                        }
                    });
                    lexer.options = {};
                    lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {


                        function strip(start, end) {
                            return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng - end);
                        }


                        var YYSTATE = YY_START
                        switch ($avoiding_name_collisions) {
                        case 0:
                            if (yy_.yytext.slice(-2) === "\\\\") {
                                strip(0, 1);
                                this.begin("mu");
                            } else if (yy_.yytext.slice(-1) === "\\") {
                                strip(0, 1);
                                this.begin("emu");
                            } else {
                                this.begin("mu");
                            }
                            if (yy_.yytext) return 14;

                            break;
                        case 1:
                            return 14;
                            break;
                        case 2:
                            this.popState();
                            return 14;

                            break;
                        case 3:
                            strip(0, 4);
                            this.popState();
                            return 15;
                            break;
                        case 4:
                            return 35;
                            break;
                        case 5:
                            return 36;
                            break;
                        case 6:
                            return 25;
                            break;
                        case 7:
                            return 16;
                            break;
                        case 8:
                            return 20;
                            break;
                        case 9:
                            return 19;
                            break;
                        case 10:
                            return 19;
                            break;
                        case 11:
                            return 23;
                            break;
                        case 12:
                            return 22;
                            break;
                        case 13:
                            this.popState();
                            this.begin('com');
                            break;
                        case 14:
                            strip(3, 5);
                            this.popState();
                            return 15;
                            break;
                        case 15:
                            return 22;
                            break;
                        case 16:
                            return 41;
                            break;
                        case 17:
                            return 40;
                            break;
                        case 18:
                            return 40;
                            break;
                        case 19:
                            return 44;
                            break;
                        case 20: // ignore whitespace
                            break;
                        case 21:
                            this.popState();
                            return 24;
                            break;
                        case 22:
                            this.popState();
                            return 18;
                            break;
                        case 23:
                            yy_.yytext = strip(1, 2).replace(/\\"/g, '"');
                            return 32;
                            break;
                        case 24:
                            yy_.yytext = strip(1, 2).replace(/\\'/g, "'");
                            return 32;
                            break;
                        case 25:
                            return 42;
                            break;
                        case 26:
                            return 34;
                            break;
                        case 27:
                            return 34;
                            break;
                        case 28:
                            return 33;
                            break;
                        case 29:
                            return 40;
                            break;
                        case 30:
                            yy_.yytext = strip(1, 2);
                            return 40;
                            break;
                        case 31:
                            return 'INVALID';
                            break;
                        case 32:
                            return 5;
                            break;
                        }
                    };
                    lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:[\s\S]*?--\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{!--)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{(~)?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:-?[0-9]+(?=([~}\s)])))/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/];
                    lexer.conditions = {
                        "mu": {
                            "rules": [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
                            "inclusive": false
                        },
                        "emu": {
                            "rules": [2],
                            "inclusive": false
                        },
                        "com": {
                            "rules": [3],
                            "inclusive": false
                        },
                        "INITIAL": {
                            "rules": [0, 1, 32],
                            "inclusive": true
                        }
                    };
                    return lexer;
                })()
                parser.lexer = lexer;

                function Parser() {
                    this.yy = {};
                }
                Parser.prototype = parser;
                parser.Parser = Parser;
                return new Parser;
            })();
            __exports__ = handlebars;
            /* jshint ignore:end */
            return __exports__;
        })();

        // handlebars/compiler/base.js
        var __module8__ = (function (__dependency1__, __dependency2__) {
            "use strict";
            var __exports__ = {};
            var parser = __dependency1__;
            var AST = __dependency2__;

            __exports__.parser = parser;

            function parse(input) {
                // Just return if an already-compile AST was passed in.
                if (input.constructor === AST.ProgramNode) {
                    return input;
                }

                parser.yy = AST;
                return parser.parse(input);
            }

            __exports__.parse = parse;
            return __exports__;
        })(__module9__, __module7__);

        // handlebars/compiler/compiler.js
        var __module10__ = (function (__dependency1__) {
            "use strict";
            var __exports__ = {};
            var Exception = __dependency1__;

            function Compiler() {}

            __exports__.Compiler = Compiler; // the foundHelper register will disambiguate helper lookup from finding a
            // function in a context. This is necessary for mustache compatibility, which
            // requires that context functions in blocks are evaluated by blockHelperMissing,
            // and then proceed as if the resulting value was provided to blockHelperMissing.

            Compiler.prototype = {
                compiler: Compiler,

                disassemble: function () {
                    var opcodes = this.opcodes,
                        opcode, out = [],
                        params, param;

                    for (var i = 0, l = opcodes.length; i < l; i++) {
                        opcode = opcodes[i];

                        if (opcode.opcode === 'DECLARE') {
                            out.push("DECLARE " + opcode.name + "=" + opcode.value);
                        } else {
                            params = [];
                            for (var j = 0; j < opcode.args.length; j++) {
                                param = opcode.args[j];
                                if (typeof param === "string") {
                                    param = "\"" + param.replace("\n", "\\n") + "\"";
                                }
                                params.push(param);
                            }
                            out.push(opcode.opcode + " " + params.join(" "));
                        }
                    }

                    return out.join("\n");
                },

                equals: function (other) {
                    var len = this.opcodes.length;
                    if (other.opcodes.length !== len) {
                        return false;
                    }

                    for (var i = 0; i < len; i++) {
                        var opcode = this.opcodes[i],
                            otherOpcode = other.opcodes[i];
                        if (opcode.opcode !== otherOpcode.opcode || opcode.args.length !== otherOpcode.args.length) {
                            return false;
                        }
                        for (var j = 0; j < opcode.args.length; j++) {
                            if (opcode.args[j] !== otherOpcode.args[j]) {
                                return false;
                            }
                        }
                    }

                    len = this.children.length;
                    if (other.children.length !== len) {
                        return false;
                    }
                    for (i = 0; i < len; i++) {
                        if (!this.children[i].equals(other.children[i])) {
                            return false;
                        }
                    }

                    return true;
                },

                guid: 0,

                compile: function (program, options) {
                    this.opcodes = [];
                    this.children = [];
                    this.depths = {
                        list: []
                    };
                    this.options = options;

                    // These changes will propagate to the other compiler components
                    var knownHelpers = this.options.knownHelpers;
                    this.options.knownHelpers = {
                        'helperMissing': true,
                        'blockHelperMissing': true,
                        'each': true,
                        'if': true,
                        'unless': true,
                        'with': true,
                        'log': true
                    };
                    if (knownHelpers) {
                        for (var name in knownHelpers) {
                            this.options.knownHelpers[name] = knownHelpers[name];
                        }
                    }

                    return this.accept(program);
                },

                accept: function (node) {
                    var strip = node.strip || {},
                        ret;
                    if (strip.left) {
                        this.opcode('strip');
                    }

                    ret = this[node.type](node);

                    if (strip.right) {
                        this.opcode('strip');
                    }

                    return ret;
                },

                program: function (program) {
                    var statements = program.statements;

                    for (var i = 0, l = statements.length; i < l; i++) {
                        this.accept(statements[i]);
                    }
                    this.isSimple = l === 1;

                    this.depths.list = this.depths.list.sort(function (a, b) {
                        return a - b;
                    });

                    return this;
                },

                compileProgram: function (program) {
                    var result = new this.compiler().compile(program, this.options);
                    var guid = this.guid++,
                        depth;

                    this.usePartial = this.usePartial || result.usePartial;

                    this.children[guid] = result;

                    for (var i = 0, l = result.depths.list.length; i < l; i++) {
                        depth = result.depths.list[i];

                        if (depth < 2) {
                            continue;
                        } else {
                            this.addDepth(depth - 1);
                        }
                    }

                    return guid;
                },

                block: function (block) {
                    var mustache = block.mustache,
                        program = block.program,
                        inverse = block.inverse;

                    if (program) {
                        program = this.compileProgram(program);
                    }

                    if (inverse) {
                        inverse = this.compileProgram(inverse);
                    }

                    var sexpr = mustache.sexpr;
                    var type = this.classifySexpr(sexpr);

                    if (type === "helper") {
                        this.helperSexpr(sexpr, program, inverse);
                    } else if (type === "simple") {
                        this.simpleSexpr(sexpr);

                        // now that the simple mustache is resolved, we need to
                        // evaluate it by executing `blockHelperMissing`
                        this.opcode('pushProgram', program);
                        this.opcode('pushProgram', inverse);
                        this.opcode('emptyHash');
                        this.opcode('blockValue');
                    } else {
                        this.ambiguousSexpr(sexpr, program, inverse);

                        // now that the simple mustache is resolved, we need to
                        // evaluate it by executing `blockHelperMissing`
                        this.opcode('pushProgram', program);
                        this.opcode('pushProgram', inverse);
                        this.opcode('emptyHash');
                        this.opcode('ambiguousBlockValue');
                    }

                    this.opcode('append');
                },

                hash: function (hash) {
                    var pairs = hash.pairs,
                        pair, val;

                    this.opcode('pushHash');

                    for (var i = 0, l = pairs.length; i < l; i++) {
                        pair = pairs[i];
                        val = pair[1];

                        if (this.options.stringParams) {
                            if (val.depth) {
                                this.addDepth(val.depth);
                            }
                            this.opcode('getContext', val.depth || 0);
                            this.opcode('pushStringParam', val.stringModeValue, val.type);

                            if (val.type === 'sexpr') {
                                // Subexpressions get evaluated and passed in
                                // in string params mode.
                                this.sexpr(val);
                            }
                        } else {
                            this.accept(val);
                        }

                        this.opcode('assignToHash', pair[0]);
                    }
                    this.opcode('popHash');
                },

                partial: function (partial) {
                    var partialName = partial.partialName;
                    this.usePartial = true;

                    if (partial.context) {
                        this.ID(partial.context);
                    } else {
                        this.opcode('push', 'depth0');
                    }

                    this.opcode('invokePartial', partialName.name);
                    this.opcode('append');
                },

                content: function (content) {
                    this.opcode('appendContent', content.string);
                },

                mustache: function (mustache) {
                    this.sexpr(mustache.sexpr);

                    if (mustache.escaped && !this.options.noEscape) {
                        this.opcode('appendEscaped');
                    } else {
                        this.opcode('append');
                    }
                },

                ambiguousSexpr: function (sexpr, program, inverse) {
                    var id = sexpr.id,
                        name = id.parts[0],
                        isBlock = program != null || inverse != null;

                    this.opcode('getContext', id.depth);

                    this.opcode('pushProgram', program);
                    this.opcode('pushProgram', inverse);

                    this.opcode('invokeAmbiguous', name, isBlock);
                },

                simpleSexpr: function (sexpr) {
                    var id = sexpr.id;

                    if (id.type === 'DATA') {
                        this.DATA(id);
                    } else if (id.parts.length) {
                        this.ID(id);
                    } else {
                        // Simplified ID for `this`
                        this.addDepth(id.depth);
                        this.opcode('getContext', id.depth);
                        this.opcode('pushContext');
                    }

                    this.opcode('resolvePossibleLambda');
                },

                helperSexpr: function (sexpr, program, inverse) {
                    var params = this.setupFullMustacheParams(sexpr, program, inverse),
                        name = sexpr.id.parts[0];

                    if (this.options.knownHelpers[name]) {
                        this.opcode('invokeKnownHelper', params.length, name);
                    } else if (this.options.knownHelpersOnly) {
                        throw new Exception("You specified knownHelpersOnly, but used the unknown helper " + name, sexpr);
                    } else {
                        this.opcode('invokeHelper', params.length, name, sexpr.isRoot);
                    }
                },

                sexpr: function (sexpr) {
                    var type = this.classifySexpr(sexpr);

                    if (type === "simple") {
                        this.simpleSexpr(sexpr);
                    } else if (type === "helper") {
                        this.helperSexpr(sexpr);
                    } else {
                        this.ambiguousSexpr(sexpr);
                    }
                },

                ID: function (id) {
                    this.addDepth(id.depth);
                    this.opcode('getContext', id.depth);

                    var name = id.parts[0];
                    if (!name) {
                        this.opcode('pushContext');
                    } else {
                        this.opcode('lookupOnContext', id.parts[0]);
                    }

                    for (var i = 1, l = id.parts.length; i < l; i++) {
                        this.opcode('lookup', id.parts[i]);
                    }
                },

                DATA: function (data) {
                    this.options.data = true;
                    if (data.id.isScoped || data.id.depth) {
                        throw new Exception('Scoped data references are not supported: ' + data.original, data);
                    }

                    this.opcode('lookupData');
                    var parts = data.id.parts;
                    for (var i = 0, l = parts.length; i < l; i++) {
                        this.opcode('lookup', parts[i]);
                    }
                },

                STRING: function (string) {
                    this.opcode('pushString', string.string);
                },

                INTEGER: function (integer) {
                    this.opcode('pushLiteral', integer.integer);
                },

                BOOLEAN: function (bool) {
                    this.opcode('pushLiteral', bool.bool);
                },

                comment: function () {},

                // HELPERS
                opcode: function (name) {
                    this.opcodes.push({
                        opcode: name,
                        args: [].slice.call(arguments, 1)
                    });
                },

                declare: function (name, value) {
                    this.opcodes.push({
                        opcode: 'DECLARE',
                        name: name,
                        value: value
                    });
                },

                addDepth: function (depth) {
                    if (depth === 0) {
                        return;
                    }

                    if (!this.depths[depth]) {
                        this.depths[depth] = true;
                        this.depths.list.push(depth);
                    }
                },

                classifySexpr: function (sexpr) {
                    var isHelper = sexpr.isHelper;
                    var isEligible = sexpr.eligibleHelper;
                    var options = this.options;

                    // if ambiguous, we can possibly resolve the ambiguity now
                    if (isEligible && !isHelper) {
                        var name = sexpr.id.parts[0];

                        if (options.knownHelpers[name]) {
                            isHelper = true;
                        } else if (options.knownHelpersOnly) {
                            isEligible = false;
                        }
                    }

                    if (isHelper) {
                        return "helper";
                    } else if (isEligible) {
                        return "ambiguous";
                    } else {
                        return "simple";
                    }
                },

                pushParams: function (params) {
                    var i = params.length,
                        param;

                    while (i--) {
                        param = params[i];

                        if (this.options.stringParams) {
                            if (param.depth) {
                                this.addDepth(param.depth);
                            }

                            this.opcode('getContext', param.depth || 0);
                            this.opcode('pushStringParam', param.stringModeValue, param.type);

                            if (param.type === 'sexpr') {
                                // Subexpressions get evaluated and passed in
                                // in string params mode.
                                this.sexpr(param);
                            }
                        } else {
                            this[param.type](param);
                        }
                    }
                },

                setupFullMustacheParams: function (sexpr, program, inverse) {
                    var params = sexpr.params;
                    this.pushParams(params);

                    this.opcode('pushProgram', program);
                    this.opcode('pushProgram', inverse);

                    if (sexpr.hash) {
                        this.hash(sexpr.hash);
                    } else {
                        this.opcode('emptyHash');
                    }

                    return params;
                }
            };

            function precompile(input, options, env) {
                if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
                    throw new Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
                }

                options = options || {};
                if (!('data' in options)) {
                    options.data = true;
                }

                var ast = env.parse(input);
                var environment = new env.Compiler().compile(ast, options);
                return new env.JavaScriptCompiler().compile(environment, options);
            }

            __exports__.precompile = precompile;

            function compile(input, options, env) {
                if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
                    throw new Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
                }

                options = options || {};

                if (!('data' in options)) {
                    options.data = true;
                }

                var compiled;

                function compileInput() {
                    var ast = env.parse(input);
                    var environment = new env.Compiler().compile(ast, options);
                    var templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
                    return env.template(templateSpec);
                }

                // Template is only compiled on first use and cached after that point.
                return function (context, options) {
                    if (!compiled) {
                        compiled = compileInput();
                    }
                    return compiled.call(this, context, options);
                };
            }

            __exports__.compile = compile;
            return __exports__;
        })(__module5__);

        // handlebars/compiler/javascript-compiler.js
        var __module11__ = (function (__dependency1__, __dependency2__) {
            "use strict";
            var __exports__;
            var COMPILER_REVISION = __dependency1__.COMPILER_REVISION;
            var REVISION_CHANGES = __dependency1__.REVISION_CHANGES;
            var log = __dependency1__.log;
            var Exception = __dependency2__;

            function Literal(value) {
                this.value = value;
            }

            function JavaScriptCompiler() {}

            JavaScriptCompiler.prototype = {
                // PUBLIC API: You can override these methods in a subclass to provide
                // alternative compiled forms for name lookup and buffering semantics
                nameLookup: function (parent, name /* , type*/ ) {
                    var wrap,
                        ret;
                    if (parent.indexOf('depth') === 0) {
                        wrap = true;
                    }

                    if (/^[0-9]+$/.test(name)) {
                        ret = parent + "[" + name + "]";
                    } else if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
                        ret = parent + "." + name;
                    } else {
                        ret = parent + "['" + name + "']";
                    }

                    if (wrap) {
                        return '(' + parent + ' && ' + ret + ')';
                    } else {
                        return ret;
                    }
                },

                compilerInfo: function () {
                    var revision = COMPILER_REVISION,
                        versions = REVISION_CHANGES[revision];
                    return "this.compilerInfo = [" + revision + ",'" + versions + "'];\n";
                },

                appendToBuffer: function (string) {
                    if (this.environment.isSimple) {
                        return "return " + string + ";";
                    } else {
                        return {
                            appendToBuffer: true,
                            content: string,
                            toString: function () {
                                return "buffer += " + string + ";";
                            }
                        };
                    }
                },

                initializeBuffer: function () {
                    return this.quotedString("");
                },

                namespace: "Handlebars",
                // END PUBLIC API

                compile: function (environment, options, context, asObject) {
                    this.environment = environment;
                    this.options = options || {};

                    log('debug', this.environment.disassemble() + "\n\n");

                    this.name = this.environment.name;
                    this.isChild = !! context;
                    this.context = context || {
                        programs: [],
                        environments: [],
                        aliases: {}
                    };

                    this.preamble();

                    this.stackSlot = 0;
                    this.stackVars = [];
                    this.registers = {
                        list: []
                    };
                    this.hashes = [];
                    this.compileStack = [];
                    this.inlineStack = [];

                    this.compileChildren(environment, options);

                    var opcodes = environment.opcodes,
                        opcode;

                    this.i = 0;

                    for (var l = opcodes.length; this.i < l; this.i++) {
                        opcode = opcodes[this.i];

                        if (opcode.opcode === 'DECLARE') {
                            this[opcode.name] = opcode.value;
                        } else {
                            this[opcode.opcode].apply(this, opcode.args);
                        }

                        // Reset the stripNext flag if it was not set by this operation.
                        if (opcode.opcode !== this.stripNext) {
                            this.stripNext = false;
                        }
                    }

                    // Flush any trailing content that might be pending.
                    this.pushSource('');

                    if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
                        throw new Exception('Compile completed with content left on stack');
                    }

                    return this.createFunctionContext(asObject);
                },

                preamble: function () {
                    var out = [];

                    if (!this.isChild) {
                        var namespace = this.namespace;

                        var copies = "helpers = this.merge(helpers, " + namespace + ".helpers);";
                        if (this.environment.usePartial) {
                            copies = copies + " partials = this.merge(partials, " + namespace + ".partials);";
                        }
                        if (this.options.data) {
                            copies = copies + " data = data || {};";
                        }
                        out.push(copies);
                    } else {
                        out.push('');
                    }

                    if (!this.environment.isSimple) {
                        out.push(", buffer = " + this.initializeBuffer());
                    } else {
                        out.push("");
                    }

                    // track the last context pushed into place to allow skipping the
                    // getContext opcode when it would be a noop
                    this.lastContext = 0;
                    this.source = out;
                },

                createFunctionContext: function (asObject) {
                    var locals = this.stackVars.concat(this.registers.list);

                    if (locals.length > 0) {
                        this.source[1] = this.source[1] + ", " + locals.join(", ");
                    }

                    // Generate minimizer alias mappings
                    if (!this.isChild) {
                        for (var alias in this.context.aliases) {
                            if (this.context.aliases.hasOwnProperty(alias)) {
                                this.source[1] = this.source[1] + ', ' + alias + '=' + this.context.aliases[alias];
                            }
                        }
                    }

                    if (this.source[1]) {
                        this.source[1] = "var " + this.source[1].substring(2) + ";";
                    }

                    // Merge children
                    if (!this.isChild) {
                        this.source[1] += '\n' + this.context.programs.join('\n') + '\n';
                    }

                    if (!this.environment.isSimple) {
                        this.pushSource("return buffer;");
                    }

                    var params = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];

                    for (var i = 0, l = this.environment.depths.list.length; i < l; i++) {
                        params.push("depth" + this.environment.depths.list[i]);
                    }

                    // Perform a second pass over the output to merge content when possible
                    var source = this.mergeSource();

                    if (!this.isChild) {
                        source = this.compilerInfo() + source;
                    }

                    if (asObject) {
                        params.push(source);

                        return Function.apply(this, params);
                    } else {
                        var functionSource = 'function ' + (this.name || '') + '(' + params.join(',') + ') {\n  ' + source + '}';
                        log('debug', functionSource + "\n\n");
                        return functionSource;
                    }
                },
                mergeSource: function () {
                    // WARN: We are not handling the case where buffer is still populated as the source should
                    // not have buffer append operations as their final action.
                    var source = '',
                        buffer;
                    for (var i = 0, len = this.source.length; i < len; i++) {
                        var line = this.source[i];
                        if (line.appendToBuffer) {
                            if (buffer) {
                                buffer = buffer + '\n    + ' + line.content;
                            } else {
                                buffer = line.content;
                            }
                        } else {
                            if (buffer) {
                                source += 'buffer += ' + buffer + ';\n  ';
                                buffer = undefined;
                            }
                            source += line + '\n  ';
                        }
                    }
                    return source;
                },

                // [blockValue]
                //
                // On stack, before: hash, inverse, program, value
                // On stack, after: return value of blockHelperMissing
                //
                // The purpose of this opcode is to take a block of the form
                // `{{#foo}}...{{/foo}}`, resolve the value of `foo`, and
                // replace it on the stack with the result of properly
                // invoking blockHelperMissing.
                blockValue: function () {
                    this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

                    var params = ["depth0"];
                    this.setupParams(0, params);

                    this.replaceStack(function (current) {
                        params.splice(1, 0, current);
                        return "blockHelperMissing.call(" + params.join(", ") + ")";
                    });
                },

                // [ambiguousBlockValue]
                //
                // On stack, before: hash, inverse, program, value
                // Compiler value, before: lastHelper=value of last found helper, if any
                // On stack, after, if no lastHelper: same as [blockValue]
                // On stack, after, if lastHelper: value
                ambiguousBlockValue: function () {
                    this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

                    var params = ["depth0"];
                    this.setupParams(0, params);

                    var current = this.topStack();
                    params.splice(1, 0, current);

                    this.pushSource("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
                },

                // [appendContent]
                //
                // On stack, before: ...
                // On stack, after: ...
                //
                // Appends the string value of `content` to the current buffer
                appendContent: function (content) {
                    if (this.pendingContent) {
                        content = this.pendingContent + content;
                    }
                    if (this.stripNext) {
                        content = content.replace(/^\s+/, '');
                    }

                    this.pendingContent = content;
                },

                // [strip]
                //
                // On stack, before: ...
                // On stack, after: ...
                //
                // Removes any trailing whitespace from the prior content node and flags
                // the next operation for stripping if it is a content node.
                strip: function () {
                    if (this.pendingContent) {
                        this.pendingContent = this.pendingContent.replace(/\s+$/, '');
                    }
                    this.stripNext = 'strip';
                },

                // [append]
                //
                // On stack, before: value, ...
                // On stack, after: ...
                //
                // Coerces `value` to a String and appends it to the current buffer.
                //
                // If `value` is truthy, or 0, it is coerced into a string and appended
                // Otherwise, the empty string is appended
                append: function () {
                    // Force anything that is inlined onto the stack so we don't have duplication
                    // when we examine local
                    this.flushInline();
                    var local = this.popStack();
                    this.pushSource("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
                    if (this.environment.isSimple) {
                        this.pushSource("else { " + this.appendToBuffer("''") + " }");
                    }
                },

                // [appendEscaped]
                //
                // On stack, before: value, ...
                // On stack, after: ...
                //
                // Escape `value` and append it to the buffer
                appendEscaped: function () {
                    this.context.aliases.escapeExpression = 'this.escapeExpression';

                    this.pushSource(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"));
                },

                // [getContext]
                //
                // On stack, before: ...
                // On stack, after: ...
                // Compiler value, after: lastContext=depth
                //
                // Set the value of the `lastContext` compiler value to the depth
                getContext: function (depth) {
                    if (this.lastContext !== depth) {
                        this.lastContext = depth;
                    }
                },

                // [lookupOnContext]
                //
                // On stack, before: ...
                // On stack, after: currentContext[name], ...
                //
                // Looks up the value of `name` on the current context and pushes
                // it onto the stack.
                lookupOnContext: function (name) {
                    this.push(this.nameLookup('depth' + this.lastContext, name, 'context'));
                },

                // [pushContext]
                //
                // On stack, before: ...
                // On stack, after: currentContext, ...
                //
                // Pushes the value of the current context onto the stack.
                pushContext: function () {
                    this.pushStackLiteral('depth' + this.lastContext);
                },

                // [resolvePossibleLambda]
                //
                // On stack, before: value, ...
                // On stack, after: resolved value, ...
                //
                // If the `value` is a lambda, replace it on the stack by
                // the return value of the lambda
                resolvePossibleLambda: function () {
                    this.context.aliases.functionType = '"function"';

                    this.replaceStack(function (current) {
                        return "typeof " + current + " === functionType ? " + current + ".apply(depth0) : " + current;
                    });
                },

                // [lookup]
                //
                // On stack, before: value, ...
                // On stack, after: value[name], ...
                //
                // Replace the value on the stack with the result of looking
                // up `name` on `value`
                lookup: function (name) {
                    this.replaceStack(function (current) {
                        return current + " == null || " + current + " === false ? " + current + " : " + this.nameLookup(current, name, 'context');
                    });
                },

                // [lookupData]
                //
                // On stack, before: ...
                // On stack, after: data, ...
                //
                // Push the data lookup operator
                lookupData: function () {
                    this.pushStackLiteral('data');
                },

                // [pushStringParam]
                //
                // On stack, before: ...
                // On stack, after: string, currentContext, ...
                //
                // This opcode is designed for use in string mode, which
                // provides the string value of a parameter along with its
                // depth rather than resolving it immediately.
                pushStringParam: function (string, type) {
                    this.pushStackLiteral('depth' + this.lastContext);

                    this.pushString(type);

                    // If it's a subexpression, the string result
                    // will be pushed after this opcode.
                    if (type !== 'sexpr') {
                        if (typeof string === 'string') {
                            this.pushString(string);
                        } else {
                            this.pushStackLiteral(string);
                        }
                    }
                },

                emptyHash: function () {
                    this.pushStackLiteral('{}');

                    if (this.options.stringParams) {
                        this.push('{}'); // hashContexts
                        this.push('{}'); // hashTypes
                    }
                },
                pushHash: function () {
                    if (this.hash) {
                        this.hashes.push(this.hash);
                    }
                    this.hash = {
                        values: [],
                        types: [],
                        contexts: []
                    };
                },
                popHash: function () {
                    var hash = this.hash;
                    this.hash = this.hashes.pop();

                    if (this.options.stringParams) {
                        this.push('{' + hash.contexts.join(',') + '}');
                        this.push('{' + hash.types.join(',') + '}');
                    }

                    this.push('{\n    ' + hash.values.join(',\n    ') + '\n  }');
                },

                // [pushString]
                //
                // On stack, before: ...
                // On stack, after: quotedString(string), ...
                //
                // Push a quoted version of `string` onto the stack
                pushString: function (string) {
                    this.pushStackLiteral(this.quotedString(string));
                },

                // [push]
                //
                // On stack, before: ...
                // On stack, after: expr, ...
                //
                // Push an expression onto the stack
                push: function (expr) {
                    this.inlineStack.push(expr);
                    return expr;
                },

                // [pushLiteral]
                //
                // On stack, before: ...
                // On stack, after: value, ...
                //
                // Pushes a value onto the stack. This operation prevents
                // the compiler from creating a temporary variable to hold
                // it.
                pushLiteral: function (value) {
                    this.pushStackLiteral(value);
                },

                // [pushProgram]
                //
                // On stack, before: ...
                // On stack, after: program(guid), ...
                //
                // Push a program expression onto the stack. This takes
                // a compile-time guid and converts it into a runtime-accessible
                // expression.
                pushProgram: function (guid) {
                    if (guid != null) {
                        this.pushStackLiteral(this.programExpression(guid));
                    } else {
                        this.pushStackLiteral(null);
                    }
                },

                // [invokeHelper]
                //
                // On stack, before: hash, inverse, program, params..., ...
                // On stack, after: result of helper invocation
                //
                // Pops off the helper's parameters, invokes the helper,
                // and pushes the helper's return value onto the stack.
                //
                // If the helper is not found, `helperMissing` is called.
                invokeHelper: function (paramSize, name, isRoot) {
                    this.context.aliases.helperMissing = 'helpers.helperMissing';
                    this.useRegister('helper');

                    var helper = this.lastHelper = this.setupHelper(paramSize, name, true);
                    var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');

                    var lookup = 'helper = ' + helper.name + ' || ' + nonHelper;
                    if (helper.paramsInit) {
                        lookup += ',' + helper.paramsInit;
                    }

                    this.push(
                        '(' + lookup + ',helper ' + '? helper.call(' + helper.callParams + ') ' + ': helperMissing.call(' + helper.helperMissingParams + '))');

                    // Always flush subexpressions. This is both to prevent the compounding size issue that
                    // occurs when the code has to be duplicated for inlining and also to prevent errors
                    // due to the incorrect options object being passed due to the shared register.
                    if (!isRoot) {
                        this.flushInline();
                    }
                },

                // [invokeKnownHelper]
                //
                // On stack, before: hash, inverse, program, params..., ...
                // On stack, after: result of helper invocation
                //
                // This operation is used when the helper is known to exist,
                // so a `helperMissing` fallback is not required.
                invokeKnownHelper: function (paramSize, name) {
                    var helper = this.setupHelper(paramSize, name);
                    this.push(helper.name + ".call(" + helper.callParams + ")");
                },

                // [invokeAmbiguous]
                //
                // On stack, before: hash, inverse, program, params..., ...
                // On stack, after: result of disambiguation
                //
                // This operation is used when an expression like `{{foo}}`
                // is provided, but we don't know at compile-time whether it
                // is a helper or a path.
                //
                // This operation emits more code than the other options,
                // and can be avoided by passing the `knownHelpers` and
                // `knownHelpersOnly` flags at compile-time.
                invokeAmbiguous: function (name, helperCall) {
                    this.context.aliases.functionType = '"function"';
                    this.useRegister('helper');

                    this.emptyHash();
                    var helper = this.setupHelper(0, name, helperCall);

                    var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

                    var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');
                    var nextStack = this.nextStack();

                    if (helper.paramsInit) {
                        this.pushSource(helper.paramsInit);
                    }
                    this.pushSource('if (helper = ' + helperName + ') { ' + nextStack + ' = helper.call(' + helper.callParams + '); }');
                    this.pushSource('else { helper = ' + nonHelper + '; ' + nextStack + ' = typeof helper === functionType ? helper.call(' + helper.callParams + ') : helper; }');
                },

                // [invokePartial]
                //
                // On stack, before: context, ...
                // On stack after: result of partial invocation
                //
                // This operation pops off a context, invokes a partial with that context,
                // and pushes the result of the invocation back.
                invokePartial: function (name) {
                    var params = [this.nameLookup('partials', name, 'partial'), "'" + name + "'", this.popStack(), "helpers", "partials"];

                    if (this.options.data) {
                        params.push("data");
                    }

                    this.context.aliases.self = "this";
                    this.push("self.invokePartial(" + params.join(", ") + ")");
                },

                // [assignToHash]
                //
                // On stack, before: value, hash, ...
                // On stack, after: hash, ...
                //
                // Pops a value and hash off the stack, assigns `hash[key] = value`
                // and pushes the hash back onto the stack.
                assignToHash: function (key) {
                    var value = this.popStack(),
                        context,
                        type;

                    if (this.options.stringParams) {
                        type = this.popStack();
                        context = this.popStack();
                    }

                    var hash = this.hash;
                    if (context) {
                        hash.contexts.push("'" + key + "': " + context);
                    }
                    if (type) {
                        hash.types.push("'" + key + "': " + type);
                    }
                    hash.values.push("'" + key + "': (" + value + ")");
                },

                // HELPERS

                compiler: JavaScriptCompiler,

                compileChildren: function (environment, options) {
                    var children = environment.children,
                        child, compiler;

                    for (var i = 0, l = children.length; i < l; i++) {
                        child = children[i];
                        compiler = new this.compiler();

                        var index = this.matchExistingProgram(child);

                        if (index == null) {
                            this.context.programs.push(''); // Placeholder to prevent name conflicts for nested children
                            index = this.context.programs.length;
                            child.index = index;
                            child.name = 'program' + index;
                            this.context.programs[index] = compiler.compile(child, options, this.context);
                            this.context.environments[index] = child;
                        } else {
                            child.index = index;
                            child.name = 'program' + index;
                        }
                    }
                },
                matchExistingProgram: function (child) {
                    for (var i = 0, len = this.context.environments.length; i < len; i++) {
                        var environment = this.context.environments[i];
                        if (environment && environment.equals(child)) {
                            return i;
                        }
                    }
                },

                programExpression: function (guid) {
                    this.context.aliases.self = "this";

                    if (guid == null) {
                        return "self.noop";
                    }

                    var child = this.environment.children[guid],
                        depths = child.depths.list,
                        depth;

                    var programParams = [child.index, child.name, "data"];

                    for (var i = 0, l = depths.length; i < l; i++) {
                        depth = depths[i];

                        if (depth === 1) {
                            programParams.push("depth0");
                        } else {
                            programParams.push("depth" + (depth - 1));
                        }
                    }

                    return (depths.length === 0 ? "self.program(" : "self.programWithDepth(") + programParams.join(", ") + ")";
                },

                register: function (name, val) {
                    this.useRegister(name);
                    this.pushSource(name + " = " + val + ";");
                },

                useRegister: function (name) {
                    if (!this.registers[name]) {
                        this.registers[name] = true;
                        this.registers.list.push(name);
                    }
                },

                pushStackLiteral: function (item) {
                    return this.push(new Literal(item));
                },

                pushSource: function (source) {
                    if (this.pendingContent) {
                        this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent)));
                        this.pendingContent = undefined;
                    }

                    if (source) {
                        this.source.push(source);
                    }
                },

                pushStack: function (item) {
                    this.flushInline();

                    var stack = this.incrStack();
                    if (item) {
                        this.pushSource(stack + " = " + item + ";");
                    }
                    this.compileStack.push(stack);
                    return stack;
                },

                replaceStack: function (callback) {
                    var prefix = '',
                        inline = this.isInline(),
                        stack,
                        createdStack,
                        usedLiteral;

                    // If we are currently inline then we want to merge the inline statement into the
                    // replacement statement via ','
                    if (inline) {
                        var top = this.popStack(true);

                        if (top instanceof Literal) {
                            // Literals do not need to be inlined
                            stack = top.value;
                            usedLiteral = true;
                        } else {
                            // Get or create the current stack name for use by the inline
                            createdStack = !this.stackSlot;
                            var name = !createdStack ? this.topStackName() : this.incrStack();

                            prefix = '(' + this.push(name) + ' = ' + top + '),';
                            stack = this.topStack();
                        }
                    } else {
                        stack = this.topStack();
                    }

                    var item = callback.call(this, stack);

                    if (inline) {
                        if (!usedLiteral) {
                            this.popStack();
                        }
                        if (createdStack) {
                            this.stackSlot--;
                        }
                        this.push('(' + prefix + item + ')');
                    } else {
                        // Prevent modification of the context depth variable. Through replaceStack
                        if (!/^stack/.test(stack)) {
                            stack = this.nextStack();
                        }

                        this.pushSource(stack + " = (" + prefix + item + ");");
                    }
                    return stack;
                },

                nextStack: function () {
                    return this.pushStack();
                },

                incrStack: function () {
                    this.stackSlot++;
                    if (this.stackSlot > this.stackVars.length) {
                        this.stackVars.push("stack" + this.stackSlot);
                    }
                    return this.topStackName();
                },
                topStackName: function () {
                    return "stack" + this.stackSlot;
                },
                flushInline: function () {
                    var inlineStack = this.inlineStack;
                    if (inlineStack.length) {
                        this.inlineStack = [];
                        for (var i = 0, len = inlineStack.length; i < len; i++) {
                            var entry = inlineStack[i];
                            if (entry instanceof Literal) {
                                this.compileStack.push(entry);
                            } else {
                                this.pushStack(entry);
                            }
                        }
                    }
                },
                isInline: function () {
                    return this.inlineStack.length;
                },

                popStack: function (wrapped) {
                    var inline = this.isInline(),
                        item = (inline ? this.inlineStack : this.compileStack).pop();

                    if (!wrapped && (item instanceof Literal)) {
                        return item.value;
                    } else {
                        if (!inline) {
                            if (!this.stackSlot) {
                                throw new Exception('Invalid stack pop');
                            }
                            this.stackSlot--;
                        }
                        return item;
                    }
                },

                topStack: function (wrapped) {
                    var stack = (this.isInline() ? this.inlineStack : this.compileStack),
                        item = stack[stack.length - 1];

                    if (!wrapped && (item instanceof Literal)) {
                        return item.value;
                    } else {
                        return item;
                    }
                },

                quotedString: function (str) {
                    return '"' + str
                        .replace(/\\/g, '\\\\')
                        .replace(/"/g, '\\"')
                        .replace(/\n/g, '\\n')
                        .replace(/\r/g, '\\r')
                        .replace(/\u2028/g, '\\u2028') // Per Ecma-262 7.3 + 7.8.4
                    .replace(/\u2029/g, '\\u2029') + '"';
                },

                setupHelper: function (paramSize, name, missingParams) {
                    var params = [],
                        paramsInit = this.setupParams(paramSize, params, missingParams);
                    var foundHelper = this.nameLookup('helpers', name, 'helper');

                    return {
                        params: params,
                        paramsInit: paramsInit,
                        name: foundHelper,
                        callParams: ["depth0"].concat(params).join(", "),
                        helperMissingParams: missingParams && ["depth0", this.quotedString(name)].concat(params).join(", ")
                    };
                },

                setupOptions: function (paramSize, params) {
                    var options = [],
                        contexts = [],
                        types = [],
                        param, inverse, program;

                    options.push("hash:" + this.popStack());

                    if (this.options.stringParams) {
                        options.push("hashTypes:" + this.popStack());
                        options.push("hashContexts:" + this.popStack());
                    }

                    inverse = this.popStack();
                    program = this.popStack();

                    // Avoid setting fn and inverse if neither are set. This allows
                    // helpers to do a check for `if (options.fn)`
                    if (program || inverse) {
                        if (!program) {
                            this.context.aliases.self = "this";
                            program = "self.noop";
                        }

                        if (!inverse) {
                            this.context.aliases.self = "this";
                            inverse = "self.noop";
                        }

                        options.push("inverse:" + inverse);
                        options.push("fn:" + program);
                    }

                    for (var i = 0; i < paramSize; i++) {
                        param = this.popStack();
                        params.push(param);

                        if (this.options.stringParams) {
                            types.push(this.popStack());
                            contexts.push(this.popStack());
                        }
                    }

                    if (this.options.stringParams) {
                        options.push("contexts:[" + contexts.join(",") + "]");
                        options.push("types:[" + types.join(",") + "]");
                    }

                    if (this.options.data) {
                        options.push("data:data");
                    }

                    return options;
                },

                // the params and contexts arguments are passed in arrays
                // to fill in
                setupParams: function (paramSize, params, useRegister) {
                    var options = '{' + this.setupOptions(paramSize, params).join(',') + '}';

                    if (useRegister) {
                        this.useRegister('options');
                        params.push('options');
                        return 'options=' + options;
                    } else {
                        params.push(options);
                        return '';
                    }
                }
            };

            var reservedWords = (
                "break else new var" +
                " case finally return void" +
                " catch for switch while" +
                " continue function this with" +
                " default if throw" +
                " delete in try" +
                " do instanceof typeof" +
                " abstract enum int short" +
                " boolean export interface static" +
                " byte extends long super" +
                " char final native synchronized" +
                " class float package throws" +
                " const goto private transient" +
                " debugger implements protected volatile" +
                " double import public let yield"
            ).split(" ");

            var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

            for (var i = 0, l = reservedWords.length; i < l; i++) {
                compilerWords[reservedWords[i]] = true;
            }

            JavaScriptCompiler.isValidJavaScriptVariableName = function (name) {
                if (!JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name)) {
                    return true;
                }
                return false;
            };

            __exports__ = JavaScriptCompiler;
            return __exports__;
        })(__module2__, __module5__);

        // handlebars.js
        var __module0__ = (function (__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
            "use strict";
            var __exports__;
            /*globals Handlebars: true */
            var Handlebars = __dependency1__;

            // Compiler imports
            var AST = __dependency2__;
            var Parser = __dependency3__.parser;
            var parse = __dependency3__.parse;
            var Compiler = __dependency4__.Compiler;
            var compile = __dependency4__.compile;
            var precompile = __dependency4__.precompile;
            var JavaScriptCompiler = __dependency5__;

            var _create = Handlebars.create;
            var create = function () {
                var hb = _create();

                hb.compile = function (input, options) {
                    return compile(input, options, hb);
                };
                hb.precompile = function (input, options) {
                    return precompile(input, options, hb);
                };

                hb.AST = AST;
                hb.Compiler = Compiler;
                hb.JavaScriptCompiler = JavaScriptCompiler;
                hb.Parser = Parser;
                hb.parse = parse;

                return hb;
            };

            Handlebars = create();
            Handlebars.create = create;

            __exports__ = Handlebars;
            return __exports__;
        })(__module1__, __module7__, __module8__, __module10__, __module11__);

        return __module0__;
    })();
    return sr_obj;
}(sr_$));
(function(sr_$, window, document) {
	var sr_obj = sr_$;

	sr_$.assetDomain = sr_$.assetDomain || "https://www.shoprunner.com/";

	sr_$.plugins.modal = {};
	sr_$.plugins.modal.init = function() {
		var $ = sr_obj.jQ;

		$.support.transition = (function() {
			var thisBody = document.body || document.documentElement,
				thisStyle = thisBody.style,
				support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
			return support;
		})();
		var supportsSvg = function() {
			return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.0")
		}
		sr_obj.master_prefix = '#_SR';
		sr_obj.is_touch_device = 'ontouchstart' in document.documentElement;
		// Test for placeholder support
		$.support.placeholder = (function() {
			var i = document.createElement('input');
			return 'placeholder' in i;
		})();
		$.fn.on_transition_end = function(func) {
			on_transition_end(this, func, false);
		}
		$.fn.transition_ending = function() {
				if (!$.support.transition) {
					on_transition_end(this, false);
				}
			}
			//remove any classes with a specific prefix
			//ie. div has class='sr_UI__modal sr_UI__active sr_kept'
			//calling removeClassWithPrefix('sr_UI') removes 'sr_UI__modal sr_UI__active'
		$.fn.extend({
			removeClassWithPrefix: function(prefix) {
				return this.removeClass(function(index, css) {
					var r = "\\b(" + prefix + ")\\S+";
					var reg = new RegExp(r, "g");
					return (css.match(reg) || []).join(' ');
				});
			}
		});

		$.fn.off_transition_end = function(use_animation) {
			off_transition_end(this, false);
		}
		$.fn.on_animation_end = function(func) {
			on_transition_end(this, func, true);
		}
		$.fn.off_animation_end = function(func) {
			off_transition_end(this, func, true);
		}
		sr_obj.htmlDecode = function(input) {
			var e = document.createElement('div');
			e.innerHTML = input;
			return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
		}
		var on_transition_end = function(obj, func, use_animation) {
			var tself = $(obj);
			if (typeof(func) == "undefined" || func == false) {
				tself.each(function() {
					if (use_animation) {
						if (this.on_animation_end) {
							this.on_animation_end.call(tself);
						}
					} else {
						if (this.on_transition_end) {
							this.on_transition_end.call(tself);
						}
					}
				});
				return;
			}
			tself.each(function() {
				if (use_animation) this.on_animation_end = func;
				else this.on_transition_end = func;
			});

			if ($.support.transition) {
				if (use_animation) var css_props = 'webkitAnimationEnd oAnimationEnd msAnimationEnd animationend';
				else var css_props = 'webkitTransitionEnd oTransitionEnd msTransitionEnd transitionend';
				tself.on(css_props, func);

			} else {
				//ie < 10
				func.call(tself);
			}
		}

		var off_transition_end = function(obj, func, use_animation) {
			var tself = $(obj);
			if (use_animation) var css_props = 'webkitAnimationEnd oAnimationEnd msAnimationEnd animationend';
			else var css_props = 'webkitTransitionEnd oTransitionEnd msTransitionEnd transitionend';
			if (typeof(func) == "function") tself.off(css_props, func);
			else tself.off(css_props);
			tself.each(function() {
				if (use_animation) this.on_animation_end = false;
				else this.on_transition_end = false;
			})
		}



		//black tooltip popup
		sr_obj.info_box = new function() {
			var self = this;
			var current_hit = false;
			var open = false;
			var resizer = function() {
				//self.clear();
				$(current_hit).click();
			}
			var sr_info_box_handler = function(e) {
				if (this !== current_hit) self.clear();

				current_hit = this;
				e.stopPropagation();


				var obj_offset = $(e.target).offset();
				var modalWrap = sr_$.jQ('#sr_modal_wrap');
				var mw_offset = $('#sr_modal_wrap').offset();
				var move_x = obj_offset.left - mw_offset.left;
				var move_y = obj_offset.top - 26 - mw_offset.top;
				if (move_x > ($(window).width() / 2)) {
					move_x = move_x - 260;
				} else {
					move_x = move_x - 100;
				}
				if (move_x < 0) move_x = 0;
				if (!open) {
					modalWrap.append('<div class="sr_info_box_module "><div class="sr_info_box_container"><div tabindex="0" class="sr_info_box_container_close sr_icon_X"></div>' + $(this).attr('data-info-box') + '</div></div>');
					$(sr_obj.master_prefix).addClass('sr_info_box_active');
					var my_id = $(this).attr('data-id');
					if (my_id) $(sr_obj.master_prefix).addClass('sr_info_box__' + my_id);
					$(window).resize(resizer);
				}

				var me = $('.sr_info_box_container');
				var h = me.height();
				me.css('top', (move_y - h) + "px");
				me.css('left', move_x + "px");
				if (!open) me.delay(200).css('opacity', 1);

				open = this;
			}

			self.clear = function() {
				$('.sr_info_box_container').remove();
				var my_id = $(current_hit).attr('data-id');
				if (my_id) $(sr_obj.master_prefix).removeClass('sr_info_box__' + my_id);
				$(sr_obj.master_prefix).removeClass('sr_info_box_active');
				$(window).unbind('resize', resizer);
				open = false;
			}

			self.initialize = function() {
				sr_obj.jQ('#sr_global').on('click', ".sr_info_box", sr_info_box_handler);
				sr_obj.jQ('#sr_global').on('click', ".sr_info_box_container_close", self.clear);
			};

		}


		// Bind Escape to Close Modal

		sr_obj.UI_manager = new function() {
			var self = this;
			var active_UI = {};
			var is_open = false;
			var UI_init = false;
			var UI_frozen = false;
			self.history = [];
			self.ios_viewport_int;
			var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
				window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			//when you do a display:block on a css object with a css3 animation, browsers jump to end of animation
			//to prevent this, do fast asyncronous call, allowing animation to run normally
			var default_animation_request = function(func) {
				if (requestAnimationFrame) {
					requestAnimationFrame(function() {
						requestAnimationFrame(func);
					});
				} else func();
			}

			this.errors = new function() {

				var self = this;
				self.current_errors = [];
				var errors_selector = '.sr_errors_content > div';
				var resizer = function() {
					if (!is_open) {
						$(window).unbind('resize', resizer);
						return;
					}
					var pos = $('#sr_master_errors').css('position');

					if (pos !== "absolute") {
						$('#sr_modal_content_wrap,#sr_pages').css('margin-top', $('#sr_master_errors').get(0).offsetHeight + 'px');
					} else {
						$('#sr_modal_content_wrap,#sr_pages').css('margin-top', '0');
					}
				}
				this.size_update = resizer;
				this.append = function(html, attr) {
					$('.sr_errors_content').prepend('<div ' + attr + '>' + html + '</div>');
				}
				this.check = function() {
					$('.sr_error_inline').each(function() {
						var me = $(this);
						var persist = me.attr('data-persist');
						var location = me.attr('data-location');
						var id = me.attr('data-id');
						var new_obj = {};
						if (id) new_obj.id = id;
						if (location) new_obj.location = location;
						if (persist) new_obj.persist = persist;
						new_obj.html = me.html();
						me.remove();
						self.show(new_obj);

					});
					if ($(errors_selector).length > 0) {

						self.show();
					} else {
						self.clear();
					}
				}


				var sheet = function() {
					var style = document.createElement("style");
					style.setAttribute('type', 'text/css');
					if (style.styleSheet) {
						style.styleSheet.cssText = "";
					} else {
						style.appendChild(document.createTextNode(""));
					}
					document.getElementsByTagName('head')[0].appendChild(style);
					if (style.styleSheet) return style.styleSheet;
					return style.sheet;
				};



				var addCSSRule = function(sheet, selector, rules, index) {

					if (sheet.insertRule) {
						sheet.insertRule(selector + "{" + rules + "}", index);
					} else {
						sheet.addRule(selector, rules, index);
					}
				}


				var location_sheet = sheet();
				var location_css = function(selector, location) {
					addCSSRule(location_sheet, selector, "display:none");
					addCSSRule(location_sheet, location + " " + selector, "display:block");
				}


				this.show = function(obj) {


					if (obj) {
						//if(!obj.html || obj.html == '')return false;

						var attr = '';
						on_transition_end('.sr_errors'); //force the function on end, if exists
						$(window).unbind('resize', resizer);
						off_transition_end('.sr_errors');

						if (obj.html) {
							if (obj.id) {

								var class_add = 'sr_error sr_error_id_' + obj.id;
								if (obj.persist) {
									class_add += ' sr_error_persist';
								}
								attr = 'class="' + class_add + '"';
								var exists = $('.sr_error_id_' + obj.id);
								if (exists.get(0)) {
									exists.html(obj.html);
								} else {
									self.append(obj.html, attr);
								}
							} else {
								obj.id = 'SRE_' + new Date().getTime()
								attr = 'class="sr_error sr_error_id_' + obj.id + '"';
								self.append(obj.html, attr);
							}
						}
						if (obj.related) {
							$(obj.related).each(function() {
								$(this).addClass('sr_error');
							});
						}
						if (obj.location) location_css('.sr_error_id_' + obj.id, obj.location);
						if (!obj.persist) {
							if ($('.sr_errors__close').length == 0) {

								$('#sr_master_errors').prepend('<div class="sr_icon_X sr_fr sr_errors__close"></div>');
							}
						}
						$('#sr_master_errors').attr('class', 'sr_errors ' + (obj.className || ''));
						self.current_errors.push(obj);
					} else return false;

					$('#sr_master_errors').resize(resizer);
					$(window).resize(resizer);
					$('#sr_modal .sr_errors').show();
					default_animation_request(function() {
						$('#sr_modal').addClass('sr_errors_show');
					})

					$('#sr_master_errors').resize();
					sr_obj.UI_manager.format_inputs_post_render();
					sr_obj.UI_manager.check_focus();
					return obj;
				}

				//id = true means forced clear all
				//just an id will only clear that particular one
				//no id passed will clear everything but persist = true
				this.clear = function(id) {


					if (typeof(id) == "object") id = false; //because it came from a click handler, trying to pass event
					var clear = true;
					if (id) {
						if (id === true) {
							clear = true;
						} else {
							if ($('.sr_errors_content > div').not('.sr_error_id_' + id).length > 0) {
								clear = false;
								$('.sr_error_id_' + id).remove();
							}
						}
					} else if ($('.sr_error_persist').length > 0) {
						clear = false;
						$('.sr_errors__close').remove();
						$('.sr_errors_content > div:not(.sr_error_persist)').remove();
						$(self.current_errors).each(function() {

							if (this.related && !this.persist) {
								$(this.related).each(function() {
									$(this).removeClass('sr_error');
								})

							}
						})
					}
					if (clear) {
						$('.sr_errors__close').remove();
						$('#sr_modal').removeClass('sr_errors_show');
						$('#sr_master_errors').resize().unbind('resize');

						on_transition_end('.sr_errors', function() {
							$('.sr_errors_content').html('');
							self.current_errors = [];
							off_transition_end('.sr_errors');
							$('#sr_modal').removeClass('sr_errors_show');
							$(window).unbind('resize', resizer);
							resizer();
						});

					}
				}
			}

			var browserScrollBarSize = (function() {
				var inner = $('<p></p>').css({
					'width': '100%',
					'height': '100%'
				});
				var outer = $('<div></div>').css({
					'position': 'absolute',
					'width': '100px',
					'height': '100px',
					'top': '0',
					'left': '0',
					'visibility': 'hidden',
					'overflow': 'hidden'
				}).append(inner);

				$(document.body).append(outer);

				var w1 = inner.width(),
					h1 = inner.height();
				outer.css('overflow', 'scroll');
				var w2 = inner.width(),
					h2 = inner.height();
				if (w1 == w2 && outer[0].clientWidth) {
					w2 = outer[0].clientWidth;
				}
				if (h1 == h2 && outer[0].clientHeight) {
					h2 = outer[0].clientHeight;
				}

				outer.detach();

				return [(w1 - w2), (h1 - h2)];
			}());
			var is_touch_device = 'ontouchstart' in document.documentElement;
			$.fn.myUnwrap = function() {
				this.parent(':not(body)').each(function() {
					$(this).replaceWith(this.childNodes);
				});
				return this;
			};
			this.scroll = function(obj) {



					var the_scroll_obj = $(obj);
					var scroll_id = the_scroll_obj.attr('data-sr-scroll-id');
					if (scroll_id) scroll_id = 'sr_scroll_id__' + scroll_id;
					else scroll_id = '';
					var scroll_template = $('<div class="sr_scroll_wrap ' + scroll_id + '"><div class="sr_scroller_area"><div class="sr_scroller_bar"></div></div><div class="sr_scroll"></div></div>');
					the_scroll_obj.before(scroll_template);
					the_scroll_obj.appendTo($(scroll_template).find('.sr_scroll'));
					the_scroll_obj.removeAttr('data-sr-scroll').addClass('sr_scroll_content');
					var self = the_scroll_obj.closest('.sr_scroll_wrap');


					//the_scroll_obj.replaceWith( the_scroll_obj.get(0).childNodes );

					//if this is a touch device, stop here. no scrollbars, etc
					if (is_touch_device || browserScrollBarSize[0] == 0) {
						self.addClass('sr_scrollbar_none');
						return false;
					}

					var scroller = self.find('.sr_scroll');
					var scroller_obj = scroller.get(0);
					var scroller_area = self.find('.sr_scroller_area');
					var scroller_content = self.find('.sr_scroll_content');
					var scroller_bar = self.find('.sr_scroller_bar');
					var scroller_area_height, scroll_box_height, scroll_box_scrollHeight, scroll_box_scrollTop;

					scroller.css('padding-right', browserScrollBarSize[0] + 'px');
					scroller_content.css('margin-right', -browserScrollBarSize[0] + 'px');

					var refresh_props = function() {
						scroll_box_height = scroller.height(); // visible height of scroll area
						scroll_box_scrollHeight = scroller_obj.scrollHeight; // inner height of scroll area (all content)
						scroll_box_scrollTop = scroller_obj.scrollTop; //offset top of scrolling

						get_scroller_area_height();
					}
					var get_scroller_area_height = function() {
						if (scroller_area.length > 0) {
							scroller_area_height = scroller_area.height(); //height of scroller area
						} else scroller_area_height = scroller.height();
					}


					on_mousewheel(self.get(0), function(e) {
						return;
						var event = e || window.event; // IE compatibility
						var current = $(event.currentTarget);
						if (current.hasClass('sr_hasScrollbars') || current.parents().hasClass('sr_okToScroll')) {
							event.cancelBubble = true;
						} else {
							event.preventDefault();
						}
						return false;
					})

					var render_bars_from_current = function(event) {
						if (scrollbar_active) return;

						refresh_props();

						//set height of scroll bar, based on scroll box calculations
						var new_height = (Math.round((scroll_box_height / scroll_box_scrollHeight) * 100));


						if (new_height >= 100) {
							self.removeClass('sr_hasScrollbars').addClass('sr_noScrollbars');;
							//scroller_bar.hide();
							return;
						} else self.addClass('sr_hasScrollbars').removeClass('sr_noScrollbars');
						scroller_bar.css('height', new_height + '%');


						var scrollarea_percentage_scrolled = Math.round(100 * scroll_box_scrollTop / (scroll_box_scrollHeight - scroll_box_height));
						if (scrollarea_percentage_scrolled > 100) scrollarea_percentage_scrolled = 100;
						var adjusted_scrollbar_top = (scroller_area_height - scroller_bar.height()) * scrollarea_percentage_scrolled / 100;

						scroller_bar.css('top', adjusted_scrollbar_top + "px")


					}

					scroller.scroll(render_bars_from_current);
					var scrollbar_active = false;
					var scrollbar_mousedown_original_y = 0;


					scroller_bar.on('mousedown', function(e) {
						scrollbar_mousedown_original_y = e.clientY;
						scrollbar_mousedown_original_top = parseInt(scroller_bar.css('top'));
						scrollbar_active = true;
						self.addClass('sr_scrolling');
					})
					$('body').on('mouseup', function() {
						scrollbar_active = false;
						self.removeClass('sr_scrolling');
					});
					self.hover(function(e) {
						render_bars_from_current();
					})
					self.on('mousemove', function(e) {

						if (scrollbar_active) {
							refresh_props();
							var scrollbar_percentage_scrolled = Math.round(parseInt(scroller_bar.css('top')) * 100 / (scroller_area_height - scroller_bar.height()));

							if (scrollbar_percentage_scrolled < 0) {
								scrollbar_percentage_scrolled = 0;
							} else if (scrollbar_percentage_scrolled > 100) {
								scrollbar_percentage_scrolled = 100;
							}
							var r = (scroller_area_height - scroller_bar.height())
							var proposed = (scrollbar_mousedown_original_top + (e.clientY - scrollbar_mousedown_original_y));

							if (proposed > r) proposed = r;
							else if (proposed < 0) proposed = 0;
							scroller_bar.css('top', proposed + 'px');

							new_scrollTop = (scrollbar_percentage_scrolled * (scroll_box_scrollHeight - scroll_box_height) / 100);
							scroller.scrollTop(new_scrollTop);
							e.stopPropagation();
							e.preventDefault();
							return false;
						}

					});

					render_bars_from_current();
					setTimeout(function() {
						render_bars_from_current();
					}, 200);
					scroller.bind('resize', function() {
						render_bars_from_current();
					});
					//scroller_content.bind('resize', function(){ render_bars_from_current(); });
				} //end of scroll

			function getIEVersions() {
				var myNav = navigator.userAgent.toLowerCase();
				return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
			}
			var use_old_modal_logic = false;
			var isIphone = ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)));


			/* for quirks and IE7 */
			var old_modal_logic_reposition = function() {
				$('#sr_modal_bg').hide().width($(document).innerWidth()).height($(document).innerHeight()).show();
				var w = $(window).width() == 0 ? $(document.body).get(0).clientWidth : $(window).width();
				var h = $(window).height() == 0 ? $(document.body).get(0).clientHeight : $(window).height();

				var left = (w - $('#sr_modal').width()) / 2;
				var st = $(document).scrollTop() == 0 ? $(document.body).get(0).scrollTop : $(document).scrollTop();
				var top = ((h - $('#sr_modal').height()) / 2);
				if (left < 0) left = 0;
				if (top < 0) top = 0;

				// MLB sets IE to emulate IE7 and this code places our modals
				// off the bottom of the page, so not doing this makes them work.
				if (_shoprunner_com.retailerID != "MLB") {
					$('#sr_modal_wrap').css({
						'left': "0px",
						'top': st + "px"
					});
				}
				$('#sr_modal').css({
					'left': left + "px",
					'top': top + "px"
				});
			}

			this.check_focus = function() {

				$('.sr_kfocus').attr('tabindex', '0'); //lets make sure the divs with calss kfocus get the tabindex added.
				$('.sr_checkbox_wrap').attr('role', 'checkbox');
			}

			var format_inputs_action = function(e) {

				// Cache our selectors
				var $this = $(this),
					$parent = $this.parents('.js-label');

				if (e.type == 'keyup') {
					if ($this.val() == '') {
						$parent.addClass('js-hide-label');
					} else {
						$parent.removeClass('js-hide-label');
					}
				} else if (e.type == 'blur') {
					if ($this.val() == '') {
						$parent.addClass('js-hide-label');
					} else {
						$parent.removeClass('js-hide-label').addClass('js-unhighlight-label');
					}
				} else if (e.type == 'focus') {
					if ($this.val() !== '') {
						$parent.removeClass('js-unhighlight-label');
					}
				}
				return true;
			}
			this.format_inputs_post_render = function() {
				if ($.support.placeholder) {

					$('.sr_form_ul li').each(function() {
						$(this).addClass('js-label js-hide-label');
					});
					//added the .blur to trigger it onload

					// Code for adding/removing classes here
					var all = $('.sr_form_ul li, .sr_form_li').find('input, textarea, select');
					all.unbind('keyup blur focus');
					all.on('keyup blur focus', format_inputs_action).blur();
				}
			}


			var modal_hide = function() {

				$('#sr_modal').hide();
			}

			var escape_handler = function(e) {
					if (e.keyCode == 27) self.close();
				}
				//see if input is checked, and check the container with a class
			var checkbox_check = function() {
				$('.sr_checkbox').each(function() {
					var cbx = $(this);
					if (cbx.find('input').attr('checked')) {
						cbx.find('.sr_checkbox_state').addClass('sr_checked');
						cbx.closest('.sr_checkbox_wrap').attr('aria-checked', true);
					}
				})
			}
			var checkbox_listener = function() {
					var cbs = $(this).find('.sr_checkbox_state');
					if ($(this).hasClass('sr_readonly'))
						return;
					if (cbs.hasClass('sr_checked')) {
						cbs.removeClass('sr_checked');
						cbs.closest('.sr_checkbox_wrap').attr('aria-checked', false);
						$(this).find('input').removeAttr('checked').trigger('change');
					} else {
						cbs.addClass('sr_checked');
						cbs.closest('.sr_checkbox_wrap').attr('aria-checked', true);
						$(this).find('input').attr('checked', 'checked').trigger('change');
					}
				}
				// Add Modal Base Template to sr_global
			this.initialize = function() {
				// Initialize the body after dom Ready (or in this case before modal opens)
				sr_obj.body = sr_obj.jQ('body');
				var ie_vers = getIEVersions();
				if (ie_vers) {
					if (document.compatMode == "BackCompat" || ie_vers == 6) {
						sr_obj.body.addClass('sr_backcompat');
						use_old_modal_logic = true;
					} else if (ie_vers == 7) {
						use_old_modal_logic = true;
					}
					sr_obj.body.addClass('sr_IE' + ie_vers);
					sr_obj.IE_version = ie_vers;
				}
				var spr_ext = supportsSvg() == true ? 'svg' : 'png';
				var sprite_path = sr_obj.img_path_ver + '_v' + sr_obj.major_version + '_sprite.' + spr_ext;
				$('<img/>')[0].src = sprite_path;

				var header_menu_active = false;

				if (sr_obj.root_node === null || typeof(sr_obj.root_node) === 'undefined')
					sr_obj.root_node = $('#sr_global');

				// root_node is set before jQuery is loaded, so if it's
				// not a jQuery object we convert it to one here.
				if (!sr_obj.root_node.jquery) {
					sr_obj.root_node = $(sr_obj.root_node);
				}

				if (sr_obj.is_touch_device)
					sr_obj.root_node.addClass('sr_isTouch');
				else
					sr_obj.root_node.addClass('sr_noTouch');


				if (isIphone) sr_obj.root_node.addClass('sr_isIphone');

				add_UI_template();
				//setup live events
				sr_obj.root_node.on('click', '.sr_pages_back', self.page.back).on('click', '.sr_UI_close', function() {
					sr_obj.UI_manager.close();
				}).on('keyup', ".sr_kfocus", function(e) {
					if (e.keyCode == 32) {
						$(this).click(); //spacebar, for tabbing toggle
					}
				}).on('focus', ".sr_select_wrap select", function() {
					$(this).parent().addClass('sr_focus');
				}).on('blur', ".sr_select_wrap select", function() {
					$(this).parent().removeClass('sr_focus');
				}).on('click', '.sr_checkbox_wrap', checkbox_listener).on('click', '[type=submit]', function() {
					sr_obj.root_node.find('input, select').blur();
				}).on('click', '.sr_errors__close', self.errors.clear).on('click', '[data-sr-action=scrollTo]', function() {
					var dl = $(this).attr('data-loc');
					dlo = $(dl);
					var st = 0;
					if (dl != "top") {
						if (dlo.length == 0) return;
						st = dlo.position().top;
					}
					$(this).parents('.sr_scroll').scrollTop(st);

				}).on('click', function(e) {
					var target = $(e.target);
					var data_view = target.attr('data-action');
					if (data_view) {
						if (data_view == "signout") {
							//if(sr_obj.UI_manager.close()){
							sr_obj.signOut();
							return;
							//}
						} else {
							sr_$.views.openModal(data_view);
						}
					}
					if (header_menu_active) {
						//if(target.parents('#sr_header_menu').length == 0){
						if (target.attr('id') !== 'sr_hbgr') {
							$('#sr_header_menu').removeClass('sr_active');
						}
					}

				});

				var is_touch_device = 'ontouchstart' in document.documentElement;
				var menu_action_bind = is_touch_device == false ? 'click' : 'touchstart';
				sr_obj.root_node.on(menu_action_bind, '#sr_hbgr', function(e) {
					var p = $(this).parent();
					if (p.hasClass('sr_active')) {
						p.removeClass('sr_active');
						header_menu_active = false;
					} else {
						p.addClass('sr_active');
						header_menu_active = true;
					}
					e.stopPropagation();
				});

				if (!$.support.transition) sr_obj.root_node.addClass('sr_no_transition');


        //following is hack for iphone input field focus on position fixed bugs
        if (isIphone) {
          var noActiveElementInt, keyboardOpen = false;
          var input_text = '#sr_UI input:not(.sr_btn),#sr_UI textarea,#sr_UI select';
          var srscroll = ".sr_scroll,.sr_okToScroll,.sr_modal_content";
          var preventMoveOnBody = function(e) {
            e.preventDefault();
          }
          var srGlobalTouchstart = function(e) {
            this.allowUp = (this.scrollTop > 0);
            this.allowDown = (this.scrollTop < this.scrollHeight - this.clientHeight);
            this.lastY = e.originalEvent.pageY;
          }
          var srGlobalTouchmove = function(e) {
            var event = e.originalEvent;
            var up = (event.pageY > this.lastY), down = !up;
            this.lastY = event.pageY;
            if ((up && this.allowUp) || (down && this.allowDown)) {
              event.stopPropagation();
            }
          }
          var srGlobalTouchend = function(e) {
            if( $(window).scrollLeft() !== 0){
              $(window).scrollLeft(0);
            }
          }
          var stopPageScroll_iOS = function() {
            console.log('stopPageScroll_iOS')
            $(document).on('touchmove', preventMoveOnBody);
            $("#sr_global").on('touchstart', srscroll, srGlobalTouchstart).on(
              'touchmove', srscroll, srGlobalTouchmove).on(
              'touchend', srscroll, srGlobalTouchend);
          }
          var allowPageScroll_iOS = function() {
            console.log('allowPageScroll_iOS')
            $(document).off('touchmove', preventMoveOnBody);
            $("#sr_global").off('touchstart', srscroll, srGlobalTouchstart).off(
              'touchmove', srscroll, srGlobalTouchmove).off(
              'touchend', srscroll, srGlobalTouchend);
          }
          var iosKeyboardOpen = function(element) {
            //console.log('iosKeyboardOpen', keyboardOpen)
            if (!keyboardOpen) {
              var parent = $(element).parents('.sr_scroll'),
                additionalHeight = 50;
              while (parent.length > 0) {
                additionalHeight += parent[0].scrollHeight - parent.height();
                parent = parent.parents('.sr_scroll');
              }
              $('#sr_UI').css({
                height: (window.innerHeight + additionalHeight) + "px"
              });
              $('#sr_modal').css({'max-height':'none'});
            }
            keyboardOpen = true;
            clearInterval(noActiveElementInt);
          }
          var iosKeyboardClosed = function() {
            //console.log('iosKeyboardClosed')
            $('#sr_UI').css({
              height: window.innerHeight + "px"
            });
            $('#sr_modal').css({'max-height':'720px'});
            setTimeout(function() {
              $(window).scrollTop(0);
              $(window).scrollLeft(0);
            }, 0);
            keyboardOpen = false;
          }
          $(document.body).on("sr_modal_open", function() {
            initalH = window.innerHeight;
            $('#sr_UI').css({
              'position': 'absolute',
              'top': '0px',
              'left': '0px',
              'height': initalH + 'px'
            });
            $(window).scrollLeft(0);
            $(window).scrollTop(0);
            setTimeout(function() {
              $(window).scrollTop(0);
            }, 10);
            stopPageScroll_iOS();
          });
          $(document.body).on("sr_modal_close", function() {
            allowPageScroll_iOS();
          });
          $(document).on('focusin', function(event){
             if($(document.activeElement).parents('#sr_UI').length == 0 && is_open){
               document.activeElement.blur();
               $(window).scrollTop(0);
             }
          })
          $(document).on('focusin', input_text, function(event) {
            iosKeyboardOpen(this);
          }).on('focusout', input_text, function() {
            //cancel hack on blur
            clearInterval(noActiveElementInt);
            noActiveElementInt = setTimeout(function() {
              iosKeyboardClosed();
            }, 150);
          })
          var setModalHeight = function() {
            if (keyboardOpen || !is_open) return;
            //following detects if safari has bottom toolbar active or not, since page resize isnt called.
            //needs to be an interval, not on resize
            if ((window.innerHeight - 20) > document.documentElement.clientHeight) {
              sr_obj.root_node.addClass('ios_no_bottom_bar');
            } else sr_obj.root_node.removeClass('ios_no_bottom_bar');
            $('#sr_UI').css({
              'height': window.innerHeight + 'px'
            });
            $(window).scrollTop(0);
          };
          window.addEventListener("orientationchange", function() {

            $(window).scrollTop(0);

            //bug on rotation, sometimes overflows dont scroll
            var scrollingElements = $(srscroll);
            scrollingElements.each(function(){
              var me = $(this);
              if(me.css('overflow') == 'auto'){
                me.css({'-webkit-overflow-scrolling':'auto','overflow':'hidden'})
              }
              setTimeout(function(){
                 me.css({'-webkit-overflow-scrolling':'touch','overflow':'auto'})
              },20);
            });
            setTimeout(setModalHeight, 50);
          });
          self.ios_viewport_int = setInterval(setModalHeight, 700);
        } //END IPHONE HACKS

				// Initialize Tooltips
				sr_obj.info_box.initialize();

				// Setup accesibility for enter key on tabbable items.
				sr_$.jQ(document).on("keypress", "#_SR [tabindex]", function(event) {
					if(event.keyCode == 13) {
						this.click();
					}
				});
			}

			var remove_UI_template = function() {
				$('#_SR').remove();
			}

			var add_UI_template = function() {
				$('#_SR').remove();
				var tHtml = sr_$.templates.unCompiled.base_modal_template;
				sr_$.root_node.html(tHtml);

			}

			var on_mousewheel = function(obj, event) {

				var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
				if (obj.attachEvent) //if IE (and Opera depending on user setting)
					obj.attachEvent("on" + mousewheelevt, event)
				else if (obj.addEventListener) //WC3 browsers
					obj.addEventListener(mousewheelevt, event, false)
			}

			var freeze_UI = function() {
				$('#sr_UI_freeze').show();
				UI_frozen = true;
			}

			var unfreeze_UI = function() {
				$('#sr_UI_freeze').hide();
				UI_frozen = false;
			}

			this.getScope = function() {

				if (active_UI.scope) return active_UI.scope;
				else return false;
			}

			this.getModalScope = function() {
				if (active_UI_modal.scope) return active_UI_modal.scope;
				else return false;
			}

			var unload_last = function(current_view) {
				unload(2, current_view);
			}

			var unload_current = function() {
				unload(1, {});
			}

			var unload = function(index, current_view) {
				var last = self.history[self.history.length - index];
				if (last) {
					//this should be uncommented to fix modal unload bug, but waiting on Bryce to check out
					//if(last.type=="modal" && current_view.type=="page")return;
					if (last.onunload) last.onunload(current_view);
					if (last.$self) last.$self.remove();
				}
			}

			window_onbeforeunload_handler = function() {
				$(window).unbind('beforeunload', window_onbeforeunload_handler);
				var wobu = window_onbeforeunload_check();
				if (wobu !== true) return wobu;
			}

			window_onunload_handler = function() {
				switch (active_UI.type) {
					case "working":
					case "page":
						if (active_UI_modal) {
							if (active_UI_modal.onunload) {
								if (active_UI_modal.onunload() == false) return false;
							}
						}
						break;
				}
				unload_current();
			}

			function isIE(userAgent) {
			  userAgent = userAgent || navigator.userAgent;
			  return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1;
			}
			var initialScrollTop;
			this.open = function(params) {
				sr_obj.jQ('body').addClass('sr_freeze_page_scroll');
				default_animation_request(function() {
					sr_obj.jQ('body').addClass('sr_UI__active');
				})


				if (use_old_modal_logic) {
					$(window).resize(old_modal_logic_reposition);
					old_modal_logic_reposition();
					sr_obj.jQ('#sr_modal_bg').insertAfter('#sr_modal_wrap');
				}
				$(document).bind('keyup', escape_handler);


				if (!isIE()) $(window).bind('beforeunload', window_onbeforeunload_handler);
				$(window).bind('unload', window_onunload_handler);
				is_open = true;
				sr_$.jQ(document.body).trigger('sr_modal_open');
			}

			//when close animations are done, run unloads
			var on_close_transition = function() {
					if (!is_open) return;

					unload_current();
					switch (active_UI.type) {
						case "working":
						case "page":
							if (active_UI_modal) {
								if (active_UI_modal.onunload) {
									if (active_UI_modal.onunload() == false) return false;
								}
							}
							break;
					}
					self.history = [];
					self.page.page_history = [];
					active_UI = {};
					active_UI_modal = false
					sr_obj.jQ('body').removeClass('sr_freeze_page_scroll');
					off_transition_end('#sr_UI', on_close_transition);
					is_open = false;
					$(window).unbind('beforeunload', window_onbeforeunload_handler);
					$(window).unbind('unload', window_onunload_handler);
					self.errors.clear(true);
					remove_UI_template();
				}
				//use upcoming_view in onbeforeunload to understand next scope
			var onbeforeunload_check = function(obj, upcoming_view, do_confirm) {

				if (obj.onbeforeunload) {
					var obu = obj.onbeforeunload(upcoming_view);
					if (obu === false) return false;
					if (obu !== true) {
						if (do_confirm) {
							if (!confirm(obu)) {
								return false;
							}
						} else return obu; //the string message for prompt
					}
				}
				return true;
			}
			var window_onbeforeunload_check = function() {
				if (active_UI) {

					switch (active_UI.type) {
						case "working":
						case "page":
							if (active_UI_modal) {
								//doing this because a modal is a parent of a page. dont like this implementation
								//calling modal first this first because we only get one chance for window onbeforeunload.
								var modal_check = onbeforeunload_check(active_UI_modal, {}, false);
								if (modal_check !== true) return modal_check;
							}
							break;
					}
					return onbeforeunload_check(active_UI, {}, false);
				}
			}

			//attempt to close the active UI type
			this.close = function() {

				if (active_UI) {

					if (onbeforeunload_check(active_UI, {}, true) == false) return false;
					switch (active_UI.type) {
						case "working":
						case "page":
							if (active_UI_modal) {
								//doing this because a modal is a parent of a page. dont like this implementation
								if (onbeforeunload_check(active_UI_modal, {}, true) == false) return false;
							}
							break;
					}
				}
				clearTimeout(self.ios_viewport_int);
				sr_obj.root_node.removeClassWithPrefix('sr_UI'); //custom jq extend
				$(window).unbind('resize', old_modal_logic_reposition);
				sr_obj.jQ('body').removeClassWithPrefix('sr_UI'); //custom jq extend
				on_transition_end('#sr_UI', on_close_transition);
				$(document).unbind('keyup', escape_handler);
				$(window).unbind('beforeunload', window_onbeforeunload_handler);
				$(window).unbind('unload', window_onunload_handler);
				var event_name = "sr_modal_close";
				sr_$.jQ(document.body).trigger(event_name);
				//sr_$.events.trigger(document.body, event_name);
				setTimeout(function() {$('body').animate({scrollTop: initialScrollTop+'px'}, 200);},100);
				return true;
			}


			this.busy = function(state, title) {
				if (!UI_init) {
					sr_obj.UI_manager.initialize();
					self.page.init();
					UI_init = true;
				}

				if (state == true) {
					self.show({
						type: 'working',
						title: title
					});
				} else {
					clearInterval(working_timeout_int);
					if (active_UI.type !== "overlay") {
						sr_obj.root_node.removeClass('sr_UI_overlay__active sr_UI_working__active');
					} else {
						sr_obj.root_node.removeClass('sr_UI_working__active');
					}
					setTimeout(function() {
						//$('#sr_modal_bg_front').hide();
					}, 300);
					if (self.history.length == 0) self.close();
				}

			}

			var hideTimeouts = [];
			var active_UI_modal = false;
			var working_timeout_int = false;
			this.show = function(params, viewObj, options) {

				if (!params) return false;
				options = options || {};

				if (!UI_init) {
					sr_obj.UI_manager.initialize();
					self.page.init();
					UI_init = true
				}

				if ($('#_SR').length == 0) {

					add_UI_template();
					self.page.init();
				}
				var good_to_go = false;

				if (isIphone) {
					$('#sr_UI').css({
						'height': window.innerHeight + 'px'
					});
				}

				if (typeof(params) == "string") {
					var view_name = params;

					if (viewObj) params = sr_obj.views.getView(view_name, viewObj);
					else params = sr_obj.views.getView(view_name);
					if (!params.id) params.id = view_name;
				}
				if (!params.type) params.type = 'modal'; //is this a good thing?

				if (!params.id) {
					params.id = 'sr_UI_' + new Date().getTime();
				}

				//if(active_UI.id !== params.id){
				if (params.type !== "working") {
					if (onbeforeunload_check(active_UI, params, true) == false) return false;
				}
				/*	if(active_UI_modal && (params.type == "working" || params.type == "page")){

						if(active_UI.type !== "modal"){
							if(onbeforeunload_check(active_UI, params) == false)return false;
						}
					}else if(active_UI){
						if(onbeforeunload_check(active_UI_modal, params) == false)return false;
					}*/
				//}



				if (!is_open) {
					sr_obj.root_node.removeClassWithPrefix('sr_UI'); //clear anything before opening
				}

			  initialScrollTop = $('body').scrollTop();
				switch (params.type) {
					case "overlay":
						good_to_go = self.overlay(params);
						if (good_to_go) {
							sr_obj.root_node.removeClassWithPrefix('sr_UI_working');
							sr_obj.root_node.removeClassWithPrefix('sr_UI_modal');
							sr_obj.root_node.removeClassWithPrefix('sr_UI_page');
							hideTimeouts.push(
								setTimeout(function() {
									on_transition_end('#sr_modal', modal_hide);
									$("#sr_modal_inner").focus();
								}, 50)
							);
							self.history.push(params);
							self.page.empty();

						}
						break;
					case "working":
						good_to_go = self.overlay(params);
						working_timeout_int = setTimeout(function() {
							sr_obj.root_node.addClass('sr_UI_overlay__active sr_UI_working__active');
						}, 20);

						//$('#sr_modal_bg_front').show();
						break;
					case "modal":
						if (active_UI_modal.scope == params.scope) self.errors.clear();
						else self.errors.clear(true);

						good_to_go = self.modal(params);
						if (good_to_go) {

							if (hideTimeouts.length) {
								for (var i = 0; i < hideTimeouts.length; i++) {
									clearTimeout(hideTimeouts[i]);
								}
								hideTimeouts = [];
							}
							off_transition_end('#sr_modal', modal_hide);
							$("#sr_modal_inner").focus();

							if (active_UI.id !== params.id) {

								//sr_obj.root_node.removeClassWithPrefix('sr_UI_modal');
							}
							sr_obj.root_node.removeClassWithPrefix('sr_UI_working');
							sr_obj.root_node.removeClassWithPrefix('sr_UI_overlay');
							sr_obj.root_node.removeClassWithPrefix('sr_UI_page');
							params.$self = good_to_go;
							self.history.push(params);
							active_UI_modal = params;
							self.page.empty();
						}
						break;

					case "page":
						self.errors.clear();
						good_to_go = self.page.show(params);
						if (good_to_go) {
							sr_obj.root_node.removeClassWithPrefix('sr_UI_working');
							sr_obj.root_node.removeClassWithPrefix('sr_UI_overlay');
							self.history.push(params);

						}

						break;
				}

				if (!good_to_go) return false;
				active_UI = params;
				freeze_UI();
				sr_obj.info_box.clear();
				if (params.type !== "working") {
					self.format_inputs_post_render();
					//$('.sr_scroll').scrollTop(0);

					checkbox_check();

					//timing out for css animation reasons
					var showModal = function() {
						if (params.type == "modal") sr_obj.root_node.removeClassWithPrefix('sr_UI_modal');
						if (params.type == "page") {
							sr_obj.root_node.removeClassWithPrefix('sr_UI_page');
							sr_obj.root_node.addClass('sr_UI_modal__blur');
						}
						sr_obj.root_node.addClass('sr_UI_' + params.type + '__active');

						if (params.id) sr_obj.root_node.addClass('sr_UI_' + params.type + '__' + params.id);

						self.check_focus();
						$('.sr_scroll').scrollTop(0);
					};

					if (sr_$.root_node.attr("data-instant")) {
						showModal();
					} else {
						setTimeout(showModal, 20);
					}

					setTimeout(function() {
						if (active_UI.type == "working") return;
						var last = self.history[self.history.length - 2];

						unload_last(active_UI);
					}, 300);

					sr_obj.root_node.find('[data-sr-scroll]').each(function() {
						this.sr_scroll = new self.scroll(this);
					});
					$('.sr_scroll').scrollTop(0);
					self.errors.check();
					sr_obj.root_node.removeClassWithPrefix('sr_UI_forefront');
					sr_obj.root_node.addClass('sr_UI_forefront__' + params.type);
				}


				setTimeout(function() {
					unfreeze_UI();
				}, 300);


				if (!is_open) self.open(params); //open the UI if inactive
				return true;
			}

			this.page = new function() {

				var mp_self = this,
					$pages, $page_container;
				mp_self.page_history = [];
				var pages_open = false;
				var active_page = false;
				this.empty = function() {
					pages_open = false
					$page_container = $pages.find('.sr_page_container');
					mp_self.page_history = [];
					$pages.transition_ending();
				}
				this.init = function() {
					$pages = sr_obj.root_node.find('#sr_pages');
					$page_container = $pages.find('.sr_page_container');

					$pages.on_transition_end(function() {
						if (!pages_open) {
							if (active_page) active_page.$self.remove();
							active_page = false;
						}
					})
				}

				var prev_page = function() {
					return mp_self.page_history[mp_self.page_history.length - 2];
				}

				this.show = function(params) {
					if (!pages_open) mp_self.page_history = [];

					pages_open = true;
					$new_page = $('<div class="sr_page">' + params.html + '<div class="sr_clear"></div></div>');
					if (params.className) $new_page.addClass(params.className);
					if (params.id) $new_page.attr('id', params.id);
					$page_container.append($new_page);
					params.$self = $new_page;

					if (mp_self.page_history.length > 0) {
						active_page.$self.addClass('sr_page_out');
						active_page.$self.on_animation_end(function() {
							$(this).remove();
						})
					}

					$pages.show().removeClass('sr_no_tabbing');

					if (params.onload) params.onload();

					var back_text = "back";
					if (params.back_title) back_text = params.back_title;

					$('#sr_pages_back_title').html(back_text);

					sr_obj.root_node.find('#sr_ec_overview, #sr_ec_actions').addClass('sr_no_tabbing');

					// Lets set focus to sr_pages
					setTimeout(function() {
						sr_obj.jQ('#sr_pages').focus();
					}, 250);

					if (!params.__is_page_back) mp_self.page_history.push(params);
					active_page = params;
					return true;
				}

				this.back = function() {

					if (active_page.onbeforeback) {
						var obb = active_page.onbeforeback();
						if (obb !== true) {
							if (obb === false) return false;
							if (!confirm(obb)) return false
						}
					}

					try {
						active_page.onback();
						if (mp_self.page_history.length == 1) {
							mp_self.page_history.pop();
							pages_open = false;
							$pages.transition_ending(); //for browsers with no transition support, ping to call the transition end function. may be a better way
						}
					} catch (e) {

						if (mp_self.page_history.length > 1) {
							var move_to = prev_page();
							move_to.__is_page_back = true;

						} else var move_to = active_UI_modal;

						if (self.show(move_to)) {
							mp_self.page_history.pop();
							if (mp_self.page_history.length == 0) {
								pages_open = false;
								$pages.transition_ending();

								// Remove display:block from sr_pages so tabbing is not available
								sr_obj.jQ('#sr_pages').css('display','');
							}
						}
					}

				}
			}

			this.overlay = function(params) {
				var oc = $('#sr_overlay_content');
				oc.empty();
				if (!params.html) {
					if (!params.title) params.title = "";
					overlayData = {
						'h3': params.title,
						'ariaLabel': params.ariaLabel
					}
					var template = sr_obj.templates.getTemplate("overlay_default");
					params.html = template(overlayData);

					$("#sr_overlay h3").html(params.title);
				}

				sr_$.jQ("#sr_modal_inner").focus();

				if (params.onload) {
					params.onload();
				}
				oc.append(params.html);
				if (params.loader === false) {
					$('#sr_ov_anm').hide();
				} else {
					$('#sr_ov_anm').show();
				}

				// focus on the element so screen readers will read it.
				$("#sr_global [aria-role=dialog]").focus();

				return true;
			}

			this.modal = function(params) {
				if (!params) return false;
				$('.sr_modal_content').hide();

				if (params.html) {
					if (params.id) {
						var new_id = 'sr_' + params.id;
						if ($('#' + new_id).remove());
					}
					var append = $('<div class="sr_modal_content">' + params.html + '</div>');
					if (params.id) append.attr('id', new_id);
					if (params.className) append.addClass(params.className);
					$('#sr_modal_content_wrap').append(append);
					append.show();
				} else {
					return false;
				}
				$('#sr_header_links,#sr_header_title').html('');
				$('#sr_header_menu').removeClass('sr_enabled');
				sr_obj.root_node.removeClassWithPrefix('sr_UI__header__');
				if (params.header) {
					if (params.header.links) {
						$('#sr_header_menu').addClass('sr_enabled');
						for (var i = 0; i < params.header.links.length; i++) {
							$('#sr_header_links').append('<li>' + params.header.links[i] + '</li>');
						}
					}
					if (params.header.title) $('#sr_header_title').html(params.header.title);

					if (typeof(params.header.custom_text) !== 'undefined')
						$('#sr_header_text_right').html(params.header.custom_text);

					if (params.header.type) {
						sr_obj.root_node.addClass('sr_UI__header__' + params.header.type);
					} else {
						// Remove Header Type Class
						sr_obj.root_node.removeClassWithPrefix('sr_UI__header__');
					}

				}

				sr_$.jQ("#sr_modal_inner").focus();

				if (params.onload) {
					params.onload();

					// Select focus on first input on modal
					if(!isIphone)sr_$.root_node.find('input').first().focus();
				}
				$('#sr_modal').show();

				return append;
			}
		}
		sr_obj.Modal = {

			modal: function(viewName, dataObj) {
				if (sr_obj.root_node === null || typeof(sr_obj.root_node) === 'undefined') {
					sr_obj.root_node = $('#sr_global');
				}

				// root_node is set before jQuery is loaded, so if it's
				// not a jQuery object we convert it to one here.
				if (!sr_obj.root_node.jquery) {
					sr_obj.root_node = $(sr_obj.root_node);
				}

				sr_obj.UI_manager.show(viewName, dataObj);
				// BUGBUG: Remove Prior Modals
				sr_obj.jQ('.sr_modal_content').not(':visible').remove();
				return;

			},
			// Closes Modal
			close: function() {
				sr_obj.root_node.find('html').removeClass('sr_mobile_open');
				sr_obj.root_node.find('html').removeClass('sr_open');

				sr_obj.actions.close();
			},
			isOpen: function() {
				return sr_$.jQ('body').hasClass('sr_freeze_page_scroll');
			}
		}

		return sr_obj;
	}

	// Initialize jQuery plugins
	for (var plugin in sr_$.plugins) {
		if (sr_$.plugins.hasOwnProperty(plugin)) {
			sr_$.plugins[plugin].init();
		}
	}
}(sr_$, window, document));

// Amex Templates
(function(sr_$, _shoprunner_com) {

	if (!sr_$.templates.unCompiled.amex_benefit) {
		sr_$.templates.unCompiled.amex_benefit = "" +
			"<div class='sr_pad sr_amex_benefit'>" +
				"<div class='sr_amex_logo_large'><img src='" + _shoprunner_com.imgPath + "amex_logo/axp_bb_rgb_67x60.png'></div>" +
				"<h1>Good News!</h1>" +
				"<p>Your American&nbsp;Express<sup>&reg;</sup> Card is <a href='javascript:void(0);' class='sr_info_box' " +
					"data-info-box='Only available for US Consumer and Small Business Cards. &lt;span " +
					"class=&#39;sr-underline-me hand&#39; onclick=&#39;sr_$.views.show_amex_terms_popup()&#39;&gt;See " +
					"Benefit Terms &amp; Conditions&lt;/span&gt;.'>eligible</a> for complimentary ShopRunner membership. " +
					"Click below if you want to enjoy free 2-day shipping and free return shipping on eligible items at " +
					"participating online stores as a benefit of your Card.</p>" +
				"<p>Note: If you enroll in the complimentary benefit using an existing ShopRunner account, you will lose any " +
					"promotional membership on that account.</p>" +
				"<p>By clicking below, you agree to the " +
					"<a href='javascript:void(0);' onclick='sr_$.views.show_amex_terms_popup();'>Benefit Terms &amp; Conditions</a> " +
					"and ShopRunner's " +
					"<a href='javascript:void(0);' data-action='terms'>Terms of Service</a> and " +
					"<a href='javascript:void(0);' data-action='privacy'>Privacy Policy</a>.</p>" +
			"<p><a role='button' href='javascript:void(0);' id='sr_amex_benefit_continue' class='sr_btn sr_kfocus sr_fr'>Enroll Now</a></p>" +
				"<p class='sr_no_thanks'><a href='javascript:void(0);' id='sr_amex_benefit_cancel'>No thanks, I don't want this complimentary benefit from American Express.</a></p>" +
			"</div>";
	}

	if (!sr_$.templates.unCompiled.amex_eligible_right) {
		sr_$.templates.unCompiled.amex_eligible_right = "" +
			"<div class='sr_pad sr_amex_eligible'>" +
				"<div class='sr_amex_logo_large'><img src='" + _shoprunner_com.imgPath + "amex_logo/axp_bb_rgb_67x60.png'></div>" +
				"<h1 class='sr-signup-amex-message-heading-special'>First, enter your American&nbsp;Express<sup>&reg;</sup> Card number.</h1>" +
				"<p>Don't worry, your card will not be charged. We simply need to verify your " +
				"<a href='javascript:void(0);' class='sr_info_box' " +
					"data-info-box='Only available for US Consumer and Small Business Cards. &lt;span " +
					"class=&#39;sr-underline-me hand&#39; onclick=&#39;sr_$.views.show_amex_terms_popup()&#39;&gt;See " +
					"Benefit Terms &amp; Conditions&lt;/span&gt;.'>eligibility</a>.<br/>" +
				"Keep the box checked below to add your American&nbsp;Express<sup>&reg;</sup> Card to your ShopRunner account and enjoy quick, 2-click checkout at participating online retailers.</p>" +
				"<p>By clicking below, you agree to the <a href='javascript:void(0);' onClick='sr_$.views.show_amex_terms_popup();'>Benefit Terms & Conditions</a>" +
					" and ShopRunner's " +
					// "<a id='sr_terms_of_service' class='seriously-make-this-blue sr_terms_of_service-btn' href='https://www.shoprunner.com/terms/sr/' target='_blank'><strong>Terms of Service</strong></a> and Privacy Policy.</p>" +
					"<a style='color: #3faae7; cursor: pointer;' href='javascript:void(0);' data-action='terms'>Terms of Service</a> and " +
					"<a style='color: #3faae7; cursor: pointer;' href='javascript:void(0);' data-action='privacy'>Privacy Policy</a>." +
				"</p>" +
				"<form id='sr_amex_eligible_form'>" +
					"<center>" +
						"<ul class='sr_form_ul sr_cols sr_cols_flex'>" +
							"<li class='sr_col sr_error'>" +
								"<span id='sr_signup_error' role='alert'></span>" +
							"</li>" +
							"<li class='sr_col sr_col__3_3 sr_col__3_3_m js-label'>" +
								"<label>Enter 15 Digit Card Number</label>" +
								"<input placeholder='Enter 15 Digit Card Number' type='tel' value='' title='Enter 15 Digit Card Number' class='sr-validate-not-empty sr-validate-credit-card-number' id='sr_signup_card_number'>" +
							"</li>" +
							/*
							"<li class='sr_col sr_col__1_4 sr_col__1_3_m js-label'>" +
								"<label>mm/yyyy</label>" +
								"<input maxlength='7' title='mm/yyyy' type='text' value='' placeholder='choose password' class='sr-validate-not-empty sr-validate-expiration' id='sr_signup_expiration'>" +
							"</li>" +
							*/
							"<li class='sr_col js-label sr_amex_btac_row'>" +
								"<div class='sr_checkbox_wrap sr_kfocus' tabindex='0'>" +
									"<div class='sr_box_border sr_checkbox sr_fl'>" +
										"<div class='sr_checkbox_state'></div>" +
										"<input border='0' value='false' id='sr_saveCardInfo' type='checkbox' checked='checked' tabindex='-1'>" +
									"</div>" +
									"<span class='sr_amex_btac'>Yes! Please save my Card with ShopRunner for quick checkout.</span>" +
								"</div>" +
							"</li>" +
							"<li class='sr_col'>" +
								"<input type='submit' value='Verify Eligibility' id='sr_signup_amex_verify_btn' class='sr_btn sr_kfocus sr_fr'>" +
							"</li>" +
						"</ul>" +
					"</center>" +
					"<div class='sr_clear'></div>" +
				"</form>" +
				"<div class='sr_clear'></div>" +
			"</div>";
	}

	if (!sr_$.templates.unCompiled.amex_success_left) {
		sr_$.templates.unCompiled.amex_success_left = "" +
			"<div class='sr-signup-sidebar-highlights'>" +
				"<div class=''><span class='sr-seriously-make-this-green sr-header1'>Congratulations!</span><br>You are <span tabindex='0' class='sr_info_box' data-info-box='Only available for US Consumer and Small Business Cards. See Benefit Terms &amp; Conditions.'>eligible</span> to receive complimentary ShopRunner membership as a benefit of your American Express<sup>&reg;</sup> Card.</div>" +
			"</div>";
	}

	if (!sr_$.templates.unCompiled.amex_success_right) {
		sr_$.templates.unCompiled.amex_success_right = "" +
			"<div class='sr_pad sr_amex_eligible'>" +
				"<div class='sr_amex_logo_large'><img src='" + _shoprunner_com.imgPath + "amex_logo/axp_bb_rgb_67x60.png'></div>" +
				"<h1 class='sr_top'>Last step, create your<br/>ShopRunner login.</h1>" +
				"<p>You will use the email address below to sign in when you see the ShopRunner logo at top online retailers.</p>" +
				"<form id='sr_amex_signup_account'>" +
					"<center>" +
						"<ul class='sr_form_ul sr_cols sr_cols_flex'>" +
							"<li class='sr_col sr_error'>" +
								"<span id='sr_signup_error' role='alert'></span>" +
							"</li>" +
							"<li class='sr_col sr_col__1_2 js-label'>" +
								"<label>first name</label>" +
								"<input placeholder='first name' type='text' value='' title='first name' class='sr-validate-not-empty' id='sr_signup_first_name'>" +
							"</li>" +
							"<li class='sr_col sr_col__1_2 js-label'>" +
								"<label>last name</label>" +
								"<input placeholder='last name' type='text' value='' title='last name' class='sr-validate-not-empty' id='sr_signup_last_name'>" +
							"</li>" +
							"<li class='sr_col js-label'>" +
								"<label>email</label>" +
								"<input placeholder='email' type='text' value='' title='email' class='sr-validate-not-empty sr-validate-same sr-validate-email' id='sr_signup_email' validation-group='email'>" +
							"</li>" +
							"<li class='sr_col js-label'>" +
								"<label>confirm email</label>" +
								"<input placeholder='confirm email' type='text' value='' title='confirm email' class='sr-validate-not-empty sr-validate-same sr-validate-email' id='sr_signup_email_2' validation-group='email'>" +
							"</li>" +
							"<li class='sr_col js-label'>" +
								"<label>choose password</label>" +
								"<input placeholder='choose password' type='password' value='' title='choose password' class='sr-validate-not-empty sr-validate-password' id='sr_signup_password'>" +
								"<span class='sr_sml_txt'>Minimum 8 characters, at least one number, at least one letter, cannot start with your email address.</span>" +
							"</li>" +
							"<li class='sr_col sr_col__1_2 js-label'>" +
								"<div class='sr_checkbox_wrap sr_kfocus' tabindex='0'>" +
									"<div class='sr_box_border sr_checkbox sr_fl'>" +
										"<div class='sr_checkbox_state'></div>" +
										"<input border='0' value='false' id='sr_agreeTOS' type='checkbox' tabindex='-1'>" +
									"</div>" +
									"<span style='font-size: 12px; line-height: 14px; float:left'>I agree to the <br/>" +
									// "<a style='color: #3faae7; cursor: pointer;' href='javascript:void(0);' data-action='terms'><strong>ShopRunner Terms<br> of Service</strong></a></span>" +
									"<a id='sr_terms_of_service' class='seriously-make-this-blue sr_terms_of_service-btn' href='https://www.shoprunner.com/terms/sr/' target='_blank'><strong>ShopRunner Terms<br> of Service</strong></a></span>" +
								"</div>" +
							"</li>" +
							"<li class='sr_col sr_col__1_2 js-label'>" +
								"<input type='submit' value='enroll now' id='sr_amex_signup_account_btn' class='sr_btn sr_kfocus sr_fr'>" +
							"</li>" +
						"</ul>" +
					"</center>" +
				"</form>" +
			"</div>";
	}

	if (!sr_$.templates.unCompiled.amex_not_eligible) {
		sr_$.templates.unCompiled.amex_not_eligible = "" +
			"<div class='sr_pad'>" +
				"<div class='sr_amex_logo_large'><img src='" + _shoprunner_com.imgPath + "amex_logo/axp_bb_rgb_67x60.png'></div>" +
				"<p style='font-size: 1.6em; width: 70%; margin-top: 50px;'>Unfortunately, the Card you entered is not eligible for complimentary ShopRunner membership.</p>" +
				"<p style='font-size: 1.2em;'>Please visit <a href='javascript:void(0);' onClick='sr_$.views.show_amex_terms_popup();' id='sr_terms_of_service'>Benefit Terms & Conditions</a> for eligibility details.</p>" +
				"<div role='button' tabindex='0' id='sr_amex_welcome_continue' class='sr_btn sr_kfocus sr_fr' style='float: none !important; width: 40%; margin: 0 auto;'>try a different American&nbsp;Express<sup>&reg;</sup> card</div>" +
			"</div>";
	}

	if (!sr_$.templates.unCompiled.amex_already_enrolled) {
		sr_$.templates.unCompiled.amex_already_enrolled = "" +
			"<div class='sr_pad'>" +
				"<div class='sr_amex_logo_large'><img src='" + _shoprunner_com.imgPath + "amex_logo/axp_bb_rgb_67x60.png'></div>" +
				"<p style='width: 70%; margin-top: 50px;'>It seems your American&nbsp;Express<sup>&reg;</sup> Card has already been used to enroll in complimentary ShopRunner membership. Sign in to your account and enjoy free 2-day shipping and return shipping on eligible items at top online retailers.</p>" +
				"<p style='width: 70%;'>If you did not enroll in the benefit with your eligible Card, please call ShopRunner at 1.888.721.7467.</p>" +
				"<div style='text-align: center; margin-top: 30px;'>" +
					"<a role='button' href='javascript:void(0);' onclick='sr_$.actions.close(); return false;' style='float: none !important;' class='sr_signup_amex_back_btn sr_btn sr_kfocus sr_fr'>Close</a>" +
				"</div>" +
			"</div>";
	}

	if (!sr_$.templates.unCompiled.amex_system_error) {
		sr_$.templates.unCompiled.amex_system_error = "" +
			"<div class='sr_pad'>" +
				"<div class='sr_amex_logo_large'><img src='" + _shoprunner_com.imgPath + "amex_logo/axp_bb_rgb_67x60.png'></div>" +
				"<h1>We're Sorry</h1>" +
				"<h2>Our services are unavailable at this time.<br>Please try again later.</h2>" +
				"<ul class='sr_form_ul sr_cols sr_cols_flex' style='max-width:none'>" +
					"<li class='sr_col sr_col__1_3 sr_fullwidth_m'>" +
						"&nbsp;" +
					"</li>" +
					"<li class='sr_col sr_col__1_3'>&nbsp;</li>" +
					"<li class='sr_col sr_col__1_3 sr_fullwidth_m'>" +
						"<a role='button' href='javascript:void(0);' id='sr_amex_welcome_continue' class='sr_signup_amex_back_btn sr_btn sr_kfocus sr_fr'>go back</a>" +
						//"<input type='button' onclick='javascript:void(0);' value='verify eligibility and enroll in american express benefit' id='sr_amex_signup_continue' class='sr_btn sr_kfocus sr_fr'>" +
					"</li>" +
				"</ul>" +
			"</div>";
	}

	if (!sr_$.templates.unCompiled.amex_rule_37) {
		sr_$.templates.unCompiled.amex_rule_37 = "" +
			"<div class='sr_pad'>" +
				"<div class='sr_amex_logo_large'><img src='" + _shoprunner_com.imgPath + "amex_logo/axp_bb_rgb_67x60.png'></div>" +
				"<h1 style='margin-top: -45px;'>Good News!</h1>" +
				"<h2>Your American Express<sup>&reg;</sup> Card is <a href='javascript:void(0);' class='sr_info_box'" +
				"data-info-box='Only available for US Consumer and Small Business Cards. &lt;span class=&#39;sr-underline-me hand&#39; onclick=&#39;sr_$.views.show_amex_terms_popup()&#39;&gt;See Benefit Terms &amp; Conditions&lt;/span&gt;.'>" +
				"eligible</a> for complimentary ShopRunner Membership. Click below if you want to enjoy free 2-day shipping and free return shipping on eligible items as a benefit of your Card.</h2>" +
				"<h2>By clicking below, you agree to the <a href='javascript:void(0);' onClick='sr_$.views.show_amex_terms_popup();'><strong>Benefit Terms & Conditions</strong></a> and " +
				"ShopRunner's <a href='javascript:void(0);' onClick='sr_$.views.show_amex_terms_popup();' id='sr_terms_of_service'><strong>Benefit Terms & Conditions</strong></a> and Privacy Policy." +
				"<ul class='sr_form_ul sr_cols sr_cols_flex' style='max-width:none'>" +
					"<li class='sr_col sr_col__1_3 sr_fullwidth_m'>" +
						"<a role='button' href='javascript:void(0);' id='sr_signup_how_to_enroll_standard_signup_btn' class='sr_btn sr_kfocus sr_fr'>no, thanks.&#10; I don't want this complimentary benefit from American Express</a>" +
					"</li>" +
					"<li class='sr_col sr_col__1_3'>&nbsp;</li>" +
					"<li class='sr_col sr_col__1_3 sr_fullwidth_m'>" +
						"<a role='button' href='javascript:void(0);' id='sr_amex_signup_continue' class='sr_btn sr_kfocus sr_fr'>enroll now</a>" +
					"</li>" +
				"</ul>" +
			"</div>";
	}

}(sr_$, _shoprunner_com));

(function(sr_$, window) {

	// Save reference to views object.
	var viewRef = sr_$.views;

	viewRef.show_amex_terms_popup = function() {
		if (!window.focus) {
			return true;
		}

		window.open(
			'https://www.shoprunner.com/terms/amex/?pik=1',
			'',
			'width=650,height=450,toolbar=no,scrollbars=yes'
		);

		return false;
	};

	viewRef.amex_benefit = function()
	{
		var viewObj = viewRef.createViewObject();
		viewObj.viewClass = "";

		var modalData = {};

		// Setup base template.
		var template = sr_$.templates.getTemplate("amex_benefit");

		// Compile template with partials and data.
		viewObj.html = template(modalData);

		// Onload function is available if needed.
		viewObj.onload = function()
		{
			sr_$.track.pageView({page: 'rpik_amex_benefit'});

			// bind the 'Enroll Now' button.
			sr_$.jQ("#sr_amex_benefit_continue").bind("click", function()
			{
				// if you're coming from the 30-day trial flow, create the account.
				if(sr_$.model.account.email) {
					sr_$.amexSignUpSubmit();

				// otherwise this is in the amex eligibility flow and we need
				// to enter account information.
				} else {
					sr_$.Modal.modal("amex_success");
				}
			});

			// bind the cancel link.
			sr_$.jQ("#sr_amex_benefit_cancel").bind("click", function()
			{
				// if you're coming from the 30-day trial flow, create the account.
				if(sr_$.model.account.email) {
					// opt out of amex and submit again to create their account.
					sr_$.model.rule37OptOut = true;
					sr_$.standardSignUpSubmit();

				// otherwise you're coming from the amex eligibility page and still
				// need to enter account information.
				} else {
					sr_$.Modal.modal("signup_account");
				}
			});

			// Bind to try again button.
			sr_$.jQ('#sr_pop_up_tos').bind('click', function()
			{
				sr_$.views.show_amex_terms_popup();
			});
		};

		viewObj.type = "modal";
		viewObj.className = "sr_signup sr_amex sr_amex_title";
		viewObj.header = {type: "overlay_no_logo"};

		return viewObj;
	};

	viewRef.amex_eligible = function() {
		// Setup generic view object and defaults.
		var viewObj = viewRef.createViewObject();

		// Setup base template.
		var template = sr_$.templates.getTemplate("amex_eligible_right");

		// Compile template with partials and data.
		viewObj.html = template();

		// Onload function is available if needed.
		viewObj.onload = function() {
			sr_$.track.pageView({page: 'rpik_amex_cc_info'});

			// Binding to the 'Verify Eligibility' button.
			sr_$.jQ('#sr_amex_eligible_form').bind('submit', function() {

				// Validation
				var ccn = sr_$.jQ('#sr_signup_card_number').val();

				var validated_credit_card_number = viewRef.validate_credit_card_number();
				if (!validated_credit_card_number) {
					sr_$.jQ('#sr_signup_error').text('The card you entered is not recognized. Please try again.');
					sr_$.jQ('#sr_signup_card_number').addClass('sr-error');
				}
				var validated = !!(viewRef.validate_not_empty() && validated_credit_card_number); // && viewRef.validate_expiration());

				if(validated) {
					sr_$.jQ('#sr_signup_error').text('');
					sr_$.jQ('#sr_signup_card_number').removeClass('sr-error');

					viewRef.replace_button();

					var saveCardInfo = sr_$.jQ("#sr_saveCardInfo").prop("checked");

					// Save billing info.
					sr_$.saveAmexBillingInfo({
						cardNumber: ccn,
						ccType: "Amex",
						expiration_month: "", // expiration_month,
						expiration_year: "", // expiration_year,
						saveCardInfo: saveCardInfo
					});

					// Verify eligibility.
					sr_$.amexEligibilitySubmit();
				}

				return false;
			});
		};

		viewObj.type = "modal";
		viewObj.header = {type: "overlay_no_logo"};
		viewObj.className = 'sr_signup sr_amex sr_amex_title';

		return viewObj;
	};

	viewRef.amex_success = function() {
		// Setup generic view object and defaults.
		var viewObj = viewRef.createViewObject();

		var modalData = {
			modal: {title: "ShopRunner Account Set Up"},
			amexTemplate: true
		};

		// Setup base template.
		var template = sr_$.templates.getTemplate("amex_success_right");

		viewObj.viewClass = "body-sr-signup-account myriad-light";
		viewObj.type = "modal";
		viewObj.header = {type: "overlay_no_logo"};
		viewObj.className = 'sr_signup sr_amex sr_amex_title';
		viewObj.html = template();

		// Onload function is available if needed.
		viewObj.onload = function() {
			sr_$.track.pageView({page: 'rpik_amex_acct_info'});
			sr_$.jQ('.sr-info-box').bind("click", viewRef.sr_info_box_handler);

			// Bind to TOS checkbox.
			var tosCheck = function() {
				var chxbx = sr_$.jQ('#sr_amex_signup_account').find('#sr_agreeTOS');
				if (chxbx.attr('checked')) {
					chxbx.closest('form').find(':submit').removeClass('sr_disabled');
				} else {
					chxbx.closest('form').find(':submit').addClass('sr_disabled');
				}
			};

			// if you're in nlm3 group 5, fill in the email and password fields.
			newLearnMoreGroup = sr_$.nlm && sr_$.nlm();

			if (newLearnMoreGroup == 5) {
				sr_$.jQ('#sr_signup_email').val(sr_$.model.account.email);
				sr_$.jQ('#sr_signup_email_2').val(sr_$.model.account.email);
				sr_$.jQ('#sr_signup_password').val(sr_$.model.account.password);
			}

			// Bind to checkbox change.
			sr_$.jQ('#sr_amex_signup_account').find('#sr_agreeTOS').bind('change', tosCheck);

			// Initialize the disabled button correctly.
			tosCheck();

			// Bind to 'Complete Account Setup' button.
			sr_$.jQ('#sr_amex_signup_account').bind('submit', function() {
				// Validation
				if (!sr_$.jQ('#sr_amex_signup_account').find('#sr_agreeTOS').attr('checked')) {
					return false;
				}
				var password_validated = viewRef.validate_password();

				var validated = !!(viewRef.validate_not_empty() * password_validated * viewRef.validate_same() * viewRef.validate_email());
				if (validated) {
					sr_$.jQ('#sr_signup_error').text('');
					sr_$.jQ('.sr-validate-credit-card-number').removeClass('sr-error');
					viewRef.replace_button();

					accountData = {
						firstName: sr_$.jQ('#sr_signup_first_name').val(),
						lastName: sr_$.jQ('#sr_signup_last_name').val(),
						email: sr_$.jQ('#sr_signup_email').val(),
						password: sr_$.jQ('#sr_signup_password').val(),
						acceptedTos: sr_$.jQ('#sr_amex_signup_account').find('#sr_agreeTOS').hasClass('selected')
					};

					// Save account data.
					sr_$.saveAccountInfo(accountData);
					sr_$.model.billing.ssoChecked = true;

					// Create amex account.
					sr_$.amexSignUpSubmit();
				}
				return false;
			});

		};

		return viewObj;
	};

	viewRef.amex_not_eligible = function() {
		// Setup generic view object and defaults.
		var viewObj = viewRef.createViewObject();

		var modalData = {};

		// Setup base template.
		var template = sr_$.templates.getTemplate("amex_not_eligible");

		viewObj.viewClass = "";

		// Compile template with partials and data.
		viewObj.html = template(modalData);

		// Onload function is available if needed.
		viewObj.onload = function() {
			sr_$.track.pageView({page: 'rpik_amex_not_eligible'});
			// Bind to tooltips.
			sr_$.jQ('.sr-info-box-action').bind("click", viewRef.sr_info_box_handler);

			sr_$.jQ('.sr-signup-form').css('margin-top', 0);

			// Bind to 'try again' button.
			sr_$.jQ('#sr_amex_welcome_continue').bind('click', function() {
				sr_$.Modal.modal('amex_eligible');
			});

			// Bind to normal signup button.
			sr_$.jQ('#sr_signup_amex_nonamex_trial_btn').bind('click', function() {
				sr_$.Modal.modal('signup_account');
			});

			// Bind to TOS link.
			sr_$.jQ('#sr_pop_up_tos').bind('click', function() {
				sr_$.views.show_amex_terms_popup();
			});
		};

		viewObj.type = 'modal';
		viewObj.className = 'sr_signup sr_amex sr_amex_title';
		viewObj.header = {type: 'overlay_no_logo'};

		return viewObj;
	};

	viewRef.amex_already_enrolled = function() {
		// Setup generic view object and defaults.
		var viewObj = viewRef.createViewObject();

		var modalData = {};

		// Setup base template.
		var template = sr_$.templates.getTemplate("amex_already_enrolled");

		viewObj.viewClass = "";

		// Compile template with partials and data.
		viewObj.html = template(modalData);

		// Onload function is available if needed.
		viewObj.onload = function() {
			sr_$.track.pageView({page: 'rpik_amex_already_enrolled'});
			// Bind to tooltips.
			sr_$.jQ('.sr-info-box-action').bind("click", viewRef.sr_info_box_handler);

			sr_$.jQ('.sr-signup-form').css('margin-top', 0);

			sr_$.jQ('.sr_signup_amex_try_btn, #sr_amex_welcome_continue, .sr_signup_amex_try_btn2').bind('click', function() {
				sr_$.Modal.modal('amex_eligible');
			});
		};

		viewObj.type = 'modal';
		viewObj.className = 'sr_signup sr_amex sr_amex_title';
		viewObj.header = {type: 'overlay_no_logo'};

		return viewObj;
	};

	viewRef.amex_system_error = function(objParams) {
		// Setup generic view object and defaults.
		var viewObj = viewRef.createViewObject();

		var modalData = {};

		// Setup base template.
		var template = sr_$.templates.getTemplate("amex_system_error");

		viewObj.viewClass = "";

		// Compile template with partials and data.
		viewObj.html = template(modalData);

		// Onload function is available if needed.
		viewObj.onload = function() {
			sr_$.track.pageView({page: 'rpik_amex_system_error'});
			// Bind to tooltips.
			sr_$.jQ('.sr-info-box').bind("click", viewRef.sr_info_box_handler);

			sr_$.jQ('.sr-signup-form').css('margin-top', 0);

			// Bind to 'try again' button.
			sr_$.jQ('.sr_signup_amex_back_btn').bind('click', function() {
				sr_$.Modal.modal('amex_eligible');

			});
		};

		viewObj.type = 'modal';
		viewObj.className = 'sr_signup sr_amex sr_amex_title';
		viewObj.header = {type: 'overlay_no_logo'};

		return viewObj;
	};

	viewRef.amex_rule_37 = function() {
		// Setup generic view object and defaults.
		var viewObj = viewRef.createViewObject();

		var modalData = {};

		// Setup base template.
		var template = sr_$.templates.getTemplate("amex_rule_37");

		viewObj.viewClass = "";

		// Compile template with partials and data.
		viewObj.html = template(modalData);

		// Onload function is available if needed.
		viewObj.onload = function() {
			sr_$.track.pageView({page: 'rpik_amex_rule_37'});
			sr_$.model.modalState.signupType = 'amex_37_signup';

			// remove header.
			sr_$.jQ('#sr_header').css('display', 'none');

			// Bind to TOS checkbox.
			var tosCheck = function() {
				if (sr_$.jQ(this).attr('checked')) {
					sr_$.jQ('#sr_amex_signup_continue').removeClass('sr_disabled');
				} else {
					sr_$.jQ('#sr_amex_signup_continue').addClass('sr_disabled');
				}
			};

			// Bind to checkbox change.
			sr_$.jQ('#sr_amex_rule_37').find('#sr_agreeTOS').bind('change', tosCheck);

			// Initialize the disabled button correctly.
			tosCheck();

			sr_$.jQ('.sr-body-learnmore').css('margin-top', 0);

			// Bind to tooltips.
			sr_$.jQ('.sr-info-box-action').bind("click", viewRef.sr_info_box_handler);

			// Bind to try again button.
			sr_$.jQ('#sr_signup_how_to_enroll_standard_signup_btn').bind('click', function() {
				sr_$.model.rule37OptOut = true;
				sr_$.standardSignUpSubmit();
			});

			// Bind to amex eligibility.
			sr_$.jQ('#sr_amex_signup_continue').bind('click', function(btn) {
				// Continue only if they accepted the TOS.
				if(!sr_$.jQ(btn).hasClass('disabled')) {
					sr_$.amexEligibilitySubmit();
				}
			});
		};

		// Return object
		viewObj.type = 'modal';
		viewObj.className = 'sr_signup sr_amex sr_amex_title';
		viewObj.header = {type: 'overlay_no_logo'};

		return viewObj;
	};

}(sr_$, window));

(function(sr_$) {
	var learnMore = function(loc, text) {
		loc = loc || '';
		text = text || 'learn more';

		return '<a class="srd_a" href="javascript:void(0);" onclick="sr_$.learn(\'' + loc + '\');return false;">' + text + '</a>';
	};

	var signIn = function(loc, text) {
		loc = loc || '';
		text = text || 'sign in';

		return '<a class="srd_a" href="javascript:void(0)" onclick="sr_$.signIn(\'' + loc + '\');return false;">' + text + '</a>';
	};

	var signOut = function(loc, text) {
		loc = loc || '';
		text = text || 'sign out';

		return '<a class="srd_a" href="javascript:void(0)" onclick="sr_$.signOut(\'' + loc + '\');return false;">' + text + '</a>';
	};



	sr_$.srDivs.smallBannerDiv = function(c, signedIn) {
		c.id = 'srd_sb';
		c.oclass = '_SR _SRD';
		c.html = '<div class="srd_iconline"><div class="srd_logo"></div><div class="srd_msg"><strong>FREE 2-Day Shipping</strong> eligible</div></div>';
	};

	sr_$.srDivs.productDetailDiv = function(c, signedIn) {
		var anchorHtml = '', messageHtml = 'FREE 2-Day Shipping &amp; Free Returns';
		if (signedIn) {
			anchorHtml = signOut(c.name);
		} else {
			anchorHtml = learnMore(c.name) + ' | ' + signIn(c.name);
		}
		c.id = 'srd_pd';
		c.oclass = '_SR _SRD';
		c.html = '<div class="srd_iconline"><div class="srd_logo"></div>' +
			'<div class="srd_msg"><strong>' + messageHtml + '</strong> ' +
			'<span class="srd_a_wrap">' + anchorHtml + '</span></div></div>';
	};

	sr_$.srDivs.quickViewDiv = function(c, signedIn) {
		var anchorHtml = '';
		if (signedIn) {
			anchorHtml = signOut(c.name);
		} else {
			anchorHtml = learnMore(c.name) + ' | ' + signIn(c.name);
		}
		c.id = 'srd_qv';
		c.oclass = '_SR _SRD';
		c.html = '<div class="srd_iconline"><div class="srd_logo"></div>' +
			'<div class="srd_msg"><strong>FREE 2-Day Shipping</strong> ' +
			'<span class="srd_a_wrap">' + anchorHtml + '</span></div></div>';
	};


	sr_$.srDivs.catalogProductGridDiv = function(c, signedIn) {
		c.id = 'srd_cpg';
		c.oclass = '_SR _SRD';
		c.html = '<div class="srd_iconline"><div class="srd_icon"></div><div class="srd_msg">eligible</div></div>';
	};

	sr_$.srDivs.shippingOptionDiv = function(c, signedIn) {
		var anchorHtml = '', messageHtml = '<strong>FREE 2-DAY SHIPPING</strong>';
		if (signedIn) {
			anchorHtml = signOut(c.name);

		} else {
			anchorHtml = learnMore(c.name) + ' | ' + signIn(c.name);
		}


		c.id = 'srd_so';
		c.oclass = '_SR _SRD';
		c.html = '<div class="srd_iconline"><div class="srd_icon"></div>' +
			'<div class="srd_msg">' + messageHtml + ' ' + anchorHtml + '</div></div>';
	};



	sr_$.srDivs.headerDiv = function(c, signedIn) {
		var messageHtml = '', anchorHtml = '';
		if (signedIn) {
						messageHtml = '<strong>FREE 2-Day Shipping & Free Returns</strong> automatically applied ';
			anchorHtml = signOut(c.name);
		} else {
			messageHtml = 'offers <strong>FREE 2-Day Shipping & Free Returns</strong> on eligible items in your cart ';
			anchorHtml = learnMore(c.name) + ' | ' + signIn(c.name);
		}


		c.id = 'srd_h';
		c.oclass = '_SR _SRD';
		c.html = '<div class="srd_h_background"><div class="srd_iconline"><div class="srd_logo"></div>' +
			'<div class="srd_msg">' + messageHtml +
			'<span class="srd_a_wrap">' + anchorHtml + '</span></div></div></div>';
	};

	sr_$.srDivs.cartProductDiv = function(c, signedIn) {
		c.id = 'srd_cp';
		c.oclass = '_SR _SRD';
		c.html = '<div class="srd_iconline"><div class="srd_icon"></div><div class="srd_msg">eligible</div></div>';
	};

	sr_$.srDivs.checkoutSRItemsPageDiv = function(c, signedIn) {
		c.id = 'srd_csp';
		c.oclass = '_SR _SRD';
		c.html = '<div class="srd_iconline"><div class="srd_logo"></div>' +
			'<div class="srd_msg">thanks for using ShopRunner <strong>FREE 2-Day Shipping & Returns</strong></div></div>';
	};

	sr_$.srDivs.checkoutPageDiv = function(c, signedIn) {
		c.id = 'srd_cop';
		c.oclass = '_SR _SRD';
		c.html = '<div class="srd_iconline"><div class="srd_logo"></div>' +
			'<div class="srd_msg">next time use ShopRunner <strong>FREE 2-Day Shipping & Returns</strong> ' +
			'<span class="srd_a_wrap">' + learnMore(c.name, 'try it free') + '</span></div></div>';
	};

	// --------------------------------------------------------------------
	// Choose one Dual Eligibility div below and call it dualEligibilityDiv
	// --------------------------------------------------------------------
	sr_$.srDivs.dualEligibilityDiv = function(c, signedIn) {
		var anchorHtml = '';
		if (signedIn) {
			anchorHtml = signOut(c.name);
		} else {
			anchorHtml = learnMore(c.name) + ' | ' + signIn(c.name);
		}
		c.id = 'srd_de';
		c.oclass = '_SR _SRD';
		c.html = '<div class="srd_iconline"><div class="srd_logo"></div>' +
			'<div class="srd_msg">why are some items not eligible for <strong>FREE 2-Day Shipping</strong>? ' +
			'<span class="srd_a_wrap">' + anchorHtml + '</span></div></div>';
	};

	sr_$.srDivs.dualEligibilityDiv2 = function(c, signedIn) {
		var anchorHtml = '';
		if (signedIn) {
			c.html = '<div class="srd_iconline"><div class="srd_logo"></div>' +
			'<div class="srd_msg"><strong>FREE 2-Day Shipping & Return</strong> shipping is not available on all products in your cart.' +
			'<span class="srd_a_newline">Please remove ineligible items or ' + signOut(c.name) + '</span></div></div>';
		}
		c.id = 'srd_de';
		c.oclass = '_SR _SRD';
	};

	sr_$.srDivs.dualEligibilityDiv3 = function(c, signedIn) {
		var anchorHtml = '';
		if (signedIn) {
			c.html = '<div class="srd_iconline"><div class="srd_logo"></div>' +
			'<div class="srd_msg">your shopping bag contains items that are not eligible for ShopRunner. We will provide free standard shipping on all items. ' +
			'To receive <strong>FREE 2-Day Shipping</strong> by ShopRunner you must remove these ineligible items from your shopping cart. ' +
			'<span class="srd_a_wrap">' + signOut(c.name) + '</span></div></div>';
		}
		c.id = 'srd_de';
		c.oclass = '_SR _SRD';
	};
}(sr_$));

(function(sr_$) {

	var tokenValidationTimeout;

	window.sr_tokenValidationCallback = function(isValid) {
		sr_$.UI_manager.busy(false);
		if (tokenValidationTimeout) {
			clearTimeout(tokenValidationTimeout);
			tokenValidationTimeout = 0;
		}

		// var error = isValid ? "" : "error";
		if (typeof _shoprunner_com.onSignIn == "function") {
			_shoprunner_com.onSignIn(isValid);
		}
		sr_$.token.response();
	};

	var jsonp = function(url) {
		var script = document.createElement("script");
		script.onerror = function() {
			sr_$.UI_manager.busy(false);
			if (tokenValidationTimeout) {
				clearTimeout(tokenValidationTimeout);
				tokenValidationTimeout = 0;
			}

			if (typeof _shoprunner_com.onSignIn == "function") {
				_shoprunner_com.onSignIn("error");
			} else {
				sr_$.UI_manager.errors.show({
					id: "signin_error",
					html: "_shoprunner_com.onSignIn is not defined."
				});
			}
		};

		script.src = url + "&callback=sr_tokenValidationCallback";
		script.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(script);

		tokenValidationTimeout = setTimeout(function() {
			sr_$.UI_manager.busy(false);

			if (typeof _shoprunner_com.onSignIn == "function") {
				_shoprunner_com.onSignIn("error");
			}

			sr_$.token.response();
		}, 5000);
	};

	sr_$.validateLogin = function(token, rel, success, failure, forceType, timeout) {
		var loginUrl = _shoprunner_com.loginValidationURL;
		var isFunction = typeof loginUrl == 'function';

		if (isFunction) {
			loginUrl(token, success, failure);
		} else {
			loginUrl = _shoprunner_com.loginValidationURL;
			var qmark = (loginUrl.indexOf('?') < 0) ? '?' : '&';
			var url = loginUrl + qmark + 'srtoken=' + (token == null ? "" : encodeURIComponent(token));

			setTimeout(function() {
				jsonp(url);
			}, 300);
		}
	};

	var cookieGet = sr_$.cookie.get;

	sr_$.cookie.get = function(name) {
		if (name == "token") {
			return _shoprunner_com.isUserSignedIn ? "yes" : "";
		} else {
			return cookieGet(name);
		}
	}

	sr_$.cookie.check = function() {
		sr_$.model.member.signedIn = !!_shoprunner_com.isUserSignedIn;
		sr_$.member.signed_in = sr_$.model.member.signedIn;
		return sr_$.member.signed_in;
	};
}(sr_$));
