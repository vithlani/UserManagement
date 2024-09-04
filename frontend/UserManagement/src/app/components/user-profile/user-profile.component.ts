import { Component } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileUser } from 'src/app/models/userProfileModel';
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
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.getProfileDetails();
  }

  getProfileDetails() {
    this.userService.getUserProfile().subscribe({
      next: (response: any) => {
        this.profileData = response;
        console.log('Response', response);
      },
      error: (error) => {
        console.log('In error', error);
      },
    });
  }

  updateProfileDetails() {
    this.userService.putUserProfile(this.profileData).subscribe({
      next: (response: any) => {
        console.log('Response', response);
      },
      error: (error) => {
        console.log('In error', error);
      },
    });
  }
  setFormControls() {
    // Setting controls with initial values and validators
    this.userForm.setControl(
      'username',
      new FormControl(
        {
          value: this.profileData?.userName || '',
          disabled: this.profileData.userName ? true : false,
        },
        [Validators.required, Validators.minLength(5), Validators.maxLength(30)]
      )
    );

    this.userForm.setControl(
      'email',
      new FormControl(
        {
          value: this.profileData?.email || '',
          disabled: this.profileData.email ? true : false,
        },
        [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(30),
        ]
      )
    );
    this.userForm.setControl(
      'firstName',
      new FormControl(
        {
          value: this.profileData?.firstName || '',
          disabled: this.profileData.firstName ? true : false,
        },
        [Validators.minLength(5), Validators.maxLength(30)]
      )
    );
    this.userForm.setControl(
      'lastName',
      new FormControl(
        {
          value: this.profileData?.lastName || '',
          disabled: this.profileData.lastName ? true : false,
        },
        [Validators.minLength(5), Validators.maxLength(30)]
      )
    );
    this.userForm.setControl(
      'dob',
      new FormControl(
        {
          value: this.profileData?.dateOfBirth || '',
          disabled: this.profileData.dateOfBirth ? true : false,
        },
        []
      )
    );
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
}
