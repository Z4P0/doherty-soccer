'use strict';

ds.comments = (function() {
  // vars

  var init = function() {
    console.log('hello from comment-form.js');
    $('#comment-reveal').hide();
    $('#comment-form').click(function() {
      $('#comment-reveal').show();
    });
  };

  return {
    init : init
  };
})();

ds.comments.init();
