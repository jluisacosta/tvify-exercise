/**
 * Module Dependencies
 */

import $ from 'jquery';

export function getShows(callback) {
    $.ajax('http://api.tvmaze.com/shows', {
            success: function (shows, textStatus, xhr) {
                callback(shows);
            }
        });
}

export function searchShows(searchText, callback) {
    $.ajax('http://api.tvmaze.com/search/shows', {
        data: searchText,
        success: function (response, textStatus, xhr) {
            callback(response);
        }
    });
}
