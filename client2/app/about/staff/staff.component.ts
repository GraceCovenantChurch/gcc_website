import { Component, OnInit } from '@angular/core';
import { AboutService } from '../about.service';
import { Staff } from '../staff';

@Component({
  selector: 'staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  constructor(private aboutService : AboutService) { }

  staffList : Staff[];

  ngOnInit() {
    this.aboutService.getStaff()
      .subscribe(staff => this.staffList = staff);
  }

}
