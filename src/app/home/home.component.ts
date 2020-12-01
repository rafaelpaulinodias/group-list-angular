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

  listName: string

  lists: Array<MarketList> = new Array();

  constructor(
    private router: Router,
    private listService: ListService
  ) { }

  ngOnInit(): void {
    this.listService.listAll().subscribe(resp => {this.lists = resp});
  }

  onListItemClick(marketListId: string) {
    this.router.navigate(['/list', marketListId]);
  }

  onCancelClick() {
    this.listName = '';
  }

  onSaveClick() {
    this.save(new MarketList(this.listName));
    this.listName = '';
  }

  save(list: MarketList) {
    this.listService.save(list).subscribe(resp => {
      this.lists.push(resp);
      console.log(this.lists);
    });
  }

}
