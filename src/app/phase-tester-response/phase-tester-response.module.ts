import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from '../shared/shared.module';
import { ViewIssueModule } from '../shared/view-issue/view-issue.module';
import { IssueAcceptedComponent } from './issue-accepted/issue-accepted.component';
import { IssueFaultyComponent } from './issue-faulty/issue-faulty.component';
import { IssuePendingComponent } from './issue-pending/issue-pending.component';
import { IssueRespondedComponent } from './issue-responded/issue-responded.component';
import { IssueComponent } from './issue/issue.component';
import { PhaseTesterResponseRoutingModule } from './phase-tester-response-routing.module';
import { PhaseTesterResponseComponent } from './phase-tester-response.component';
import { CardViewModule } from '../shared/card-view/card-view.module';

@NgModule({
  exports: [PhaseTesterResponseComponent],
  declarations: [
    PhaseTesterResponseComponent,
    IssueComponent,
    IssuePendingComponent,
    IssueRespondedComponent,
    IssueAcceptedComponent,
    IssueFaultyComponent
  ],
  imports: [CommonModule, PhaseTesterResponseRoutingModule, SharedModule, ViewIssueModule, CardViewModule, MarkdownModule.forChild()]
})
export class PhaseTesterResponseModule {}
