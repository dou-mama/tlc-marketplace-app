import { Component, OnInit } from '@angular/core';
import {DataService } from 'src/app/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listings!: any[]
  isLoggedIn: boolean = false;

  compareDates(a: any, b: any){
    const dateA = new Date(a.createdDateTime);
    const dateB = new Date(b.createdDateTime);

    if(dateA < dateB) return 1;
    else if(dateA > dateB) return -1;
    return 0;
  }

  constructor(private dataService: DataService) {}

  ngOnInit(): void{
    this.dataService.loggedIn$.subscribe((status: boolean) => this.isLoggedIn = status);
    this.dataService.getListings().subscribe(
      (response: any) => {
        // console.log(response)
        this.listings = response.data.posts;
        this.listings.sort(this.compareDates);
      },
      (err: any) => {
        console.log('Error getting listings: ' + err)
      }
    )
  }

}
