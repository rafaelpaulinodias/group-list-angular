import { Component, OnInit } from '@angular/core';
import { MarketList } from '../model/market-list';
import { Item } from '../model/item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: MarketList = new MarketList();

  item: Item = new Item('', 1, 0);

  editing: boolean = false;

  timeMousePress: Date;

  constructor() {
    // this.item = new Item('', 1, 0);
    // this.list = new MarketList();
    this.list.add(new Item('Açucar', 600, 6.2));
    this.list.add(new Item('Leite', 2, 4.5));
    this.list.add(new Item('Café', 1, 4.99));
    this.list.add(new Item('Milho', 1, 2.3));
    this.list.add(new Item('Ervilha', 2, 2.2));
    this.list.add(new Item('Sardinha', 2, 4.25));
    this.list.add(new Item('Palito', 1, 0.2));
    this.list.add(new Item('Guardanapo', 2, 4.29));
    this.list.add(new Item('Arroz', 2, 5.2));
    this.list.add(new Item('Macarrão', 2, 3.23));
    this.list.add(new Item('Miojo', 4, 0.80));
    this.list.add(new Item('Farinha', 1, 3.85));
    this.list.add(new Item('Creme Dental', 2, 11.75));
  }

  ngOnInit(): void {
  }

  onEnterUp(event) {
    const inputs = document.getElementsByTagName('input');
    const tabIndex = event.target.tabIndex;
    inputs[tabIndex + 1].focus();
    this.item.updateTotal();
  }

  onButtomCartClick(item: Item) {
    if (item.inCart) {
      this.list.removeFromCart(item);
    } else {
      this.list.putInCart(item)
    }
  }

  save() {
    console.log(this.item);
    this.item.updateTotal();
    if (!this.editing) {
      this.list.add(this.item);
    }
    this.editing = false;
    this.item = new Item('', 1, 0);
    document.getElementsByTagName('input')[0].focus();
  }

  edit(item: Item) {
    this.item = item;
    document.getElementsByTagName('input')[0].focus();
    this.editing = true;
  }

  remove() {
    this.list.remove(this.item);
    this.item = new Item('', 1, 0);
  }

}
