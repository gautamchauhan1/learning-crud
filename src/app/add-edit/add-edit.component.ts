import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { CoreService } from '../services/core.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {

  taskForm : FormGroup;
  constructor(
    private _fb: FormBuilder,
    private service: TaskService,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  

  ){
    this.taskForm = this._fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      dob:['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.taskForm.patchValue(this.data);
  }

  FormDetailsSubmit()
  {
    if(this.taskForm.valid)
    {

      if(this.data)
      {

        this.service.editTask(this.data.id, this.taskForm.value).subscribe({
          next: (data:any)=>
          {
            this._coreService.openSnackBar('Task updated!');
            this._dialogRef.close(true); 
          }
        })

      }

      else
      {
    this.service.addTask(this.taskForm.value).subscribe({
      next: (data:any)=>
      {
        this._coreService.openSnackBar("Task Added Successfully!");
        this._dialogRef.close();
        console.log(data);
      },
      error: (err:any)=>
      {
        console.log(err);   
      } 
    })
      }
     }
  }

}
