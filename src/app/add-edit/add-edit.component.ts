import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent {

  taskForm : FormGroup;
  constructor(
    private _fb: FormBuilder,
    private service: TaskService,
    private _coreService: CoreService
  ){
    this.taskForm = this._fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      dob:['', Validators.required],
    })
  }

  FormDetailsSubmit()
  {
    if(this.taskForm.valid)
    {
    this.service.addTask(this.taskForm.value).subscribe({
      next: (data:any)=>
      {
        this._coreService.openSnackBar("Task Added Successfully!");
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
