import { getLocaleFirstDayOfWeek } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pushArr:any={
    user:[]
  }
  a:boolean;
  b=true;
  data: string;
  time: any;
  constructor(private apiservice:ApiService,private router: Router) { }

  ngOnInit(): void {
    this.myTime()
  }
  myTime():void{
   setInterval(data=>{
    this.time = Date.now()
   },1000)
  }
  userClick(user):void{
    if(user === undefined) console.log(user);
    if(!user.selected) user.selected = true;
    else user.selected = false;
    if (user.selected) this.pushArr.user.push(user.username);
    else {
      this.pushArr.user.forEach((element, i) => {
        if (element === user.username) this.pushArr.user.splice(i, 1);
      });
    }
    console.log(this.pushArr.user);
    
  } 
 one(e):void{
  if(e === '2') this.data = 'plus works'
  if(e === '1') this.data = 'minus works'
  this.b = !this.b;
 }
  nextRoute():void{
   const token =  localStorage.getItem('userToken')
    let headers = new HttpHeaders().set('authorization',`Bearer ${token}`)
    this.apiservice.testGet(`${environment.liveUrl}/secure/route`,{headers:headers}).subscribe(data=>{
      if(data)
      this.router.navigate(['secure'])
    }, (err) => { 
      console.log('data',err);
      }
    )
  }
  mysumbit(data):void{
    data.preventDefault()
    console.log(data);
    
  }
}
