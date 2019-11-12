import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
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

        //4 Search for the recipes
        await state.search.getResults();

        //5 Render the results to the ui
        stopLoader(elementStrings.loaderClass);
        searchView.renderResults(state.search.result);

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

async function myFunc(){
    const r = new Recipe(35120)
    await r.getRecipe();
    r.calcTime();
    r.calcServings();
    console.log(r)
}

myFunc();