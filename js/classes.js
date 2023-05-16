export class Program {
    constructor(name, workouts){
        this.name = name;
        this.workouts = workouts;
    }
}

export class Workout {
    constructor(name, exercises){
        this.name = name;
        this.exercises = exercises;
    }
}

export class Exercise {
    constructor(name, numSets, repRange){
        this.name = name; 
        this.numSets = numSets;
        this.repRange = repRange;
    }
}

export class TrackedExercise extends Exercise {
    constructor(name, numSets, repRange, reps, weights){
        super(name, numSets, repRange);
        this.reps = reps;
        this.weights = weights;
    }
}