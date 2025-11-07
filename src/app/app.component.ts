import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TaskService } from './services/task.service';
import { CoreService } from './services/core.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'learning-crud';

  constructor(
    private _dialog: MatDialog,
    private service: TaskService,
    private _coreService: CoreService
  ) { }

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  getTaskList() {
    this.service.getTaskList().subscribe({
      next: (res: any) => {
        console.log(res);
        // ✅ Assign the data to the MatTableDataSource
        this.dataSource = new MatTableDataSource(res);
        // ✅ Attach paginator and sort
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getTaskList();
  }

  onEdit(data: any) {

    const dialogRef = this._dialog.open(AddEditComponent, { data: data });

    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getTaskList();
        }
      }
    })

  }

  onDelete(id: any) {

    const dialogRef = this._dialog.open(ConfirmDialogComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.service.deleteTask(id).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Task Deleted successfully!');
            this.getTaskList();
          },

          error: (err: any) => {
            console.log(err);
            this._coreService.openSnackBar('Error deleting Task', 'error');
          }

        })
      }
    })


  }

  openForm() {
    const dialogRef = this._dialog.open(AddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        this.getTaskList();
      }
    })
  }

}
