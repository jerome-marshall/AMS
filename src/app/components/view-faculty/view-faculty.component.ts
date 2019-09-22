import { Component, OnInit } from '@angular/core';
import {Faculty} from '../../models/faculty';
import {FacultyService} from '../../services/faculty/faculty.service';
import { AuthenticationService} from '../../services/auth/authentication.service';
import {MatDialog} from '@angular/material';
@Component({
  selector: 'app-view-faculty',
  templateUrl: './view-faculty.component.html',
  styleUrls: ['./view-faculty.component.css']
})
export class ViewFacultyComponent implements OnInit {
  faculty: Faculty[];
  fac: Faculty;
  addState = false;
  name: string;
  email: string;
  password: string;
  uID: string;

  constructor(private facultyService: FacultyService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.facultyService.getFaculty().subscribe(faculties => {
      this.faculty = faculties;
    });
    this.setFaculty();
  }

  openDialog(event) {
    this.addState = true;
  }

  clearState() {
    this.addState = false;
    this.name = null;
    this.email = null;
    this.password = null;
  }

  addFaculty() {
    this.authService.signUp(this.email, this.password).then(result => {
      this.uID = result;
      console.log(this.uID);

      this.fac = {
        name: this.name,
        email: this.email,
        id: this.uID,
        password: this.password
      };
      this.facultyService.addFaculty(this.fac);
      this.clearState();
    });
  }

  setFaculty() {
    console.log('setFaculty');
    this.facultyService.setFaculty(this.faculty);
  }
}
