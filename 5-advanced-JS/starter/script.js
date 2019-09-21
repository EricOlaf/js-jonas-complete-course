// let answer = prompt("What is the correct answer?(please only type the number)")

// console.log(answer)

//make a function constructor that makes questions.
//Each question object should hold:
//the question
//the answers in an array
//the right answer

promptQuestions()

function promptQuestions(){
    var Question = function(question, ansArr, rightAnswer){
        this.question = question;
        this.ansArr = ansArr;
        this.rightAnswer = rightAnswer;
        function findAnswer(){
            
        }
    }

    let q1 = new Question("Name the best NBA team...", ["1-Jazz", "2-Lakers", "3-Bulls", "4-Celtics"], "1")
    let q2 = new Question("Name the best MLS team...", ["1-Sounders", "2-Galaxy", "3-Real SL", "4-Dallas FC"], "3")
    let q3 = new Question("Which should I eat...", ["1-Steak", "2-Sweet Potatos", "3-Ribs", "4-Steamed Veggies", "5-All of the previous foods :P"], "5")

    let questionsArray = [q1, q2, q3]

    let instanceQuestion =  questionsArray[Math.floor(Math.random() *3)]

    instanceQuestion.ansArr.forEach((e)=>{
        console.log(e)
    })

    let answer = prompt(`What is the correct answer?(please only type the number) ${instanceQuestion.question}?`)

    console.log(`the input answer = ${answer}`)
    console.log(`the question answer = ${instanceQuestion.rightAnswer}`)

    if(answer === instanceQuestion.rightAnswer){
        console.log("You nailed it!")
    }else{
        console.log(":( Better luck next time.")
    }
}


