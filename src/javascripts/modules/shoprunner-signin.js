require('./shoprunner_init');
var $ = require('jquery');

console.log('sign in page');

// This can be set anytime after the shoprunner_init.js file has been loaded
window._shoprunner_com.calls = {
        on_sign_in: function(){
          console.log('**** signed in');
       		sr_updateMessages();  // Refresh ShopRunner divs
        }
}

//This can be set anytime after the shoprunner_init.js file has been loaded
window._shoprunner_com.calls = {
       on_sign_out: function(){
         console.log('**** signed out');
         sr_updateMessages();  // Refresh ShopRunner divs
       }
}


console.log('jsonp call');
window.logResults = function logResults(json){
  console.log(json);
}

// $.ajax({
//   url: "https://api.github.com/users/jeresig",
//   dataType: "jsonp",
//   jsonpCallback: "logResults"
// });


$.ajax({
  url: "http://auth-server-sr.herokuapp.com/validateToken",
  // url: "http://localhost:5000/validateToken",
  dataType: "jsonp",
  data: {
    srtoken: '760e17b5208e9cd3245965029b3db961'
  },
  jsonpCallback: "logResults"
});
