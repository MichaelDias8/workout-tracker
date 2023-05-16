//IMPORTS
import {Program, Workout, Exercise} from './classes.js'

//HELPER FUNCTIONS
function newExcerciseHtml(){return `
    <form class="exercise-form" id="exercise-id-${nextExerciseID}">
        <div class="exercise-name">
            <label class="exercise-label"> Excersise: </label>
            <input class="exer-name-input" type="text" required></input>
        </div>
        <div class="number-sets">
            <label class="sets-label"> # Sets: </label>
            <input class="exer-num-sets-input num-box" type="number" required min="1"></input>
        </div>
        <div class="rep-range">
            <label class="rep-range-label"> Rep Range: </label>
            <input class="exer-rep-range-lower-input num-box" type="number" required></input>
            <p style="display: inline;">-</p>
            <input class="exer-rep-range-upper-input num-box" type="number" required></input>
        </div>
        <button class="delete-exercise-btn" id="exer-delete-button-${nextExerciseID}" data-exercise-id="exercise-id-${nextExerciseID}">Remove Exercise</button>
    </form>`
}

function newDayHtml(){return `
    <div class="workout-day" id="day-id-${nextDayID}">
        <header class="workout-header">
            <form>
                <label>Workout Name: </label>
                <input class="workout-name"></input>
            </form>
        </header>
        <div class="exercise-list">
            <form class="exercise-form" id="exercise-id-${nextExerciseID}">
                <div class="exercise-name">
                    <label class="exercise-label"> Excersise: </label>
                    <input class="exer-name-input" type="text" required></input>
                </div>
                <div class="number-sets">
                    <label class="sets-label"> # Sets: </label>
                    <input class="exer-num-sets-input num-box" type="number" required min="1"></input>
                </div>
                <div class="rep-range">
                    <label class="rep-range-label"> Rep Range: </label>
                    <input class="exer-rep-range-lower-input num-box" type="number" required></input>
                    <p style="display: inline;">-</p>
                    <input class="exer-rep-range-upper-input num-box" type="number" required></input>
                </div>
                <button class="delete-exercise-btn" id="exer-delete-button-${nextExerciseID}" data-exercise-id="exercise-id-${nextExerciseID}">Remove Exercise</button>
            </form>
            <div class="day-footer-buttons">
                <button class="add-exercise-btn">Add Exercise</button>
                <button class="delete-day-button" id="day-delete-button-${nextDayID}" data-day-id="day-id-${nextDayID}">Remove Day</button> 
            </div>
        </div>
    </div>`
}

function programsHTML(){return`
    <div class="saved-programs-wndw">
        <button class="close-btn"></button>
    </div>`
}

Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = localStorage.getItem(key);
    return value && JSON.parse(value);
}

//SETUP BUTTON LISTENERS
//Save button 
var saveProgramButton = document.querySelector(".save-and-edit-btn");
saveProgramButton .addEventListener("click", () => {
    let programKey = document.querySelector(".program-name").value;
    if(programKey == "currentProgram"){
        alert(`The name "${programKey}" is not allowed. Please enter a different name`)
    }else if(!programKey){
        alert(`Please enter a name for your program`);
    }else{
        localStorage.setObject(programKey, makeProgramObject());
        
        let newProgramList = (localStorage.getObject("programList")) ? 
            localStorage.getObject("programList") : [];
        newProgramList.push(programKey);
        localStorage.setObject("programList", newProgramList);

        if(localStorage.getObject("currentProgram") == null){
            localStorage.setObject("currentProgram", makeProgramObject());
        }
    }
});

//Add and delete exercises buttons
document.querySelector("#exer-delete-button-0").addEventListener("click", () => {
    document.querySelector("#exercise-id-0").remove();
});
var nextExerciseID = 1;
var addExerciseBtn = document.querySelector(".add-exercise-btn");
addExerciseBtn.addEventListener("click", () => {
    addExerciseBtn.parentElement.insertAdjacentHTML('beforebegin', newExcerciseHtml(nextExerciseID));
    const newDeleteButton = document.querySelector(`#exer-delete-button-${nextExerciseID}`);
    newDeleteButton.addEventListener("click", () => {
        let newExerciseId = newDeleteButton.dataset.exerciseId;
        document.querySelector(`#${newExerciseId}`).remove();
    });
    nextExerciseID++;
});

