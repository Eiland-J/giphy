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

        //Store results
        var movieResult = response.data;    
    
            for (var i= 0; i < movieResult.length ; i++) {  
    
        //p
            var movieDiv = $('<div>');  
            var p = $('<p>');           //Creating a paragraph tag to display the rating
        
            //Tried to make it more legible 
            //document.getElementById("<p>").style.color = 'blue';

              

            $(p).append('Rating:' + ' ' + movieResult[i].rating);
        
            var movieGif = $('<img class= "gif_click">');  

            $(movieGif).attr("src", movieResult[i].images.fixed_height_still.url);          
            $(movieGif).attr({"data-animate" : movieResult[i].images.fixed_height.url});    
            $(movieGif).attr({'data-state': 'still'});                                     
            $(movieGif).attr({"data-still": movieResult[i].images.fixed_height_still.url}); 


            $(movieDiv).append(movieGif);       
            $(movieDiv).append(p)                

            $('#gif-display').prepend(movieDiv); 

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