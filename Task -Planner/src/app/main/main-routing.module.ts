import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        loadChildren: () => import('@lct/lazy/login/login.module').then((m) => m.LoginModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('@lct/lazy/dashboard/dashboard.module').then((m) => m.DashboardModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
