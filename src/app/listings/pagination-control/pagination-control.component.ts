import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-control',
  templateUrl: './pagination-control.component.html',
  styleUrls: ['./pagination-control.component.css']
})
export class PaginationControlComponent {

  @Input() totalPages: any;
  currentPage: any = 1;
  @Output() pageChange = new EventEmitter<any>();

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onChangePage(event: Event, val: any) {
    event.preventDefault();
    this.currentPage = this.currentPage+val;
    this.pageChange.emit(val);
  }



}
