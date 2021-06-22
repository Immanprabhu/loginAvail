import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}
  isAuthenticated(){
    let user = localStorage.getItem('userToken');
    if(user === null) return false;
    else return true;
  }
  }
