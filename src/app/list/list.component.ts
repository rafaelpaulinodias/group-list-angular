import { Component, OnInit } from '@angular/core';
import { MarketList } from '../model/market-list';
import { Item } from '../model/item';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: MarketList = new MarketList();
  selItem: Item = new Item('', 1, 0, false);
  deleteItem: Item = new Item('', 1, 0, false);
  editing: boolean = false;
  timeMousePress: Date;

  constructor(
    private listService: ListService,
    private routeAct: ActivatedRoute,
    ) 
    {
      const marketListId = this.routeAct.snapshot.params['marketListId']
      if (marketListId) {
        this.listService.findById(marketListId).subscribe(resp => {
          this.list.build(resp);
        });
      }
    }

  ngOnInit(): void {}

  onEnterUp(event) {
    const inputs = document.getElementsByTagName('input');
    const tabIndex = event.target.tabIndex;
    inputs[tabIndex + 1].focus();
    this.selItem.updateTotal();
  }
  
  onItemDblClick(item: Item) {
    this.deleteItem = item;  
  }
  
  onButtomCartClick(item: Item) {
    const listId = this.list.id;
    const itemIndex = this.list.items.indexOf(item);
    item.inCart = !item.inCart;
    this.listService.updateItem(listId, itemIndex, item).subscribe(() => {
      if (item.inCart) {
        this.list.putInCart(item);
      } else {
        this.list.removeFromCart(item);
      }
    });
  }

  save(item: Item) {
    item.updateTotal();
    if (!this.editing) {
      this.listService.addItem(this.list.id, item).subscribe(() => {
        this.list.add(item);
        this.selItem = new Item('', 1, 0, false);
        this.list.calcTotal();
        this.list.calcTotalInCart();
        document.getElementsByTagName('input')[0].focus();
      });
    } else {
      const itemIndex = this.list.items.indexOf(this.selItem);
      this.listService.updateItem(this.list.id, itemIndex, item).subscribe(() => {
        this.selItem = new Item('', 1, 0, false);
        this.editing = false;
      });
    }
  }

  edit(item: Item) {
    this.selItem = item;
    document.getElementsByTagName('input')[0].focus();
    this.editing = true;
  }

  remove() {
    const listId = this.list.id;
    const itemIndex = this.list.items.indexOf(this.deleteItem);
    this.listService.removeItem(listId, itemIndex).subscribe(() => {
      this.list.remove(this.deleteItem);
      this.list.calcTotal();
      this.list.calcTotalInCart();
    });
  }

}
