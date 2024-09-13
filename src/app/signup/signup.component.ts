import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormControl,
  ReactiveFormsModule} from '@angular/forms'
import { DataService } from 'src/app/data.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  message: any;
  response: any;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ){}

  onSubmit(): void {
    this.dataService.signUp(this.signupForm.value).subscribe(
      (resp: any) => {
        this.response = resp
        if(this.response.status == 'SUCCESS') {
          this.router.navigate(['../', '/home']);
        }
      },
      (err: string) => {
        console.log('Error communicating with backend: ' + err);
      }
    )
  }

  ngOnInit(): void {

    this.signupForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', Validators.required],
        full_name: ['', Validators.required]
      }
    )
  }

}
