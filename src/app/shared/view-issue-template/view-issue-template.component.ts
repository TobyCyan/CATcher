import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from '../../core/models/user.model';
import { ErrorHandlingService } from '../../core/services/error-handling.service';
import { PermissionService } from '../../core/services/permission.service';
import { PhaseService } from '../../core/services/phase.service';
import { UserService } from '../../core/services/user.service';
import { IssueTemplate } from '../../core/models/issue-template.model';
import { IssueTemplateService } from '../../core/services/issue-template.service';

export enum ISSUE_TEMPLATE_COMPONENTS {
  SEVERITY_LABEL,
  TYPE_LABEL,
  TESTER_POST
}

export const SUBMIT_BUTTON_TEXT = {
  SUBMIT: 'Submit',
  SAVE: 'Save',
  OVERWRITE: 'Overwrite'
};

@Component({
  selector: 'app-view-issue-template',
  templateUrl: './view-issue-template.component.html',
  styleUrls: ['./view-issue-template.component.css']
})
export class ViewIssueTemplateComponent implements OnInit, OnChanges {
  issueTemplate: IssueTemplate;
  isIssueTemplateLoading = true;
  isTutorResponseEditing = false;
  isIssueTemplateDescriptionEditing = false;
  isTeamResponseEditing = false;
  isTesterResponseEditing = false;

  @Input() issueTemplateName: string;
  @Input() issueTemplateComponents: ISSUE_TEMPLATE_COMPONENTS[];

  public readonly issueTemplateComponentsEnum = ISSUE_TEMPLATE_COMPONENTS;
  public readonly userRole = UserRole;

  constructor(
    private errorHandlingService: ErrorHandlingService,
    public permissions: PermissionService,
    public userService: UserService,
    public issueTemplateService: IssueTemplateService,
    private phaseService: PhaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getIssueTemplate(this.issueTemplateName);
  }

  /**
   * Will be triggered when there is a change in issueId (e.g. there is a navigation from 1 issue page to another issue page)
   * @param changes - The changes being applied to @Input.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.issueTemplateName.firstChange) {
      this.isIssueTemplateLoading = true;
      this.getIssueTemplate(changes.issueTemplateName.currentValue);
    }
  }

  isComponentVisible(component: ISSUE_TEMPLATE_COMPONENTS): boolean {
    return this.issueTemplateComponents.includes(component);
  }

  isEditing(): boolean {
    return this.isIssueTemplateDescriptionEditing;
  }

  updateIssueTemplate(newIssueTemplate: IssueTemplate) {
    this.issueTemplate = newIssueTemplate;
    this.issueTemplateService.updateLocalStore(newIssueTemplate);
  }

  updateDescriptionEditState(updatedState: boolean) {
    this.isIssueTemplateDescriptionEditing = updatedState;
  }

  private getIssueTemplate(name: string): void {
    try {
      const issueTemplate = this.issueTemplateService.getTemplate(name);
      this.issueTemplate = issueTemplate;
      this.isIssueTemplateLoading = false;
    } catch (err) {
      this.router.navigateByUrl(this.phaseService.currentPhase).then(() => {
        this.errorHandlingService.handleError(new Error('Invalid URL provided!'));
      });
    }
  }
}
