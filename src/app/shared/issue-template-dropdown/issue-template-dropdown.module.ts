import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { IssueTemplateDropdownComponent } from './issue-template-dropdown.component';

@NgModule({
  declarations: [IssueTemplateDropdownComponent],
  imports: [CommonModule, SharedModule],
  exports: [IssueTemplateDropdownComponent]
})
export class TemplateDropdownModule {}
