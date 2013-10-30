'use strict';

// show/hide nav --> clicking on toggle
// update nav --> current page
// handle search things

ds.nav = (function() {
  var nav,
      toggle,
      menu,
      search;

  var init = function(_settings) {
    // nav
    nav = $(_settings.nav);

    // toggle
    toggle = $(_settings.toggle);
    toggle.click(function() {
      console.log('CLICK');
      nav.toggleClass('nav-show');
    });

    // menu
    menu = $(_settings.menu);

    // search field
    search = $(_settings.search);

    console.log(this);
    console.log(nav);
  };

  return {
    init : init
  };
})();

ds.nav.init({
  nav: '#global-nav',
  toggle: '#nav-toggle',
  menu: '#nav-menu a',
  search: '#search-field'
});
