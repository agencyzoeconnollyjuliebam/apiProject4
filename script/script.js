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

        console.log("object we get back?", results.petfinder.pets.pet)//TBD
    })
}

//Users input is acquired here
adoptApp.location = function (){
    $('form').on('submit', function(e){
        e.preventDefault();
        const location = $(this).find('#location').val();
        console.log("location:", location)
        adoptApp.getItems(location);
        
    }) 
}


// take result from ajax call and print to page

adoptApp.print = function (pets){
    pets.forEach(function(pet) {
        if(pet.media.photos.photo) {
            const image = $(`<img>`).attr('src', pet.media.photos.photo[2].$t);
            console.log("images:", image);

            // $('.results .gallery').append(`<div class="petCrate"></div>`)
            // $('.results .gallery .petCrate').append(`<div class="petImage"></div>`)
            // $('.results .gallery .petCrate .petImage').append(image)
      

          
    
 
    $(`.results .gallery`).append(
        `<div class="petCrate">
        <div class="petImage"><img src="${pet.media.photos.photo[2].$t}" alt="${pet.name.$t}"></div>
      <div class="petInfo">
             <p>pet:${pet.animal.$t}</p>
             <p>age:${pet.age.$t}</p>
             <p>size:${pet.size.$t}</p>
        <button class="moreInfo">more info</button>
        </div>
        <div class="discription">${pet.description.$t}</div>
    </div>`
    );


//Jonathan's example
            // const markup = `
            
            // `

            // pets.forEach((pet,index) => {
            //     const markup `
            //         Pet number ${index} is ${arraysomething[index]}
            //     `

            //     $('.list-parent').append(markup)
            // })

            // console.log(pet.media.photos.photo[0].$t)
            // $('.results .gallery').append(`<div class="petCrate"></div>`)
            // $('.results .gallery .petCrate').append(`<div class="petImage"></div>`)
            // $('.results .gallery .petCrate .petImage').append(image)
        }
    })
}


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


