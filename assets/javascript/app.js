// WATCHED THE FOLLOWING VIDEO AS A RESOURCE TO CREATING MY GAME - USED IT TO SET MY MAIN PSEUDOCODE SECTIONS, ALL CODE IS MY OWN
// https://www.youtube.com/watch?v=KndV7UxLpnk&list=PLf1tvjFO2P7vIxVV5fZh7by2Vpm-vBhWN&index=9&t=6s


// ON CLICK EVENT FOR START BUTTON TO GO AWAY 
$(".btn-primary").on("click", function() {
    // remove button from view 
    $(".btn-primary").remove(); 
    // call get question? 

})

// ON CLICK FOR RESET BUTTON 

// ON CLICK FOR ANSWER BUTTONS


// GAME VARIABLE WITH METHODS
// declare Game variable as an object with the following properties: 
var trivia = [
    // questions
    questions = "",  
    // current question
    currentQuestion = "", 
    // correct answers 
    correctGuesses = 0, 
    // incorrect answers 
    incorrectGuesses = 0, 
    // timeouts 
    timeOuts = 0, 
    // QUESTIONS OBJECT WHICH INCLUDES AN ARRAY OF 
    questions = [{
        // question text
        questionText = "According to Chandler, what scares the bejeezus out of him?", 
        questionAnswer = ["Clowns", "Another Scary thing", "one more", "Michael Flatley, Lord of the Dance"], 
        answer = "Michael Flatley, Lord of the Dance", 
    }, 
    {
        questionText = "Monica and Ross had a grandmother who died. Chandler and Joey went to her funeral. Name that grandmother.", 
        questionAnswer = ["Althea", "Dorothy", "Agnes", "Doris"], 
        answer = "Althea", 
    }, 
    ],
]
    //METHODS 
    // COUNTER
        // set the counter 

    // GET QUESTION 
        // set the counter 
        // display counter on screen 
        // display the question on the screen 
        // display answer buttons on the screen 
            // if correct answer call correct method
            // else incorrect call incorrect method 
            // else timeout call timeout method 
        // is last question? 
            // yes, call results 
            // no, call next question 

    // NEXT QUESTION 
        // reset the counter 
        // display counter on screen 
        // display the question on the screen 
        // display answer buttons on the screen 
            // if correct answer call correct method
            // else incorrect call incorrect method 
            // else timeout call timeout method 
        // is last question? 
            // yes, call results 
            // no, call next question 

    // CORRECT ANSWER 
        //increments answer var by 1
        // displays a screen saying you were correct and <xx> was right
        // screen times out in 3 second 
        // checks if that was the last question 
            // if last: call results method 
            // else: call next question 

    // INCORRECT ANSWER 
        //increments incorrect answer var by 1
        // displays a screen saying you were correct and <xx> was right
        // screen times out in 3 second 
        // checks if that was the last question 
            // if last: call results method 
            // else: call next question 

    // TIMED OUT 
        // increments timeout var by 1 
        // displays a screen telling you time is up 
        // screen times out in 3 second 
        // checks if that was the last question 
            // if last: call results method 
            // else: call next question 


    // SHOW RESULTS 
        // display the results screen with 
            // correct 
            // incorrect 
            // timed out
            // reset button that calls reset method

    // RESET GAME 
        // reset all variables (tbd) 
        // call get question method 