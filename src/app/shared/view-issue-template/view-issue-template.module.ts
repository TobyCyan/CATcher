import { MarkdownModule } from 'ngx-markdown';
import { LabelDropdownModule } from '../label-dropdown/label-dropdown.module';
import { SharedModule } from '../shared.module';
import { ParseErrorModule } from '../view-issue/parse-error/parse-error.module';
import { CommonModule } from '@angular/common';
import { ViewIssueTemplateComponent } from './view-issue-template.component';
import { NgModule } from '@angular/core';
import { CommentEditorModule } from '../comment-editor/comment-editor.module';
import { IssueTemplateComponentsModule } from '../issue-template/issue-template-components.module';

@NgModule({
  exports: [ViewIssueTemplateComponent],
  declarations: [ViewIssueTemplateComponent],
  imports: [
    CommonModule,
    ParseErrorModule,
    SharedModule,
    LabelDropdownModule,
    MarkdownModule.forChild(),
    CommentEditorModule,
    IssueTemplateComponentsModule
  ]
})
export class ViewIssueTemplateModule {}
