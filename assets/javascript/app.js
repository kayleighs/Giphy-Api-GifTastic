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
}

$("#add-topic").on("click", function(event){
    event.preventDefault();
    var topic = $("#input-new").val().trim();
    topics.push(topic);
    renderButtons();
});
renderButtons();
$("button").on("click",function(){
    console.log("clicked")
    var searchTerm = $(this).attr("data-name");
    var key = "peKXuRg486cY3D1jNy2naHJwSQq57NzQ"
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ searchTerm + "&api_key=" + key + "&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(queryURL);
        console.log(response);
        var results = response.data;
        for (var i =0; i <results.length; i +=1){
            var topicDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height.url);
            topicDiv.append(p);
            topicDiv.append(topicImage);
            $(".content").prepend(topicDiv);
        }
    });
});
