import { Routes } from '@angular/router';
import { GroupHomeComponent } from './components/group-home/group-home.component';
import { EmptyComponent } from './components/empty/empty.component';

export const routes: Routes = [
  { path: '', component: EmptyComponent },
  { path: 'group/:group_id', component: GroupHomeComponent },
];
