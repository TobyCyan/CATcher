import { Component, OnInit, ViewChild } from '@angular/core';
import { PermissionService } from '../../core/services/permission.service';
import { UserService } from '../../core/services/user.service';
import { TABLE_COLUMNS } from '../../shared/issue-template-tables/issue-template-tables-columns';
import { ACTION_BUTTONS } from '../../shared/issue-template-tables/issue-template-tables.component';
import { IssueTemplateTablesComponent } from '../../shared/issue-template-tables/issue-template-tables.component';
import { IssueTemplate } from '../../core/models/issue-template.model';

@Component({
  selector: 'app-issue-templates-created',
  templateUrl: './issue-templates-created.component.html',
  styleUrls: ['./issue-templates-created.component.css']
})
export class IssueTemplatesCreatedComponent implements OnInit {
  readonly displayedColumns = [TABLE_COLUMNS.NO, TABLE_COLUMNS.NAME, TABLE_COLUMNS.TYPE, TABLE_COLUMNS.SEVERITY, TABLE_COLUMNS.ACTIONS];
  readonly actionButtons: ACTION_BUTTONS[] = [
    ACTION_BUTTONS.DELETE_ISSUE_TEMPLATE,
    ACTION_BUTTONS.RESTORE_ISSUE_TEMPLATE,
    ACTION_BUTTONS.FIX_ISSUE_TEMPLATE
  ];
  filter: (issueTemplate: IssueTemplate) => boolean;

  @ViewChild(IssueTemplateTablesComponent, { static: true }) table: IssueTemplateTablesComponent;

  constructor(public permissions: PermissionService, public userService: UserService) {}

  ngOnInit() {
    this.filter = (issueTemplate: IssueTemplate): boolean => {
      return true;
    };
  }

  applyFilter(filterValue: string) {
    this.table.issueTemplates.filter = filterValue;
  }
}
