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
    // checks: any = [
    //   { id: 0, description: 'admin', value: 'admin', checked: false },
    //   { id:1, description: "user", value: 'user', checked: true },
    // ];
  
    this.loginForm = this.formBuilder.group({
      username: ["admin1@gmail.com", [Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: [
        "12345678",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          // role: ['user', Validators.required],
          // phone: [null, [Validators.min(1000000000), Validators.max(9999999999), Validators.required]],
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
  // onCheckboxChange(e, checkbox) {
  //   this.checks.forEach((element: any) => {
  //     element.checked = false
  //   });
  //   checkbox.checked = true;
  //   document.getElementById('user_role_checkbox' + checkbox.id)['checked'] = true;
  //   this.userForm.controls['role'].setValue(checkbox.value);
  // }
}
