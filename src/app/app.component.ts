import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'learning-crud';

  constructor(private _dialog: MatDialog){}

  openForm()
  {
    this._dialog.open(AddEditComponent);
  }

}
