import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject, signal } from '@angular/core';

import { StudentService } from '../services/student.service';
import { Observable, catchError, map, of } from 'rxjs';

export const studentHasClassesGuard: CanActivateFn = (
  route,
  state
): Observable<boolean | UrlTree> => {
  const studentService = inject(StudentService);
  const router = inject(Router);

  const student_id = route.params['student_id_param'];

  return studentService
    .getFormValuesByStudentId({ student_id: student_id })
    .pipe(
      map(({ data }) => {
        return data.classes ? data.classes.length > 0 : false;
      }),
      catchError(() => {
        return of(router.createUrlTree(['/']));
      })
    );
};
