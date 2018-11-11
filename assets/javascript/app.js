// Topics Array (uses url encoding to concatenate so that phrases can be passed into giphy API queryURL)
var topics = [ "Bright Eyes", "Boards of Canada", "Flying Lotus", "LCD Soundsystem", "Neon Indian", "Radiohead", "Tame Impala"];

// Create Buttons
function create() {
    $("#buttons").empty();

    for (i = 0; i < topics.length; i++) {

        var bandData = topics[i].toLowerCase();

        $("#buttons").append("<button class='band-button' data-band='" + bandData + "'>" + topics[i] + "</button>")
    }
}

create()

// Add gifs upon button click
$(document).on("click", ".band-button", function () {

    // Empty gifs from previous click
    $("#gifs").empty();

    var band = $(this).attr("data-band");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + band + "&api_key=2SHIKszd8TGGB2znEV0B8qzV0RI6YQqt&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class=col-6>");

            var rating = results[i].rating;

            var p = $("<p class='rating'>").text("Rating: " + rating);

            var bandImage = $("<img width=300 height=200>");
            bandImage.attr("src", results[i].images.original_still.url).attr("class", "gif");
            bandImage.attr("data-still", results[i].images.original_still.url);
            bandImage.attr("data-animate", results[i].images.original.url);
            bandImage.attr("data-state", "still");

            gifDiv.prepend(p);
            gifDiv.prepend(bandImage);

            $("#gifs").prepend(gifDiv);
        }
    })
});

$(document).on("click", ".gif", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still");
    }
});


// Add form that takes value from user input and pushes it into topics array to create a new button
$("#submit").on("click", function (event){
    event.preventDefault();
    topics.push($("#bandInput").val().trim());
    create();
});