import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  private _auth = inject(AuthService)


  ngOnInit(){
    this._auth.signUp({
     email: 'ahmed@example.com',
  username: 'ahmed_123',
  password: 'abc123',
  name: {
    firstname: 'Ahmed',
    lastname: 'Ibrahim'
  },
  address: {
    city: 'Cairo',
    street: 'Tahrir Street',
    number: 15,
    zipcode: '12345',
    geolocation: {
      lat: '30.0444',
      long: '31.2357'
    }
  },
  phone: '01012345678'
    }).subscribe({
      next:(res)=>{
        console.log(res);
      }
    })
  }


}
