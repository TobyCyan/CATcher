import { MatPaginator } from '@angular/material/paginator';
import { IssueTemplate } from '../../core/models/issue-template.model';

export function paginateData(paginator: MatPaginator, data: IssueTemplate[]): IssueTemplate[] {
  paginator.length = data.length;
  let result = getDataForPage(paginator.pageIndex, paginator.pageSize, data);
  if (result.length === 0) {
    paginator.pageIndex = paginator.pageIndex - 1;
    result = getDataForPage(paginator.pageIndex, paginator.pageSize, data);
  }
  return result;
}

function getDataForPage(pageIndex: number, pageSize: number, data: IssueTemplate[]): IssueTemplate[] {
  const startIndex = pageIndex * pageSize;
  return data.splice(startIndex, pageSize);
}
