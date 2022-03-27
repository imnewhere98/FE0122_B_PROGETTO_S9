import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import * as ToDoFunction from '../task.service';

@Component({
  selector: 'app-tasktodo',
  templateUrl: './tasktodo.component.html',
  styleUrls: ['./tasktodo.component.scss']
})
export class TasktodoComponent implements OnInit {


  task!: Todo[];
  newTaskTitle:string | undefined
  constructor() {
    ToDoFunction.get().then(todos=>this.task = todos.filter(todo=>!todo.completed))
   }

  ngOnInit(): void {
  }
  async addTask(){
    const nTodo =  await ToDoFunction.add({title:this.newTaskTitle as string,completed:false})
    this.task.push(nTodo);
    this.newTaskTitle = ''
   }

   async completeTask(todo:Todo,i:number){
    await ToDoFunction.update({completed:true},todo.id)
    this.task.splice(i,1)
  }


}
