import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogService } from '../../..//core/services/dialog.service';
import { Label } from '../../../core/models/label.model';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';
import { LabelCategory, LabelService } from '../../../core/services/label.service';
import { LoadingService } from '../../../core/services/loading.service';
import { PermissionService } from '../../../core/services/permission.service';
import { IssueTemplate } from '../../../core/models/issue-template.model';

@Component({
  selector: 'app-issue-template-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css'],
  providers: [LoadingService]
})
export class LabelComponent implements OnInit, OnChanges {
  // The container of the loading spinner
  @ViewChild('loadingSpinnerContainer', {
    read: ViewContainerRef,
    static: false
  })
  loadingSpinnerContainer: ViewContainerRef;

  labelValues: Label[];
  labelColor: string;
  labelDefinition?: string;
  isSavePending: boolean;

  @Input() issueTemplate: IssueTemplate;
  @Input() attributeName: LabelCategory;

  @Output() issueTemplateUpdated = new EventEmitter<IssueTemplate>();

  constructor(
    private errorHandlingService: ErrorHandlingService,
    public labelService: LabelService,
    public permissions: PermissionService,
    public dialogService: DialogService,
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
    // Get the list of labels based on their type (severity, type, response)
    this.labelValues = this.labelService.getLabelList(this.attributeName);
    // Build the loading service spinner
    this.loadingService
      .addAnimationMode('indeterminate')
      .addSpinnerOptions({ diameter: 15, strokeWidth: 2 })
      .addCssClasses(['mat-progress-spinner']);
  }

  ngOnChanges() {
    // Color will change when @Input issue changes
    this.labelColor = this.labelService.getColorOfLabel(this.attributeName, this.issueTemplate[this.attributeName]);
  }

  updateLabel(value: string) {
    this.showSpinner();
    try {
      const updatedIssueTemplate = this.issueTemplate.clone();
      updatedIssueTemplate[this.attributeName] = value;
      this.issueTemplateUpdated.emit(updatedIssueTemplate);
      this.labelColor = this.labelService.getColorOfLabel(this.attributeName, updatedIssueTemplate[this.attributeName]);
      this.hideSpinner();
    } catch (error) {
      this.errorHandlingService.handleError(error);
      this.hideSpinner();
    }
  }

  openDefinitionPage(value: Label): void {
    this.labelDefinition = this.labelService.getLabelDefinition(value.labelValue, value.labelCategory);
    this.dialogService.openLabelDefinitionDialog(value.getFormattedName(), this.labelDefinition);
  }

  hasLabelDefinition(value: Label): boolean {
    return this.labelService.getLabelDefinition(value.labelValue, value.labelCategory) !== null;
  }
}
