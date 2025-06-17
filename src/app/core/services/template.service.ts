import { Injectable } from '@angular/core';
import { Template } from '../models/template.model';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  savedTemplates: Template[];

  createTemplate(name: string, title: string, description: string, severity: string, type: string): Template {
    return new Template(name, title, description, severity, type);
  }

  saveTemplate(template: Template) {
    this.savedTemplates.push(template);
  }
}
