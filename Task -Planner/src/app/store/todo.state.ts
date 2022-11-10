import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { TodoModel } from "@lct/models/todo.model";
import { Todo } from "@lct/store/todo.action";

interface TodoStateModel {
    todos: TodoModel[];
}

type TodoContext = StateContext<TodoStateModel>;

@State<TodoStateModel>({
    name: "todos",
    defaults: {
        todos: [],
    },
})
@Injectable()
export class TodoState {
    @Selector()
    static getTodos(state: TodoStateModel) {
        return state.todos;
    }

    @Selector()
    static numUncheckedTodos(state: TodoStateModel): number {
        return state.todos.filter((todo) => !todo.completed).length;
    }

    @Selector()
    static getCompletedTodos(state: TodoStateModel) {
        return state.todos.filter((todo) => todo.completed);
    }

    @Selector()
    static getCompletedTodayTodos(state: TodoStateModel) {
        const todayDate = new Date();
        todayDate.setHours(0,0,0,0);
        return state.todos.filter((todo) => todo.completed).filter((todo) => todo.completedDate.getTime() == todayDate.getTime());
    }

    @Selector()
    static getUnCompletedTodos(state: TodoStateModel) {
        return state.todos.filter((todo) => !todo.completed);
    }

    @Action(Todo.Initialize)
    public initialize(ctx: TodoContext, action: Todo.Initialize): void {

        ctx.patchState({todos:[]});
        action.todos.forEach((todo) => {
            ctx.patchState({
                todos: [todo, ...ctx.getState().todos],
            });
        });
        console.log(ctx);
        console.log(action);
    }

    @Action(Todo.ToggleTodo)
    toggleTodo(ctx: StateContext<TodoStateModel>, action: Todo.ToggleTodo) {
        const todo = action.todo;
        todo.completed = !todo.completed;
        if(todo.completed){
            const todayDate = new Date();
            todayDate.setHours(0,0,0,0);
            todo.completedDate = todayDate;
        } else {
            todo.completedDate = null;
        }
        ctx.patchState({
            todos: [...ctx.getState().todos],
        });
    }
}
