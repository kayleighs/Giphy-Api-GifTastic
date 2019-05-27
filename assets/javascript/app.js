

var topics = ["The Matrix", "Mad Max"]


function renderButtons() {
    $("#buttons-view").empty();
    for (var i =0; i <topics.length; i +=1) {
        var a = $("<button>");
        a.addClass("topic");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
    $(".topic").on("click", function () {
   //     $(".content").empty();
        console.log("clicked")
        var searchTerm = $(this).attr("data-name");
        var key = "peKXuRg486cY3D1jNy2naHJwSQq57NzQ"
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + key + "&limit=10" + "&offset=0"

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(queryURL);
                console.log(response);
                var results = response.data;
                for (var i = 0; i < results.length; i += 1) {
                    var topicSpan = $("<span>");
                    topicSpan.addClass("topic-span")

                    var ratingP = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
                    ratingP.addClass("rating")

                    var favorites = $("<button>").text("Save")
                    favorites.addClass("save-gif")
                    favorites.attr("url", results[i].images.fixed_height.url)

                    var topicImage = $("<img>")
                    var stillGif = results[i].images.fixed_height_still.url
                    var animatedGif = results[i].images.fixed_height.url
                    topicImage.addClass("gif");
                    topicImage.attr("src", results[i].images.fixed_height_still.url);
                    topicImage.attr({ "data-animate": animatedGif, "data-still": stillGif });
                    topicImage.attr({ "src": stillGif, "data-state": "still" });

                    
                    topicSpan.append(ratingP);
                    topicSpan.append(favorites)
                    topicSpan.append(topicImage);

                    $(".content").prepend(topicSpan);
                }
            });
    });
}

$(document).on("click", ".gif", function () {
    console.log("gif clicked")
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

//add buttons for new topics
console.log(topics)
$("#add-topic").on("click", function(event){
    event.preventDefault();
    var topic = $(this.results[i].images).val().trim();
    topics.push(topic);
    renderButtons();
    console.log(topics)
});

//saving to favorites and local storage

function renderFavs(list) {
    $("#favorites").empty(); 

    // render  gif to the page
    for (var i = 0; i < list.length; i++) {

        var favSpan = $("<span>");
        favSpan.addClass("topic-span")
        var favItem = $("<img>");
        favItem.attr("src", list[i]);

        var deleteFav = $("<button>");

        deleteFav.attr("data-to-do", i);
        deleteFav.addClass("remove");
        deleteFav.text("Remove ✘");


  //      favItem = favItem.prepend(deleteFav);
        favSpan.append(deleteFav)
        $(favSpan).append(favItem)
        $("#favorites").append(favSpan);
    }
}

//saves item on click
$(document).on("click", ".save-gif", function (event) {
    console.log("save button clicked")
    event.preventDefault();
    var favGif = $(this).attr("url")
    console.log(favGif)
    list.push(favGif)
    renderFavs(list)
    localStorage.setItem("favGif", JSON.stringify(list));
 //   $(".save-gif").val("");
});
//removes item from favs on click
$(document).on("click", ".remove", function () {
    var removeFav = $(this).attr("data-to-do");
    list.splice(removeFav, 1);
    renderFavs(list);
    localStorage.setItem("favGif", JSON.stringify(list));
});

var list = JSON.parse(localStorage.getItem("favGif"));
if (!Array.isArray(list)) {
    list = [];
}

renderFavs(list);


//render buttons function
renderButtons();
