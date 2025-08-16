import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { IssueService } from '../../core/services/issue.service';
import { IssuesDataTable } from '../issue-tables/IssuesDataTable';
import { ACTION_BUTTONS } from '../issue-tables/issue-tables.component';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TableSettings } from '../../core/models/table-settings.model';
import { UserService } from '../../core/services/user.service';
import { PermissionService } from '../../core/services/permission.service';
import { GithubService } from '../../core/services/github.service';
import { ErrorHandlingService } from '../../core/services/error-handling.service';
import { IssueTableSettingsService } from '../../core/services/issue-table-settings.service';
import { PhaseService } from '../../core/services/phase.service';
import { LoggingService } from '../../core/services/logging.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Issue } from '../../core/models/issue.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit, AfterViewInit {
  snackBarAutoCloseTime = 3000;

  @Input() headers: string[];
  @Input() actions: ACTION_BUTTONS[];
  @Input() filters?: any = undefined;
  @Input() table_name: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  issues: IssuesDataTable;
  issues$: Observable<Issue[]>;
  issuesPendingAction: { [id: number]: boolean };

  public tableSettings: TableSettings;

  public readonly action_buttons = ACTION_BUTTONS;

  constructor(
    public userService: UserService,
    public permissions: PermissionService,
    private githubService: GithubService,
    public issueService: IssueService,
    public issueTableSettingsService: IssueTableSettingsService,
    private phaseService: PhaseService,
    private errorHandlingService: ErrorHandlingService,
    private logger: LoggingService,
    private snackBar: MatSnackBar = null
  ) {}

  ngOnInit() {
    this.issues = new IssuesDataTable(this.issueService, this.sort, this.paginator, this.headers, this.filters);
    this.issuesPendingAction = {};
    this.tableSettings = this.issueTableSettingsService.getTableSettings(this.table_name);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.issues.loadIssues();
      this.issues$ = this.issues.connect();
      this.logger.debug('CardViewComponent: Issues loaded', this.issues$);
    });
  }

  sortChange(newSort: Sort) {
    this.tableSettings.sortActiveId = newSort.active;
    this.tableSettings.sortDirection = newSort.direction;
    this.issueTableSettingsService.setTableSettings(this.table_name, this.tableSettings);
  }

  pageChange(pageEvent: PageEvent) {
    this.tableSettings.pageSize = pageEvent.pageSize;
    this.tableSettings.pageIndex = pageEvent.pageIndex;
    this.issueTableSettingsService.setTableSettings(this.table_name, this.tableSettings);
  }
}
