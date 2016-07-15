var store = require('store');


var _shoprunner_com = {};
window._shoprunner_com = _shoprunner_com;

(function() {
   /* -----------------------------------------
    * SR Configuration
    * -----------------------------------------
    */

    _shoprunner_com.onSignIn = function(isValid){
      if(isValid) {
        _shoprunner_com.isUserSignedIn = true;
        store.set('isUserSignedIn', true);
      } else {
        _shoprunner_com.isUserSignedIn = false;
        store.set('isUserSignedIn', false);
      }
    }

    _shoprunner_com.version = 3.0;
    _shoprunner_com.enabled = true;
    _shoprunner_com.retailerID = 'BLOOM';
    _shoprunner_com.loginValidationURL = require('environment').VALIDATION_URL;

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

        if( _shoprunner_com.environmentID == 2) {
            _shoprunner_com.sr_jsContentURL = _shoprunner_com.prefix + "content.shoprunner.com";
        }

        var sr_CSS_URL = _shoprunner_com.sr_jsContentURL + "/" + _shoprunner_com.retailerID + ".css";
        var sr_js_content_el_URL = _shoprunner_com.sr_jsContentURL + "/" + _shoprunner_com.retailerID + ".js";

        setTimeout(function() {
            var a = document.createElement("link");
            a.href = sr_CSS_URL;
            a.type = "text/css";
            a.rel = "stylesheet";
            document.getElementsByTagName("head")[0].appendChild(a);
            var b = document.createElement("script");
            b.src = sr_js_content_el_URL;
            b.type = "text/javascript";
            document.getElementsByTagName("head")[0].appendChild(b)
        }, 1);
    }

    _shoprunner_com.docReady = false;

    _shoprunner_com.dom_loaded =  function() {
        _shoprunner_com.docReady = true;
        if (typeof(sr_$) !== "undefined") {
            sr_$.run()
        }
    }

    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", _shoprunner_com.dom_loaded, false)
    } else {
        if (document.attachEvent) {
            document.attachEvent("onreadystatechange", _shoprunner_com.dom_loaded)
        }
    }

    if (window.addEventListener) {
        window.addEventListener("load", _shoprunner_com.dom_loaded, false)
    } else {
        if (window.attachEvent) {
            var r = window.attachEvent("onload", _shoprunner_com.dom_loaded)
        }
    }
}());
