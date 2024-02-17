import { Component, DestroyRef, Input, inject, signal } from '@angular/core';

import { Subject, Subscription, switchMap } from 'rxjs';

import { GradeModel_Get } from '../../interfaces/grade.model';
import { GradeService } from '../../services/grade.service';
import { GroupModel } from '../../interfaces/group.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GroupGradesComponent } from '../group-home/group-grades/group-grades.component';

@Component({
  selector: 'app-grades-page',
  standalone: true,
  templateUrl: './grades-page.component.html',
  styleUrl: './grades-page.component.scss',
  imports: [GroupGradesComponent],
})
export class GradesPageComponent {
  private destroyRef = inject(DestroyRef);
  private gradeService = inject(GradeService);
  @Input()
  set group_id_param(group_id_param: string) {
    this.group_id.set(group_id_param);
    this.initializeTriggers({ group_id: group_id_param });
  }

  public group_id = signal<string>('');
  public grades = signal<GradeModel_Get[]>([]);

  private getGradesTrigger$ = new Subject<void>();
  private deleteGradesTrigger$ = new Subject<string>();
  private triggersSubscription = new Subscription();

  /**
   * Initializes get and delete triggers
   * @param param0 contains group_id
   */
  private initializeTriggers({ group_id }: Pick<GroupModel, 'group_id'>) {
    this.resetSubcription();

    const gradesSubscription = this.getGradesTrigger$
      .pipe(
        switchMap(() =>
          this.gradeService.getAllGradesFromGroup({ group_id: this.group_id() })
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((gradeData) => this.grades.set(gradeData.data));

    this.deleteGradesTrigger$
      .pipe(
        switchMap((student_grades_id) =>
          this.gradeService.deleteGradeById({ group_id, student_grades_id })
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.getGradesTrigger$.next());

    this.triggersSubscription.add(gradesSubscription);

    this.getGradesTrigger$.next();
  }

  /**
   * Removes and resets main subscription
   */
  private resetSubcription() {
    this.triggersSubscription.unsubscribe();
    this.triggersSubscription = new Subscription();
  }

  /**
   * Sends delete grade request
   * @param credentials contains type 'grade' and grade's id
   */
  public removeGradeFromGroup(credentials: { type: 'grade'; id: string }) {
    this.deleteGradesTrigger$.next(credentials.id);
  }
}
