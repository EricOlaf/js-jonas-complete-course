class Element{
    constructor(name, year){
        this.name = name;
        this.year = year;
    }
}

class Parks extends Element{
    constructor(name, year, trees, parkArea,){
        super(name, year);
        this.trees = trees;
        this.parkArea = parkArea;
    }
    treeDensity(){
        return this.trees / this.parkArea;
    }
}

class Streets extends Element{
    constructor(name, year, streetLength){
        super(name, year);
        this.streetLength = streetLength;
    }
    streetClassFunc(){
        streetInternalFunc(streetClass){
            console.log(`${this.name}, built in ${this.year} is a ${streetClass} street.`)
        }
        switch(true){
            case this.streetLength < 500 :
                streetInternalFunc('tiny')
                break;
            case this.streetLength >= 500 && this.streetLength < 1000 :
                streetInternalFunc('small')
                break;
            case this.streetLength >= 1000 && this.streetLength < 1500 :
                streetInternalFunc('normal')
                break;
            case this.streetLength >= 1500 && this.streetLength < 2000 :
                streetInternalFunc('big')
                break;
            case this.streetLength >= 2000 :
                streetInternalFunc('huge')
                break;
            default : 
                streetInternalFunc('normal');
        }
    }

}