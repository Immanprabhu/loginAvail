import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  wrongUser: boolean;
  toggleSpinner: boolean;
  loggedIn: boolean;
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, public auth: AuthService) {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    } 
    else this.loggedIn = true;
    
    this.loginForm = this.formBuilder.group({
      username: ["admin1@gmail.com", Validators.required,],
      password: [
        "12345678",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
        ],
      ],
    });
  }
 
  ngOnInit(): void {}
 
  get username() {
    return this.loginForm.get("username");
  }
 
  get password() {
    return this.loginForm.get("password");
  }
 
  loginSubmit(): void {
    this.toggleSpinner = true;
    this.apiService.post(`${environment.liveUrl}/post/signup`,this.loginForm.value).subscribe(data => {
        this.wrongUser = false;
        this.toggleSpinner = false;
        localStorage.setItem('userToken', data.token);
        this.router.navigate(['/dashboard']);
    }, (err) => { 
      console.log('data',err);
      this.wrongUser = true;
      this.toggleSpinner = false;
      }
    )
  }
  RemoveInvalidErr():void{
    this.wrongUser = false;
  }
}
