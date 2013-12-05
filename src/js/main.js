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
			club_overviews,
			table,
			table_rows,
			map;

	var init = function() {
		league = $('#league-overview');
		clubs = $.makeArray(league.children('.league-clubs').children());
		current_club.name = league.attr('data-current-club');
		club_overviews = $.makeArray(league.find('#club-overviews').children().children());
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
		// L.mapbox.map('map', 'examples.map-zr0njcqy')
		// 	// .setView([40, -74.50], 5);
		// 	// .setView([23, -100], 5); // mexico
		// 	// cruz azul
		// 	.setView([19.383, -99.175], 15);

		map = L.mapbox.map('map', 'examples.map-20v6611k');
			// .setView([23, -100], 5); // mexico



		// do it up
		update();
	}

	var update = function() {
		/*
		1. update table, list item, overview
		2. update map
		*/

		// 1.
		// clear classes first
		$(current_club.node).removeClass('current');
		$(current_club.table).removeClass('current');
		$(current_club.overview).removeClass('current');

		// list of teams
		// ===================================
		for (var i = 0; i < clubs.length; i++) {
			// get DOM node
			if (clubs[i].getAttribute('data-club') === current_club.name) {
				current_club.node = clubs[i];
			}
			// table node
			if(table_rows[i].getAttribute('data-club') === current_club.name) {
				current_club.table = table_rows[i];
			}
			// overview node
			if (club_overviews[i].getAttribute('data-club') === current_club.name) {
				current_club.overview = club_overviews[i];
			}
		};

		// add class
		$(current_club.node).addClass('current');
		$(current_club.table).addClass('current');
		$(current_club.overview).addClass('current');


		// 2.
		// update map
		var newMap = $(current_club.overview).find('.stadium');
		map.setView([newMap.attr('data-stadium-lat'), newMap.attr('data-stadium-long')], 6);

		// add marker
		L.mapbox.markerLayer({
	    // this feature is in the GeoJSON format: see geojson.org
	    // for the full specification
	    type: 'Feature',
	    geometry: {
	        type: 'Point',
	        // coordinates here are in longitude, latitude order because
	        // x, y is the standard for GeoJSON and many formats
	        coordinates: [newMap.attr('data-stadium-long'), newMap.attr('data-stadium-lat')]
	    },
	    properties: {
	        title: newMap.attr('data-stadium-name'),
	        description: newMap.attr('data-stadium-address'),
	        // one can customize markers by adding simplestyle properties
	        // http://mapbox.com/developers/simplestyle/
	        'marker-size': 'small',
	        'marker-color': '#2f2f2f'
	    }
		}).addTo(map);		

	}

		// 	L.mapbox.markerLayer({
		//     // this feature is in the GeoJSON format: see geojson.org
		//     // for the full specification
		//     type: 'Feature',
		//     geometry: {
		//         type: 'Point',
		//         // coordinates here are in longitude, latitude order because
		//         // x, y is the standard for GeoJSON and many formats
		//         coordinates: [-99.17818, 19.38339]
		//     },
		//     properties: {
		//         title: 'Estadio Azul',
		//         description: 'Calle Indiana 255, Ciudad de Los Deportes, Benito Juarez, 03810 Mexico City, Federal District, Mexico',
		//         // one can customize markers by adding simplestyle properties
		//         // http://mapbox.com/developers/simplestyle/
		//         'marker-size': 'small',
		//         'marker-color': '#2f2f2f'
		//     }
		// }).addTo(map);

	return {
		init: init
	}

})();