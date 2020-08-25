import { Component, OnInit } from '@angular/core';
import { MarketList } from '../model/market-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lists: Array<MarketList> = new Array();

  constructor(private router: Router) { }

  ngOnInit(): void {
    let lista = new MarketList("atacadão 1");
    this.lists.push(lista);
    lista = new MarketList("Atacadão 2");
    this.lists.push(lista);
    lista = new MarketList("Atacadão 3");
    this.lists.push(lista);
    lista = new MarketList("Opção");
    this.lists.push(lista);
    lista = new MarketList("Karla");
    this.lists.push(lista);
    lista = new MarketList("Canela");
    this.lists.push(lista);
    lista = new MarketList("Feira de Paulista");
    this.lists.push(lista);
    lista = new MarketList("Atacadão 4");
    this.lists.push(lista);
    lista = new MarketList("Atacadão 5");
    this.lists.push(lista);
    lista = new MarketList("Atacadão 6");
    this.lists.push(lista);
    lista = new MarketList("Atacadão 7");
    this.lists.push(lista);
    lista = new MarketList("Atacadão 8");
    this.lists.push(lista);
    lista = new MarketList("Atacadão 9");
    this.lists.push(lista);
    lista = new MarketList("Atacadão 10");
    this.lists.push(lista);
    lista = new MarketList("Atacadão 11");
    this.lists.push(lista);
  }

  onListItemClick() {
    this.router.navigateByUrl('/list');
  }

}
