import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { TableSettings } from '../../core/models/table-settings.model';
import { ErrorHandlingService } from '../../core/services/error-handling.service';
import { IssueTableSettingsService } from '../../core/services/issue-table-settings.service';
import { LabelService } from '../../core/services/label.service';
import { LoggingService } from '../../core/services/logging.service';
import { PermissionService } from '../../core/services/permission.service';
import { UserService } from '../../core/services/user.service';
import { UndoActionComponent } from '../../shared/action-toasters/undo-action/undo-action.component';
import { IssueTemplatesDataTable } from './IssueTemplatesDataTable';
import { IssueTemplateService } from '../../core/services/issue-template.service';

export enum ACTION_BUTTONS {
  DELETE_ISSUE_TEMPLATE,
  RESTORE_ISSUE_TEMPLATE,
  FIX_ISSUE_TEMPLATE
}

@Component({
  selector: 'app-issue-template-tables',
  templateUrl: './issue-template-tables.component.html',
  styleUrls: ['./issue-template-tables.component.css']
})
export class IssueTemplateTablesComponent implements OnInit, AfterViewInit {
  snackBarAutoCloseTime = 5000;

  @Input() headers: string[];
  @Input() actions: ACTION_BUTTONS[];
  @Input() filters?: any = undefined;
  @Input() table_name: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  issueTemplates: IssueTemplatesDataTable;
  issueTemplatesPendingDeletion: { [name: string]: boolean };
  issueTemplatesPendingRestore: { [name: string]: boolean };

  public tableSettings: TableSettings;

  public readonly action_buttons = ACTION_BUTTONS;

  constructor(
    public userService: UserService,
    public permissions: PermissionService,
    public labelService: LabelService,
    public issueTemplateService: IssueTemplateService,
    public issueTableSettingsService: IssueTableSettingsService,
    private errorHandlingService: ErrorHandlingService,
    private logger: LoggingService,
    private snackBar: MatSnackBar = null
  ) {}

  ngOnInit() {
    this.issueTemplates = new IssueTemplatesDataTable(this.issueTemplateService, this.sort, this.paginator, this.headers, this.filters);
    this.issueTemplatesPendingDeletion = {};
    this.issueTemplatesPendingRestore = {};
    this.tableSettings = this.issueTableSettingsService.getTableSettings(this.table_name);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.issueTemplates.loadTemplates();
    });
  }

  globalTableIndex(localTableIndex: number) {
    return this.issueTemplates.getGlobalTableIndex(localTableIndex);
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

  isActionVisible(action: ACTION_BUTTONS): boolean {
    return this.actions.includes(action);
  }

  private handleIssueTemplateDeletionSuccess(name: string, event: Event, actionUndoable: boolean) {
    if (!actionUndoable) {
      return;
    }
    let snackBarRef = null;
    snackBarRef = this.snackBar.openFromComponent(UndoActionComponent, {
      data: { message: `Deleted issue template ${name}` },
      duration: this.snackBarAutoCloseTime
    });
    snackBarRef.onAction().subscribe(() => {
      this.undeleteIssueTemplate(name, event, false);
    });
  }

  deleteIssueTemplate(name: string, event: Event, actionUndoable: boolean = true) {
    this.logger.info(`IssueTemplateTablesComponent: Deleting Template ${name}`);

    this.issueTemplatesPendingDeletion = { ...this.issueTemplatesPendingDeletion, [name]: true };
    try {
      this.issueTemplateService.deleteTemplate(name);
      this.handleIssueTemplateDeletionSuccess(name, event, actionUndoable);
    } catch (error) {
      this.errorHandlingService.handleError(error);
    } finally {
      const { [name]: issueTemplateRemoved, ...theRest } = this.issueTemplatesPendingDeletion;
      this.issueTemplatesPendingDeletion = theRest;
    }
    event.stopPropagation();
  }

  private handleIssueTemplateRestorationSuccess(name: string, event: Event, actionUndoable: boolean) {
    if (!actionUndoable) {
      return;
    }
    let snackBarRef = null;
    snackBarRef = this.snackBar.openFromComponent(UndoActionComponent, {
      data: { message: `Restored issue template ${name}` },
      duration: this.snackBarAutoCloseTime
    });
    snackBarRef.onAction().subscribe(() => {
      this.deleteIssueTemplate(name, event, false);
    });
  }

  undeleteIssueTemplate(name: string, event: Event, actionUndoable: boolean = true) {
    this.logger.info(`IssueTemplateTablesComponent: Undeleting Issue Template ${name}`);

    this.issueTemplatesPendingRestore = { ...this.issueTemplatesPendingRestore, [name]: true };
    try {
      this.issueTemplateService.undeleteTemplate(name);
      this.handleIssueTemplateRestorationSuccess(name, event, actionUndoable);
    } catch (error) {
      this.errorHandlingService.handleError(error);
    } finally {
      const { [name]: issueTemplateRestored, ...theRest } = this.issueTemplatesPendingRestore;
      this.issueTemplatesPendingRestore = theRest;
    }
    event.stopPropagation();
  }
}
