//IMPORTS
import {Program, Workout, Exercise} from './classes.js'

//HELPER FUNCTIONS
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = localStorage.getItem(key);
    return value && JSON.parse(value);
}

//SCRIPT
//Load data from local storage
var currentProgram = localStorage.getObject("currentProgram");
if(currentProgram == null){  //Redirect to 'create a program' page if user has no program yet
    window.location.href = "customize.html";
}

document.querySelector(".workout-title").value = currentProgram.name;


var todaysWorkout;

//Button Responses

