$(document).ready(function() {


    //Array for movies
        var movies = []; 
    
        //SEARCH Button Event
        $('#search-btn').on('click', function (event) {  
            //Stops Browser Reload       
            event.preventDefault(); 
    
            //User enters search query here 
            var moviesearch = $('#searchbox').val().trim();
    
            //Adds new movie to the front of the array
            movies.unshift(moviesearch);
            
        
            //Trims search value to null
            $('#searchbox').val(''); 
    
            //makes sure the array doesnt get looped over and over
            $('#popup-btn').empty(); 
    
    
            ///Adds a button for each movie of the array
            for (var i = 0 ; i < movies.length ; i++ ) {    
                var button = $('<button data-movie="'+ movies[i] +'"type="button" id="movieBtn" class="btn btn-info">' + movies[i]+ '</button>');
                $('#popup-btn').append(button);
                
            }
            }); 
            
//Retrieve data using AJAX and API + BUTTON CLICK EVENT

$(document.body).on('click', '#movieBtn' , function () { 

    //makes sure the same gif doesnt get looped over and over
    $('#gif-display').empty(); 


    
    //Stores all of the buttons with data-movie a
    var movie = $(this).attr("data-movie") 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=HD8aqxdjXpLQMq0OBrTB0LWnEtvhgUZl&limit=10"; //SET &limit=10 at the end of the API Key

        $.ajax({            
            url: queryURL,
            method: "GET"
        })
        .then(function(response){
            
        console.log(response);

        var movieResult = response.data;    //Creating movieResult variable to store the data from the response call
    
            for (var i= 0; i < movieResult.length ; i++) {  //Creating a loop for response data from GIPHY
    
            var movieDiv = $('<div>');  //Creating a new div and store the info inside movidDiv variable
            var p = $('<p>');           //Creating a paragraph tag to display the rating

            $(p).append('Rating:' + ' ' + movieResult[i].rating);
        
            var movieGif = $('<img class= "gif_click">');   //Creating <img> tag and store the gifs in movieGif variable

            $(movieGif).attr("src", movieResult[i].images.fixed_height_still.url);          //Provide url attribute to the img fixed_height_still.url make the gif appear to be still
            $(movieGif).attr({"data-animate" : movieResult[i].images.fixed_height.url});    //fixed_height.url is animated gif
            $(movieGif).attr({'data-state': 'still'});                                      //Provide data-sate attribute to the img
            $(movieGif).attr({"data-still": movieResult[i].images.fixed_height_still.url}); //Provide data-still attribute to the img. 


            $(movieDiv).append(movieGif);       //Append the movieGif variable to movieDiv
            $(movieDiv).append(p)               //Append p to movieDiv      

            $('#gif-display').prepend(movieDiv); //Append movieDiv into DOM #gif-display 

            }
            }) 
    }) 

$(document.body).on('click' , '.gif_click' , function() {
console.log('img')

var state = $(this).attr("data-state");

if (state === 'still') {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state" , "animate");

} else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state" , "still");
}

});
})