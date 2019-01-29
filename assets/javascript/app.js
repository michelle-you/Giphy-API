var topics = [
    "The Office",
    "Parks and Rec",
    "New Girl",
    "Reno 911",
    "Big Bang Theory",
    "Modern Family",
    "Family Guy",
    "The Simpsons",
    "South Park",
    "Rick and Morty",
    "Arrested Development"
];

var gifUrls = {}

$(document).ready(function (){
    for (let topic of topics) {
        createButton(topic)
    }
});

function createButton(topic){
    var button = $("<button onclick=\"buttonHandler(this)\">" + topic + "</button>") 
    $("#buttons").append(button);
}

$("#gif-form").submit(function(event){
    var topic = $("#gif-form").find('input[name="gif-name"]').val();
    console.log(topic)
    createButton(topic)
    event.preventDefault()
})

function buttonHandler(button){
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q="+ encodeURIComponent(button.innerText) +"&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#gifs").html("");
        for (let gifData of response.data) {
            renderGif(gifData)
        }
    });
}

function renderGif(data) {
    gifUrls[data.id] = {
        still: data.images.original_still.url,
        gif: data.images.original.url
    }
    var newDiv = $("<div></div>")
    var rating = $("<label>Rating: " + data.rating + "</label>")
    var newGif = $("<img id=\"" + data.id +  "\" onclick=\"gifHandler(this)\" src="+ data.images.original_still.url + ">");
    newDiv.append(rating)
    newDiv.append("<br>")
    newDiv.append(newGif)
    $("#gifs").append(newDiv);
    console.log(newDiv)
}

function gifHandler(gif) {
    var gifData = gifUrls[gif.id]
    if (gif.src === gifData.still) {
        gif.src = gifData.gif
    } else if (gif.src === gifData.gif) {
        gif.src = gifData.still
    }
}

//data.images.original.url