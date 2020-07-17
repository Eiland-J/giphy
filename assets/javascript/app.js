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
                //$('#popup-btn').append(button);
                
            }
            }); 
