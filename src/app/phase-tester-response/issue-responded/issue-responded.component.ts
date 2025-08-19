import { Component, OnInit, ViewChild } from '@angular/core';
import { Issue, STATUS } from '../../core/models/issue.model';
import { TABLE_COLUMNS } from '../../shared/issue-tables/issue-tables-columns';
import { ACTION_BUTTONS } from '../../shared/issue-tables/issue-tables.component';
import { CardViewComponent } from '../../shared/card-view/card-view.component';

@Component({
  selector: 'app-issue-responded',
  templateUrl: './issue-responded.component.html',
  styleUrls: ['./issue-responded.component.css']
})
export class IssueRespondedComponent implements OnInit {
  @ViewChild(CardViewComponent, { static: true }) cardView: CardViewComponent;
  readonly displayedColumns = [
    TABLE_COLUMNS.NO,
    TABLE_COLUMNS.TITLE,
    TABLE_COLUMNS.TYPE,
    TABLE_COLUMNS.SEVERITY,
    TABLE_COLUMNS.TESTER_DISAGREE,
    TABLE_COLUMNS.ACTIONS
  ];
  readonly actionButtons: ACTION_BUTTONS[] = [ACTION_BUTTONS.VIEW_IN_WEB, ACTION_BUTTONS.MARK_AS_PENDING, ACTION_BUTTONS.FIX_ISSUE];
  filter: (issue: Issue) => boolean;

  constructor() {}

  ngOnInit() {
    const issueIsDone = (issue: Issue) => issue.status === STATUS.Done;
    const issueHasComment = (issue: Issue) => !!issue.issueComment;
    this.filter = (issue: Issue) => issueIsDone(issue) && issueHasComment(issue);
  }

  applyFilter(filterValue: string) {
    this.cardView.issues.filter = filterValue;
  }
}
