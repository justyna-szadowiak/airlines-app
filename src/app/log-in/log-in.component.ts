import { Component, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface ToSignIn {
  provideEmail: string,
  providePassword: string
}

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  public logInForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  // public logIn(formData: any): void {
  //   this.authService.SignIn(provideEmail, providePassword)
  //     .then(
  //       (error) => console.error(error)
  //     )
  // }

  private buildForm(): void {
    this.logInForm = this.formBuilder.group({
      'email': ['', [
        Validators.required
      ]
      ],
      'password': ['', [
        Validators.required
      ]
      ],
    });
  }
}


