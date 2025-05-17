import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent {
  listings!: Array<any>;
  categrories: string[]

  constructor(private apiService: ApiService) {
    // this.getListings();
  }

  ngOnInit() {
    this.getListings();
  }
  getListings() {
    this.apiService.getListings().subscribe(
      (response) => {
        this.listings = response;
        console.log(this.listings);
      },
      (error) => {
        console.error('Error fetching listings:', error);
      }
    );
  }
}
