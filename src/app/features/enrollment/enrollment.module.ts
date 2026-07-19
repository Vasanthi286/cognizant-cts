import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveEnrollmentComponent } from './components/reactive-enrollment/reactive-enrollment.component';
import { unsavedChangesGuard } from '../../guards/unsaved-changes.guard';

@NgModule({
  declarations: [
    ReactiveEnrollmentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'reactive',
        component: ReactiveEnrollmentComponent,
        canDeactivate: [unsavedChangesGuard]
      },
      {
        path: '',
        redirectTo: 'reactive',
        pathMatch: 'full'
      }
    ])
  ]
})
export class EnrollmentModule { }
