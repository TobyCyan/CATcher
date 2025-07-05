import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatorLocalStorageDirective } from '../../core/directives/paginator-local-storage.directive';
import { MaterialModule } from '../material.module';
import { IssueTemplateTablesComponent } from './issue-template-tables.component';

@NgModule({
  exports: [IssueTemplateTablesComponent],
  declarations: [IssueTemplateTablesComponent, PaginatorLocalStorageDirective],
  imports: [CommonModule, MaterialModule, RouterModule]
})
export class IssueTablesModule {}
