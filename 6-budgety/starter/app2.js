//Remake of app.js on my own to test my skills.

budgetModule = (function(){
    var Expense = function(desc, value, id){
        this.desc = desc,
        this.value = value,
        this.id = id
    }
    Expense.prototype.calcPercentage = function(){
        if(data.totals.inc > 0){
            this.percentage = Math.round((this.value/data.totals.inc)*100);
        }else{
            this.percentage = 0;
        }
    }
    var Income = function(desc, value, id){
        this.desc = desc,
        this.value = value,
        this.id = id
    }
    var data = {
        total:0,
        totals:{
            inc:0,
            exp:0
        },
        lists:{
            inc: [],
            exp: []
        },
        expPercent:0
    }

    function calcData(type){
        var sum = 0
        data.lists[type].forEach(function(e){
            sum += e.value
        })
        data.totals[type]=sum;
        data.total = data.totals.inc - data.totals.exp;
        if(data.totals.inc > 0 && data.totals.exp > 0){
            data.expPercent = Math.round((data.totals.exp / data.totals.inc) *100);
        }
    }
    return{
        addInputtoBudget: function(input){
            var id, type = input.inType, desc = input.inDesc, val = input.inValue, newItem
            //setup the id
            data.lists[type].length === 0 ? id = 0 : id = data.lists[type][data.lists[type].length-1].id + 1;
            //make a new object using the expense or income constructor functions
            if(type === 'exp'){
                newItem = new Expense(desc, val, id)
            }else{
                newItem = new Income(desc, val, id)
            }
            data.lists[type].push(newItem)
            calcData(type)
            return [data, newItem, type]
        },
        calcExpPercentage: function(){
           expPercentages = data.lists.exp.map(e=> {
               e.calcPercentage();
               return e.percentage;
           })
           return expPercentages
        }
       
    }
})()

uiModule = (function(){
    const DOMstrings = {
        //setup DOM strings
        addType: '.add__type',
        addDesc: '.add__description',
        addValue: '.add__value',
        addBtn: '.add__btn',
        budgetTotal: '.budget__value',
        incTotal: '.budget__income--value',
        expTotal: '.budget__expenses--value',
        incomeList: '.income__list',
        expensesList: '.expenses__list',
        expTotalPercent: '.budget__expenses--percentage',
        expensesPercentagelabel: '.item__percentage',
        container: '.container'
    }
    function nodeListLoop(fields, cb){
        for(let i = 0; i < fields.length; i++){
            cb(fields[i], i)
        }
    }
    function displayTotal(total){
        document.querySelector(DOMstrings.budgetTotal).innerHTML = total; 
    }
    function displayIncExpTotals(inc, exp, expPercent){
        document.querySelector(DOMstrings.incTotal).innerHTML = inc;
        document.querySelector(DOMstrings.expTotal).innerHTML = exp;
        document.querySelector(DOMstrings.expTotalPercent).innerHTML = expPercent + '%';
    }
    function resetInputs(){
        document.querySelector(DOMstrings.addDesc).value = "";
        document.querySelector(DOMstrings.addValue).value = "";

    }
    function displayLists(newItem, type){
        var html, container
        
        function displayEachList(html, obj, container){
            var newHtml
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.desc);
            newHtml = newHtml.replace('%value%', obj.value);
            document.querySelector(container).insertAdjacentHTML('beforeend', newHtml);
        }
        if(type === 'inc'){
            container = DOMstrings.incomeList
            html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            displayEachList(html, newItem, container)
        }else{
            container = DOMstrings.expensesList
            html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div><div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            displayEachList(html, newItem, container)
        }
        resetInputs()
    }


    return{
        inputValues:function() {
            //return the values from the DOM inputs.
            return{
                inType: document.querySelector(DOMstrings.addType).value,
                inDesc: document.querySelector(DOMstrings.addDesc).value,
                inValue: parseFloat(document.querySelector(DOMstrings.addValue).value)
            }
        },
        showPercentages: function(percentages){
            var fields = document.querySelectorAll(DOMstrings.expensesPercentagelabel)
            nodeListLoop(fields, function(cur, ind){
                if(percentages[ind]>0){
                    cur.textContent = percentages[ind] + '%'
                }else{
                    cur.textContent = '--'
                }
            })
        },
        displayData:function(dataArr){
            //[data, newItem, type]
            displayTotal(dataArr[0].total);
            displayIncExpTotals(dataArr[0].totals.inc, dataArr[0].totals.exp, dataArr[0].expPercent);
            displayLists(dataArr[1], dataArr[2]);
        },
        getDomStr: function(){
            return DOMstrings
        },
    }
})()

controllerModule = (function(bdMod, uiMod){
   
    function setupListeners (){
         //Setup the click listener on the button
        const DOMstrings = uiMod.getDomStr();

        //Listeners
        document.querySelector(DOMstrings.addBtn).addEventListener('click', addInputItems)
        document.querySelector(DOMstrings.container).addEventListener('click', deleteItem)

        //Reset all HTML components to empty values.
        document.querySelector(DOMstrings.budgetTotal).innerHTML = 0;
        document.querySelector(DOMstrings.incTotal).innerHTML = 0;
        document.querySelector(DOMstrings.expTotal).innerHTML = 0;
        document.querySelector(DOMstrings.expTotalPercent).innerHTML = "--";

    }

    function deleteItem(event){
        var itemID
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        console.log(itemID)
    }

    function addInputItems(){
        var data, percentages 
        //get and store the input values then send them to the budget module to perform calculations, then be able to update the ui with the new values.
        var input = uiMod.inputValues()
        if(input.inDesc && input.inValue){
            //sends the input to the budget
            data = bdMod.addInputtoBudget(input)
        }
        percentages = bdMod.calcExpPercentage();
        uiMod.displayData(data);
        uiMod.showPercentages(percentages);
    }

    return{
       init:function(){
        setupListeners()
       }
    }
})(budgetModule, uiModule)

controllerModule.init()

//Left to do:
//delete items
//format numbers
//toggle red class on inputs