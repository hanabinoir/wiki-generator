
var api;
var keywords;

$(document).ready(function() {
    var page = 'http://en.wikipedia.org/?curid=';

    $("#search").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        Wiki();
    });

    $("#keywords").keyup(function(event) {
        /* Act on the event */
        if (event.keyCode == 13) {
            Wiki();
        }
    });

    $("th").on('click', '.btn', function(event) {
        event.preventDefault();
        /* Act on the event */
        var pageid = $(this).attr('id');
        page += pageid;
        window.location = page;
    });
});

function Wiki() {
    var crossorigin = "https://crossorigin.me/";
    var api = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=1&exlimit=10&exintro=1&explaintext=1&gsrlimit=10&gsrsearch=';
    var keywords = $("#keywords").val();

    $("#pages").html('');
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
            for (var pageid in pages) {
                console.log(pages[pageid]);
                $("#pages").append(
                    // '<a href=' + page + pages[pageid].pageid + '>' +
                        '<table class=\'page\'>' +
                            '<th class=\'btn\' id="' + pages[pageid].pageid + '"><b>' + pages[pageid].title + '</b></th>' +
                            '<tr>' +
                                '<td>' + pages[pageid].extract + '</td>' +
                            '</tr>'+
                        '</table>'
                    // '</a>'
                )
            }
    });
}
