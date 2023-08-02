// Write your helper functions here!
require('isomorphic-fetch');

function validateInput(testInput) {
    if(testInput === ""){
        return "Empty";
    } else if(isNaN(testInput)){
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

// Using the value in the strings (pilot, copilot, fuelLevel, and cargoLevel), update the shuttle requirements
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   const pilotReady = document.getElementById("pilotStatus");
   const copilotReady = document.getElementById("copilotStatus");
   const fuelReady = document.getElementById("fuelStatus");
   const cargoReady = document.getElementById("cargoStatus");
   const launchStatus = document.querySelector("#launchStatus");
   
   if(validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(cargoLevel) === "Empty" || validateInput(fuelLevel) === "Empty"){
       alert("All fields are required!");
   } else if(validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number"){
       alert("Please enter a name for pilot and co-pilot.");
   } else if(validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number"){
       alert("Please enter a number for fuel level and cargo mass.");
   } else {
       list.style.visibility = "hidden";       
       pilotReady.innerHTML = `Pilot Ready`;
       copilotReady.innerHTML = `Co-pilot Ready`;
       fuelReady.innerHTML = 'Fuel level high enough for launch';
       cargoReady.innerHTML = 'Cargo mass low enough for launch';


       if(fuelLevel >= 10000 && cargoLevel < 10000){
          pilotReady.innerHTML = `Pilot ${pilot} is ready for launch`;
          copilotReady.innerHTML = `Co-pilot ${copilot} is ready for launch`;
          launchStatus.innerHTML = `Shuttle is Ready for Launch`;
          launchStatus.style.color = "rgb(65, 159, 106)";
          list.style.visibility = "visible";
       }

       if(fuelLevel < 10000){
          pilotReady.innerHTML = `Pilot ${pilot} is ready for launch`;
          copilotReady.innerHTML = `Co-pilot ${copilot} is ready for launch`;
          fuelReady.innerHTML = `Fuel level too low for launch`;
          launchStatus.style.color = "rgb(199, 37, 78)";
          launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
          list.style.visibility = "visible";
       }

       if(cargoLevel > 10000) {
          pilotReady.innerHTML = `Pilot ${pilot} is ready for launch`;
          copilotReady.innerHTML = `Co-pilot ${copilot} is ready for launch`;
          cargoReady.innerHTML = `Cargo mass too heavy for launch`;
          launchStatus.style.color = "rgb(199, 37, 78)";
          launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
          list.style.visibility = "visible";
       }
    }
}

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    const missionTarget = document.getElementById("missionTarget");

    missionTarget.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">
                `

 }

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json().then(function (data) {
            console.log(data);
            planetsReturned = data;
            return planetsReturned;
        })

    });
    return planetsReturned;
}

// Using Math.random(), return one planet from the list with a randomly-selected index. 
function pickPlanet(planets) {
    planets = planets[Math.floor(Math.random() * planets.length)];
    return planets;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
