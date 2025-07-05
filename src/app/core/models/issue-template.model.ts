export class IssueTemplate {
  name: string;
  title: string;
  description: string;
  severity: string;
  type: string;

  constructor(name: string, title: string, description: string, severity: string, type: string) {
    this.name = name;
    this.title = title;
    this.description = description;
    this.severity = severity;
    this.type = type;
  }
}
