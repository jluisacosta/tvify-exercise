/**
 * Module dependencies
 */

import $ from 'jquery';
import page from 'page';

$('#app-body')
    .find('form')
    .submit( function (event) {
        var searchText = $(this)
            .find('input[type="text"]')
            .val();

        page(`/tvify-exercise/search?q=${searchText}`);
        event.preventDefault();
    });
