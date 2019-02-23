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
            console.log(results.petfinder.pets.pet) 
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
    pets.forEach(function(pet) {


            $(`.results .gallery`).append(
                `<div class="petCrate">
                    <div class="petImage"><img src="${pet.media.photos.photo[2].$t}" alt="${pet.name.$t}"></div>
                    <div id="${pet.name.$t}" class="petInfo">
                        <p>name: ${pet.name.$t}</p>
                        <p>pet: ${pet.animal.$t}</p>
                        <p>age: ${pet.age.$t}</p>
                        <p>size: ${pet.size.$t}</p>
                        <button>more info</button>
                    </div>
                     <div class="discription hide">${pet.description.$t ? pet.description.$t : "adopt me!"}</div>
                </div>`
            );

    })
}

// adoptApp.print = function (pets) {
//     pets.forEach(function (pet) {
//         if (pet.media.photos.photo) {
//             const image = $(`<img>`).attr('src', pet.media.photos.photo[2].$t);
//             $(`.results .gallery`).append(
//                 `<div class="petCrate">
//                     <div class="petImage"><img src="${pet.media.photos.photo[2].$t}" alt="${pet.name.$t}"></div>
//                     <div id="${pet.name.$t}" class="petInfo">
//                         <p>pet:${pet.animal.$t}</p>
//                         <p>age:${pet.age.$t}</p>
//                         <p>size:${pet.size.$t}</p>
//                         <button>more info</button>
//                     </div>
//                      <div class="discription hide">${pet.description.$t}</div>
//                 </div>`
//             );
//         }
//     })
// }







