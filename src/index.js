/**
 * Module Dependencies
 */

import $ from 'jquery';
import page from 'page';
import { getShows, searchShows } from 'src/tvmaze-api-client';
import renderShows from 'src/render';
import $tvShowsDiv from 'src/tv-shows-container';
import 'src/search-form';
import qs from 'qs';

var $loader = $('<div class="loader">Loading...</div>');
var $searchMsg = $( '<div class="message">'+
                        '<h3>Nothing Found</h3>'+
                        '<p>No show matched your search criteria.</p>'+
                    '</div>' );

page('/tvify-exercise/', function (context, next) {
    $searchMsg.remove();
    $tvShowsDiv.find('.tv-show').remove();

    if(!localStorage.shows){
        getShows(function (shows) {
            localStorage.shows = JSON.stringify(shows);
            renderShows(shows);
        });
    }
    else{
        renderShows(JSON.parse(localStorage.shows));
    }
});

page('/tvify-exercise/search', function (context, next) {
    $searchMsg.remove();
    $tvShowsDiv.find('.tv-show').remove();
    $loader.appendTo($tvShowsDiv);
    const searchText = qs.parse(context.querystring);

    searchShows(searchText, function (response) {
        var shows = response.map( function (element) {
            return element.show;
        });

        if(shows.length > 0){
            renderShows(shows);
        }
        else {
            $loader.remove();
            $tvShowsDiv.append($searchMsg);
        }
    });
});

page();
