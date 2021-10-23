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
    document.addEventListener("keydown", moveBear, false); //Add event listeners to the document for key presses
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