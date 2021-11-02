import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

import { ApiserviceService } from '../../ApiService/apiservice.service';
import { Apimodel } from '../../ApiService/apimodel.model';

declare var M: any;
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  data: any = [];
  id: string;
  idData: any;
  SessionData;
  newobject: any;


  constructor(public ApiserviceService: ApiserviceService, private SpinnerService: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.refresApiList();

    this.SessionData = sessionStorage.getItem('SubmitData');
    //console.log(this.SessionData) //currentDate

  };


  refresApiList() {
    this.SpinnerService.show();
    this.ApiserviceService.getData().subscribe((res) => {
      this.ApiserviceService.apimodels = res as Apimodel[];
      this.data = this.ApiserviceService.apimodels;
      // console.log(this.data)
      this.newobject = Object.assign({}, ...this.data);
      sessionStorage.setItem("SubmitData", JSON.stringify(this.newobject))
      // console.log("Console.Data", JSON.stringify(this.newobject.currentDate))
      this.SpinnerService.hide();
    });
  };


  onDelete(id: string) {
    if (confirm('Are you sure to delete this record') == true) {
      this.ApiserviceService.deleteData(id).subscribe((res) => {
        this.refresApiList();
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    };
  };

};
