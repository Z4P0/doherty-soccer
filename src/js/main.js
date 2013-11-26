'use strict';

var ds = {}; //global var

//wait until main document is loaded
window.addEventListener('load',function(){
	ds.league_overview.init();
});


ds.league_overview = (function() {

	var league,
			clubs,
			current_club = {},
			table,
			table_rows;

	var init = function() {
		league = $('#league-overview');
		clubs = $.makeArray(league.children('.league-clubs').children());
		current_club.name = league.attr('data-current-club');
		table = league.find('.league-table');
		table_rows = $.makeArray(table.children('tbody').children());


		// add event listeners
		// ===================================
		// list of teams
		league.children('.league-clubs').on('click', function(e) {
			// get data attr
			if (e.target.localName === 'li') {
				current_club.name = $(e.target).attr('data-club');
			} else if (e.target.localName === 'img') {
				current_club.name = $(e.target.parentNode).attr('data-club');
			}
			// 
			update();
		});

		// league table
		table.on('click', function(e) {
			var test = $(e.target.parentNode).attr('data-club');
			if (test !== undefined) {
				current_club.name = test;
			}
			// 
			update();
		});

		// i'm the map
		L.mapbox.map('map', 'examples.map-zr0njcqy');

		// do it up
		update();
	}

	var update = function() {
		// clear classes first
		// league.find('.current').removeClass('current');
		$(current_club.node).removeClass('current');
		$(current_club.table).removeClass('current');

		// list of teams
		// ===================================
		// get DOM node
		for (var i = 0; i < clubs.length; i++) {
			if (clubs[i].getAttribute('data-club') === current_club.name) {
				current_club.node = clubs[i];
			}
		};

		// league table
		// ===================================
		for (var j = 0; j < table_rows.length; j++) {
			if(table_rows[j].getAttribute('data-club') === current_club.name) {
				current_club.table = table_rows[j];
			}
		};


		// add class
		// add class
		$(current_club.node).addClass('current');
		$(current_club.table).addClass('current');

	}

	return {
		init: init
	}

})();