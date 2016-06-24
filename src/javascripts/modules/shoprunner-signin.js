require('./shoprunner_init');

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
