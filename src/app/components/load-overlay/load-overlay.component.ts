import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-overlay',
  templateUrl: './load-overlay.component.html',
  styleUrls: ['./load-overlay.component.scss']
})
export class LoadOverlayComponent implements OnInit {

  @Input('message') message: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
