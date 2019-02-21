//Create object to hold all app methods
const adoptApp = {};

//var that hold api key information
adoptApp.apiKey = 'dae1c1f938764d69b48d05aa508b352e';
adoptApp.apiKeySecret ='d2daaca6e8ab78541a2dce99582e5aa0';
//adoptApp.apiUrl = `http://api.petfinder.com/pet.find?key=${adoptApp.apiKey}&location=city`;
adoptApp.apiUrl = `http://api.petfinder.com/pet.find`;


//hold all functions for the app
// adoptApp.init = function (){
//     adoptApp.getItems(location);
    // adoptApp.userInput();
//}

adoptApp.getItems = function(){
    $.ajax({
        url: adoptApp.apiUrl,
        //method:'GET',
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            key: adoptApp.apiKey,
            //zip or postal code (is it case sensitive)
            location: 'L3P2C6',
            output: 'basic',
            format: 'json'
        }
    }).then((results) => {
        console.log(results)
    })
}

adoptApp.getItems();

// $(document).ready(function(){
//     adoptApp.init();
// })

 //create variable to hold users input(location)
    // $('.locationQ input').submit(function(){
    //     alert(this).val();
    // })


// make an ajax request to petFinder API with user's input (location)


//create variables for the user's pet choice (cat/dog)

//take location object and filter the object based on user pet choice

//On submit, run function and print to page relative pet infrmation - img, cat/dog, adoption status, size, shelter ID