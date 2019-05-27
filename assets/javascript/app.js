// WATCHED THE FOLLOWING VIDEO AS A RESOURCE TO CREATING MY GAME - USED IT TO SET MY MAIN PSEUDOCODE SECTIONS, ALL CODE IS MY OWN
// https://www.youtube.com/watch?v=KndV7UxLpnk&list=PLf1tvjFO2P7vIxVV5fZh7by2Vpm-vBhWN&index=9&t=6s


// ON CLICK EVENT FOR START BUTTON TO GO AWAY 
$(".btn-dark").on("click", function() {
    // remove button from view 
    $(".btn-dark").remove(); 
    // log to console
    console.log("user clicked start"); 
    trivia.getQuestion(); 

})

// ON CLICK FOR RESET BUTTON 
$(".btn-secondary").on("click", function() {
    console.log("user clicked Restart");
    // $(".image-correct").hide ();
    // $(".image-incorrect").hide ();
    $(".final-page").hide();
//     correctGuesses = 0; 
//     incorrectGuesses = 0; 
//     timeOuts = 0;  
    trivia.getQuestion(); 
})




// ON CLICK FOR ANSWER BUTTONS
$("#button-display").on("click", ".answerButton", function (e) {
    // answerButton.clicked(e); 
    var selectedAnswer = $(e.target).attr("data-name"); 
    console.log(e); 
    console.log(e.target); 
    console.log(e.target.data);
    console.log($(e.target).attr("data-name")); 
    trivia.checkAnswer(selectedAnswer); 
    // trivia.answerIncorrect(selectedAnswer); 
})


