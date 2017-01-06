import { Product, Initial as Init} from "./product";
import getVendingProduct from "./productFactory";

/// <reference path="./productFactory.ts" />

//delete ref path for product
import * as Coins from "./coin";


export enum VendingMachineSize{
    small = 6,
    medium = 9,
    large = 12
}

//dont need to export only used in this module
class Cell{
    /*
    constructor(public product: CocaCola){

    }
    */

    constructor(public product: Product){}

    stock = ko.observable<number>(3);
    sold = ko.observable(false);
}

export class VendingMachine {
    //private paid: number = 0;

    paid = ko.observable(0);
    //selectedCell = ko.observable(new Cell(new CocaCola));
    selectedCell = ko.observable(new Cell(new Init()));
    cells = ko.observableArray([]);
    acceptedCoins: Coins.Coin[] = [new Coins.Dime(), new Coins.Quarter(), new Coins.Half(), new Coins.Dollar()];
    canPay = ko.pureComputed(() => this.paid() - this.selectedCell().product.price >= 0)

    set size(givenSize: VendingMachineSize){
        this.cells([]);
        for (let index = 0; index < givenSize; index++) {
            let product = getVendingProduct();
            this.cells.push(new Cell(product));
        }     
    }

    select = (cell: Cell): void => {
        cell.sold(false);
        this.selectedCell(cell);
    }

    acceptCoin = (coin: Coins.Coin): void =>{
        let oldTotal = this.paid();
        this.paid(oldTotal + coin.value);
        
        /* UI logic getting rid of for separation of concern
        this.paid = this.paid + coin.Value;
        var element = document.getElementById("total");
        element.innerHTML = this.paid.toString();
        */
    }

     pay = (): void => {               
        if (this.selectedCell().stock() < 1) {
            alert("I'm sorry, we're out of them!")
            return;
        }
        
        let currentPayed = this.paid();
        this.paid(Math.round(((currentPayed - this.selectedCell().product.price) * 100))/100);
        let currentStock = this.selectedCell().stock();
        this.selectedCell().stock(currentStock-1);
        this.selectedCell().sold(true);
    }
}