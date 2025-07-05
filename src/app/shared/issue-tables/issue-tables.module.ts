import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { IssueTablesComponent } from './issue-tables.component';
import { SharedModule } from '../shared.module';

@NgModule({
  exports: [IssueTablesComponent],
  declarations: [IssueTablesComponent],
  imports: [CommonModule, MaterialModule, RouterModule, SharedModule]
})
export class IssueTablesModule {}
