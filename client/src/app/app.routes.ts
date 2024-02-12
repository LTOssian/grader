import { Routes } from '@angular/router';
import { GroupHomeComponent } from './group-home/group-home.component';

export const routes: Routes = [
  { path: 'group/:group_id', component: GroupHomeComponent },
];
