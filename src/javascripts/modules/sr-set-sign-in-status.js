var store = require('store');

_shoprunner_com.onSignIn = function(isValid){
  if(isValid) {
    _shoprunner_com.isUserSignedIn = true;
    store.set('isUserSignedIn', true);
  } else {
    _shoprunner_com.isUserSignedIn = false;
    store.set('isUserSignedIn', false);
  }
}

if(store.get('isUserSignedIn') === true) {
  _shoprunner_com.isUserSignedIn = true;
} else {
  _shoprunner_com.isUserSignedIn = false;
}