// GAME VARIABLE WITH METHODS
// declare Game variable as an object with the following properties: 
var trivia = {
    // current question
    currentQuestion: "", 
    // correct answers 
    correctGuesses: 0, 
    // incorrect answers 
    incorrectGuesses: 0, 
    // timeouts 
    timeOuts: 0, 
    // counter
    counter: 3, 
    counterTimer: null, 
    // question number 
    questionNumber: 0, 
    
    // QUESTIONS OBJECT WHICH INCLUDES AN ARRAY OF 
    questions: [
        {
            // question text
            questionText: "According to Chandler, what scares the bejeezus out of him?", 
            // question answers array
            questionAnswer: ["Clowns", "Another Scary thing", "one more", "Michael Flatley, Lord of the Dance"], 
            // correct answer 
            answer: "Michael Flatley, Lord of the Dance" 
        }, 
        {
            questionText: "Monica and Ross had a grandmother who died. Chandler and Joey went to her funeral. Name that grandmother.", 
            questionAnswer: ["Althea", "Dorothy", "Agnes", "Doris"], 
            answer: "Althea"
        }, 
        {
            questionText: "What is Monica's biggest pet peeve?", 
            questionAnswer: ["Animals dressed as humans", "Dirty towels on the floor", "Leaving the fridge open", "A dirty apartment"], 
            answer: "Animals dressed as humans", 
        },
        {
            questionText: "What was Monica's nickname when she was a field hockey goalie?", 
            questionAnswer: ["Goalie Mon", "Big Fat Goalie", "The Goalster", "Goal Girl"], 
            answer: "Big Fat Goalie", 
        }, 
        {
            questionText: "Every week, the TV Guide comes to Chandler and Joey's apartment. What name appears on the address label?", 
            questionAnswer: ["Chandler Bing", "Chanandeler Bong", "Joey Tribbiani", "Miss Chanandeler Bong"], 
            answer: "Miss Chanandeler Bong", 
        }, 
        {
            questionText: "In what part of her body did Monica get a pencil stuck at age 14?", 
            questionAnswer: ["Her eye", "Her belly button", "Her ear", "Her mouth"], 
            answer: "Her ear", 
        }, 
        {
            questionText: "What is Joey's favorite food?", 
            questionAnswer: ["Trifle", "Spaghetti", "French Fries", "Sandwiches"], 
            answer: "Sandwiches", 
        }, 
        {
            questionText: "Joey had an imaginary childhood friend. What was his name?", 
            questionAnswer: ["Maurice", "Timmy", "Mike", "Fred"], 
            answer: "Maurice", 
        }, 
        {
            questionText: "Maurice's occupation was __________", 
            questionAnswer: ["Cowboy", "Plumber", "Doctor", "Space Cowboy"], 
            answer: "Space Cowboy", 
        }, 
        {
            questionText: "Monica categorizes her towels. How many categories are there?", 
            questionAnswer: ["10", "13", "5", "11"], 
            answer: "11", 
        }, 
    ], 

    //METHODS 
    // COUNTER 

    // countdown: function () {
    //     // clear any previous intervals
    //     clearInterval(interval);
    //     // count down in seconds 
    //     interval = setInterval (decrement, 1000); 
    //     counter--; 
    //     // display countdown on screen 
    //     $(".countdown").html(counter + "seconds left"); 
    //     // log timeout when counter hits zero 
    //     if (counter === 0) {
    //         console.log("timeout"); 
    //     }
    // }, 

    // COUNTDOWN 
    // clear any previous intervals
    run: function () {
        clearInterval(this.counterTimer); 
        this.counterTimer = setInterval(this.decrement, 1000); 
        trivia.counter = 10; 
    }, 
    
    decrement: function () {
        trivia.counter--; 
        $(".countdown").html(trivia.counter + " seconds left to answer");
        if (trivia.counter === 0) {
            clearInterval(trivia.counterTimer);
            trivia.checkAnswer(); 
        }
        
    }, 

    // GET QUESTION METHOD
    getQuestion: function () {
        // clear the question display html
        $(".question-display").empty(); 
        $(".areYouRight").empty(); 
        $(".image-correct").hide ();
        $(".image-incorrect").hide ();
        // start the countdown
        this.run ();
        // display the question on the screen 
        $(".countdown").html(this.counter + " seconds left to answer"); 
        $(".question-display").html("<p>" + this.questions[this.questionNumber].questionText + "</p>"); 
        this.buttonGenerator();         
    }, 

    //BUTTON GENERATOR METHOD 
    buttonGenerator: function () {
    //empty buttons 
        $("#button-display").empty(); 
        // for loop to display answer buttons on the screen 
        for (var i = 0; i < this.questions[this.questionNumber].questionAnswer.length; i++) {
            var a = $("<button>"); 
            a.addClass("answerButton"); 
            a.attr("data-name", this.questions[this.questionNumber].questionAnswer[i]); 
            a.text(this.questions[this.questionNumber].questionAnswer[i]); 
            $("#button-display").append(a); 
            // console.log(a);    
        };
    }, 

    // CORRECT ANSWER 
    checkAnswer: function (selectedAnswer) {
        //determine if the answer is correct 
        console.log(this.questions[this.questionNumber]); 
        if (selectedAnswer === undefined) { 
            $(".areYouRight").html("You ran out of time. The correct answer was " + this.questions[this.questionNumber].answer); 
            this.questionNumber++; 
            this. timeOuts++; 
        }
        else if (selectedAnswer === this.questions[this.questionNumber].answer) {
            console.log("win");  
            this.correctGuesses++; 
            console.log (this.correctGuesses);
            $(".areYouRight").html("You're right! The correct answer was " + this.questions[this.questionNumber].answer); 
            $(".image-correct").show (); 
            this.questionNumber++; 
        }    
        else {
            console.log("lose"); 
            this.incorrectGuesses++; 
            console.log (this.incorrectGuesses);
            $(".areYouRight").html("You're wrong! The correct answer was " + this.questions[this.questionNumber].answer);
            $(".image-incorrect").show();  
            this.questionNumber++; 
        }  

        this.answerPage();
            // this.answerPage(); 
    }, 


    answerPage: function () {
        $(".question-display").empty();  
        $("#button-display").empty(); 
        $(".countdown").empty(); 
        clearInterval(trivia.counterTimer);
        // $("#message").html("You're right! The correct answer was " + this.questions[this.questionNumber].answer); 
        // setTimeout(("You're right! The correct answer was " + this.questions[this.questionNumber].answer), 3000); 
        // this.getQuestion(); 
        setTimeout (function (){
            if (trivia.questionNumber < trivia.questions.length){
                trivia.getQuestion(); 
            }

            else {
                trivia.finalPage(); 
            }
        }, 3000
        )
        
    }, 

    finalPage: function () {
        $(".question-display").empty();  
        $("#button-display").empty(); 
        $(".areYouRight").empty(); 
        $(".image-correct").hide ();
        $(".image-incorrect").hide ();
        $(".final-page").show (); 
        $("#message").html("<h2>You're done! Here are your results:</h2>");
        $("#correct").html("Correct Guesses: " + this.correctGuesses);  
        $("#incorrect").html("Incorrect Guesses: " + this.incorrectGuesses); 
        $("#timeout").html("Time Outs: " + this.timeOuts);
    }
    
    
    

    




    //ANSWER SCREEN
        // displays a screen saying you were correct/incorrect and <xx> was right
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
}; 