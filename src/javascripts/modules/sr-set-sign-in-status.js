var store = require('store');

window.fireBloomiesCoremetrics = function fireBloomiesCoremetrics(eventName) {
    console.log('fired event', eventName);
}


_shoprunner_com.onSignIn = function(err, isValid) {
    if (!err) {
        if (isValid) {
            _shoprunner_com.isUserSignedIn = true;
            store.set('isUserSignedIn', true);
            console.log('***** sign in hook');
        } else {
            _shoprunner_com.isUserSignedIn = false;
            store.set('isUserSignedIn', false);
            console.log('***** sign out hook');
        }
    }else {
      console.log('error occurred during token validation');
    }
}

if (store.get('isUserSignedIn') === true) {
    _shoprunner_com.isUserSignedIn = true;
} else {
    _shoprunner_com.isUserSignedIn = false;
}
