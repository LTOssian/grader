import { Component, EventEmitter, Output, input, signal } from '@angular/core';

import { AssetPath } from '../../../../assets/assets-path';
import { ClassModel } from '../../../interfaces/class.model';
import { EntityAddButtonComponent } from '../entity-add-button/entity-add-button.component';
import { EmptyComponent } from '../../empty/empty.component';

@Component({
  selector: 'app-group-classes',
  standalone: true,
  templateUrl: './group-classes.component.html',
  styleUrl: './group-classes.component.scss',
  imports: [EntityAddButtonComponent, EmptyComponent],
})
export class GroupClassesComponent {
  public classes = input.required<ClassModel[]>();
  @Output() onDeleteClick: EventEmitter<{ type: 'class'; id: string }> =
    new EventEmitter();

  public classEmptyText = signal<string>('Aucune matière.');
  public assetsStore = {
    trashSvg: {
      path: AssetPath.TRASH,
      alt: 'Icône de poubelle',
    },
  };

  public deleteClass({ class_id }: Pick<ClassModel, 'class_id'>): void {
    this.onDeleteClick.emit({ type: 'class', id: class_id });
  }
}
