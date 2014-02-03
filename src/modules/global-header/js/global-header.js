'use strict';

// update nav --> current page
// handle search things

ds.nav = (function() {
  var $nav,
      page,
      $toggle,
      $search_li,
      $search_toggle,
      $form,
      $search_field,
      $container;

  var init = function(_settings) {
    // nav
    $nav = $(_settings.nav);

    // page container
    $container = $('.container');


    // page (what page are we on?)
    // ----------------------------
    page = $('body').attr('data-page');
    // add class .here to <li>
    $nav.find('li').each(function(i, el) {
      if (el.getAttribute('data-page') === page) {
        el.className = 'here';
      }
    })


    // toggle main menu
    // ----------------------------
    $toggle = $(_settings.toggle);
    $toggle.click(function() {
      toggleMenu();
    });



    // search field
    // ----------------------------
    $search_li = $(_settings.search);
    $search_field = $search_li.find('#search-input');

    // set up form
    $form = $search_li.find('#search-form');
    $form.toggleClass('hidden'); // hide it
    
    // set up search form toggle
    $search_toggle = $search_li.find('#search-toggle')
    $search_toggle.click(function() {
      toggleSearch();
    })

    // set up search-close btn
    $search_li.find('#search-form-close').click(function() {
      toggleSearch();
    });





    // DEBUG MODE
    toggleMenu();
    $('#search-results').toggle();
    $search_field.on('keypress', function() {
      $('#search-results').show();
      $search_field.off('keypress');
    });
    // setTimeout(function() {
    //   toggleSearch()      
    // }, 1000);

  };

  var toggleMenu = function() {
    $toggle.toggleClass('show-x');
    $nav.toggleClass('nav-show');

    // hide search form if it was left open
    if ($search_toggle.hasClass('hidden')) {
      toggleSearch(); 
      $('#search-results').hide();
    }
  }

  var toggleSearch = function() {
    $container.toggleClass('overlay');
    $search_toggle.toggleClass('hidden');
    $form.toggleClass('hidden');
  }


  return {
    init : init
  };
})();

ds.nav.init({
  nav: '#nav-menu',
  toggle: '#nav-toggle',
  search: '#search-li',
});
