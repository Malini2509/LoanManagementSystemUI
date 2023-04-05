import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm, FormControl, ValidatorFn } from '@angular/forms';
import { Route, Router } from '@angular/router'; 
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {

  reg = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(8)]),
    userFirstName: new FormControl('',Validators.required),
    userLastName: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)

  })

  constructor(private userService:UserService , private route:Router) { }

  onSubmit() {
    console.log(this.reg.value);
    this.userService.registeredUser(this.reg.value).subscribe((result)=>{
      console.log("result",result);
      alert('Registration successful!');
      this.route.navigate(['/login']);
    })
  }

}




















