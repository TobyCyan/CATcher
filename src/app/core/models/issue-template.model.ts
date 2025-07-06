export class IssueTemplate {
  name: string;
  title: string;
  description: string;
  severity: string;
  type: string;
  state: IssueTemplateState;

  constructor(name: string, title: string, description: string, severity: string, type: string, state: IssueTemplateState) {
    this.name = name;
    this.title = title;
    this.description = description;
    this.severity = severity;
    this.type = type;
    this.state = state;
  }

  closeIssueTemplate() {
    this.state = IssueTemplateState.CLOSED;
  }

  openIssueTemplate() {
    this.state = IssueTemplateState.OPEN;
  }

  isOpened(): boolean {
    return this.state === IssueTemplateState.OPEN;
  }

  clone() {
    return new IssueTemplate(this.name, this.title, this.description, this.severity, this.type, this.state);
  }
}

export interface IssueTemplates {
  [name: string]: IssueTemplate;
}

export enum IssueTemplateState {
  CLOSED = 'closed',
  OPEN = 'open'
}
