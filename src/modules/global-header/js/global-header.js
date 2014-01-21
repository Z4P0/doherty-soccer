'use strict';

// update nav --> current page
// handle search things

ds.nav = (function() {
  var $nav,
      page,
      $toggle,
      $signIn,
      $loginForm,
      $loginToggle,
      $search;

  var init = function(_settings) {
    // nav
    $nav = $(_settings.nav);


    // page (what page are we on?)
    page = $('body').attr('data-page');

    $nav.find('li').each(function(i, el) {
      if (el.getAttribute('data-page') === page) {
        el.className = 'here';
      }
    })


    // toggle
    $toggle = $(_settings.toggle);
    $toggle.click(function() {
      $toggle.toggleClass('show-x');
      $nav.toggleClass('nav-show');
    });


    // search field
    $search = $(_settings.search);
  };


  return {
    init : init
  };
})();

ds.nav.init({
  nav: '#nav-menu',
  toggle: '#nav-toggle',
  search: '#search-field',
});
