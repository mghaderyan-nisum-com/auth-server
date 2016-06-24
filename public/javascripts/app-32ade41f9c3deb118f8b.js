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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(2);

	console.log('app.js has loaded!');

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*
	  Automatically instantiates modules based on data-attrubiutes
	  specifying module file-names.
	*/

	var moduleElements = document.querySelectorAll('[data-module]');

	for (var i = 0; i < moduleElements.length; i++) {
	  var el = moduleElements[i];
	  var name = el.getAttribute('data-module');
	  var Module = __webpack_require__(3)("./" + name).default;
	  new Module(el);
	}

	/*
	  Usage:
	  ======

	  html
	  ----
	  <button data-module="disappear">disappear!</button>

	  js
	  --
	  // modules/disappear.js
	  export default class Disappear {
	    constructor(el) {
	      el.style.display = none
	    }
	  }
	*/

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./example": 4,
		"./example.js": 4,
		"./index": 2,
		"./index.js": 2,
		"./shoprunner": 5,
		"./shoprunner-cart-page": 8,
		"./shoprunner-cart-page.js": 8,
		"./shoprunner-signin": 9,
		"./shoprunner-signin.js": 9,
		"./shoprunner.js": 5,
		"./shoprunner_init": 6,
		"./shoprunner_init.js": 6
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 3;


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Example = function Example(el) {
	  _classCallCheck(this, Example);

	  this.el = el;
	  console.log(el.textContent, '- From the example module');
	};

	exports.default = Example;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(6);

	console.log('here');

/***/ },
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(6);

	console.log('cart page');

/***/ },
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