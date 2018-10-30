import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  isActive = true;
  private navbar = [{ "name": "Главная", "link": "" }, { "name": "Настройки", "link": "settings" }];
  constructor() { }

  ngOnInit() {

  }

}
