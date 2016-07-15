var store = require('store');

if(store.get('isUserSignedIn') === true) {
  _shoprunner_com.isUserSignedIn = true;
} else {
  _shoprunner_com.isUserSignedIn = false;
}
