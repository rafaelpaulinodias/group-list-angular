import { Item } from './item';

export class MarketList {
    id: string;
    name: string;
    owner: string;
    totalInCart: number;
    total: number;
    items: Array<Item>;

    constructor(name?: string) {
        name ? this.name = name.toUpperCase() : this.name = "";
        this.items = new Array<Item>();
        this.total = 0;
        this.totalInCart = 0;
    }

    build(list: MarketList) {
        this.id = list.id;
        this.name = list.name.toUpperCase();
        this.owner = list.owner;
        this.items = new Array<Item>();
        list.items.forEach(item => {
            let newItem = new Item();
            newItem.parse(item);
            this.addItem(newItem);
        });
    }

    updateTotal() {
        this.total = 0;
        this.items.forEach(item => {
            this.total += item.total;
        });
    }

    updateTotalInCart() {
        this.totalInCart = 0;
        this.items.forEach(item => {
            if (item.inCart) this.totalInCart += item.total;
        });
    }

    addItem(item: Item) {
        let newItem = new Item();
        newItem.parse(item);
        newItem.name = newItem.name.toUpperCase();
        this.items.push(newItem);
        this.addToTotal(newItem);
    }

    removeItem(item: Item): Item {
        const index = this.items.indexOf(item);
        if (item.inCart) {
            this.removeFromCart(item);
        }
        this.subFromTotal(item);
        this.items.splice(index, 1);
        return item;
    }

    updateItem(itemIndex: number, item: Item) {
        let savedItem = this.items[itemIndex];
        savedItem.parse(item);
    }

    putInCart(item: Item) {
        if (!item.inCart) {
            console.log("putInCart")
            const index = this.items.indexOf(item);
            this.items[index].inCart = true;
            this.totalInCart += this.items[index].total;
        }
    }

    removeFromCart(item: Item) {
        if (item.inCart) {
            console.log("removeFromCart")
            const index = this.items.indexOf(item);
            this.items[index].inCart = false;
            this.totalInCart -= item.total;
        }
    }

    private addToTotal(item: Item) {
        this.total += item.total;
        if (item.inCart) {
            this.totalInCart += item.total;
        }
    }

    private subFromTotal(item: Item) {
        this.total -= item.total;
        if (item.inCart) {
            this.totalInCart -= item.total;
        }
    }

    findItemByName(itemName: string) {
        const result = this.items.find( 
            ({ name }) => name.toLocaleUpperCase() === itemName.toUpperCase()
        );
        return result;
    }

    isAllInCart(): boolean {
        return (this.total == this.totalInCart) && (this.items.length != 0);
    }

    isEmpty(): boolean {
        return this.items.length == 0;
    }

    private existsItemWithThisName(name: string): boolean {
        const itemByName= this.findItemByName(name);
        if (itemByName) {
            return true;
        }
        return false;
    }

    validateList(item: Item) {
        if (item.name.trim() == "") {
            throw new Error("The name can not be empty");
        }

        if (this.findItemByName(item.name.toUpperCase())) {
            throw new Error("This item has already been inserted");
        }
    }

}