'use strict';

// update nav --> current page
// handle search things

ds.nav = (function() {
  var nav,
      toggle,
      menu,
      search,
      footerLinks,
      footer;

  var init = function(_settings) {
    // nav
    nav = $(_settings.nav);

    // toggle
    toggle = $(_settings.toggle);
    toggle.click(function() {
      nav.toggleClass('nav-show');
    });

    // menu
    menu = $(_settings.menu);

    // search field
    search = $(_settings.search);

    // footer links (settings/about/privacy)
    footerLinks = $(_settings.footerLinks);
    footerLinks.on('click', function(e) {
      console.dir(e.target);
      // find that id
      console.log(e.target.attributes['href'].nodeValue);
      // console.log($(e.target.attributes['href'].nodeValue).css('height'));
      footer.css('-webkit-transform', 'translateY(-'+$(e.target.attributes['href'].nodeValue).css('height')+')')
    });

    // footer
    footer = $(_settings.footer);
  };

  return {
    init : init
  };
})();

ds.nav.init({
  nav: '#global-nav',
  toggle: '#nav-toggle',
  menu: '#nav-menu a',
  search: '#search-field',
  footerLinks: '#footer-links',
  footer: '#gloval-nav-footer'
});
