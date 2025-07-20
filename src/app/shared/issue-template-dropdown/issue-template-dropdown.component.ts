import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { IssueTemplate } from '../../core/models/issue-template.model';
import { IssueTemplateService } from '../../core/services/issue-template.service';
import { LabelService } from '../../core/services/label.service';

export const WHITE_TEXT_CLASS = 'white-text';
export const BLACK_TEXT_CLASS = 'black-text';

@Component({
  selector: 'app-issue-template-dropdown',
  templateUrl: './issue-template-dropdown.component.html',
  styleUrls: ['./issue-template-dropdown.component.css']
})
export class IssueTemplateDropdownComponent implements OnInit {
  dropdownControl: AbstractControl;
  @Input() attributeName: string;
  @Input() initialValue: string;
  @Input() dropdownForm: FormGroup;

  templateList: IssueTemplate[];

  constructor(public templateService: IssueTemplateService, public labelService: LabelService) {}

  ngOnInit() {
    this.templateList = this.templateService.getOpenedTemplates();
    this.dropdownControl = this.dropdownForm.get(this.attributeName);
  }
}
