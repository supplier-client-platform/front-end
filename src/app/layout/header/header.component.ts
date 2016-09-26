import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  open: boolean;


  items = [
    { value: 'Logout', icon: 'kanban' }
  ];

  onToggle($event: Event) {
    $event.stopPropagation();
    this.open = true;
  }


}
