/*
namespace Coins{}
//available only in namespace
let imagePath: string ="img/";
*/
//NOW MODULE

export abstract class Coin {
    //value: number;
    constructor(public value: number){
    }
    abstract getImageUrl(): string;
}

export class Quarter extends Coin {
    constructor(){
        super(.25);
    }
    //private value: number = .25;
    /*
    get Value(){
        return this.value;
    }
    
    set Value(newValue: number){
        this.value = newValue;
    }
    */

    getImageUrl(): string {
        return "img/Quarter.png";
    }
}

export class Dime extends Coin {
    constructor(){
        super(.1);
    }

    getImageUrl(): string {
        return "img/Dime.png";
    }
}

export class Half extends Coin {
    constructor(){
        super(.5);
    }

    getImageUrl(): string {
        return  "img/Half.png";
    }
}

export class Dollar extends Coin {
    constructor(){
        super(1);
    }

    getImageUrl(): string {
        return "img/Dollar.jpg";
    }
}


