import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { CommentEditorModule } from '../shared/comment-editor/comment-editor.module';
import { IssueComponentsModule } from '../shared/issue/issue-components.module';
import { SharedModule } from '../shared/shared.module';
import { ViewIssueModule } from '../shared/view-issue/view-issue.module';
import { IssueComponent } from './issue/issue.component';
import { PhaseModerationRoutingModule } from './phase-moderation-routing.module';
import { PhaseModerationComponent } from './phase-moderation.component';
import { CardViewModule } from '../shared/card-view/card-view.module';

@NgModule({
  imports: [
    PhaseModerationRoutingModule,
    SharedModule,
    IssueComponentsModule,
    CommentEditorModule,
    ViewIssueModule,
    MarkdownModule.forChild(),
    CardViewModule
  ],
  declarations: [PhaseModerationComponent, IssueComponent]
})
export class PhaseModerationModule {}
