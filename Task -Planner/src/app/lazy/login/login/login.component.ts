import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ApiService } from "@lct/api/api.service";
import { User } from "@lct/store/user.actions";
import { Store } from "@ngxs/store";
import { map } from "rxjs/operators";

@Component({
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
    public form: FormGroup;

    public constructor(
        private _builder: FormBuilder,
        private _router: Router,
        private _snackBar: MatSnackBar,
        private _store: Store,
        private _apiService: ApiService
    ) {
        this.form = this._builder.group({
            username: this._builder.control("", [Validators.required]),
        });
    }

    public submit(): void {
        this._apiService
            .get("/users")
            .pipe(
                map((resp: { email: string }[]) => {
                    return resp.find(
                        (x) => x.email === this.form.controls.username.value
                    );
                })
            )
            .subscribe((valid) => {
                if (valid) {
                    this._store
                        .dispatch(new User.Initialize(valid))
                        .subscribe(() => {
                            this._router.navigate(["dashboard"]);
                        });
                } else {
                    this._snackBar.open("Username not found", "", {
                        horizontalPosition: "center",
                        verticalPosition: "top",
                        duration: 5 * 1000,
                    });
                }
            });
    }
}
