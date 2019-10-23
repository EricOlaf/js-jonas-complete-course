//BUDGET CONTROLLER
var budgetController = (function(){
 
})();

//UI CONTROLLER
var UIcontroller = (function(){

    return{
        getInput: function(){
            var type = document.querySelector(".add__type").value
        }
    }

})();

//TOP LEVEL CONTROLLER
//Used to access the other controllers and connect them.
var controller = (function(budgetCTRL, uiCTRL){

    var ctrlAddItem = function(){
        console.log('works')
        //1. get field input data

        //2. Add item to budget controller

        //3. Add item to UI

        //4. calculate budget

        //5. Display the budget
    }

    document.querySelector(".add__btn").addEventListener('click', ctrlAddItem)

    document.addEventListener('keypress', function(event){
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    })

})(budgetController, UIcontroller)