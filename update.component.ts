import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

import { ApiserviceService } from '../../ApiService/apiservice.service';

declare var M: any;

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  // data: any;
  idData: any;
  id: any;
  newobject: any;
  dateOfBirth;
  intDate;

  SubmitData;
  registerForm: FormGroup;
  show: boolean;
  submitted = false;

  Id: string;
  Title: string;
  FirstName: string;
  LastName: string;
  Mobile: string;
  Dob: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;

  constructor(
    public ApiserviceService: ApiserviceService,
    public route: Router,
    private ActivatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private SpinnerService: NgxSpinnerService
  ) {
    this.registerForm = this.formBuilder.group({
      Id: ['', Validators.required],
      Title: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Mobile: ['', Validators.required],
      Dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required],
    }, {
      validator: this.MustMatch('Password', 'ConfirmPassword')
    });
  };

  get f() { return this.registerForm.controls; }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      this.onVisibility(this.id)
    });

    this.resetForm();
  };

  resetForm(form?: NgForm) {
    this.ApiserviceService.selectedApimodel = {
      Id: "",
      Title: "",
      FirstName: "",
      LastName: "",
      Mobile: "",
      Dob: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
    };
  };

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.SubmitData = JSON.stringify({
      Id: form.value.Id,
      Title: form.value.Title,
      FirstName: form.value.FirstName,
      LastName: form.value.LastName,
      Mobile: form.value.Mobile,
      Dob: form.value.Dob,
      Email: form.value.Email,
      Password: form.value.Password,
      ConfirmPassword: form.value.ConfirmPassword,
    });
    //console.log(this.SubmitData)

    this.SpinnerService.show();
    this.show = true;

    this.ApiserviceService.putData(form.value).subscribe((res) => {
      //this.resetForm(form);
      M.toast({ html: 'Updated successfully', classes: 'rounded' });
      this.route.navigateByUrl('show');
      this.SpinnerService.hide();
    });
  };

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  onVisibility(id: any) {
    this.ApiserviceService.getById(id).subscribe((res) => {
      this.idData = res;
      this.newobject = Object.assign({}, ...this.idData);
      this.ApiserviceService.selectedApimodel = this.newobject;
      this.dateOfBirth = new Date(this.ApiserviceService.selectedApimodel.Dob).toLocaleDateString()
      this.intDate = parseInt(this.dateOfBirth)
      //console.log(this.intDate);
    });
  };

};