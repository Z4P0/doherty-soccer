'use strict';

var ds = {}; //global var

//wait until main document is loaded
window.addEventListener('load',function(){
	ds.league_overview.init();
});



ds.league_overview = (function() {

	// vars
	var league,
			clubs,
			current_club = {},
			club_overviews,
			table,
			table_rows,
			map,
			markers = [];

	// do it 2 it
	var init = function() {

		// DOM references
		// ===================================
		league = $('#league-overview');
		clubs = $.makeArray(league.children('.league-clubs').children());
		current_club.name = league.attr('data-current-club');
		club_overviews = $.makeArray(league.find('#club-overviews').children().children());
		table = league.find('.league-table');
		table_rows = $.makeArray(table.children('tbody').children());



		// map markers
		// ===================================
		for (var i = 0; i < club_overviews.length; i++) {
			// use data-attributes on the '.stadium' element
			var data = $(club_overviews[i]).find('.stadium');
			
			// push each club's data
			markers.push({
		    type: 'Feature',
		    geometry: {
		        type: 'Point',
		        coordinates: [data.attr('data-stadium-long'), data.attr('data-stadium-lat')]
		    },
		    properties: {
		        title: data.attr('data-stadium-name'),
		        // description: data.attr('data-stadium-address'),
		        'marker-size': 'small',
		        'marker-color': '#ADADAD',
		        club: club_overviews[i].getAttribute('data-club'),
		        index: i
		    }
			});
		};
		// initialize marker
		current_club.marker = markers[0];


		// i'm the map
		map = L.mapbox.map('map', 'examples.map-20v6611k');




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

		// map markers
		map.markerLayer.on('click',function(e) {
			if(current_club.name === e.layer.feature.properties.club) {
				map.setView(e.latlng, map.getZoom() + 2);
			} else {
				current_club.name = e.layer.feature.properties.club;
				// 
				update();
			}
		});

		// map.on('click', console.log(map.getZoom()));
		// do it up
		// ===================================
		update();
	}


	var clearClasses = function() {
		$(current_club.node).removeClass('current');
		$(current_club.table).removeClass('current');
		$(current_club.overview).removeClass('current');	
	}


	var updateClasses = function() {
		$(current_club.node).addClass('current');
		$(current_club.table).addClass('current');
		$(current_club.overview).addClass('current');
	}


	var updateReferences = function() {
		// go through our elements and find the team to show
		for (var i = 0; i < clubs.length; i++) {
			// get DOM node
			if (clubs[i].getAttribute('data-club') === current_club.name) current_club.node = clubs[i];
			// table node
			if(table_rows[i].getAttribute('data-club') === current_club.name) current_club.table = table_rows[i];
			// overview node
			if (club_overviews[i].getAttribute('data-club') === current_club.name) current_club.overview = club_overviews[i];
			// marker
			if (markers[i].properties.club === current_club.name) current_club.marker = markers[i];
		};		
	}


	var updateMap = function() {
		
		var zoomLvl = 6;
		if (map.getZoom() >= 8) zoomLvl = map.getZoom(); 

		var newMap = $(current_club.overview).find('.stadium');
		map.setView([newMap.attr('data-stadium-lat'), newMap.attr('data-stadium-long')], zoomLvl);	

		// change colors
		resetColors();

		current_club.marker.properties['old-color'] = current_club.marker.properties['marker-color'];
		current_club.marker.properties['marker-color'] = '#000';
		
		// redraw markers
		map.markerLayer.setGeoJSON(markers);		
	}


	var resetColors = function(e) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].properties['marker-color'] = markers[i].properties['old-color'] ||
			markers[i].properties['marker-color'];
		}
		map.markerLayer.setGeoJSON(markers);
	}


	var update = function() {

		clearClasses();

		updateReferences();

		updateClasses();

		updateMap();
	}

	return {
		init: init
	}

})();