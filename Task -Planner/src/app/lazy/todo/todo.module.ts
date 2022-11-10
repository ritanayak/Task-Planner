import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutletTodoComponent } from './outlet-todo/outlet-todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@lct/ui/material.module';

const COMPONENTS = [OutletTodoComponent];

@NgModule({
    declarations: [
        ...COMPONENTS
    ],
    exports: [...COMPONENTS],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class TodoModule { }
