import { Component, OnInit } from '@angular/core';
import { MarketList } from '../model/market-list';
import { Router } from '@angular/router';
import { ListService } from '../list.service';
import { StringUtil } from '../utils/string-utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listName: string;

  editing: boolean = false;

  selectList: MarketList = new MarketList();

  lists: Array<MarketList> = new Array();

  constructor(
    private router: Router,
    private listService: ListService,
    private stringUtil: StringUtil
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

  onDialogListButtonCancelClick() {
    this.listName = '';
    this.editing = false;
  }

  onListItemEditButtonClick(list: MarketList) {
    this.editing = true;
    this.listName = this.stringUtil.toTitleCase(list.name);
    this.selectList = list;
  }

  onListItemDeleteButtonClick(list: MarketList) {
    this.selectList = list;
  }

  onDialogListButtonSaveClick() {
    if (this.editing) {
      this.selectList.name = this.listName;
      this.updeteList(this.selectList)
    } else {
      this.saveList(new MarketList(this.listName));
    }
  }

  onExclusionDialogButtonExcludeClick() {
    this.removeList(this.selectList);
  }

  saveList(list: MarketList) {
    this.listService.save(list).subscribe(savedList => {
      let newList = new MarketList();
      newList.build(savedList);
      this.lists.push(newList);
      this.listName = '';
    });
  }

  updeteList(list: MarketList) {
    this.listService.update(list).subscribe(() => {
      this.editing = false;
      this.listName = '';
    });
  }

  removeList(list: MarketList) {
    const index = this.lists.indexOf(list);
    this.listService.delete(this.selectList.id).subscribe(() => this.lists.splice(index, 1));
  }

}
