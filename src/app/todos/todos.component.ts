import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos!: Todo[];
  showValidationErrors!: boolean;

  constructor(private todoService: TodoService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.todos = this.todoService.getAllTodos();
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      return (this.showValidationErrors = true);
    }
    this.todoService.addTodo(new Todo(form.value.text));
    form.reset();
    return (this.showValidationErrors = false);
  }

  setCompleted(todo: Todo) {
    todo.completed = !todo.completed;
  }

  editTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.todoService.updateTodo(index, result);
      }
    });
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todoService.deleteTodo(index);
  }
}
