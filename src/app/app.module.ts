import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import {FacultyService} from './services/faculty/faculty.service';
import {ClassService} from './services/class/class.service';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ViewFacultyComponent } from './components/view-faculty/view-faculty.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {TimetableService} from './services/timetable/timetable.service';
import {MaterialModule} from './material/material.module';
import {MatButtonToggleModule, MatCardModule, MatMenuModule, MatTabsModule} from '@angular/material';
import { AssignFacultyComponent } from './components/assign-faculty/assign-faculty.component';
import { ManageClassComponent } from './components/manage-class/manage-class.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    ViewFacultyComponent,
    AssignFacultyComponent,
    ManageClassComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'AngularFS'),
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    MaterialModule
  ],
  entryComponents: [
  ],
  providers: [
    FacultyService,
    ClassService,
    TimetableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
