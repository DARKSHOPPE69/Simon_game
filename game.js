var userClickedPattern = []; // Store user clicks
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; // Store the game pattern
var started = false; // Track if the game has started
var level = 0; // Start at level 0

// Detect the first key press and start the game
$(document).keydown(function () {
    if (!started) {
        level = 0; // Reset level at the start
        gamePattern = []; // Reset game pattern
        userClickedPattern = []; // Reset user input pattern
        $("#level-title").text("Level " + level); // Update title to Level 0
        nextSequence(); // Start the game
        started = true;
    }
});

// Function to generate a new sequence
function nextSequence() {
    userClickedPattern = []; // Reset user's clicked pattern for new level
    level++; // Increase level by 1
    $("#level-title").text("Level " + level); // Update title

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); // Add to game pattern

    // Flash effect for the chosen button
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // Play the corresponding sound
    playSound(randomChosenColour);

    console.log("Game Pattern:", gamePattern);
}

// Function to play sound based on color
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to animate button press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("✅ Success!");

        // Check if the user has finished the entire sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence(); // Call next sequence after 1 second
            }, 1000);
        }
    } else {
        console.log("❌ Wrong!");

        // Update title to indicate game over
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Flash background color to indicate game over
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        // Play wrong answer sound
        playSound("wrong");

        // Reset the game
        startOver();
    }
}

// jQuery click event to detect button clicks
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id"); // Get clicked button ID
    userClickedPattern.push(userChosenColour); // Store user input

    playSound(userChosenColour); // Play sound
    animatePress(userChosenColour); // Animate button press
    console.log("User Clicked Pattern:", userClickedPattern);

    // Check the last clicked answer
    checkAnswer(userClickedPattern.length - 1);
});

// Function to reset the game
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
