function Bear() {
    this.dBear = 100; //The length of the step of the bear
    this.htmlElement = document.getElementById("bear"); //The bear image
    this.id = this.htmlElement.id; //The bear image id
    this.x = this.htmlElement.offsetLeft; //The left offset of the image
    this.y = this.htmlElement.offsetTop; //The top offset of the image

    //Move the bear by xDir steps in the horiztonal axis
    //Or by yDir in the vertical axis
    this.move = function(xDir, yDir) {
        this.fitBounds(); //Ensure the bear is within the boundries when it moves
        this.x += this.dBear * xDir; //Update the x position by xDir steps
        this.y += this.dBear * yDir; // Update the y position by yDir steps
        this.display(); //Update the display
    };

    //Update the display
    this.display = function() {
        this.htmlElement.style.left = this.x + "px"; //Update the display for the x axis
        this.htmlElement.style.top = this.y + "px"; //Update the display for the y axis
        this.htmlElement.style.display = "block"; //Update the display to take the whole width
    };

    //Ensure the bear doesn't go outside the bounds of the display
    this.fitBounds = function() {
        let parent = this.htmlElement.parentElement; //The parent element of the bear image
        //Boundries of the bear
        let iw = this.htmlElement.offsetWidth;
        let ih = this.htmlElement.offsetHeight;
        //Boundries of the parent element
        let l = parent.offsetLeft;
        let t = parent.offsetTop;
        let w = parent.offsetWidth;
        let h = parent.offsetHeight;

        //If the bear goes out of the bounds horizontally return it to the edge
        if (this.x < 0) this.x = 0;
        if (this.x > w - iw) this.x = w - iw;

        //If the bear goes out of the bounds vertically return it to the edge
        if (this.y < 0) this.y = 0;
        if (this.y > h - ih) this.y = h - ih;
    };
}

//Start the game
function start() {
    bear = new Bear(); //create bear

    document.addEventListener("keydown", moveBear, false); //Add event listener to the document for key presses
    document.getElementById("speedBear").addEventListener("change", setSpeed) //Add event listener to the input field for changes

    bees = new Array(); //Create a new bees array
    makeBees(); //Create bees
    updateBees(); //Move the bees around with the specified frequency
}

//Handling keyboard events to move the bear
function moveBear(e) {
    //Codes of the 4 arrow keys 
    const KEYUP = 38;
    const KEYDOWN = 40;
    const KEYLEFT = 37;
    const KEYRIGHT = 39;
    if (e.keyCode == KEYRIGHT) {
        bear.move(1, 0) //Move the bear to the right
    }
    if (e.keyCode == KEYLEFT) {
        bear.move(-1, 0) //Move the bear to the left
    }
    if (e.keyCode == KEYUP) {
        bear.move(0, -1) //Move the bear up
    }
    if (e.keyCode == KEYDOWN) {
        bear.move(0, 1) //Move the bear down
    }
}

function setSpeed() {
    bear.dBear = parseInt(document.getElementById("speedBear").value); //Update the speed to the value we get from the input field
}

class Bee {
    constructor(beeNumber) {

        this.htmlElement = createBeeImg(beeNumber); //Creating a bee image
        this.id = this.htmlElement.id; //The id of the html element
        this.x = this.htmlElement.offsetLeft; //The position in the x axis
        this.y = this.htmlElement.offsetTop; //The position in the y axis

        //Function used to move the bee
        this.move = function(dx, dy) {
            this.x += dx; //Move the bee in the x axis by dx;
            this.y += dy; //Move the bee in the y axis by dy;
            this.display();
        };

        //Update the display
        this.display = function() {
            this.fitBounds();
            this.htmlElement.style.left = this.x + "px"; //Update the display for the x axis
            this.htmlElement.style.top = this.y + "px"; //Update the display for the y axis
            this.htmlElement.style.display = "block"; //Update the display to take the whole width
        };

        //Ensure the bee doesn't go outside the bounds of the display
        this.fitBounds = function() {
            let parent = this.htmlElement.parentElement; //The parent element of the bee image
            //Boundries of the bee
            let iw = this.htmlElement.offsetWidth;
            let ih = this.htmlElement.offsetHeight;
            //Boundries of the parent element
            let l = parent.offsetLeft;
            let t = parent.offsetTop;
            let w = parent.offsetWidth;
            let h = parent.offsetHeight;

            //If the bee goes out of the bounds horizontally return it to the edge
            if (this.x < 0) this.x = 0;
            if (this.x > w - iw) this.x = w - iw;

            //If the bee goes out of the bounds vertically return it to the edge
            if (this.y < 0) this.y = 0;
            if (this.y > h - ih) this.y = h - ih;
        };

    }
}

function createBeeImg(wNum) {
    //Get the dimension and position the board
    let boardDiv = document.getElementById("board"); //Set this variable to be the board div
    let boardDivW = boardDiv.offsetWidth; //Width of the board div
    let boardDivH = boardDiv.offsetHeight; //Height of the board div
    let boardDivX = boardDiv.offsetLeft; //X axis position of the board div
    let boardDivY = boardDiv.offsetTop; //Y axis position of the board div

    //Create the img
    let img = document.createElement("img");
    img.setAttribute("src", "images/bee.gif") //Set the src of the been image to the bee gif in the images file
    img.setAttribute("width", "100"); //Set the width to be 100
    img.setAttribute("alt", "A bee!"); //Alt text of the image
    img.setAttribute("id", "bee" + wNum); //The id of the bee image
    img.setAttribute("class", "bee"); //The class of the bee image

    //Add the image to the DOM as a child of the board div
    img.style.position = "absolute";
    boardDiv.appendChild(img);

    //Set the inital position of the bee
    let x = getRandomInt(boardDivW);
    let y = getRandomInt(boardDivW);
    img.style.left = (boardDivX + x) + "px";
    img.style.top = (y) + "px";

    //Return the img object
    return img;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max); //Generate a random number between 0 and max
}

function makeBees() {

    let nbBees = document.getElementById("nbBees").value; //Get the number of bees specified by the user
    nbBees = Number(nbBees); //Convert the content of the input to a number

    if (isNaN(nbBees)) { //Check that the input field contains a valid number
        window.alert("Invalid number of bees");
        return;
    }

    //Create bees
    let i = 1;
    while (i <= nbBees) {
        var num = i;
        var bee = new Bee(num); //Create a bee
        bee.display(); //Display the bee on screen
        bees.push(bee); //Add the bee to the bees array
        i++;
    }

}

function moveBees() {
    let speed = document.getElementById("speedBees").value; //Get the speed from the input field

    for (let i = 0; i < bees.length; i++) {
        //Move the bees randomly in the x and y axies 
        let dx = getRandomInt(2 * speed) - speed;
        let dy = getRandomInt(2 * speed) - speed;
        bees[i].move(dx, dy);
    }
}

function updateBees() {
    //move the bees randomly
    moveBees();
    //use a fixed update period
    let period = document.getElementById("periodTimer").value;
    updateTimer = setTimeout('updateBees()', period); //Update the bees movement after the specified interval
}