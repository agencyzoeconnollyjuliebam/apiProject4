//Create object to hold all app methods
const adoptApp = {};

//var that hold api key information
adoptApp.apiKey = 'dae1c1f938764d69b48d05aa508b352e';
adoptApp.apiKeySecret ='d2daaca6e8ab78541a2dce99582e5aa0';
//adoptApp.apiUrl = `http://api.petfinder.com/pet.find?key=${adoptApp.apiKey}&location=city`;
adoptApp.apiUrl = `http://api.petfinder.com/pet.find`;

//Our document ready
$(document).ready(function(){
    adoptApp.init();
})

//Initializing the app
adoptApp.init = function(){
    adoptApp.location();
}

//Making Ajax call with userInput
adoptApp.getItems = function(location){
    $.ajax({
        url: adoptApp.apiUrl,
        method:'GET',
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            key: adoptApp.apiKey,
            //make sure its city  and provence 
            location: location,
            output: 'basic',
            format: 'json'
        }
    }).then((results) => {
        // This is where we put code that will print the data to page
        adoptApp.print(results.petfinder.pets.pet);




        console.log(results.petfinder.pets.pet)//TBD
    })
}

//Users input is acquired here
adoptApp.location = function (){
    $('form').on('submit', function(e){
        e.preventDefault();
        const location = $(this).find('#location').val();
        console.log(location)
        adoptApp.getItems(location);
        
    }) 
}


// take result from ajax call and print to page

adoptApp.print = function (pets){
    pets.forEach(function(pet) {
        if(pet.media.photos.photo) {
            const images = $(`<img>`).attr('src', pet.media.photos.photo[2].$t);
        // for (let i = 0; i < 0; i ++) {
        //     //We need to create a const that will hold individual photos of each pet item of the ajax array

        //     const individualImage = $(pets).

            console.log(pet.media.photos.photo[0].$t)
            $('.results .gallery').append(`<div class="petCrate"></div>`)
            $('.results .gallery .petCrate').append(`<div class="petImage"></div>`)
            $('.results .gallery .petCrate .petImage').append(images)
        }
    })
}

//when user clicks on image , we get a pop-up message with all the pet's info



//need to extract image from ajax object and populate in html gallery
// artApp.displayArt = function(pieces) {
//     pieces.forEach(function(piece) {
//      if(piece.hasImage === true){
//         const title = $('<h2>').text(piece.title);
//         const artist = $('<p>').addClass('artist').text(piece.principalOrFirstMaker);
//         const image = $('<img>').attr('src', piece.webImage.url);
//         const artPiece = $('<div>').addClass('piece').append(image, title, artist);
//         $('#artwork').append(artPiece);
//      }
//     })
// }


