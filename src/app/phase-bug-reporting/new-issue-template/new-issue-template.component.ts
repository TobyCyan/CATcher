import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LabelService } from '../../core/services/label.service';
import { noWhitespace } from '../../core/validators/noWhitespace.validator';
import { SUBMIT_BUTTON_TEXT } from '../../shared/view-issue/view-issue.component';
import { IssueTemplateService } from '../../core/services/issue-template.service';
import { nameNotTaken } from '../../core/validators/nameNotTaken.validator';

@Component({
  selector: 'app-new-template',
  templateUrl: './new-issue-template.component.html',
  styleUrls: ['./new-issue-template.component.css']
})
export class NewTemplateComponent implements OnInit {
  newTemplateForm: FormGroup;
  isFormPending = false;
  submitButtonText: string;

  constructor(
    private issueTemplateService: IssueTemplateService,
    private formBuilder: FormBuilder,
    public labelService: LabelService,
    private router: Router
  ) {}

  ngOnInit() {
    this.newTemplateForm = this.formBuilder.group({
      name: ['New Template', [Validators.required, Validators.maxLength(256), noWhitespace(), nameNotTaken(this.issueTemplateService)]],
      title: ['', [Validators.required, Validators.maxLength(256), noWhitespace()]],
      description: [''],
      severity: ['', Validators.required],
      type: ['', Validators.required]
    });

    this.submitButtonText = SUBMIT_BUTTON_TEXT.SUBMIT;
  }

  submitNewTemplate(form: NgForm) {
    if (this.newTemplateForm.invalid) {
      return;
    }

    this.isFormPending = true;
    const newTemplate = this.issueTemplateService.createTemplate(
      this.name.value,
      this.title.value,
      this.description.value,
      this.severity.value,
      this.type.value
    );
    this.issueTemplateService.saveTemplate(newTemplate);
    this.isFormPending = false;
    this.router.navigateByUrl('phaseBugReporting/issues/new');
    form.resetForm();
  }

  isNameTaken(name: string) {
    return this.issueTemplateService.isNameTaken(name);
  }

  canDeactivate() {
    return (
      !this.isAttributeEditing(this.name) &&
      !this.isAttributeEditing(this.title) &&
      !this.isAttributeEditing(this.description) &&
      !this.isAttributeEditing(this.severity) &&
      !this.isAttributeEditing(this.type)
    );
  }

  isAttributeEditing(attribute: AbstractControl) {
    return attribute.value !== null && attribute.value !== '';
  }

  get name() {
    return this.newTemplateForm.get('name');
  }

  get title() {
    return this.newTemplateForm.get('title');
  }

  get description() {
    return this.newTemplateForm.get('description');
  }

  get severity() {
    return this.newTemplateForm.get('severity');
  }

  get type() {
    return this.newTemplateForm.get('type');
  }
}
