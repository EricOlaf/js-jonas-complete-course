import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import {elements, elementStrings, renderLoader, stopLoader} from './views/base';
//only search for pizza bacon and broccoli.

/*
***Global State***
- search object
- current recipe object
- shopping list object
- liked recipes
*/

const state = {}

/*SEARCH CONTROLLER*/
const controlSearch = async () => {
    //1 Get query from view
    const query = searchView.getInput();
    if(query){
        //2 make a new object with the query
        state.search = new Search(query);

        //3 Prep the ui for the results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try{
            //4 Search for the recipes
            await state.search.getResults();

            //5 Render the results to the ui
            stopLoader();
            searchView.renderResults(state.search.result);
        }catch(err){
            stopLoader();
            console.log(err)
            alert(err)
        }
        

    }
}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e=>{
    const btn = e.target.closest('.btn-inline')
    if(btn){
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage)
    }
})


/*RECIPE CONTROLLER*/

const controlRecipe = async () => {
    //Get ID from hash Url.
    const id = window.location.hash.replace("#", "");
    console.log(id);

    if(id){
        //Prepare UI for changes
        recipeView.clearRecipe()
        renderLoader(elements.recipeDiv);

        //highlight selected
        if(state.search){searchView.highlightedSelected(id)}

        //Create new recipe object
        state.recipe = new Recipe(id)

        try{
            //Get recipe data
            await state.recipe.getRecipe()
            
            //Calc servings and time using methods
            state.recipe.calcTime();
            state.recipe.calcServings();

            //Render the recipe omn the screen.
            // console.log(state.recipe)
            state.recipe.parseIngredients();
            stopLoader();
            recipeView.renderRecipe(state.recipe);
        }catch(err){
            console.log(err)
            alert(err)
        }
       
    }
}

/*List Controller*/

const controlList = () => {
    //Create list if there is none
    if(!state.list) state.list = new List();

    //Add ingredients to the list
    state.recipe.ingredients.map(el=>{
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    })
    console.log(state.list);
}

// window.addEventListener('hashchange', controlRecipe)
// window.addEventListener('load', controlRecipe)
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

elements.recipeDiv.addEventListener('click', e=>{
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        //decrease the ingredient count
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
        }
    }else if(e.target.matches('.btn-increase, .btn-increase *')){
        //increase the ingredient count
        state.recipe.updateServings('inc');
    }else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();
    }
    recipeView.updateServingsIngredients(state.recipe);
})