//BUDGET CONTROLLER
var budgetController = (function(){
 
    //Function constructors that will help to setup the list of obj that will go into inc and exp.
    var Expense = function(value, description, id){
        this.value = value,
        this.description = description,
        this.id = id,
        this.percentage = -1
    }

    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0){
            this.percentage = Math.round(this.value / totalIncome *100)
        }else{
            this.percentage = -1;
        }
    }

    Expense.prototype.getPercentage = function(){
        return this.percentage;
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

            //return the new element
            return newItem;
        },

        deleteItem: function(type, id){
            
            var ids, index; 

            ids = data.allItems[type].map(function(e){
                return e.id
            });

            index = ids.indexOf(parseInt(id));

            if(index !== -1){
                data.allItems[type].splice(index, 1)
            }
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
            }else{
                data.percentage = -1;
            }
           
        },

        calculatePercentages: function(){
            data.allItems.exp.forEach(function(c){
                c.calcPercentage(data.totals.inc);
            })

        },

        getPercentages: function(){
            var allPercentages = data.allItems.exp.map(function(c){
                return c.getPercentage();
            })
            return allPercentages;
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
        container: '.container',
        expensesPercentagelabel: '.item__percentage',
        dateLabel: '.budget__title--month'

    };

    var formatNumber = function(num, type){
        var int, dec, numSplit;
        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split(".")

        int = numSplit[0]
        if(int.length > 6){
            int = int.substring(0, int.length-6) + ',' + int.substring(int.length-6, int.length-3) + ',' + int.substring(int.length-3)
        }else if(int.length > 3){
            int = int.substring(0, int.length-3) + ',' + int.substring(int.length-3)
        }
        dec = numSplit[1]

        return (type === 'inc' ? "+" : "-") + " " + int + "." + dec;
    }


    var nodeListForEach = function(list, cb){
        for(var i = 0; i < list.length; i++){
            cb(list[i], i)
        }
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
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)

        },

        deleteListItem: function(selectorID){
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
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
            var type 
            obj.budget > 0 ? type = 'inc' : type = 'exp'; 
            
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + "%";
            }else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '---'
            }
        },

        displayPercentages: function(percentages){
            var fields;
            fields = document.querySelectorAll(DOMstrings.expensesPercentagelabel)

            nodeListForEach(fields, function(cur, ind){
                if(percentages[ind] > 0){
                    cur.textContent = percentages[ind] + "%";
                }else{
                    cur.textContent = '--'
                }
            })
        },

        displayMonth: function(){
            var now, year, month, months;
            months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            
            now = new Date()
            year = now.getFullYear();
            month = now.getMonth();
            console.log(year, month)

            document.querySelector(DOMstrings.dateLabel).textContent= (months[month] + ", " + year);
        },

        changeType: function(){
            var fields = document.querySelectorAll(
                DOMstrings.inputType + "," +
                DOMstrings.inputDescription + "," +
                DOMstrings.inputValue
            )

            nodeListForEach(fields, function(cur){
                cur.classList.toggle('red-focus');
            })

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red')
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

        document.querySelector(DOMstrings.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOMstrings.inputType).addEventListener('change', uiCTRL.changeType)
    }

    var updateBudget = function(){

        //4. calculate budget
        budgetCTRL.calculateBudget()
        //5. return the budget
        var budget = budgetCTRL.getBudget();

        //6. Display the budget
        uiCTRL.displayBudget(budget);
    }

    var updatePercentages = function(){
        //1. calc percentages
        budgetCTRL.calculatePercentages()

        //2. read percentages from the budget controller
        var percentages = budgetCTRL.getPercentages();

        //3. update the ui with new percentages
        uiCTRL.displayPercentages(percentages);
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
            updatePercentages();
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
            budgetCTRL.deleteItem(type, ID)
            
            //2. delete item from the ui
            uiCTRL.deleteListItem(itemID)

            //3. update and display the new ui
            updateBudget();
            updatePercentages();
        }
    }

    return{
        init: function(){
            console.log("app has started")
            setupEventListeners();
            uiCTRL.displayMonth();
            uiCTRL.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
        }
    }

})(budgetController, UIcontroller)

controller.init();