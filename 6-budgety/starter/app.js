//BUDGET CONTROLLER
var budgetController = (function(){
 
    //Function constructors that will help to setup the list of obj that will go into inc and exp.
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

    var calculateTotal = function(type){
        var sum;
        sum = 0;
        data.allItems[type].forEach(function(e){
            sum += e.value;
        })
        data.totals[type] = sum;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
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

        calculateBudget: function(){
            //calc total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //calc the budget income - exp
            data.budget = data.totals.inc - data.totals.exp;

            //calc the percentage of income that we spent.
            if(data.totals.inc && data.totals.exp){
                data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
            }
           
        },

        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
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
        inputBtn: ".add__btn",
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list",
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'

    }

    return{
        getInput: function(){

            return {
                type : document.querySelector(DOMstrings.inputType).value,
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
            
        },
        addListItem: function(obj, type){
            var html, newHtml

            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            }else if(type === 'exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div><div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)

        },

        clearFields: function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(e => {
                e.value = "";
            });
            fieldsArr[0].focus();
        },

        displayBudget: function(obj){
            console.log(obj);
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + "%";
            }else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '---'
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

        document.querySelector(DOMstrings.container).addEventListener('click', ctrlDeleteItem)
    }

    var updateBudget = function(){

        //4. calculate budget
        budgetCTRL.calculateBudget()
        //5. return the budget
        var budget = budgetCTRL.getBudget();

        //6. Display the budget
        uiCTRL.displayBudget(budget);
    }

    var ctrlAddItem = function(){
        var input, newItem;
        
        //1. get field input data
        input = uiCTRL.getInput()
        if (input.description && !isNaN(input.value) && input.value > 0){

            //2. Add item to budget controller
            newItem  = budgetCTRL.addItem(input.type, input.description, input.value)

            //3. Add item to UI

            uiCTRL.addListItem(newItem, input.type)
            uiCTRL.clearFields();

            updateBudget();
        }
    }

    var ctrlDeleteItem = function(event){
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
            splitID = itemID.split("-");
            type = splitID[0];
            ID = splitID[1];

            //1. delete item from the data structure

            //2. delete item from the ui

            //3. update and display the new ui
        }
    }

    return{
        init: function(){
            console.log("app has started")
            setupEventListeners();
            uiCTRL.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            })
        }
    }

})(budgetController, UIcontroller)

controller.init();