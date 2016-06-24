/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "javascripts/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _shoprunner_com = {};
	window._shoprunner_com = _shoprunner_com;

	(function () {
	    /* -----------------------------------------
	     * SR Configuration
	     * -----------------------------------------
	     */

	    _shoprunner_com.version = 3.0;
	    _shoprunner_com.enabled = true;
	    _shoprunner_com.retailerID = 'BLOOM';
	    _shoprunner_com.loginValidationURL = __webpack_require__(7).VALIDATION_URL;

	    /*
	     * @const (Integer field)
	    * 1 - Development/Staging
	     * 2 - Production
	     */
	    _shoprunner_com.environmentID = 1;

	    /* ----------------------------------------
	     * ShopRunner Express Checkout Configuration
	     * Change these values only if your site is Express Checkout enabled.
	     * If you are not sure, leave them as they are.
	     * ----------------------------------------
	     */

	    _shoprunner_com.checkout = {};
	    _shoprunner_com.checkout.enabled = false;
	    _shoprunner_com.checkout.partnerAPIEndPoint = '';

	    /* -------------------------------------- */
	    /* DO NOT MODIFY ANYTHING BELOW THIS LINE */
	    /* -------------------------------------- */

	    if (_shoprunner_com.enabled) {
	        _shoprunner_com.prefix = window.parent.document.location.protocol + "//";
	        _shoprunner_com.sr_jsContentURL = _shoprunner_com.prefix + "staging-content.shoprunner.com";

	        if (_shoprunner_com.environmentID == 2) {
	            _shoprunner_com.sr_jsContentURL = _shoprunner_com.prefix + "content.shoprunner.com";
	        }

	        var sr_CSS_URL = _shoprunner_com.sr_jsContentURL + "/" + _shoprunner_com.retailerID + ".css";
	        var sr_js_content_el_URL = _shoprunner_com.sr_jsContentURL + "/" + _shoprunner_com.retailerID + ".js";

	        setTimeout(function () {
	            var a = document.createElement("link");
	            a.href = sr_CSS_URL;
	            a.type = "text/css";
	            a.rel = "stylesheet";
	            document.getElementsByTagName("head")[0].appendChild(a);
	            var b = document.createElement("script");
	            b.src = sr_js_content_el_URL;
	            b.type = "text/javascript";
	            document.getElementsByTagName("head")[0].appendChild(b);
	        }, 1);
	    }

	    _shoprunner_com.docReady = false;

	    _shoprunner_com.dom_loaded = function () {
	        _shoprunner_com.docReady = true;
	        if (typeof sr_$ !== "undefined") {
	            sr_$.run();
	        }
	    };

	    if (document.addEventListener) {
	        document.addEventListener("DOMContentLoaded", _shoprunner_com.dom_loaded, false);
	    } else {
	        if (document.attachEvent) {
	            document.attachEvent("onreadystatechange", _shoprunner_com.dom_loaded);
	        }
	    }

	    if (window.addEventListener) {
	        window.addEventListener("load", _shoprunner_com.dom_loaded, false);
	    } else {
	        if (window.attachEvent) {
	            var r = window.attachEvent("onload", _shoprunner_com.dom_loaded);
	        }
	    }
	})();

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  VALIDATION_URL: 'http://auth-server-sr.herokuapp.com/validateToken'
	};

	//   VALIDATION_URL: 'http://auth-server-sr.herokuapp.com/validateToken',

/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(6);

	console.log('sign in page');

	// This can be set anytime after the shoprunner_init.js file has been loaded
	window._shoprunner_com.calls = {
	  on_sign_in: function on_sign_in() {
	    console.log('**** signed in');
	    sr_updateMessages(); // Refresh ShopRunner divs
	  }
	};

	//This can be set anytime after the shoprunner_init.js file has been loaded
	window._shoprunner_com.calls = {
	  on_sign_out: function on_sign_out() {
	    console.log('**** signed out');
	    sr_updateMessages(); // Refresh ShopRunner divs
	  }
	};

/***/ }
/******/ ]);