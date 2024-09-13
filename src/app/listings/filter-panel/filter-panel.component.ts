import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormControl,
  ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit {
  
  @Output() filterChange = new EventEmitter<any>();
  @Output() resetEvent = new EventEmitter<any>();

  filterForm!: FormGroup;

  onFilterChange() {
    this.filterChange.emit(this.filterForm.value);
  }

  onReset() {
    //clear the fields
    this.filterForm.get('make')?.setValue('');
    this.filterForm.get('minYear')?.setValue('');
    this.filterForm.get('maxYear')?.setValue('');
    this.filterForm.get('minPrice')?.setValue('');
    this.filterForm.get('maxPrice')?.setValue('');

    //emit the event
    this.resetEvent.emit();
  }

  yearValidator(): ValidatorFn{
    return (control: AbstractControl) => {
      const min = control.get('minYear');
      const max = control.get('maxYear');

      const regex = /[a-zA-Z]/;

      let range = false;
      let numeric = false;



      if(min !== null && min.value !== null && max !== null && max.value !== null) {

        //check if fields contain only digits
        if( !regex.test(min.value) && !regex.test(max.value) ) numeric = true;

        if(max.value >= min.value) range = true;
      }

      return {yearRange: range, isNumeric: numeric};
    }
  }

  noLettersValidator(control: any): { [key: string]: boolean } | null {
    const hasLetter = /[a-zA-Z]/.test(control.value);
    return hasLetter ? { 'hasLetter': true } : null;
  }

  noDigitsValidator(control: any): { [key: string]: boolean } | null {
    const hasDigit = /\d/.test(control.value);
    return hasDigit ? { 'hasDigit': true } : null;
  }

  // priceValidator(control: any): { [key: string]: boolean } | null{

  //   const hasLetter = /[a-zA-Z]/.test(control.value);
  //   return hasLetter ? { 'hasLetter': true } : null;

    
  //   // return (control: AbstractControl) => {
  //     // const min = control.get('minPrice');
  //     // const max = control.get('maxPrice');

  //     // if(min !== null && min.value !== null && max !== null && max.value !== null && max.value <= min.value) {
  //     //   return { priceRange: true }
  //     // }

  //     // return null;
  //   }
  // }

  // makeValidator(): ValidatorFn {
  //   return (control: AbstractControl) => {
  //     const make = control.get('make');

  //     //check if make contains any digits
  //     const regex = /\d/
  //     if(make !== null && make.value !== null && !regex.test(make.value)) return { validMake: true}

  //     return null
  //   }
  // }

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group(
      {
        minYear: ['', [Validators.min(1960), Validators.max(2025), this.noLettersValidator]],
        maxYear: ['', [Validators.min(1960), Validators.max(2025), this.noLettersValidator]],
        minPrice: ['', this.noLettersValidator],
        maxPrice: ['', this.noLettersValidator],
        make: ['', this.noDigitsValidator]
      },
      // {
      //   validators: [this.yearValidator(), this.priceValidator()]
      // }
    )
  }

  get minYear() {
    return this.filterForm.get('minYear');
  }

  get maxYear() {
    return this.filterForm.get('maxYear');
  } 

  get minPrice() {
    return this.filterForm.get('minPrice')
  }

  get maxPrice() {
    return this.filterForm.get('maxPrice')
  }

  get make() {
    return this.filterForm.get('make')
  }

}
