import { MarkdownModule } from 'ngx-markdown';
import { LabelDropdownModule } from '../label-dropdown/label-dropdown.module';
import { SharedModule } from '../shared.module';
import { ParseErrorModule } from '../view-issue/parse-error/parse-error.module';
import { CommonModule } from '@angular/common';
import { ViewIssueTemplateComponent } from './view-issue-template.component';
import { NgModule } from '@angular/core';

@NgModule({
  exports: [ViewIssueTemplateComponent],
  declarations: [ViewIssueTemplateComponent],
  imports: [CommonModule, ParseErrorModule, SharedModule, LabelDropdownModule, MarkdownModule.forChild()]
})
export class ViewIssueTemplateModule {}
