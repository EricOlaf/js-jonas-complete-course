//BUDGET CONTROLLER
var budgetController = (function(){
 
    var Expense = function(value, description, id){
        this.value = value,
        this.description = description,
        this.id = id
    }

    var Income = function(value, description, id){
        this.value = value,
        this.description = description,
        this.id = id
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return{
        addItem : function(type, des, val){
            var newItem, ID;

            //create new ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else{
                ID = 0;
            }

            //create new item based on type.
            if(type === 'exp'){
                newItem = new Expense(val, des, ID)
            }else{
                newItem = new Income(val, des, ID)
            }
            
            //push newItem into the allItems and right array.
            data.allItems[type].push(newItem)

            console.log(data)

            //return the new element
            return newItem;
        },

        testing: function(){
            console.log(data)
        }
    }

})();

//UI CONTROLLER
var UIcontroller = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: ".add__value",
        inputBtn: ".add__btn"
    }

    return{
        getInput: function(){

            return {
                type : document.querySelector(DOMstrings.inputType).value,
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : document.querySelector(DOMstrings.inputValue).value
            }
            
        },

        getDOMstrings: function(){
           return DOMstrings;
        }
    }

})();

//TOP LEVEL CONTROLLER
//Used to access the other controllers and connect them.
var controller = (function(budgetCTRL, uiCTRL){

    var setupEventListeners = function(){
        var DOMstrings = uiCTRL.getDOMstrings()
        document.querySelector(DOMstrings.inputBtn).addEventListener('click', ctrlAddItem)

        document.addEventListener('keypress', function(event){
           if(event.keyCode === 13 || event.which === 13){
             ctrlAddItem();
             }
        })
    }


    
    
    var ctrlAddItem = function(){
        var input, newItem;
        
        //1. get field input data
        input = uiCTRL.getInput()
        console.log(input)

        //2. Add item to budget controller
        newItem  = budgetCTRL.addItem(input.type, input.description, input.value)

        //3. Add item to UI

        //4. calculate budget

        //5. Display the budget
    }

    return{
        init: function(){
            console.log("app has started")
            setupEventListeners();
        }
    }

})(budgetController, UIcontroller)

controller.init();