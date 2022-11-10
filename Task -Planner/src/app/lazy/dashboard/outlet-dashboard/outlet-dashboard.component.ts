import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserModel } from "@lct/models/user.model";
import { TodoState } from "@lct/store/todo.state";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
@Component({
    templateUrl: "./outlet-dashboard.component.html",
    styleUrls: ["./outlet-dashboard.component.scss"],
})
export class OutletDashboardComponent {
    user: any;

    @Select(TodoState.numUncheckedTodos)
    uncheckedTodos: Observable<number>;

    constructor(private _store: Store, private _router: Router) {
        this._store
            .select((state) => state.user)
            .subscribe((user) => {
                this.user = user;
            });
    }

    public logOut() {
        this._router.navigate(["login"]);
    }

    public notAvailableMessage() {
        alert("This page is not available");
    }
}
