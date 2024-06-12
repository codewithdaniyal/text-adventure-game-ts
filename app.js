import inquirer from "inquirer";
class Player {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 20;
    }
    fuelIncrease() {
        this.fuel += 10;
    }
}
class Opponent {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 10;
    }
}
let player = await inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "Enter Your Name?"
    }
]);
let opponent = await inquirer.prompt([
    {
        type: "list",
        name: "select",
        message: "Select Your Opponent?",
        choices: ["Skeleton", "Alien", "Zombie"]
    }
]);
let p1 = new Player(player.name);
let o1 = new Opponent(opponent.select);
do {
    if (opponent.select === "Skeleton") {
        let ask = await inquirer.prompt([
            {
                type: "list",
                name: "option",
                message: "What do you want to do?",
                choices: ["Attack", "Run", "Drink"]
            }
        ]);
        if (ask.option === "Attack") {
            let num = Math.floor(Math.random() * 2);
            if (num > 0) {
                p1.fuelDecrease();
                console.log(`${p1.name} fuel is ${p1.fuel}`);
            }
            else {
                o1.fuelDecrease();
                console.log(`${o1.name} fuel is ${o1.fuel}`);
            }
        }
        else if (ask.option === "Drink") {
            p1.fuelIncrease();
            console.log(`You drink health potion. Your fuel is ${p1.fuel}`);
        }
        else if (ask.option === "Run") {
            console.log("You lose");
            break;
        }
        // Add a condition to end the loop if fuel runs out
        if (p1.fuel <= 0) {
            console.log("You are out of fuel. You lose.");
            break;
        }
        else if (o1.fuel <= 0) {
            console.log(`${o1.name} is out of fuel. You win!`);
            break;
        }
    }
} while (true);
