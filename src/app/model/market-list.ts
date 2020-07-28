import { Item } from './item';

export class MarketList {
    nome: string;
    totalInCart: number;
    total: number;
    items: Array<Item>;

    constructor() {
        this.items = new Array<Item>();
        this.total = 0;
        this.totalInCart = 0;
    }

    add(item: Item) {
        this.addToTotal(item);
        this.items.push(item);
    }

    remove(item: Item) {
        const index = this.items.indexOf(item);
        this.subFromTotal(this.items[index]);
        this.items.splice(index, 1);
    }

    putInCart(item: Item) {
        const index = this.items.indexOf(item);
        this.items[index].inCart = true;
        this.totalInCart += this.items[index].total;
    }

    removeFromCart(item: Item) {
        const index = this.items.indexOf(item);
        this.items[index].inCart = false;
        this.totalInCart -= this.items[index].total;
    }

    addToTotal(item: Item) {
        console.log(item.total)
        this.total += item.total;
        if (item.inCart) {
            this.totalInCart += item.total;
        }
        console.log(this.total);
    }

    subFromTotal(item: Item) {
        this.total -= item.total;
        if (item.inCart) {
            this.totalInCart -= item.total;
        }
    }

}