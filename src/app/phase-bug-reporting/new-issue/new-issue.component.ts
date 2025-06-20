import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged, finalize } from 'rxjs/operators';
import { Issue } from '../../core/models/issue.model';
import { ErrorHandlingService } from '../../core/services/error-handling.service';
import { IssueService } from '../../core/services/issue.service';
import { LabelService } from '../../core/services/label.service';
import { noWhitespace } from '../../core/validators/noWhitespace.validator';
import { SUBMIT_BUTTON_TEXT } from '../../shared/view-issue/view-issue.component';
import { TemplateService } from '../../core/services/template.service';

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.css']
})
export class NewIssueComponent implements OnInit {
  newIssueForm: FormGroup;
  isFormPending = false;
  submitButtonText: string;

  constructor(
    private issueService: IssueService,
    private formBuilder: FormBuilder,
    private errorHandlingService: ErrorHandlingService,
    public labelService: LabelService,
    private router: Router,
    private templateService: TemplateService
  ) {}

  ngOnInit() {
    this.newIssueForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(256), noWhitespace()]],
      description: [''],
      severity: ['', Validators.required],
      type: ['', Validators.required],
      template: ['']
    });

    this.template.valueChanges.pipe(distinctUntilChanged()).subscribe((templateName) => this.onTemplateChange(templateName));

    this.submitButtonText = SUBMIT_BUTTON_TEXT.SUBMIT;
  }

  onTemplateChange(templateName: string) {
    const templateUsed = this.templateService.getTemplate(templateName);
    if (templateUsed !== undefined) {
      this.newIssueForm.patchValue({
        title: templateUsed.title,
        description: templateUsed.description,
        severity: templateUsed.severity,
        type: templateUsed.type,
        template: templateUsed.name
      });
    }
  }

  submitNewIssue(form: NgForm) {
    if (this.newIssueForm.invalid) {
      return;
    }

    this.isFormPending = true;
    this.issueService
      .createIssue(this.title.value, Issue.updateDescription(this.description.value), this.severity.value, this.type.value)
      .pipe(finalize(() => (this.isFormPending = false)))
      .subscribe(
        (newIssue) => {
          this.issueService.updateLocalStore(newIssue);
          this.router.navigateByUrl(`phaseBugReporting/issues/${newIssue.id}`);
          form.resetForm();
        },
        (error) => {
          this.errorHandlingService.handleError(error);
        }
      );
  }

  canDeactivate() {
    return (
      !this.isAttributeEditing(this.title) &&
      !this.isAttributeEditing(this.description) &&
      !this.isAttributeEditing(this.severity) &&
      !this.isAttributeEditing(this.type)
    );
  }

  isAttributeEditing(attribute: AbstractControl) {
    return attribute.value !== null && attribute.value !== '';
  }

  get title() {
    return this.newIssueForm.get('title');
  }

  get description() {
    return this.newIssueForm.get('description');
  }

  get severity() {
    return this.newIssueForm.get('severity');
  }

  get type() {
    return this.newIssueForm.get('type');
  }

  get template() {
    return this.newIssueForm.get('template');
  }
}
