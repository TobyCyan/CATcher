import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DialogService } from '../../../core/services/dialog.service';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';
import { LoadingService } from '../../../core/services/loading.service';
import { PermissionService } from '../../../core/services/permission.service';
import { PhaseService } from '../../../core/services/phase.service';
import { IssueTemplate } from '../../../core/models/issue-template.model';

@Component({
  selector: 'app-issue-template-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
  providers: [LoadingService]
})
export class TitleComponent implements OnInit {
  // The container of the loading spinner
  @ViewChild('loadingSpinnerContainer', {
    read: ViewContainerRef,
    static: false
  })
  loadingSpinnerContainer: ViewContainerRef;

  isEditing = false;
  isSavePending = false;
  issueTemplateTitleForm: FormGroup;

  @Input() issueTemplate: IssueTemplate;
  @Output() issueTemplateUpdated = new EventEmitter<IssueTemplate>();

  // Messages for the modal popup window upon cancelling edit
  private readonly cancelEditModalMessages = ['Do you wish to cancel?', 'Your changes will be discarded.'];
  private readonly yesButtonModalMessage = 'Cancel';
  private readonly noButtonModalMessage = 'Continue editing';

  constructor(
    private formBuilder: FormBuilder,
    private errorHandlingService: ErrorHandlingService,
    public permissions: PermissionService,
    public phaseService: PhaseService,
    private dialogService: DialogService,
    public loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.issueTemplateTitleForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(256)])
    });
    // Build the loading service spinner
    this.loadingService
      .addAnimationMode('indeterminate')
      .addSpinnerOptions({ diameter: 15, strokeWidth: 2 })
      .addCssClasses(['mat-progress-spinner']);
  }

  changeToEditMode() {
    this.isEditing = true;

    this.issueTemplateTitleForm.setValue({
      title: this.issueTemplate.title || ''
    });
  }

  cancelEditMode() {
    this.isEditing = false;
  }

  updateTitle(form: NgForm) {
    if (this.issueTemplateTitleForm.invalid) {
      return;
    }

    this.showSpinner();
    try {
      const updatedIssueTemplate = this.issueTemplate.clone();
      updatedIssueTemplate.title = this.issueTemplateTitleForm.get('title').value;
      this.issueTemplateUpdated.emit(updatedIssueTemplate);
    } catch (error) {
      this.errorHandlingService.handleError(error);
      this.hideSpinner();
    } finally {
      this.isEditing = false;
      form.resetForm();
      this.hideSpinner();
    }
  }

  openCancelDialogIfModified(): void {
    const isModified = this.dialogService.checkIfFieldIsModified(this.issueTemplateTitleForm, 'title', 'title', this.issueTemplate);
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

  showSpinner() {
    this.loadingService.addViewContainerRef(this.loadingSpinnerContainer).showLoader();
    this.isSavePending = true;
  }

  hideSpinner() {
    this.loadingService.hideLoader();
    this.isSavePending = false;
  }
}
