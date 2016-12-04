const Emitter = require('events');
const util = require('util');
const Fighter = require('./Fighter');
const random = require('./random');

// set Person to inherit Emitter
util.inherits(Fighter, Emitter);

// instantiate two Fighter objects
const dennis = new Fighter("Dennis", 100);
const jasen = new Fighter("Jasen", 100);

const fighterArr = [dennis, jasen];
const fighterEvents = ["attack", "strike", "restore"];

// register events on each person
fighterArr.forEach(function(fighter){
    fighter.on("attack", function(rival){
        // display the event
        console.log(`${fighter.name} attacked ${rival.name} and caused 10 damages.`);
        // update the life
        rival.life -= 10;
        console.log(`${rival.name} was hit ${rival.life}/100.`);
    });
    fighter.on("strike", function(rival){
        // display the event
        console.log(`${fighter.name} struck ${rival.name} on the face and caused 20 damages.`);
        // update the life
        rival.life -= 20;
        console.log(`${rival.name} was hit ${rival.life}/100.`);
    });    
    fighter.on("restore", function(rival){
        // display the event
        console.log(`${fighter.name} drank a potion of restoration portion in front of ${rival.name}.`);
        // update the life
        fighter.life += 10;
        console.log(`${fighter.name} now has ${fighter.life}/100.`);
    });        
});

// game starts
let turn = 0;

while(dennis.life > 0 && jasen.life > 0){

    turn += 1;

    console.log("Turn " + turn);
    
    let whoShouldAttack = random(fighterArr); // 0 or 1

    let whoShouldSuffer = whoShouldAttack == 0 ? 1 : 0;

    fighterArr[whoShouldAttack].emit(fighterEvents[random(fighterEvents)], fighterArr[whoShouldSuffer]);
    
}

if(dennis.life > 0){ 
    console.log("Dennis wins!");
} else {
    console.log("Jasen wins!");
}