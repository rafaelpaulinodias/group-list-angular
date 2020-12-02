import { Component, OnInit } from '@angular/core';
import { MarketList } from '../model/market-list';
import { Router } from '@angular/router';
import { ListService } from '../list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listName: string;

  editing: boolean = false;

  selList: MarketList = new MarketList();

  lists: Array<MarketList> = new Array();

  constructor(
    private router: Router,
    private listService: ListService
  ) { }

  ngOnInit(): void {
    this.listService.listAll().subscribe(resp => {
      resp.forEach(list => {
        let newList = new MarketList();
        newList.build(list);
        this.lists.push(newList);
      })
    });
  }

  onListItemClick(marketListId: string) {
    this.router.navigate(['/list', marketListId]);
  }

  onCancelClick() {
    this.listName = '';
    this.editing = false;
  }

  onSaveClick() {
    if (this.editing) {
      this.selList.name = this.listName;
      this.listService.update(this.selList).subscribe(() => {
        this.editing = false;
        this.listName = '';
      });
    } else {
      this.save(new MarketList(this.listName));
    }
  }

  onEditClick(list: MarketList) {
    this.editing = true;
    this.listName = list.name;
    this.selList = list;
  }

  onRemoveClick(list: MarketList) {
    this.selList = list;
  }

  save(list: MarketList) {
    this.listService.save(list).subscribe(savedList => {
      let newList = new MarketList();
      newList.build(savedList);
      this.lists.push(newList);
      this.listName = '';
    });
  }

  remove() {
    const index = this.lists.indexOf(this.selList);
    this.listService.delete(this.selList.id).subscribe(() => this.lists.splice(index, 1));
  }

}
