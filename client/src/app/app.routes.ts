import { Routes } from '@angular/router';
import { GroupHomeComponent } from './components/group-home/group-home.component';
import { EmptyHomeComponent } from './components/empty-home/empty-home.component';

export const routes: Routes = [
  { path: '', component: EmptyHomeComponent },
  { path: 'group/:group_id', component: GroupHomeComponent },
];
