import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';


@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {
  user:User;
  updateProfileForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router,private http: HttpClient) {
    this.updateProfileForm = this.fb.group({
      id_user:[''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email, this.espritEmailValidator]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],  
      sexe: ['', Validators.required],
      password: ['', Validators.required],
      specialty: ['', Validators.required], 
      image:[''],
      priority: [0],  
      type: ['STUDENT'],  
      state: [''] 
    });
  }
  ngOnInit(): void {
    const id=localStorage.getItem("userId");
    this.userService.getUserById(Number(id)).subscribe(
        (res)=>{
            this.user=res;
            this.updateProfileForm.patchValue({
              id_user:this.user.id_user,
              firstname: this.user.firstname,
              lastname: this.user.lastname,
              mail: this.user.mail,
              phone: this.user.phone,
              state:this.user.state,
              password: this.user.password,
              image:this.user.image,
              specialty: this.user.specialty,
              sexe: this.user.sexe
            });
          });
        }

  espritEmailValidator(control: AbstractControl): { [key: string]: any } | null {
    const email = control.value;
    return email && email.endsWith('@esprit.tn') ? null : { 'emailDomain': true };
  }

  onSubmit() {
    this.updateProfileForm.value.specialty = Number(this.updateProfileForm.value.specialty);
    if (this.updateProfileForm.valid) {
      this.userService.updateUser(this.updateProfileForm.value).subscribe(
        () => {
          this.router.navigate(['etudiant/profile']);
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
            this.updateProfileForm.get('image')!.setValue(url);
          },
          error: (error) => console.error("Upload Error:", error)
        });
    }
  }
}
