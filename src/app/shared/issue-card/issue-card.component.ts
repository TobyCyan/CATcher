import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Issue } from '../../core/models/issue.model';
import { LabelService } from '../../core/services/label.service';
import { ACTION_BUTTONS } from '../card-view/card-view.component';
import { PermissionService } from '../../core/services/permission.service';
import { LoggingService } from '../../core/services/logging.service';

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
  @Input() logIssueRespondRouting!: (issueId: number) => void;
  @Input() viewIssueInBrowser!: (issueId: number, event: Event) => void;

  public readonly action_buttons = ACTION_BUTTONS;

  @Output() actionButtonClicked: EventEmitter<IssueActionEvent> = new EventEmitter();

  constructor(public labelService: LabelService, public permissions: PermissionService, private logger: LoggingService) {}

  isActionVisible(action: ACTION_BUTTONS): boolean {
    return this.actions.includes(action);
  }
}

interface IssueActionEvent {
  action: ACTION_BUTTONS;
  issueId: number;
  event: Event;
}
