/**
 * Module Dependencies
 */

import $ from 'jquery';
import $tvShowsDiv from 'src/tv-shows-container';

var tvShowTemplate =    `<article class="tv-show">
                            <div class="left img-container">
                                <img src=":img:" alt=":img alt:">
                            </div>
                            <div class="right info">
                                <h1>:name:</h1>
                                :summary:
                                <button class="like"><img src="http://cdn.urbytus.net/_icons/comment-like-active.png"></button>
                            </div>
                        </article>`;

export default function renderShows(shows) {
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
