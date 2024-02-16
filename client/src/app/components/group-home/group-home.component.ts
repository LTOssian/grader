import {
  Component,
  DestroyRef,
  Input,
  inject,
  input,
  signal,
} from '@angular/core';

import { Subject, Subscription, switchMap } from 'rxjs';

import { ClassModel } from '../../interfaces/class.model';
import { ClassService } from '../../services/class.service';
import { GroupModel } from '../../interfaces/group.model';
import { StudentModel } from '../../interfaces/student.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-group-home',
  standalone: true,
  imports: [],
  templateUrl: './group-home.component.html',
  styleUrl: './group-home.component.scss',
})
export class GroupHomeComponent {
  @Input()
  set group_id(group_id: string) {
    this.initializeTriggers({ group_id });
  }

  private classService = inject(ClassService);
  private studentService = inject(StudentService);
  private destroyRef = inject(DestroyRef);

  // Signals with business data
  public classes = signal<ClassModel[]>([]);
  public students = signal<StudentModel[]>([]);

  // Subjects triggers
  private getClassesTrigger$ = new Subject<void>();
  private getStudentsTrigger$ = new Subject<void>();

  // Main subscription
  private triggersSubscription = new Subscription();

  private initializeTriggers({ group_id }: Pick<GroupModel, 'group_id'>) {
    this.resetSubscription();

    // Set up subscriptions
    const classesSubscription = this.getClassesTrigger$
      .pipe(
        switchMap(() =>
          this.classService.getAllClassesFromGroup({
            group_id,
          })
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((classData) => this.classes.set(classData.data));

    const studentSubscription = this.getStudentsTrigger$
      .pipe(
        switchMap(() =>
          this.studentService.getAllStudentsFromGroup({
            group_id,
          })
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((studentData) => this.students.set(studentData.data));

    // Add subscriptions to main stream
    this.triggersSubscription.add(classesSubscription);
    this.triggersSubscription.add(studentSubscription);

    // Initialize first call
    this.getClassesTrigger$.next();
    this.getStudentsTrigger$.next();
  }

  private resetSubscription() {
    this.triggersSubscription.unsubscribe();
    this.triggersSubscription = new Subscription();
  }
}
