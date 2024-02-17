import { Routes } from '@angular/router';
import { GroupHomeComponent } from './components/group-home/group-home.component';
import { EmptyComponent } from './components/empty/empty.component';
import { GradesPageComponent } from './components/grades-page/grades-page.component';
import { GradeCreateFormComponent } from './components/grade-create-form/grade-create-form.component';

export const routes: Routes = [
  {
    path: '',
    component: EmptyComponent,
    data: { emptyIndication: 'Sélectionnez ou ajoutez un groupe' },
  },
  {
    path: 'group/:group_id_param',
    component: GroupHomeComponent,
  },
  {
    path: 'grades/:group_id_param',
    component: GradesPageComponent,
  },
  {
    path: 'student/:student_id',
    component: GradeCreateFormComponent,
  },
];
