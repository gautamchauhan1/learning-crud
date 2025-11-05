import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  addTask(data:any) : Observable<any>
  {
   return this.http.post('http://localhost:3000/task', data);
  }

    editTask(id:any, data:any) : Observable<any>
  {
   return this.http.put(`http://localhost:3000/task/${id}`, data);
  }

  deleteTask(id:any) : Observable<any>
  {
    return this.http.delete(`http://localhost:3000/task/${id}`);
  }

  getTaskList() : Observable<any>
  {
    return this.http.get('http://localhost:3000/task');
  }

}
