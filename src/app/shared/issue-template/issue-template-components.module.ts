import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MarkdownModule } from 'ngx-markdown';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CommentEditorModule } from '../comment-editor/comment-editor.module';
import { SharedModule } from '../shared.module';
import { DescriptionComponent } from './description/description.component';
import { LabelComponent } from './label/label.component';
import { TitleComponent } from './title/title.component';

@NgModule({
  imports: [SharedModule, CommentEditorModule, MatProgressBarModule, NgxMatSelectSearchModule, MarkdownModule.forChild()],
  declarations: [TitleComponent, DescriptionComponent, LabelComponent],
  exports: [TitleComponent, DescriptionComponent, LabelComponent]
})
export class IssueTemplateComponentsModule {}
