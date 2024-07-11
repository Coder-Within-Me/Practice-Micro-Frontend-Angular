import { Routes } from '@angular/router';
import { HomeComponent } from './comp/home/home.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        pathMatch:'full'
    },
    {
        path:'customer',
        loadComponent: () => import('customer-mfe/Component').then(c => c.AppComponent)
    },
    {
        path:'orders',
        loadComponent: () => import('orders-mfe/Component').then(c => c.AppComponent)
    }
];
    