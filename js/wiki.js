var crossorigin = "https://crossorigin.me/";
var api;
var keywords;

$(document).ready(function() {
    $("#search").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        api = 'http://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=1&exlimit=10&exintro=1&explaintext=1&gsrlimit=10&gsrsearch=';
        keywords = $("#keywords").val();
        keywords = keywords.replace(/\s+/g, '+');
        console.log(keywords);
        // api = crossorigin + api;
        api += keywords + "&callback=?";
        console.log(api);
        $.getJSON(api, function(json, textStatus) {
                /*optional stuff to do after success */
                console.log(json);
                var pages = json.query.pages;
                console.log(pages);
                for (var page in pages) {
                    console.log(page);
                    $("#pages").append('<table>' +
                        '<th>' + page.title + '</th>' +
                        '<tr>' +
                            '<td> ' + page.extract + '</td>' +
                        '</tr>' +
                    '</table>')
                }
        });
    });
});