import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router'

import { ApiserviceService } from '../../ApiService/apiservice.service';

@Component({
  selector: 'app-show-with-id',
  templateUrl: './show-with-id.component.html',
  styleUrls: ['./show-with-id.component.css']
})
export class ShowWithIdComponent implements OnInit {
  idData: any;
  id: any;
  newobject: any;
  number: string = '1234567890123456';
  newnum;

  constructor(
    public ApiserviceService: ApiserviceService,
    private ActivatedRoute: ActivatedRoute,
    public route: Router
  ) {
    let dummyTxt = this.number;

    let joy = dummyTxt.match(/.{1,4}/g);
    this.newnum = joy.join(' ')
  };

  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      this.onVisibility(this.id);
    });
  };

  onVisibility(id: any) {
    this.ApiserviceService.getById(id).subscribe((res) => {
      this.idData = res;
      this.newobject = Object.assign({}, ...this.idData);
      //console.log(this.newobject.Mobile)
    });
  };

  onDelete(id: string) {
    if (confirm('Are you sure to delete this record') == true) {
      this.ApiserviceService.deleteData(id).subscribe((res) => {
        this.route.navigateByUrl('show');
      });
    };
  };

};
/////angular pharm concept
