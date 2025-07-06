import { Injectable } from '@angular/core';
import { IssueTemplate, IssueTemplates, IssueTemplateState } from '../models/issue-template.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueTemplateService {
  savedTemplates: IssueTemplates;
  savedTemplates$: BehaviorSubject<IssueTemplate[]>;
  templateUsed: IssueTemplate;

  constructor() {
    this.savedTemplates$ = new BehaviorSubject(new Array<IssueTemplate>());
  }

  createTemplate(
    name: string,
    title: string,
    description: string,
    severity: string,
    type: string,
    state: IssueTemplateState = IssueTemplateState.OPEN
  ): IssueTemplate {
    return new IssueTemplate(name, title, description, severity, type, state);
  }

  deleteTemplate(name: string) {
    const deletedTemplate = this.getTemplate(name);
    deletedTemplate.closeIssueTemplate();
    this.updateLocalStore(deletedTemplate);
  }

  undeleteTemplate(name: string) {
    const undeletedTemplate = this.getTemplate(name);
    undeletedTemplate.openIssueTemplate();
    this.updateLocalStore(undeletedTemplate);
  }

  /**
   * This function will update the issue template's state of the application.
   * This function needs to be called whenever a issue template is added/updated.
   */
  updateLocalStore(templateToUpdate: IssueTemplate) {
    this.savedTemplates = {
      ...this.savedTemplates,
      [templateToUpdate.name]: templateToUpdate
    };
    this.savedTemplates$.next(Object.values(this.savedTemplates));
  }

  /**
   * This function will update the issue template's state of the application. This function needs to be called whenever a issue is deleted.
   */
  deleteFromLocalStore(templateToDelete: IssueTemplate) {
    const { [templateToDelete.name]: templateToRemove, ...withoutTemplateToRemove } = this.savedTemplates;
    this.savedTemplates = withoutTemplateToRemove;
    this.savedTemplates$.next(Object.values(this.savedTemplates));
  }

  setTemplate(name: string) {
    this.templateUsed = this.getTemplate(name);
  }

  isNameTaken(name: string) {
    return this.getTemplates().some((template) => template.name === name && template.state === IssueTemplateState.OPEN);
  }

  getTemplate(name: string) {
    return this.savedTemplates[name];
  }

  getTemplates() {
    return <IssueTemplate[]>Object.values(this.savedTemplates$.getValue());
  }
}
