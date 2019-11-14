import uniqid from 'uniqid';

export default class List {
    constructor(){
        this.items = []
    }
    addItem(count, unit, ingredient){
        const item = {
            id = uniqid(),
            count,
            unit,
            ingredient
        };
        this.items.push(item);
    }
    deleteItem(id){
        const ind = this.items.findIndex(e => e.id === id);
        this.items.splice(ind, 1);
    }
    updateCount(id, count){
        this.items.find(e => e.id === id).count = newCount
    }
}