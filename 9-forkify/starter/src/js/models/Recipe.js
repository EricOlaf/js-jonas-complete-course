//const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`); 35120

import axios from 'axios'

export default class Recipe{
    constructor(id){
        this.id = id
    }
    async getRecipe(){
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.imageUrl = res.data.recipe.image_url;
            this.publisher = res.data.recipe.publisher;
            this.ingredients = res.data.recipe.ingredients;
            this.sourceUrl = res.data.recipe.source_url;
        }catch(err){
            console.log(err)
            alert(err)
        }
    }

    calcTime(){
        //assuming we need 15 minutes for every 3 ingredients. Not real!!!
        const numIng = this.ingredients.length;
        const periods = numIng/3;
        this.time = periods * 15;
    }

    calcServings(){
        this.servings = 4;
    }
}
