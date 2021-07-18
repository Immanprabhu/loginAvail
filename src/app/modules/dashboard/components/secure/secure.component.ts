import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
  loginForm: FormGroup;
   checks: any = [
    {description: 'admin', value: 'admin'},
    {description: "user", value: 'user'},
  ];
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      role: this.formBuilder.array([])
    }
  ) 
  }
 
  onCheckboxChange(e) {
    const checkArray: FormArray = this.loginForm.get('role') as FormArray;
    if (e.target.checked) {
      console.log(e.target.checked);
      checkArray.push(new FormControl(e.target.value));
    } 
    else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        console.log(item.value,e.target.value);
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return ;
        }
        i++;
      });
    }
  }
}
