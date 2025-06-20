import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Template } from '../../core/models/template.model';
import { TemplateService } from '../../core/services/template.service';
import { LabelService } from '../../core/services/label.service';

export const WHITE_TEXT_CLASS = 'white-text';
export const BLACK_TEXT_CLASS = 'black-text';

@Component({
  selector: 'app-template-dropdown',
  templateUrl: './template-dropdown.component.html',
  styleUrls: ['./template-dropdown.component.css']
})
export class TemplateDropdownComponent implements OnInit {
  dropdownControl: AbstractControl;
  @Input() attributeName: string;
  @Input() initialValue: string;
  @Input() dropdownForm: FormGroup;

  templateList: Template[];

  constructor(public templateService: TemplateService, public labelService: LabelService) {}

  ngOnInit() {
    this.templateList = this.templateService.savedTemplates;
    this.dropdownControl = this.dropdownForm.get(this.attributeName);
  }

  setSelectedTemplate(template: Template) {
    const templateName = template.name;
    this.templateService.setTemplate(templateName);
  }
}
