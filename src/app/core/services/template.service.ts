import { Injectable } from '@angular/core';
import { Template } from '../models/template.model';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  savedTemplates: Template[] = [];
  templateUsed: Template;

  createTemplate(name: string, title: string, description: string, severity: string, type: string): Template {
    return new Template(name, title, description, severity, type);
  }

  saveTemplate(template: Template) {
    this.savedTemplates.push(template);
  }

  setTemplate(name: string) {
    this.templateUsed = this.savedTemplates.find((template) => template.name == name);
  }

  isNameTaken(name: string) {
    return this.savedTemplates.some((template) => template.name == name);
  }
}
