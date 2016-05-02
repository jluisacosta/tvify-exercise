/**
 * Module dependencies
 */

import $ from 'jquery';

$(function () {
    /**
     * Rendering shows
     */

    var $tvShowsDiv = $('#app-body').find('.tv-shows');
    var $loader = $('<div class="loader">Loading...</div>');
    var tvShowTemplate =    '<article class="tv-show">' +
                                '<div class="left img-container">' +
                                    '<img src=":img:" alt=":img alt:">'+
                                '</div>'+
                                '<div class="right info">'+
                                    '<h1>:name:</h1>'+
                                    ':summary:'+
                                    '<button class="like"><img src="http://cdn.urbytus.net/_icons/comment-like-active.png"></button>'+
                                '</div>'+
                            '</article>';
    var $searchMsg = $( '<div class="message">'+
                            '<h3>Nothing Found</h3>'+
                            '<p>No show matched your search criteria.</p>'+
                        '</div>' );

    $tvShowsDiv.on('click','button.like', function (event) {
        var $this = $(this);
        $this.closest('.tv-show').toggleClass('liked');
    });

    function renderShows(shows) {
        $tvShowsDiv.find('.loader').remove();

        shows.forEach( function (show) {
            var $tvShow = $(tvShowTemplate
                .replace(':img:',show.image ? show.image.medium : 'http://promovie.info/img/films/not_found.jpg')
                .replace(':img alt:', show.name + " Logo")
                .replace(':name:', show.name)
                .replace(':summary:', show.summary));

            $tvShow.hide();
            $tvShowsDiv.append($tvShow);
            $tvShow.fadeIn(2000);
        });
    }

    if(!localStorage.shows){
        $.ajax('http://api.tvmaze.com/shows')
            .then( function (shows) {
                localStorage.shows = JSON.stringify(shows);
                renderShows(shows);
            });
    }
    else{
        renderShows(JSON.parse(localStorage.shows));
    }

    /**
     * Submit search-form
     */

    $('#app-body')
        .find('form')
        .submit( function onSubmit(event) {
            var searchText = $(this)
                .find('input[type="text"]')
                .val();

            event.preventDefault();
            $searchMsg.remove();
            $tvShowsDiv.find('.tv-show').remove();
            $tvShowsDiv.append($loader);

            $.ajax({
                url: 'http://api.tvmaze.com/search/shows',
                data: { q: searchText },
                success: function (response, textStatus, xhr) {
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
                }
            });
        });
});
