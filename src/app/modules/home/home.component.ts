import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loginCard = true;

  constructor(private formBuilder: FormBuilder) {}

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signupForm = this.formBuilder.group({
      name:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
  });

  ngOnInit() {}

  onSubmitLoginForm(): void {
    console.log(this.loginForm.valid)
  }

  onSubmitsignUp(): void {

    console.log('Cadastrado',this.signupForm)
  }
}
