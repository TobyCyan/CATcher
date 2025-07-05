import { IssueTemplateService } from '../../core/services/issue-template.service';
import { TABLE_COLUMNS } from './issue-template-tables-columns';
import { IssueTemplate } from '../../core/models/issue-template.model';

/**
 * This module serves to improve separation of concerns in IssueTemplatesDataTable.ts module by containing the logic for
 * applying search filter to the issue templates data table in this module.
 * This module exports a single function applySearchFilter which is called by IssueTemplateDataTable.
 */
export function applySearchFilter(
  filter: string,
  displayedColumn: string[],
  issueTemplateService: IssueTemplateService,
  data: IssueTemplate[]
): IssueTemplate[] {
  const searchKey = filter.toLowerCase();
  const result = data.slice().filter((issueTemplate: IssueTemplate) => {
    for (const column of displayedColumn) {
      switch (column) {
        case TABLE_COLUMNS.TITLE:
          if (matchesTitle(issueTemplate, searchKey)) {
            return true;
          }
          break;
        default:
          if (matchesOtherColumns(issueTemplate, column, searchKey)) {
            return true;
          }
          break;
      }
    }
    return false;
  });
  return result;
}

function containsSearchKey(item: string, searchKey: string): boolean {
  return item.indexOf(searchKey) !== -1;
}

function matchesTitle(issueTemplate: IssueTemplate, searchKey: string): boolean {
  const searchStr = issueTemplate.name.toLowerCase();
  return containsSearchKey(searchStr, searchKey);
}

function matchesOtherColumns(issueTemplate: IssueTemplate, column: string, searchKey: string): boolean {
  const searchStr = String(issueTemplate[column]).toLowerCase();
  return containsSearchKey(searchStr, searchKey);
}
