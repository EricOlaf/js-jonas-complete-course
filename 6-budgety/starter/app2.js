//Remake of app.js on my own to test my skills.

budgetModule = (function(){
    var Expense = function(desc, value, id){
        this.desc = desc,
        this.value = value,
        this.id = id
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
        }
    }

    function calcData(type){
        var sum = 0
        data.lists[type].forEach(function(e){
            sum += e.value
        })
        data.totals[type]=sum;
        data.total = data.totals.inc - data.totals.exp;
        
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
            return data
        },
       
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
        expensesList: 'expenses__list'
    }
    function displayTotal(total){
        document.querySelector(DOMstrings.budgetTotal).innerHTML = total; 
    }
    function displayIncExpTotals(inc, exp){
        document.querySelector(DOMstrings.incTotal).innerHTML = inc;
        document.querySelector(DOMstrings.expTotal).innerHTML = exp;
    }
    function displayLists(inc, exp){
        var html, container

        function displayEachList(type, html, obj, container){
            var newHtml
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.desc);
            newHtml = newHtml.replace('%value%', obj.value);
            document.querySelector(container).insertAdjacentHTML('beforeend', newHtml);
        }
        inc.forEach(e=>{
            container = DOMstrings.incomeList
            html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            displayEachList('inc', html, e, container)
        })
        exp.forEach(e=>{
            container = DOMstrings.expensesList
            html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div><div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            displayEachList('exp', html, e, container)
        })
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
        displayData:function(data){
            displayTotal(data.total);
            displayIncExpTotals(data.totals.inc, data.totals.exp);
            displayLists(data.lists.inc, data.lists.exp);
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
        document.querySelector(DOMstrings.addBtn).addEventListener('click', addInputItems)
    }

    function addInputItems(){
        var data 
        //get and store the input values then send them to the budget module to perform calculations, then be able to update the ui with the new values.
        var input = uiMod.inputValues()
        if(input.inDesc && input.inValue){
            //sends the input to the budget
            data = bdMod.addInputtoBudget(input)
        }
        uiMod.displayData(data)
    }

    return{
       init:function(){
        setupListeners()
       }
    }
})(budgetModule, uiModule)

controllerModule.init()