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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message: any;
  response: any;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ){}

  onSubmit(): void {
    this.dataService.login(this.loginForm.value).subscribe(
      (resp: any) => {
        this.response = resp
        if(this.response.status == 'success') {
          this.router.navigate(['/listings']);
          console.log(this.response);
        }
      },
      (err: string) => {
        console.log('Error communicating with backend: ' + err);
      }
    )
  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required]
      }
    )
  }

}
