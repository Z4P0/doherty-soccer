'use strict';

ds.commentPost = (function() {
  // vars

  var init = function() {
    console.log('hello from comment-post.js');
    // for each comment, listen for:
    // replies & upvotes
    $('.comment').each(function(i, el) {
      var $comment = $(el);
      // reply listener
      $comment.find('.comment-reply').click(reply);
      // upvote listener
      $comment.find('.comment-upvote').click(upvote);
    });
  };

  var reply = function() {
    console.log('hello from: comment-reply');
  };
  var upvote = function() {
    console.log('hello from: comment-upvote');
  }

  return {
    init : init
  };
})();

ds.commentPost.init();
