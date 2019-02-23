//Create object to hold all app methods
const adoptApp = {};

//varibale that hold api key / url information
adoptApp.apiKey = 'dae1c1f938764d69b48d05aa508b352e';
adoptApp.apiUrl = `http://api.petfinder.com/pet.find`;

//Our document ready
$(document).ready(function(){
    adoptApp.init();
})

//Initializing the app
adoptApp.init = function(){
    adoptApp.location();
    $('.gallery').on('click', 'button', function () {
        $(this).closest('.petCrate').find('.discription').toggleClass('hide')
    })
}

//Making Ajax call with userInput location
adoptApp.getItems = function(location, animal){
    $.ajax({
        url: adoptApp.apiUrl,
        method:'GET',
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            key: adoptApp.apiKey,
            //make sure its city  and provence 
            location: location,
            animal: animal,
            output: 'basic',
            format: 'json'
        }
    }).then((results) => {
        const pets = results.petfinder.pets;
        console.log(results);
        if (results.petfinder.pets){
            adoptApp.print(results.petfinder.pets.pet);
       }
        
    }).catch((error) => {
          alert('try again', error)
    }  )
}

//Users input is acquired here
adoptApp.location = function (){
    $('form').on('submit', function(e){
        e.preventDefault();
        $('.gallery').empty();
        const location = $(this).find('#location').val();
        const animal = $(this).find('#animal').val();
        console.log("location:", location)
        adoptApp.getItems(location, animal);   
    }) 
}

// take result from ajax call and print to page
adoptApp.print = function (pets){
    $(`.results .gallery`).append(
        `<div class="galleryHeader">
            <h2>top picks</h2>
            <p>Here are some furry friends that might suit you</p>
        </div>`
    )
    pets.forEach(function(pet) {
        $(`.results .gallery`).append(
                ` <div class="petCrate">
                <img class="petImage" src="${pet.media.photos.photo[2].$t}" alt="${pet.name.$t}">
                     <div id="${pet.name.$t}" class="petInfo">
                         <p><span>name:</span> ${pet.name.$t}</p>
                         <p><span>pet:</span> ${pet.animal.$t}</p>
                         <p><span>age:</span> ${pet.age.$t}</p>
                         <p><span>size:</span> ${pet.size.$t}</p>
                         <button>more info</button>
                     </div>
                      <div class="discription hide">${pet.description.$t ? pet.description.$t : "adopt me!"}</div>
                 </div>`
            )  
        }
    )};

