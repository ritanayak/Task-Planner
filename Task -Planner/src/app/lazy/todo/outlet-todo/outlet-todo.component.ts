import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ApiService } from "@lct/api/api.service";
import { TodoModel } from "@lct/models/todo.model";
import { Todo } from "@lct/store/todo.action";
import { TodoState } from "@lct/store/todo.state";
import { User } from "@lct/store/user.actions";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: "outlet-todo",
    templateUrl: "./outlet-todo.component.html",
    styleUrls: ["./outlet-todo.component.scss"],
})
export class OutletTodoComponent implements OnInit {
    user: any;
    filterType = "All";

    @Select(TodoState.getTodos)
    todos: Observable<TodoModel[]>;

    @Select(TodoState.getCompletedTodos)
    getCompletedTodos: Observable<TodoModel[]>;

    @Select(TodoState.getCompletedTodayTodos)
    getCompletedTodayTodos: Observable<TodoModel[]>;

    @Select(TodoState.getUnCompletedTodos)
    getUnCompletedTodos: Observable<TodoModel[]>;

    public constructor(private _store: Store, private _apiService: ApiService) {
        this._store
            .select((state) => state.user)
            .subscribe((user) => {
                this.user = user;
            });

    }

    ngOnInit(): void {
        this._apiService
            .get("/todos")
            .pipe(
                map(
                    (
                        resp: {
                            userId: string;
                            completed: boolean;
                            id: string;
                            completedDate: string;
                            title: string;
                        }[]
                    ) => {
                        return resp
                            .filter((x) => x.userId == this.user.id)
                            .map((x) => {
                                return {
                                    id: x.id,
                                    title: x.title,
                                    completed: x.completed,
                                    completedDate: x.completed ? this.randomDate(new Date(2021, 0, 1), new Date()) : null,
                                };
                            });
                    }
                )
            )
            .subscribe((tasks: any) => {
                this._store
                    .dispatch(new Todo.Initialize(tasks))
                    .subscribe(() => {});
            });
    }

    toggleTodo(todo: TodoModel) {
        this._store.dispatch(new Todo.ToggleTodo(todo));
    }

    randomDate(start, end) {
        const randomDate =  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        randomDate.setHours(0,0,0,0);
        return randomDate
    }
}
