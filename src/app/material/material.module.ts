import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule, MatMenuModule,
  MatSelectModule, MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';

const  MaterialComponents = [
  MatDialogModule,
  MatButtonModule,
  MatSelectModule,
  MatInputModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatCardModule,
  MatMenuModule,
  MatInputModule,
  MatTableModule
];

@NgModule({
  exports: [MaterialComponents],
  imports: [MaterialComponents]
})
export class MaterialModule { }