//Add and delete days buttons
document.querySelector("#day-delete-button-0").addEventListener("click", () => {
    document.querySelector("#day-id-0").remove();
});
var nextDayID = 1;
var addDayBtn = document.querySelector(".add-day-btn");
addDayBtn.addEventListener("click", () => {
    addDayBtn.insertAdjacentHTML('beforebegin', newDayHtml());
    const newDayDeleteButton = document.querySelector(`#day-delete-button-${nextDayID}`);
    newDayDeleteButton.addEventListener("click", () => {
        document.querySelector(`#${newDayDeleteButton.dataset.dayId}`).remove();
    });

    const newExerDeleteButton = document.querySelector(`#${newDayDeleteButton.dataset.dayId} .delete-exercise-btn`);
    newExerDeleteButton.addEventListener("click", () => {
        document.querySelector(`#${newExerDeleteButton.dataset.exerciseId}`).remove();
    });

    const newAddExerciseButton = document.querySelector(`#${newDayDeleteButton.dataset.dayId} .add-exercise-btn`);
    newAddExerciseButton.addEventListener("click", () => {
        newAddExerciseButton.parentElement.insertAdjacentHTML('beforebegin', newExcerciseHtml(nextExerciseID));
        const newDeleteButton = document.querySelector(`#exer-delete-button-${nextExerciseID}`);
        newDeleteButton.addEventListener("click", () => {
            let newExerciseId = newDeleteButton.dataset.exerciseId;
            document.querySelector(`#${newExerciseId}`).remove();
        });
        nextExerciseID++;
    });
    nextDayID++;
    nextExerciseID++;
});

//Info button
document.querySelector(".info-btn").addEventListener("click", () => {
    alert("The programming page allows you to create and save custom workout programs. Your current program will be the one used for the tracking page");
});

//Set as current program button
document.querySelector(".set-current-btn").addEventListener("click", () => {
    
    localStorage.setObject("currentProgram", makeProgramObject());
    alert(`"${document.querySelector(".program-name").value}" was set as the current program`)
});

//Create new program button
document.querySelector(".create-btn").addEventListener("click", () => {
    window.location.href = "customize.html";
});

//My programs button
document.querySelector(".my-programs-btn").addEventListener("click", () => {
    document.querySelector(".program-window").insertAdjacentHTML('beforebegin', programsHTML());
    document.querySelector(".close-btn").addEventListener("click", () => {
        document.querySelector(".saved-programs-wndw").remove();
    });

    if(localStorage.getObject("programList") == null){
        document.querySelector(".close-btn").insertAdjacentHTML('afterend', `
            <p class="no-programs-text">No Saved Programs </p>
        `);
    }else{
        localStorage.getObject("programList").forEach((element) => {
            document.querySelector(".close-btn").insertAdjacentHTML('afterend', `
                <p class="selectable-program">${element}</p>
            `);
        });
        document.querySelectorAll(".selectable-program").forEach((element) => {
            element.addEventListener("click", () => {
                fillProgram(element.textContent);
                document.querySelector(".close-btn").click();
            });
        });
    }
});

//SCRIPT
//Load data from local storage
var currentProgram = localStorage.getObject("currentProgram");
if(currentProgram != null){ //if user has a current program then display it
    fillProgram(currentProgram.name);
}

//FUNCTION DECLARATIONS
function fillProgram(programKey){
    let prog = localStorage.getObject(programKey);
    document.querySelector(".program-name").value = prog.name;

    document.querySelectorAll(".workout-day").forEach((element) => {element.remove()});
    
    prog.workouts.forEach((workout) => {
        addDayBtn.click();
        let currentWorkoutElement = addDayBtn.previousElementSibling;
        currentWorkoutElement.querySelector(".workout-name").value = workout.name;
        let addExerBtn = currentWorkoutElement.querySelector(".add-exercise-btn");
        workout.exercises.forEach((exercise, index) => {
            let currentExerElement = addExerBtn.parentElement.previousElementSibling;
            currentExerElement.querySelector(".exer-name-input").value = exercise.name;
            currentExerElement.querySelector(".exer-num-sets-input").value = exercise.numSets;
            currentExerElement.querySelector(".exer-rep-range-lower-input").value = exercise.repRange[0];
            currentExerElement.querySelector(".exer-rep-range-upper-input").value = exercise.repRange[1];
            addExerBtn.click();
        });
        addExerBtn.parentElement.previousElementSibling.remove();
        let exerciseElements = currentWorkoutElement.querySelectorAll(".exercise-form");
    });
}

function makeProgramObject(){
    let workouts = [];
    let programName = document.querySelector(".program-name").value;
    
    let workoutElements = document.querySelectorAll(".workout-day");
    workoutElements.forEach(element => {
        let exercises = [];
        let workoutName = element.querySelector(".workout-name").value;

        let exerciseElements = document.querySelectorAll(".exercise-form");
        exerciseElements.forEach((element) => {
            let exercise = {
                name: element.querySelector(".exer-name-input").value,
                numSets: element.querySelector(".exer-num-sets-input").value,
                repRange: [element.querySelector(".exer-rep-range-lower-input").value, 
                          element.querySelector(".exer-rep-range-upper-input").value]
            };
            exercises.push(exercise);
        });

        let workout = {
            name: workoutName,
            exercises: exercises
        }
        workouts.push(workout);
    });
    return new Program(programName, workouts);
}