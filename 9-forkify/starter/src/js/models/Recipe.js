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

    parseIngredients(){
        const longName = ['tablespoons', 'tablespoon', 'teaspoons', 'teaspoon', 'cups', 'ounces', 'ounce', 'pounds'];
        const shortName = ['tbsp', 'tbsp', 'tsp', 'tsp', 'cup', 'oz', 'oz', 'pound', 'kg', 'g'];
        const newIngredients = this.ingredients.map(e => {
            //uniform units
            let ingredient = e.toLowerCase();
            longName.forEach((el, i)=>{
                ingredient = ingredient.replace(el, shortName[i]);
            });

            //remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ').replace(/\s+$/, '');

            //parse ingredients into count, unit and ingredient
           


            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => shortName.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                // There is a unit
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);
                
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }
                
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };

            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIng;
        })
        this.ingredients = newIngredients
    }
    updateServings(type){
        //servings
        const newServings = type === 'dec' ? this.servings -1 : this.servings +1;

        //ingredients
        this.ingredients.forEach(ing=>{
            ing.count *= (newServings/this.servings);
        })

        this.servings = newServings;
    }
}
