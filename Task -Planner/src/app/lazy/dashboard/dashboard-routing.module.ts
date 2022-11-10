import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { OutletDashboardComponent } from '@lct/lazy/dashboard/outlet-dashboard/outlet-dashboard.component';
import { OutletTodoComponent } from '@lct/lazy/todo/outlet-todo/outlet-todo.component';
import { OutletPostsComponent } from '@lct/lazy/posts/outlet-posts/outlet-posts.component';

const routes: Route[] = [
    {
        path: '',
        component: OutletDashboardComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'posts'
            },
            {
                path: 'todos',
                component: OutletTodoComponent
            }, {
                path: 'posts',
                component: OutletPostsComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule { }
