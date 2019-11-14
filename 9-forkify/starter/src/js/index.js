import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {elements, elementStrings, renderLoader, stopLoader} from './views/base';
//only search for pizza bacon and broccoli.

/*
***Global State***
- search object
- current recipe object
- shopping list object
- liked recipes
*/

const state = {};

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
            const likeVar
            if(state.likes){likeVar = state.likes.isLiked(id)}
            else{likeVar = false};
            recipeView.renderRecipe(state.recipe, likeVar);
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

//Handle delete and update shopping list
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);
        console.log(state.list)

    // Handle the count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

//window.addEventListener('hashchange', controlRecipe)
// window.addEventListener('load', controlRecipe)
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/* Control Likes*/
const controlLike = () => {
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    if(!state.likes.isLiked(currentID)){
        //hasnt been liked yet
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.publisher,
            state.recipe.imageUrl
        )
        likesView.toggleLikeBtn(true);
    }else{
        //already been liked
        state.likes.deleteLike(currentID);
        likesView.toggleLikeBtn(false);
    }
    console.log(state.likes)
}

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
    }else if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLike();
    }
    recipeView.updateServingsIngredients(state.recipe);
})