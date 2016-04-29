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
                                '</div>'+
                            '</article>';
    var $searchMsg = $( '<div class="message">'+
                            '<h3>Nothing Found</h3>'+
                            '<p>No show matched your search criteria.</p>'+
                        '</div>' );



    function renderShows(shows) {
        shows.forEach( function (show) {
            var tvShow = tvShowTemplate
                .replace(':name:', show.name)
                .replace(':summary:', show.summary)
                .replace(':img alt:', show.name + " Logo");

            if(show.image){
                tvShow = tvShow.replace(':img:',show.image.medium);
            }
            else {
                tvShow = tvShow.replace(':img:','http://promovie.info/img/films/not_found.jpg');
            }

            $tvShow = $(tvShow);
            $tvShow.hide();
            $tvShowsDiv.append($tvShow);
            $tvShow.fadeIn(2000);
        });
    }

    $.ajax({
        url: 'http://api.tvmaze.com/shows',
        success: function (shows, textStatus, xhr) {
            $tvShowsDiv.find('.loader').remove();
            renderShows(shows);
        }
    });

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

                    $loader.remove();

                    if(shows.length > 0){
                        renderShows(shows);
                    }
                    else {
                        $tvShowsDiv.append($searchMsg);
                    }
                }
            });
        });
});
