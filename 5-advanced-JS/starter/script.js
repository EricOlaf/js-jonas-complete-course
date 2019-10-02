
//We can call the function before it is written in code because function declarations are hoisted and even point to the code so that we can use it.
//promptQuestions()


// //Putting everything inside of a function allows us so make all or our variables private so that they don't interfere with others code.
// function promptQuestions(){

//     //function constructor to easily make questions
//     var Question = function(question, ansArr, rightAnswer){
//         this.question = question;
//         this.ansArr = ansArr;
//         this.rightAnswer = rightAnswer;
//     }

//     Question.prototype.findAnswer = function(){
//         //NOTE when comparing the two answers I found that the answer put into the prompt was always a string even if the only input was a nuber ie 1; so I made all of the answers in each Question instance into strings so that we could use the strict equals operator.
//         if(answer === this.rightAnswer){
//             console.log("You nailed it!")
//         }else{
//             console.log(":( Better luck next time :(")
//         }
//     }

//     //initializing and defing each question by using the constructor function
//     let q1 = new Question("Name the best NBA team...", ["1-Jazz", "2-Lakers", "3-Bulls", "4-Celtics"], "1")
//     let q2 = new Question("Name the best MLS team...", ["1-Sounders", "2-Galaxy", "3-Real SL", "4-Dallas FC"], "3")
//     let q3 = new Question("Which should I eat...", ["1-Steak", "2-Sweet Potatos", "3-Ribs", "4-Steamed Veggies", "5-All of the previous foods :P"], "5")

//     //making the questions into an array so that we can randomly pick one
//     let questionsArray = [q1, q2, q3]

//     //randomly choosing a question
//     let instanceQuestion =  questionsArray[Math.floor(Math.random() *3)]

//     //looping over the answers in the instanceQuestion and console logging each answer on a seperate line
//     instanceQuestion.ansArr.forEach((e)=>{
//         console.log(e)
//     })

//     //displaying the prompt question
//     let answer = prompt(`What is the correct answer?(please only type the number) ${instanceQuestion.question}?`)

//     //logging the answer and instance answer to make sure they are the same
//     // console.log(`the input answer = ${answer}`)
//     // console.log(`the question answer = ${instanceQuestion.rightAnswer}`)


//     //Logging whether the answer was correct or not
//     instanceQuestion.findAnswer()
    
// }

//On this version I made it so that the questions would keep coming wo having to refresh the page. I made a case though where if you didn't want to get another question then you could type 'exit'. Last there was a running score so that you could see how many points you have.

// promptQuestionsExpert()

// function promptQuestionsExpert(){

//     let rightScore = 0;
//     let wrongScore = 0;

//     //function constructor to easily make questions
//     var Question = function(question, ansArr, rightAnswer){
//         this.question = question;
//         this.ansArr = ansArr;
//         this.rightAnswer = rightAnswer;
//     }

//     Question.prototype.findAnswer = function(answer){
//         //NOTE when comparing the two answers I found that the answer put into the prompt was always a string even if the only input was a nuber ie 1; so I made all of the answers in each Question instance into strings so that we could use the strict equals operator.
//         if(answer === this.rightAnswer){
//             rightScore++;
//             console.log("You nailed it!");
//             console.log(`Correct answers = ${rightScore}`);
//             console.log(`Wrong answers = ${wrongScore}`);
//             askQuestion();
            
//         }else if(answer === "exit"){
//             console.log('Exited');
//             console.log(`Final correct answers = ${rightScore}`);
//             console.log(`Final wrong answers = ${wrongScore}`);
//         }
//         else{
//             wrongScore++;
//             console.log(":( Better luck next time :(");
//             console.log(`Correct answers = ${rightScore}`);
//             console.log(`Wrong answers = ${wrongScore}`);
//             askQuestion();
//         }
//     }

//     //initializing and defing each question by using the constructor function
//     let q1 = new Question("Name the best NBA team...", ["1-Jazz", "2-Lakers", "3-Bulls", "4-Celtics"], "1")
//     let q2 = new Question("Name the best MLS team...", ["1-Sounders", "2-Galaxy", "3-Real SL", "4-Dallas FC"], "3")
//     let q3 = new Question("Which should I eat...", ["1-Steak", "2-Sweet Potatos", "3-Ribs", "4-Steamed Veggies", "5-All of the previous foods :P"], "5")

//     //making the questions into an array so that we can randomly pick one
//     let questionsArray = [q1, q2, q3]

//     askQuestion()

//     function askQuestion(){
//         //randomly choosing a question
//         let instanceQuestion =  questionsArray[Math.floor(Math.random() *3)]

//         //looping over the answers in the instanceQuestion and console logging each answer on a seperate line
//         instanceQuestion.ansArr.forEach((e)=>{
//             console.log(e)
//         })

//         //displaying the prompt question
//         let answer = prompt(`What is the correct answer?(please only type the number)\n${instanceQuestion.question}?\nTo leave type "exit"`)

//         //logging the answer and instance answer to make sure they are the same
//         // console.log(`the input answer = ${answer}`)
//         // console.log(`the question answer = ${instanceQuestion.rightAnswer}`)

//         //Logging whether the answer was correct or not
//         instanceQuestion.findAnswer(answer)
//     }
// }

