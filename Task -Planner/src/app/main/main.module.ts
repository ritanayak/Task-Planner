import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './components/body/body.component';
import { RouterModule } from '@angular/router';
import { MainRoutingModule } from '@lct/main/main-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { UserState } from '@lct/store/user.state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { TodoState } from '@lct/store/todo.state';

const COMPONENTS = [
    BodyComponent
];

@NgModule({
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ],
    imports: [
        CommonModule,
        RouterModule,
        MainRoutingModule,
        HttpClientModule,
        NgxsModule.forRoot([ UserState, TodoState ]),
        NgxsLoggerPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot()
    ],
})
export class MainModule { }
