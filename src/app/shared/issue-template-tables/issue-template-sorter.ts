import { MatSort } from '@angular/material/sort';
import { ISSUE_TYPE_ORDER, SEVERITY_ORDER } from '../../core/models/issue.model';
import { IssueTemplate } from '../../core/models/issue-template.model';

export function getSortedData(sort: MatSort, data: IssueTemplate[]): IssueTemplate[] {
  if (!sort.active) {
    return data;
  }

  const direction: number = sort.direction === 'asc' ? 1 : -1;

  return data.sort((a, b) => {
    switch (sort.active) {
      case 'type':
        return direction * compareByIssueType(a.type, b.type);
      case 'severity':
        return direction * compareBySeverity(a.severity, b.severity);
      default:
        // title, responseTag are string values
        return direction * compareByStringValue(a[sort.active], b[sort.active]);
    }
  });
}

function compareBySeverity(severityA: string, severityB: string): number {
  const orderA = SEVERITY_ORDER[severityA];
  const orderB = SEVERITY_ORDER[severityB];

  return compareByIntegerValue(orderA, orderB);
}

function compareByIssueType(issueTypeA: string, issueTypeB: string): number {
  const orderA = ISSUE_TYPE_ORDER[issueTypeA];
  const orderB = ISSUE_TYPE_ORDER[issueTypeB];

  return compareByIntegerValue(orderA, orderB);
}

function compareByStringValue(valueA: string, valueB: string): number {
  const orderA = String(valueA || '').toUpperCase();
  const orderB = String(valueB || '').toUpperCase();
  return orderA < orderB ? -1 : 1;
}

function compareByIntegerValue(valueA: number, valueB: number): number {
  return valueA < valueB ? -1 : 1;
}
