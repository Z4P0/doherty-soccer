'use strict';

// update nav --> current page
// handle search things

ds.nav = (function() {
  var $nav,
      $toggle,
      $signIn,
      $loginForm,
      $loginToggle,
      $search;

  var init = function(_settings) {
    // nav
    $nav = $(_settings.nav);

    // toggle
    $toggle = $(_settings.toggle);
    $toggle.click(function() {
      $toggle.toggleClass('show-x');
      $nav.toggleClass('nav-show');
    });

    // sign in
    $signIn = $nav.find('#sign-in');
    $loginForm = $('#login-form-wrapper');
    $nav.find('#sign-in a').on('click', toggleLogin);
    $signIn.find('.fi-minus').on('click', toggleLogin);


    // search field
    $search = $(_settings.search);
  };

  var toggleLogin = function(e) {
    e.preventDefault();
    $signIn.toggleClass('open');
    $loginForm.toggleClass('open');
  }

  return {
    init : init
  };
})();

ds.nav.init({
  nav: '#nav-menu',
  toggle: '#nav-toggle',
  search: '#search-field',
});
