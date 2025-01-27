import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 loginForm:FormGroup;

 constructor(private router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)])
  })
 }

 onSubmit():void {
   if(this.loginForm.valid) {
       console.log(this.authService.login(this.loginForm.value));
   }
   else {
       console.log(`Form is not valid`);
   }
 }
 goToRegister():void {
  this.router.navigate(['/register']);
}
}
