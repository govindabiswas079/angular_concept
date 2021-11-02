import { Component, OnInit, Input } from '@angular/core';
// import { Directive, HostListener, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { DeviceDetectorService } from "ngx-device-detector";
import * as uuid from 'uuid';

import { ApiserviceService } from '../../ApiService/apiservice.service';

declare var qrcode;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fName: string = 'kapil';
  lName: string = 'biswas';
  mail: string = 'kapilbiswas@gmail.cpm';
  phone: number = 1234567890;
  id;
  fieldTextType: boolean;
  repeatFieldTextType: boolean;
  cnumber;

  deviceInfo = null;
  isDesktopDevice: boolean;
  isTablet: boolean;
  isMobile: boolean;
  Device_uuid;
  browser_version;
  ipAddress;

  SubmitData;
  registerForm: FormGroup;
  show: boolean = false;
  submitted = false;
  Title: string;
  FirstName: string;
  LastName: string;
  Mobile: string;
  Dob: null;
  Email: string;
  Password: string;
  ConfirmPassword: string;

  constructor(
    public ApiserviceService: ApiserviceService,
    public route: Router,
    private formBuilder: FormBuilder,
    private SpinnerService: NgxSpinnerService,
    private deviceService: DeviceDetectorService
  ) {
    this.registerForm = this.formBuilder.group({
      Title: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Mobile: ['', [Validators.required,]],
      Dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required],
    }, {
      validator: this.MustMatch('Password', 'ConfirmPassword')
    });

    const myId = uuid.v4();
    this.Device_uuid = myId
    // console.log(this.Device_uuid)
  }

  ngOnInit() {
    this.IpAddress();
    this.epicFunction();
  };

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  };

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }

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

  get f() { return this.registerForm.controls; }

  onSubmit = (form: NgForm): void => {
    const num = sessionStorage.getItem('number');
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.SubmitData = JSON.stringify({
      info: {
        Title: form.value.Title,
        FirstName: form.value.FirstName,
        LastName: form.value.LastName,
        Mobile: form.value.Mobile,
        Dob: form.value.Dob,
        Email: form.value.Email,
        Password: form.value.Password,
        ConfirmPassword: form.value.ConfirmPassword,
        cardNumber: num,
        Device_uuid: this.Device_uuid,
        browser_version: this.browser_version,
        IpAddress: this.ipAddress
      }
    });
    console.log(this.SubmitData)

    this.SpinnerService.show();
    this.show = true;
    this.ApiserviceService.postData(this.SubmitData).subscribe((res) => {
      //console.log(res)
      this.route.navigateByUrl('show');
      // window.location.replace('show')
      this.SpinnerService.hide();
      sessionStorage.removeItem('number')
    });
  };

  IpAddress() {
    this.ApiserviceService.getIp().subscribe((res) => {
      // console.log("IpAddress", res)
      this.ipAddress = res;
    });
  };

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  };

  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
    this.browser_version = this.deviceInfo.browser_version;
    // console.log("deviceInfo", this.browser_version)
  };
};