$(document).ready(function() {

    var topic = ["Nas", "Tupac", "Run DMC", "Jay Z"];

    function gifFunc() {
        var artist = $(this).attr("data-name")
        console.log(artist)
        var queryurl = "https://api.giphy.com/v1/gifs/search?q=" + artist + "&api_key=gMkEjOv9HMeLW52jYm0p0qSSXOC50AX0&limit=10";
        console.log("Query URL: " + queryurl)
        $.ajax({
        url: queryurl,
        method: "GET"
    }).done(function(response) {
        var results = response.data
        console.log(results)
        for (var i = 0; i < results.length; i++) {
            var artistDiv = $("<div>")
            var rating = results[i].rating
            var ratingDiv = $("<div>")
            ratingDiv.addClass("ratings")
            console.log(rating)
            ratingDiv.text("Rating: " + rating)
            artistDiv.prepend(ratingDiv)
            var movingImage = results[i].images.fixed_height.url;
            console.log("Giphy: " + movingImage)
            var staticImage = results[i].images.fixed_height_still.url;
            console.log ("Static Image: " + staticImage);
            var showgif = $("<img>");
            showgif.attr("src", staticImage);
            showgif.addClass("artistGiphy");
            showgif.attr("data-state", "still");
            showgif.attr("data-still", staticImage)
            showgif.attr("data-animate", movingImage);
            artistDiv.append(showgif);
            $("#gifArea").prepend(artistDiv);


        }
            })
    };

//this function creates the buttons of the topics I have above
function renderButtons() {
    $("#artist-view").empty();
    for (var i = 0; i < topic.length; i++) {
        var a = $("<button>");
        a.addClass("newArtist");
        a.attr("data-name", topic[i]);
        a.text(topic[i]);
        $("#artist-view").append(a);
    }
}

//this function is when the "Add a new artist!" button is clicked, it reads the value that was put into the form, the adds that value to
//the topic array, and then creates a new button for it. Then it clears the form.
$("#add-artist").on("click", function(event){
    event.preventDefault();
    var artist = $("#artist-input").val().trim();
    console.log(artist)
    topic.push(artist);
    renderButtons();
    OnAdd();
    $("#artist-input").val("");
});

function playGifs() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

//I created this function so you get the giphs of a new artist without having to click on it's button - it happens as soon as you add the artist/click submit
function OnAdd() {
    var artist1 = $("#artist-input").val()
    console.log(artist1)
    var queryurl = "https://api.giphy.com/v1/gifs/search?q=" + artist1 + "&api_key=gMkEjOv9HMeLW52jYm0p0qSSXOC50AX0&limit=10";
    console.log("Query URL: " + queryurl)
    $.ajax({
    url: queryurl,
    method: "GET"
}).done(function(response) {
    var results = response.data
    console.log(results)
    for (var i = 0; i < results.length; i++) {
        var artistDiv = $("<div>")
        var rating = results[i].rating
        var ratingDiv = $("<div>")
        ratingDiv.addClass("ratings")
        console.log(rating)
        ratingDiv.text("Rating: " + rating)
        artistDiv.prepend(ratingDiv)
        var movingImage = results[i].images.fixed_height.url;
        console.log("Giphy: " + movingImage)
        var staticImage = results[i].images.fixed_height_still.url;
        console.log ("Static Image: " + staticImage);
        var showgif = $("<img>");
        showgif.attr("src", staticImage);
        showgif.addClass("artistGiphy");
        showgif.attr("data-state", "still");
        showgif.attr("data-still", staticImage)
        showgif.attr("data-animate", movingImage);
        artistDiv.append(showgif);
        $("#gifArea").prepend(artistDiv);


    }
        })
};

renderButtons();

$(document).on("click", ".newArtist", gifFunc);
$(document).on("click", ".artistGiphy", playGifs);





});