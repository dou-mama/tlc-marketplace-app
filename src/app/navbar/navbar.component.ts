import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service'; 


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;

  constructor(private dataService: DataService){}

  ngOnInit() {
    this.dataService.loggedIn$.subscribe((status: boolean) => this.isLoggedIn = status);
  }

  logout(event: Event){
    event.preventDefault();
    this.dataService.logout();
    console.log('back from backend call');
  }

}
