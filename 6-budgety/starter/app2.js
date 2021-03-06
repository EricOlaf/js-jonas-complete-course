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
        },
        deleteItem: function(type, id){
            data.lists[type] = data.lists[type].filter(e=> e.id !== id);
            calcData(type);
            return [data, id, type]
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
    function formatNums(num, type){
        var int, dec, numSplit;
        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.')
        int = numSplit[0]
        if(int.length > 6){
            int = int.substring(0, int.length-6)+','+int.substring(int.length-6, int.length-3)+ ',' + int.substring(int.length-3);
        }else if(int.length > 3){
            int = int.substring(0, int.length-3)+','+int.substring(int.length-3);
        }
        dec = numSplit[1];

        return(type === 'inc'? '+' : '-') + int + '.' + dec;
    }
    function nodeListLoop(fields, cb){
        for(let i = 0; i < fields.length; i++){
            cb(fields[i], i)
        }
    }
    function displayTotal(total){
        var sign
        total > 0 ? sign = 'inc' : sign = 'exp'
        document.querySelector(DOMstrings.budgetTotal).innerHTML = formatNums(total, sign); 
    }
    function displayIncExpTotals(inc, exp, expPercent){
        document.querySelector(DOMstrings.incTotal).innerHTML = formatNums(inc, "inc");
        document.querySelector(DOMstrings.expTotal).innerHTML = formatNums(exp, 'exp');
        document.querySelector(DOMstrings.expTotalPercent).innerHTML = expPercent + '%';
    }
    function resetInputs(){
        document.querySelector(DOMstrings.addDesc).value = "";
        document.querySelector(DOMstrings.addValue).value = "";

    }
    function displayLists(newItem, type){
        var html, container
        
        function displayEachList(html, obj, container, sign){
            var newHtml
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.desc);
            newHtml = newHtml.replace('%value%', formatNums(obj.value, sign));
            document.querySelector(container).insertAdjacentHTML('beforeend', newHtml);
        }
        if(type === 'inc'){
            container = DOMstrings.incomeList
            html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            displayEachList(html, newItem, container, "inc")
        }else{
            container = DOMstrings.expensesList
            html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div><div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            displayEachList(html, newItem, container, "exp")
        }
        resetInputs()
    }
    function delItem(type, id){
        const newID = type + "-" +id;
        console.log(newID)
        var el = document.getElementById(newID);
        el.parentNode.removeChild(el);
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
        uiDeleteItem: function(data){
            //[data, id, type]
            // var data = {
            //     total:0,
            //     totals:{
            //         inc:0,
            //         exp:0
            //     },
            //     lists:{
            //         inc: [],
            //         exp: []
            //     },
            //     expPercent:0
            // }
            displayTotal(data[0].total);
            displayIncExpTotals(data[0].totals.inc, data[0].totals.exp, data[0].expPercent);
            delItem(data[2], data[1]);
        }
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
        var itemID, splitIDArr, type, idNum, newTotals;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if(itemID){
            splitIDArr = itemID.split('-');
            type = splitIDArr[0];
            idNum = splitIDArr[1];

            newTotals = bdMod.deleteItem(type, parseInt(idNum));
            percentages = bdMod.calcExpPercentage();
            uiMod.uiDeleteItem(newTotals);
            uiMod.showPercentages(percentages);
        }
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
//toggle red class on inputs