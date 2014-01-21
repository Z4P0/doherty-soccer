'use strict';




ds.users = (function() {
  // var $nav;

  var init = function() {
    if (ds.localStorage.loggedIn === true) {
      console.log('logged in');
    }
  };





  return {
    init : init
  };
})();

// ds.nav.init({
//   nav: '#nav-menu',
//   toggle: '#nav-toggle',
//   search: '#search-field',
// });
