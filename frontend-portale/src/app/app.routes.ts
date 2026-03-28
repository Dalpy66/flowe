import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Login } from './components/pages/login/login';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { ManagmentGarden } from './components/pages/managment-garden/managment-garden';
import { Register } from './components/pages/register/register';

export const routes: Routes = [
    {
        path: "home",
        title: "home",
        component: Home
    },
    {
        path: "login",
        component: Login
    },
    {
        path: "register",
        component: Register
    },
    {
        path: "dashboard",
        component: Dashboard
    },
    {
        path: "managmentGarden",
        component: ManagmentGarden
    },
    {
        path: "**",
        component: Login
    }
];