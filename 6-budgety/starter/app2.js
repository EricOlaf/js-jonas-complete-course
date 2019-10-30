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
            console.log("bd hit")
            var id, type = input.inType, desc = input.inDesc, val = input.inValue, newItem
            //setup the id
            data.lists[type].length === 0 ? id = 0 : id = data.lists[type][data.lists[type].length-1].id + 1;
            console.log(id)
            //make a new object using the expense or income constructor functions
            if(type === 'exp'){
                newItem = new Expense(desc, val, id)
            }else{
                newItem = new Income(desc, val, id)
            }
            data.lists[type].push(newItem)
            calcData(type)
            console.log(data)
        }
    }
})()

uiModule = (function(){
    const DOMstrings = {
        //setup DOM strings
        addType: '.add__type',
        addDesc: '.add__description',
        addValue: '.add__value',
        addBtn: '.add__btn'
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
        getDomStr: function(){
            return DOMstrings
        }
       
    }
})()

controllerModule = (function(bdMod, uiMod){
   
    function setupListeners (){
         //Setup the click listener on the button
        const DOMstrings = uiMod.getDomStr();
        document.querySelector(DOMstrings.addBtn).addEventListener('click', addInputItems)
    }

    function addInputItems(){
        //get and store the input values then send them to the budget module to perform calculations, then be able to update the ui with the new values.
        var input = uiMod.inputValues()
        if(input.inDesc && input.inValue){
            //sends the input to the budget
            bdMod.addInputtoBudget(input)
        }
    }

    return{
       init:function(){
        setupListeners()
       }
    }
})(budgetModule, uiModule)

controllerModule.init()