import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service'; 

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent {
  listingId: any | null = null;
  listing: any;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    // Access the 'id' parameter from the route
    this.route.paramMap.subscribe((params: { get: (arg0: string) => any | null; }) => {
      this.listingId = params.get('id'); // Get the 'id' parameter
      console.log('post id: ' + this.listingId);
      // You can use this.userId to fetch user details, etc.
    });
    //fetch the listing
    this.dataService.getListing(this.listingId).subscribe(
      (response: any) => {
        this.listing = response.data.post;
      },
      (err: any) => {
        console.log('Error fetching post from backend: ' + err);
      }
    )
  }
}
