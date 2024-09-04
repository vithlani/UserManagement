import { Component } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
import { ProfileUser } from 'src/app/models/userProfileModel';
import { AlretService } from 'src/app/services/alret.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  userForm: FormGroup;
  profileData!: ProfileUser;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private formValidationService: FormValidationService,
    private alertService: AlretService
  ) {
    this.userForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      firstName: ['', [Validators.minLength(5), Validators.maxLength(30)]],
      lastName: ['', [Validators.minLength(5), Validators.maxLength(30)]],
      dob: ['', [this.minAgeValidator(15)]],
    });
  }

  ngOnInit() {
    this.getProfileDetails();
  }

  getProfileDetails() {
    this.userService.getUserProfile().subscribe({
      next: (response: any) => {
        this.profileData = response;
        this.setFormControls();
        console.log('Response', response);
      },
      error: (error) => {
        console.log('In error', error);
      },
    });
  }

  updateProfileDetails() {
    this.profileData = this.userForm.value;
    this.userService.putUserProfile(this.profileData).subscribe({
      next: (response: any) => {
        this.alertService.showSuccessMessage(
          'User detail updated successfully!'
        );
        console.log('Response', response);
      },
      error: (error) => {
        this.alertService.showErrorMessage(error.message);
        console.log('In error', error);
      },
    });
  }
  setFormControls() {
    // Setting controls with initial values and validators
    this.userForm.get('username')?.setValue(this.profileData?.username || '');

    this.userForm.get('email')?.setValue(this.profileData?.email || '');

    this.userForm.get('firstName')?.setValue(this.profileData?.firstName || '');
    this.userForm.get('lastName')?.setValue(this.profileData?.lastName || '');

    this.userForm.get('dob')?.setValue(this.profileData?.dateOfBirth || '');
  }

  // FIELD ERROR
  fieldHasError(fieldName: string): boolean {
    return this.formValidationService.fieldHasError(fieldName, this.userForm);
  }
  // FIELD ERROR MESSAGE
  getErrorMessage(fieldName: string): string {
    return this.formValidationService.getErrorMessage(fieldName, this.userForm);
  }

  save() {
    if (this.userForm.valid) {
      this.updateProfileDetails();
    }
  }

  // Custom validator to check if the date of birth is at least 15 years ago
  minAgeValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateOfBirth = control.value;
      if (!dateOfBirth) return null;

      const today = new Date();
      const fifteenYearsAgo = new Date(
        today.getFullYear() - minAge,
        today.getMonth(),
        today.getDate()
      );

      return dateOfBirth > fifteenYearsAgo ? { minAge: true } : null;
    };
  }
}
