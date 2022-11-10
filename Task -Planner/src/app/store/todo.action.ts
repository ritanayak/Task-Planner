import { TodoModel } from "@lct/models/todo.model";

export namespace Todo {
    export class Initialize {
        public static readonly type: string = "[Todo] initialize";

        public constructor(public todos: TodoModel[]) {}
    }

    export class ToggleTodo {
        static readonly type = "[TODO] Toggle Todo";

        constructor(public todo: TodoModel) {}
    }
}
