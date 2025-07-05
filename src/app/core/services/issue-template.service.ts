import { Injectable } from '@angular/core';
import { IssueTemplate } from '../models/issue-template.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueTemplateService {
  savedTemplates: IssueTemplate[] = [];
  templateUsed: IssueTemplate;

  createTemplate(name: string, title: string, description: string, severity: string, type: string): IssueTemplate {
    return new IssueTemplate(name, title, description, severity, type);
  }

  saveTemplate(template: IssueTemplate) {
    this.savedTemplates.push(template);
  }

  deleteTemplate(name: string) {
    this.savedTemplates = this.savedTemplates.filter((template) => template.name !== template.name);
  }

  undeleteTemplate(name: string) {}

  setTemplate(name: string) {
    this.templateUsed = this.savedTemplates.find((template) => template.name === name);
  }

  isNameTaken(name: string) {
    return this.savedTemplates.some((template) => template.name === name);
  }

  getTemplate(name: string) {
    return this.savedTemplates.find((template) => template.name === name);
  }
}
