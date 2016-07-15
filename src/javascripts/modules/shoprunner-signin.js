require('./shoprunner_init');
var $ = require('jquery');

console.log('sign in page');

// This can be set anytime after the shoprunner_init.js file has been loaded
// window._shoprunner_com.onSignIn = function(isValid){
//   console.log('**** signed in');
//   if(isValid) {
//     _shoprunner_com.isUserSignedIn = true;
//   } else {
//     _shoprunner_com.isUserSignedIn = false;
//   }
//   // sr_updateMessages();  // Refresh ShopRunner divs
// }

//This can be set anytime after the shoprunner_init.js file has been loaded
// window._shoprunner_com.calls = {
//        on_sign_out: function(){
//          console.log('**** signed out');
//          _shoprunner_com.isUserSignedIn = false;
//          sr_updateMessages();  // Refresh ShopRunner divs
//        }
// }

// window.sr_tokenValidationCallback = function(result) {
//   debugger;
//   console.log('****');
//   console.log(result);
// }

// console.log('jsonp call');
// window.logResults = function logResults(json){
//   console.log(json);
// }

// $.ajax({
//   url: "https://api.github.com/users/jeresig",
//   dataType: "jsonp",
//   jsonpCallback: "logResults"
// });


// $.ajax({
//   url: "http://auth-server-sr.herokuapp.com/validateToken",
//   // url: "http://localhost:5000/validateToken",
//   dataType: "jsonp",
//   data: {
//     srtoken: '760e17b5208e9cd3245965029b3db961'
//   },
//   jsonpCallback: "logResults"
// });
