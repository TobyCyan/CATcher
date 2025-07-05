import { DataSource } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, merge, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { paginateData } from './issue-template-paginator';
import { getSortedData } from './issue-template-sorter';
import { applySearchFilter } from './search-filter';
import { IssueTemplate } from '../../core/models/issue-template.model';
import { IssueTemplateService } from '../../core/services/issue-template.service';

export class IssueTemplatesDataTable extends DataSource<IssueTemplate> {
  private filterChange = new BehaviorSubject('');
  private issuesSubject = new BehaviorSubject<IssueTemplate[]>([]);
  private issueTemplateSubscription: Subscription;

  constructor(
    private issueTemplateService: IssueTemplateService,
    private sort: MatSort,
    private paginator: MatPaginator,
    private displayedColumn: string[],
    private defaultFilter?: (issueTemplate: IssueTemplate) => boolean
  ) {
    super();
  }

  getGlobalTableIndex(localTableIndex: number) {
    const currentPage = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    return currentPage * pageSize + localTableIndex;
  }

  connect(): Observable<IssueTemplate[]> {
    return this.issuesSubject.asObservable();
  }

  disconnect() {
    this.filterChange.complete();
    this.issuesSubject.complete();
  }

  loadTemplates() {
    const displayDataChanges = [this.issueTemplateService.savedTemplates, this.paginator.page, this.sort.sortChange, this.filterChange];

    this.issueTemplateSubscription = merge(...displayDataChanges)
      .pipe(
        map(() => {
          let data = <IssueTemplate[]>Object.values(this.issueTemplateService.savedTemplates).reverse();
          if (this.defaultFilter) {
            data = data.filter(this.defaultFilter);
          }
          data = getSortedData(this.sort, data);
          data = applySearchFilter(this.filter, this.displayedColumn, this.issueTemplateService, data);
          data = paginateData(this.paginator, data);

          return data;
        })
      )
      .subscribe((issues) => {
        this.issuesSubject.next(issues);
      });
  }

  get filter(): string {
    return this.filterChange.value;
  }

  set filter(filter: string) {
    this.filterChange.next(filter);
  }
}
