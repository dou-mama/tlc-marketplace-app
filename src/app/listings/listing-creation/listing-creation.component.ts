import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import {FormBuilder, FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormControl,
  ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-listing-creation',
  templateUrl: './listing-creation.component.html',
  styleUrls: ['./listing-creation.component.css']
})
export class ListingCreationComponent {

  listingForm!: FormGroup;
  // imagePreview!: Boolean;
  imagePreview: string | ArrayBuffer | null = '';

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {

      this.listingForm.patchValue({ image: file });
      this.listingForm.get('image')?.updateValueAndValidity();

      // Display preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  yearValidator(control: any): { [key: string]: boolean } | null {
    const hasLetter = /[a-zA-Z]/.test(control.value);
    return hasLetter ? { 'hasLetter': true } : null;
  }

  makeValidator(control: any): { [key: string]: boolean } | null {
    return null;
   }

  rentValidator(control: any): { [key: string]: boolean } | null {
    return null;
   }

   reset() {
     this.listingForm.get('year')?.setValue('');
     this.listingForm.get('make')?.setValue('');
     this.listingForm.get('rent')?.setValue('');
     this.listingForm.get('title')?.setValue('');
     this.listingForm.get('textcontent')?.setValue('');
     this.listingForm.get('image')?.setValue(null);
   }

   onSubmit() {
    if (this.listingForm.invalid) {
      alert('Please fill out all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('make', this.listingForm.get('make')?.value);
    formData.append('textcontent', this.listingForm.get('textcontent')?.value);
    formData.append('title', this.listingForm.get('title')?.value);
    formData.append('rent', this.listingForm.get('rent')?.value);
    formData.append('year', this.listingForm.get('year')?.value);
    formData.append('image', this.listingForm.get('image')?.value);


     this.dataService.createListing(formData).subscribe(
       (response: any) => {
         if(response.status === 'success')
         {
           alert('Listing created successfully');
           this.reset();
         }
       },
       (err: any) => {
         alert('Error creating the listing')
         console.log('Error creating the listing ' + err);
       }
     )
   }
  

  constructor(private formBuilder: FormBuilder, private dataService: DataService){}

  ngOnInit(): void {
    this.listingForm = this.formBuilder.group(
      {
        year: ['', [Validators.required, this.yearValidator]],
        make: ['', [Validators.required, this.makeValidator]],
        title: ['', Validators.required],
        textcontent: ['', Validators.required],
        rent: ['', [Validators.required, this.rentValidator]],
        image: [null, Validators.required]

      }
    
    )
  }

  get year() {
    return this.listingForm.get('year');
  }

  get make() {
    return this.listingForm.get('make');
  }

  get title() {
    return this.listingForm.get('title');
  }

  get textcontent() {
    return this.listingForm.get('textcontent');
  }

  get image() {
    return this.listingForm.get('image');
  }

  get rent() {
    return this.listingForm.get('rent');
  }

}
