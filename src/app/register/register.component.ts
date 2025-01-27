import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm:FormGroup;
  

  constructor(private router: Router,
              private authService: AuthService
  ) {
    this.registerForm = new FormGroup({
      nom : new FormControl('', [Validators.required, Validators.minLength(3)]),
      prenom : new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone : new FormControl('', [Validators.required, Validators.minLength(8)]),
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword : new FormControl('', [Validators.required, Validators.minLength(6)]),
      adresse : new FormControl('', [Validators.required, Validators.minLength(6)]),
      dateNaissance : new FormControl('', [Validators.required]),

    })
  }
    onSubmit():void {
      if(this.registerForm.valid) {
          console.log( this.authService.register(this.registerForm.value));
          console.log('Inscription réussie');
        this.router.navigate(['/login']);
      }
      else {
          console.log(`Form is not valid`);
      }
    }

    goToLogin():void {
      this.router.navigate(['/login']);
    }
}
