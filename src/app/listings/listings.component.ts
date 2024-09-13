import { SafeKeyedRead } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent {

  listings!: Array<any>
  pageMap: Map<any, any[]> = new Map();
  //listings sorted by datetime
  baselineListings!: Array<any>
  rentSorted: boolean = false;
  dateSorted: boolean = false;

  //pagination controls
  currentPage: any = 1
  totalPages!: any;
  // filterForm!: FormGroup;

  // makeValidator(): ValidatorFn {
  //   return (control: AbstractControl) => {

  //   }
  // }

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getListings().subscribe(
      (response: any) => {
        if(response.status == 'success'){
          this.listings = response.data.posts;
          this.totalPages = this.listings.length/10
          //sort in chronological order
          this.preprocessListings();
          if(!Array.isArray(this.listings)) this.listings = [this.listings]
        }
      },
      (err: any) => {
        console.log('Error communicating with backend while fetching posts: ' + err);
      }
    )
  }

  resetPageMap() {
    let page = 1;
    let toInsert: any[] = [];

    let row: any[] = [];

    this.listings.forEach((listing, index) => {

      row.push(listing);
      if((index+1)%3 === 0 || index+1 === this.listings.length){
        toInsert.push(row)
        if((index+1)%6 === 0 || index+1 === this.listings.length){
          this.pageMap.set(page, toInsert);
          toInsert = [];
          page = page+1;
        }
        row = [];
      }
      // if((index+1)%3 === 0 || index+1 === this.listings.length){
      //   this.pageMap.set(page, toInsert);
      //   toInsert = [];
      //   page = page+1;
      // }
    })

    // console.log("page map: ");
    // console.log(this.pageMap);
  }

  compareDates(a: any, b: any){
    const dateA = new Date(a.createdDateTime);
    const dateB = new Date(b.createdDateTime);

    if(dateA < dateB) return 1;
    else if(dateA > dateB) return -1;
    return 0;
  }

  compareRent(a: any, b: any){
    return a.rent-b.rent;
  }

  preprocessListings(): void{
    //sort based on created datetime
    this.listings.sort(this.compareDates);
    this.baselineListings = JSON.parse(JSON.stringify(this.listings));

    //reset page map
    this.resetPageMap();
  }

  onSort(sortBy: string) {
    if(sortBy === "price") this.onRentSort();
    else if(sortBy === "date") {
      if(this.rentSorted) !this.rentSorted;
      this.onReset();
    }
  }

  onFilter(filterForm: any){
    //apply the filters
    let {make, maxPrice, minPrice, minYear, maxYear} = filterForm

    this.listings = this.listings.filter(listing => {
      let res = true

      if(listing.make && make && listing.make.toLowerCase() !== make.toLowerCase()) return false;
      if(listing.year && minYear && listing.year < minYear) return false;
      if(listing.year && maxYear && listing.year > maxYear) return false;
      if(listing.rent && minPrice && listing.rent < minPrice) return false;
      if(listing.rent && maxPrice && listing.rent > maxPrice) return false;

      return res;

    });

    this.resetPageMap();
  }

  onReset(){
    this.listings = JSON.parse(JSON.stringify(this.baselineListings));

    //reset page map
    this.resetPageMap();
  }

  onRentSort() {
    if(!this.rentSorted){
      this.listings.sort(this.compareRent);
      this.rentSorted = !this.rentSorted;

      //reset page map
      this.resetPageMap();
    } 
    // else this.listings = JSON.parse(JSON.stringify(this.baselineListings));;
  }

  // nextPage(){
  //   this.currentPage = this.currentPage+1;
  // }

  onPageChange(val: any){
    this.currentPage = this.currentPage+val;
  }

  // previousPage(){
  //   this.currentPage = this.currentPage-1;
  // }

}
