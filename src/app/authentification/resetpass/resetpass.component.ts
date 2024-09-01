import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder
    , private userService: UserService) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.get('email')?.value;
      this.userService.resetPassword(email).subscribe(
        (response) => {
          this.message = 'Temporary password has been sent to your email.';
        },
        (error) => {
          this.message = 'Error: ' + error;
        }
      );
    }
  }
}
