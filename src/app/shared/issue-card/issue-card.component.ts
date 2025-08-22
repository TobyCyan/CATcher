import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Issue } from '../../core/models/issue.model';
import { LabelService } from '../../core/services/label.service';
import { ACTION_BUTTONS } from '../card-view/card-view.component';
import { PermissionService } from '../../core/services/permission.service';
import { UserService } from '../../core/services/user.service';
import { IssueService } from '../../core/services/issue.service';
import { LoggingService } from '../../core/services/logging.service';
import { GithubService } from '../../core/services/github.service';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.css']
})
export class IssueCardComponent {
  @Input() issue: Issue;
  @Input() actions: ACTION_BUTTONS[];
  @Input() isActionPerformAllowed!: (flag: boolean, id: number) => boolean;
  @Input() shouldEnablePendingActionSpinner!: (id: number) => boolean;
  @Input() deleteOrRestoreIssue!: (flag: boolean, id: number) => void;
  @Input() shouldEnableMarkAsResponded!: (issue: Issue) => boolean;
  @Input() shouldEnableEditIssue!: () => boolean;
  @Input() shouldEnableRespondToIssue!: (issue: Issue) => boolean;
  @Input() shouldEnablePendingButton!: () => boolean;
  @Input() markAsPending: (issue: Issue, event: Event) => void;
  @Input() markAsResponded: (issue: Issue, event: Event) => void;
  @Input() globalTableIndex: number;
  @Input() headers: string[];

  public readonly action_buttons = ACTION_BUTTONS;

  constructor(
    public issueService: IssueService,
    public userService: UserService,
    public labelService: LabelService,
    public permissions: PermissionService,
    private githubService: GithubService,
    private logger: LoggingService
  ) {}

  viewIssueInBrowser = (event: Event) => {
    this.logger.info(`IssueCardComponent: Opening Issue ${this.issue.id} on Github`);
    this.githubService.viewIssueInBrowser(this.issue.id, event);
  };

  isActionVisible(action: ACTION_BUTTONS): boolean {
    return this.actions.includes(action);
  }

  hasNoAssignees(): boolean {
    if (!this.issue.assignees) {
      return true;
    }
    return this.issue.assignees.length === 0;
  }

  hasIssueDisputes(): boolean {
    return this.issue.issueDisputes && this.issue.issueDisputes.length > 0;
  }

  /**
   * Gets the number of resolved disputes.
   */
  todoFinished() {
    if (!this.issue.issueDisputes) {
      return 0;
    }
    return this.issue.issueDisputes.length - this.issue.numOfUnresolvedDisputes();
  }

  /**
   * Checks if all the disputes are resolved.
   */
  isTodoListChecked() {
    return this.issue.issueDisputes && this.issue.numOfUnresolvedDisputes() === 0;
  }

  logIssueRespondRouting() {
    this.logger.info(`IssueCardComponent: Proceeding to Respond to Issue ${this.issue.id}`);
  }

  logIssueEditRouting() {
    this.logger.info(`IssueCardComponent: Proceeding to Edit Issue ${this.issue.id}`);
  }

  shouldRender(header: string) {
    return this.headers.includes(header);
  }
}

interface IssueActionEvent {
  action: ACTION_BUTTONS;
  issueId: number;
  event: Event;
}
