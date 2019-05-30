// WATCHED THE FOLLOWING VIDEO AS A RESOURCE TO CREATING MY GAME - USED IT TO SET MY MAIN PSEUDOCODE SECTIONS, ALL CODE IS MY OWN
// https://www.youtube.com/watch?v=KndV7UxLpnk&list=PLf1tvjFO2P7vIxVV5fZh7by2Vpm-vBhWN&index=9&t=6s

// LETS SEE IF WE CAN LOAD SOME MUSIC WHEN THE PAGE OPENS 
// $(document).ready (async function(){
//     try {
//         await $("#theme")[0].play();
//     } catch (err){
//         alert (err); 
//     }
// })

// ON CLICK EVENT FOR START BUTTON TO LOAD A QUESTION AND HIDE THE START BUTTON 
$(".btn-dark").on("click", function() {
    // remove button from view 
    $(".btn-dark").remove();
    // play theme song
    $("#theme")[0].play(); 
    // display some text while the "game loads"
    $(".ready").html("<h1> Get Ready!!</h1>")
    // log to console
    console.log("user clicked start");
    // set timeout for theme music so it doesn't play the whole time
    setTimeout(function(){
        trivia.getQuestion()
        $("#theme")[0].pause(); 
    }, 4500);

})

// ON CLICK FOR RESET BUTTON - RESETS GAME
$(".btn-secondary").on("click", function() {
    console.log("user clicked Restart");
    $(".final-page").hide();
    trivia.questionNumber = 0; 
    trivia.correctGuesses = 0; 
    trivia.incorrectGuesses = 0; 
    trivia.timeOuts = 0;  
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

// GAME VARIABLES AND METHODS
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
    // // correct audio
    // yay:  
    
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
        // clear and hide a bunch of things when the question loads
        $(".question-display").empty(); 
        $(".areYouRight").empty();
        $(".ready").empty();  
        $(".image-correct").hide ();
        $(".image-incorrect").hide ();
        $(".image-timeout").hide();  
        // start the countdown
        this.run ();
        // display the question on the screen 
        $(".countdown").html(this.counter + " seconds left to answer"); 
        // display question 
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
        };
    }, 

    // CHECK IF THE ANSWER IS CORRECT, WRONG, OR IF THE QUESTION TIMED OUT (UNDEFINED) 
    checkAnswer: function (selectedAnswer) {
        //determine if the answer is correct 
        console.log(this.questions[this.questionNumber]); 
        // if the answer is undefined (timeout) 
        if (selectedAnswer === undefined) {
            // show the timeout message and image and play sound  
            $(".areYouRight").html("You ran out of time. The correct answer was " + this.questions[this.questionNumber].answer); 
            $(".image-timeout").show ();
            $("#timeout")[0].play(); 
            // next question 
            this.questionNumber++; 
            // add to timeout var
            this.timeOuts++; 
        }
        // if the answer matches the correct one
        else if (selectedAnswer === this.questions[this.questionNumber].answer) {
            console.log("win");  
            // increment the number correct 
            this.correctGuesses++; 
            console.log (this.correctGuesses);
            // display win message and image and play sound
            $(".areYouRight").html("You're right! The correct answer was " + this.questions[this.questionNumber].answer); 
            $(".image-correct").show (); 
            $("#win")[0].play(); 
            // next question 
            this.questionNumber++; 
        }    
        else {
            console.log("lose"); 
            // increment incorrect guess 
            this.incorrectGuesses++; 
            console.log (this.incorrectGuesses);
            // display lose message and image and play sound
            $(".areYouRight").html("You're wrong! The correct answer was " + this.questions[this.questionNumber].answer);
            $(".image-incorrect").show();
            $("#lose")[0].play(); 
            // next question   
            this.questionNumber++; 
        }  

        this.answerPage();
            // this.answerPage(); 
    }, 

    //DISPLAY ANSWER PAGE 
    answerPage: function () {
        // clear question-display div, button displat, and countdown divs
        $(".question-display").empty();  
        $("#button-display").empty(); 
        $(".countdown").empty(); 
        // clear countdown
        clearInterval(trivia.counterTimer);
        // check for last question
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

    // DISPLAY STATS PAGE WITH FINAL COUNTS AND A RESTART
    finalPage: function () {
        // empty and hide divs
        $(".question-display").empty();  
        $("#button-display").empty(); 
        $(".areYouRight").empty(); 
        $(".image-correct").hide ();
        $(".image-incorrect").hide ();
        $(".final-page").show (); 
        // display messages for correct, incorrect and time out 
        $("#message").html("<h2>You're done! Here are your results:</h2>");
        $("#correct").html("Correct Guesses: " + this.correctGuesses);  
        $("#incorrect").html("Incorrect Guesses: " + this.incorrectGuesses); 
        $("#time-out").html("Time Outs: " + this.timeOuts);
    }

}; 