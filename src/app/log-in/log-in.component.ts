import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  public logInForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })
  public errorMessage: string | undefined;

  constructor(private apiService: ApiService, public dialogRef: MatDialogRef<LogInComponent>) {

  }

  logIn(user: User) {
    const email = user.email;
    const password = user.password;
    if (email && password) {
      this.apiService.checkLogIn(email, password).subscribe(result => {
        if(result) {
          this.dialogRef.close()
        } else {
          this.errorMessage = 'Wrong email or password'
        }
      })
    }
  }
}


