import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Conflict } from '../../../core/models/conflict/conflict.model';
import { Issue } from '../../../core/models/issue.model';
import { DialogService } from '../../../core/services/dialog.service';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';
import { LoadingService } from '../../../core/services/loading.service';
import { PermissionService } from '../../../core/services/permission.service';
import { SUBMIT_BUTTON_TEXT } from '../../view-issue/view-issue.component';
import { ConflictDialogComponent } from '../../issue/conflict-dialog/conflict-dialog.component';
import { IssueTemplateService } from '../../../core/services/issue-template.service';
import { IssueTemplate } from '../../../core/models/issue-template.model';

@Component({
  selector: 'app-issue-template-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
  providers: [LoadingService]
})
export class DescriptionComponent implements OnInit {
  // The container of the loading spinner
  @ViewChild('loadingSpinnerContainer', {
    read: ViewContainerRef,
    static: false
  })
  loadingSpinnerContainer: ViewContainerRef;

  isSavePending = false;
  issueTemplateDescriptionForm: FormGroup;
  conflict: Conflict;
  submitButtonText: string;

  @Input() issueTemplate: IssueTemplate;
  @Input() descriptionTitle: string;
  @Input() isEditing: boolean;
  @Output() issueTemplateUpdated = new EventEmitter<IssueTemplate>();
  @Output() changeEditState = new EventEmitter<boolean>();

  // Messages for the modal popup window upon cancelling edit
  private readonly cancelEditModalMessages = ['Do you wish to cancel?', 'Your changes will be discarded.'];
  private readonly yesButtonModalMessage = 'Cancel';
  private readonly noButtonModalMessage = 'Continue editing';

  constructor(
    private issueTemplateService: IssueTemplateService,
    private formBuilder: FormBuilder,
    private errorHandlingService: ErrorHandlingService,
    private dialog: MatDialog,
    public permissions: PermissionService,
    private dialogService: DialogService,
    public loadingService: LoadingService
  ) {}

  showSpinner(): void {
    this.loadingService.addViewContainerRef(this.loadingSpinnerContainer).showLoader();
    this.isSavePending = true;
  }

  hideSpinner(): void {
    this.loadingService.hideLoader();
    this.isSavePending = false;
  }

  ngOnInit() {
    this.issueTemplateDescriptionForm = this.formBuilder.group({
      description: ['']
    });
    this.submitButtonText = SUBMIT_BUTTON_TEXT.SAVE;
    // Build the loading service spinner
    this.loadingService
      .addAnimationMode('indeterminate')
      .addSpinnerOptions({ diameter: 15, strokeWidth: 2 })
      .addTheme('warn')
      .addCssClasses(['mat-progress-spinner']);
  }

  changeToEditMode() {
    this.changeEditState.emit(true);
    this.issueTemplateDescriptionForm.setValue({
      description: this.issueTemplate['description'] || ''
    });
  }

  updateDescription(form: NgForm) {
    if (this.issueTemplateDescriptionForm.invalid) {
      return;
    }

    this.showSpinner();
    try {
      this.issueTemplate = this.issueTemplateService.getTemplate(this.issueTemplate.name);
      const editedIssueTemplate = this.getUpdatedIssueTemplate();
      this.issueTemplateUpdated.emit(editedIssueTemplate);
    } catch (error) {
      this.errorHandlingService.handleError(error);
      this.hideSpinner();
    } finally {
      this.resetToDefault();
      form.resetForm();
      this.hideSpinner();
    }
  }

  viewChanges(): void {
    this.dialog.open(ConflictDialogComponent, {
      data: this.conflict,
      autoFocus: false
    });
  }

  resetToDefault(): void {
    this.submitButtonText = SUBMIT_BUTTON_TEXT.SAVE;
    this.conflict = undefined;
    this.changeEditState.emit(false);
  }

  /**
   * When user exits exit mode, we will need to sync the issue in IssueTemplateService with this component.
   */
  cancelEditMode(): void {
    const issueTemplate = this.issueTemplateService.getTemplate(this.issueTemplate.name);
    this.issueTemplateUpdated.emit(issueTemplate);
    this.resetToDefault();
  }

  openCancelDialogIfModified(): void {
    const isModified = this.dialogService.checkIfFieldIsModified(
      this.issueTemplateDescriptionForm,
      'description',
      'description',
      this.issueTemplate
    );
    this.dialogService.performActionIfModified(
      isModified,
      () => this.openCancelDialog(),
      () => this.cancelEditMode()
    );
  }

  openCancelDialog(): void {
    const dialogRef = this.dialogService.openUserConfirmationModal(
      this.cancelEditModalMessages,
      this.yesButtonModalMessage,
      this.noButtonModalMessage
    );

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.cancelEditMode();
      }
    });
  }

  private getUpdatedIssueTemplate(): IssueTemplate {
    const newIssueTemplate = this.issueTemplate.clone();
    newIssueTemplate.description = Issue.updateDescription(this.issueTemplateDescriptionForm.get('description').value);
    return newIssueTemplate;
  }
}
