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
}

//Making Ajax call with userInput location
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
        adoptApp.print(results.petfinder.pets.pet);
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
        }
    })
}



