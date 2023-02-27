import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos!: Todo[];
  showValidationErrors!: boolean;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos = this.todoService.getAllTodos();
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) this.showValidationErrors = true;
    this.todoService.addTodo(new Todo(form.value.text));
    this.showValidationErrors = false;
    form.reset();
  }
}
