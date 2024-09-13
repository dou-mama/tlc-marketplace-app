import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort-panel',
  templateUrl: './sort-panel.component.html',
  styleUrls: ['./sort-panel.component.css']
})
export class SortPanelComponent {
  @Input() totalListings: any;
  @Output() sortChange = new EventEmitter<string>();

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortChange.emit(selectElement.value);
  }
}
