import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
  userList:any=[{username:'imman'}, {username:'prabhu'}, {username:'then',}]
  @Output() userEmit = new EventEmitter();
  constructor() { }
      
  ngOnInit(): void {
  }
  usersClick(user){
   this.userEmit.emit(user);
  }
}
