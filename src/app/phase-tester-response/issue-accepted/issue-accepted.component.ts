import { Component, OnInit, ViewChild } from '@angular/core';
import { Issue } from '../../core/models/issue.model';
import { TABLE_COLUMNS } from '../../shared/issue-tables/issue-tables-columns';
import { ACTION_BUTTONS } from '../../shared/card-view/card-view.component';
import { CardViewComponent } from '../../shared/card-view/card-view.component';

@Component({
  selector: 'app-issue-accepted',
  templateUrl: './issue-accepted.component.html',
  styleUrls: ['./issue-accepted.component.css']
})
export class IssueAcceptedComponent implements OnInit {
  @ViewChild(CardViewComponent, { static: true }) cardView: CardViewComponent;

  readonly displayedColumns = [TABLE_COLUMNS.NO, TABLE_COLUMNS.TITLE, TABLE_COLUMNS.TYPE, TABLE_COLUMNS.SEVERITY, TABLE_COLUMNS.ACTIONS];
  readonly actionButtons: ACTION_BUTTONS[] = [ACTION_BUTTONS.VIEW_IN_WEB];
  filter: (issue: Issue) => boolean;

  constructor() {}

  ngOnInit() {
    this.filter = (issue: Issue) => issue.teamAccepted;
  }

  applyFilter(filterValue: string) {
    this.cardView.issues.filter = filterValue;
  }
}
