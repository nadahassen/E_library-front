import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router,private http: HttpClient) {
    this.registrationForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email, this.espritEmailValidator]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],  
      sexe: ['', Validators.required],
      password: ['', Validators.required],
      specialty: ['', Validators.required], 
      image:['none.jpg'],
      priority: [0],  
      type: ['STUDENT'],  
      state: ['PENDING'] 
    });
  }

  espritEmailValidator(control: AbstractControl): { [key: string]: any } | null {
    const email = control.value;
    return email && email.endsWith('@esprit.tn') ? null : { 'emailDomain': true };
  }

  onSubmit() {
    this.registrationForm.value.specialty = Number(this.registrationForm.value.specialty);
    if (this.registrationForm.valid) {
      this.userService.createUser(this.registrationForm.value).subscribe(
        () => {
          this.router.navigate(['/success']);
        }
      );
    }
  }
  uploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      this.http.post('http://localhost:9100/library/api/uploadFile', formData, { responseType: 'text' })
        .subscribe({
          next: (response) => {
            console.log("Uploaded Successfully:", response);
            let url=response.substring(43);
            this.registrationForm.get('image')!.setValue(url);
          },
          error: (error) => console.error("Upload Error:", error)
        });
    }
  }
}
