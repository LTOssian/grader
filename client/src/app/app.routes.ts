import { Routes } from '@angular/router';
import { GroupHomeComponent } from './components/group-home/group-home.component';
import { EmptyComponent } from './components/empty/empty.component';

export const routes: Routes = [
  {
    path: '',
    component: EmptyComponent,
    data: { emptyIndication: 'Sélectionnez ou ajoutez un groupe' },
  },
  {
    path: 'group/:group_id',
    component: GroupHomeComponent,
    data: {
      gradeEmptyIndication: 'Aucun bulletin généré',
      studentEmptyIndication: 'Aucun étudiant.',
      classEmptyIndiciation: 'Aucune matière.',
    },
  },
];
