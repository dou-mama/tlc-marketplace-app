import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  activeTab = 'search';
  menuOpen = false;

  selectTab(tab: string) {
    this.activeTab = tab;
    this.menuOpen = false; // auto-close menu on tab click (mobile)
  }
}
