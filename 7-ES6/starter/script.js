class Element{
    constructor(name, year){
        this.name = name;
        this.year = year;
    }
}

//PARKS
class Park extends Element{
    constructor(name, year, trees, parkArea,){
        super(name, year);
        this.trees = trees;
        this.parkArea = parkArea;
    }
    treeDensity(){
        return this.trees / this.parkArea;
    }
}

//STREETS
class Street extends Element{
    constructor(name, year, streetLength){
        super(name, year);
        this.streetLength = streetLength;
    }
    streetClassFunc(){
        let streetInternalFunc = (streetClass) => {
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

//FUNCTIONS

function avgParkAge(arr){
    let totalAge = 0
    arr.forEach(x=>{
        totalAge += new Date().getFullYear() - x.year
    })
    return totalAge / arr.length 
}

function thousandTrees(arr){
    let ans = arr.filter(x=>x.trees >= 1000)
    return ans[0].name
}

function streetLengthAvg(arr){
    let totalLength = 0;
    arr.forEach(x=> totalLength += x.streetLength)
    return(totalLength, totalLength/arr.length)
}



let allParks = [
    new Park("Rigby Park", 1974, 382, 690),
    new Park("Rigby Lake Park", 1994, 802, 801),
    new Park("Labelle Park", 1919, 1112, 880)
]

let allStreets = [
    new Street("Main Street", 1872, 440),
    new Street("456 Nth Street", 1999, 1200),
    new Street("Jefferson Street", 1953, 3269),
    new Street("Menan Road", 1893, 1886)
]

console.log(avgParkAge(allParks))
console.log(allParks[0].treeDensity())
console.log(avgParkAge(allParks))
console.log(thousandTrees(allParks))
console.log(streetLengthAvg(allStreets))
allStreets[1].streetClassFunc()
allStreets[0].streetClassFunc()