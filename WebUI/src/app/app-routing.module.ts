import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AllTasksComponent } from "./views/all-tasks/all-tasks.component";

const routes: Routes = [
  { path: 'tasks', component: AllTasksComponent },
  { path: '', redirectTo: '/tasks',  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
