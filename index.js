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

                    var $tvShowsDiv = $('#app-body').find('.tv-shows');
                    $tvShowsDiv.find('.loader').remove();

                    shows.forEach(function (show) {
                        var article = template
                            .replace(':name:', show.name)
                            .replace(':img:', show.image.medium)
                            .replace(':summary:', show.summary)
                            .replace(':img alt:', show.name + " Logo");

                        var $article = $(article);
                        $article.hide();
                        $tvShowsDiv.append($article.slideDown());
                    });
                }
    });
})
