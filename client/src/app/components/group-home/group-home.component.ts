import { Component, DestroyRef, Input, inject, signal } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Subject, Subscription, switchMap } from 'rxjs';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';

import { BuildFormByModalFormTypeService } from '../../services/build-form-by-modal-form-type.service';
import { ClassModel } from '../../interfaces/class.model';
import { ClassService } from '../../services/class.service';
import {
  FormType,
  IModalRef,
  ModalFailMessage,
  ModalSuccesMessage,
} from '../../interfaces/form.model';
import { GradeModel_Get } from '../../interfaces/grade.model';
import { GradeService } from '../../services/grade.service';
import { GroupClassesComponent } from './group-classes/group-classes.component';
import { GroupGradesComponent } from './group-grades/group-grades.component';
import { GroupModel } from '../../interfaces/group.model';
import { GroupStudentsComponent } from './group-students/group-students.component';
import { ModalCreateFormComponent } from '../modal-create-form/modal-create-form.component';
import { StudentModel } from '../../interfaces/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-group-home',
  standalone: true,
  templateUrl: './group-home.component.html',
  styleUrl: './group-home.component.scss',
  imports: [
    GroupClassesComponent,
    GroupStudentsComponent,
    GroupGradesComponent,
    MdbModalModule,
  ],
})
export class GroupHomeComponent {
  @Input()
  set group_id_param(group_id_param: string) {
    this.group_id.set(group_id_param);
    this.initializeTriggers({ group_id: group_id_param });
  }

  public group_id = signal<string>('');

  private buildModalFormService = inject(BuildFormByModalFormTypeService);
  private classService = inject(ClassService);
  private gradeService = inject(GradeService);
  private modalService = inject(MdbModalService);
  private studentService = inject(StudentService);
  private destroyRef = inject(DestroyRef);

  private modalCreateRef: MdbModalRef<ModalCreateFormComponent> | null = null;

  // Signals with business data
  public classes = signal<ClassModel[]>([]);
  public students = signal<StudentModel[]>([]);
  public grades = signal<GradeModel_Get[]>([]);

  // Subjects triggers
  private getClassesTrigger$ = new Subject<void>();
  private getStudentsTrigger$ = new Subject<void>();
  private getGradesTrigger$ = new Subject<void>();

  private deleteClassesTrigger$ = new Subject<string>();
  private deleteStudentsTriggers$ = new Subject<string>();
  private deleteGradesTriggers$ = new Subject<string>();

  // Main subscription
  private triggersSubscription = new Subscription();

  private initializeTriggers({ group_id }: Pick<GroupModel, 'group_id'>) {
    this.resetSubscription();

    // Set up subscriptions and triggers
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

    const studentsSubscription = this.getStudentsTrigger$
      .pipe(
        switchMap(() =>
          this.studentService.getAllStudentsFromGroup({
            group_id,
          })
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((studentData) => this.students.set(studentData.data));

    const gradesSubscription = this.getGradesTrigger$
      .pipe(
        switchMap(() =>
          this.gradeService.getAllGradesFromGroup(
            { group_id },
            new HttpParams().set('limit', 5)
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((gradeData) => this.grades.set(gradeData.data));

    this.deleteClassesTrigger$
      .pipe(
        switchMap((class_id) =>
          this.classService.deleteClassById({
            group_id,
            class_id,
          })
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.getClassesTrigger$.next());

    this.deleteStudentsTriggers$
      .pipe(
        switchMap((student_id) =>
          this.studentService.deleteStudentById({
            group_id,
            student_id,
          })
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.getStudentsTrigger$.next());

    this.deleteGradesTriggers$
      .pipe(
        switchMap((student_grades_id) =>
          this.gradeService.deleteGradeById({ group_id, student_grades_id })
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.getGradesTrigger$.next();
      });

    // Add subscriptions to main stream
    this.triggersSubscription.add(classesSubscription);
    this.triggersSubscription.add(studentsSubscription);
    this.triggersSubscription.add(gradesSubscription);

    // Initialize first call
    this.getClassesTrigger$.next();
    this.getStudentsTrigger$.next();
    this.getGradesTrigger$.next();
  }

  private resetSubscription() {
    this.triggersSubscription.unsubscribe();
    this.triggersSubscription = new Subscription();
  }

  public removeEntityFromGroup(credentials: {
    type: 'student' | 'class' | 'grade';
    id: string;
  }): void {
    switch (credentials.type) {
      case 'student':
        this.deleteStudentsTriggers$.next(credentials.id);
        break;
      case 'class':
        this.deleteClassesTrigger$.next(credentials.id);
        break;
      case 'grade':
        this.deleteGradesTriggers$.next(credentials.id);
        break;
    }
  }

  public openModalForm(entity_type: FormType) {
    console.log("tentative d'ouverture");
    this.modalCreateRef = this.modalService.open<
      ModalCreateFormComponent,
      IModalRef
    >(ModalCreateFormComponent, {
      data: {
        group_id: this.group_id(),
        title: 'Ajouter un étudiant',
        labelsByInput: {
          firstname: 'Prénom',
          lastname: 'Nom',
          email: 'Email',
        },
        placeholdersByInput: {
          firstname: 'Entrez le prénom',
          lastname: 'Entrez le nom',
          email: "Entrez l'email",
        },
        ...(entity_type === 'class' && {
          title: 'Ajouter une matière',
          labelsByInput: {
            name: 'Nom de la matière',
            coefficient: 'Coefficient',
          },
          placeholdersByInput: {
            name: 'Entrez le nom',
            coefficient: 'Entrez le coefficient',
          },
        }),
        entityToCreate: entity_type,
        modalFormGroup:
          this.buildModalFormService.buildFormByModalFormType(entity_type),
      },
    });

    this.modalCreateRef.onClose.subscribe(
      (message: ModalFailMessage | ModalSuccesMessage) => {
        if (!message.isSuccess) return;
        console.log(message.message);

        if (entity_type === 'class') {
          this.getClassesTrigger$.next();
        }

        this.getStudentsTrigger$.next();
      }
    );
  }
}
