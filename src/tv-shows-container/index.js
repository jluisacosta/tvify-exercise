/**
 * Module Dependencies
 */

import $ from 'jquery';

var $tvShowsDiv = $('#app-body').find('.tv-shows');

$tvShowsDiv.on('click','button.like', function (event) {
    var $this = $(this);
    $this.closest('.tv-show').toggleClass('liked');
});

export default $tvShowsDiv;
