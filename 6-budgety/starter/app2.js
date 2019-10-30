//Remake of app.js on my own to test my skills.

budgetModule = (function(){

    return{
        test: function(){
            console.log("budget module works")
        }
    }
})()

uiModule = (function(){

    return{
        test: function(){
            console.log("ui module works")
        }
    }
})()

controllerModule = (function(bdMod, uiMod){


    return{
        test: function(){
           bdMod.test();
           uiMod.test();
        }
    }
})(budgetModule, uiModule)

controllerModule.test()