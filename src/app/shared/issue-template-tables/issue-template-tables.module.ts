import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { IssueTemplateTablesComponent } from './issue-template-tables.component';
import { SharedModule } from '../shared.module';

@NgModule({
  exports: [IssueTemplateTablesComponent],
  declarations: [IssueTemplateTablesComponent],
  imports: [CommonModule, MaterialModule, RouterModule, SharedModule]
})
export class IssueTemplateTablesModule {}
