$(function () {
    /**
     * Submit search-form
     */

    $('#app-body')
        .find('form')
        .submit(function onSubmit(event) {
            event.preventDefault();
            var searchText = $(this)
                .find('input[type="text"]')
                .val();
            alert("Se ha buscado: "+ searchText);
        });

    var template =  '<article class="tv-show">' +
                        '<div class="left img-container">' +
                            '<img src=":img:" alt=":img alt:">'+
                        '</div>'+
                        '<div class="right info">'+
                            '<h1>:name:</h1>'+
                            ':summary:'+
                        '</div>'+
                    '</article>';

    $.ajax({
        url: 'http://api.tvmaze.com/shows',
        success: function (shows, textStatus, xhr) {

            var $divTvShows = $('#app-body').find('.tv-shows');

            shows.forEach(function (show) {
                var article = template
                    .replace(':name:', show.name)
                    .replace(':img:', show.image.medium)
                    .replace(':summary:', show.summary)
                    .replace(':img alt:', show.name + " Logo");

                $divTvShows.append($(article));
            });
        }
    });
    /*$.ajax({
        url: '/path/to/file',
        type: 'default GET (Other values: POST)',
        dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
        data: {param1: 'value1'}
    })
    .done(function() {
        console.log("success");
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });*/

})
