import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { catchError, map, merge, of, startWith, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CustomPaginatorIntl } from '../../../../core/i18n/customPaginatorIntl';
import { MaterialModule } from '../../../../core/material.module';
import { SharedModule } from '../../../../core/shared.module';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserSearchbarsComponent } from "../user-searchbars/user-searchbars.component";

// TODO
// - Fix paginator
@Component({
  selector: 'app-users-list',
  imports: [MaterialModule, SharedModule, UserSearchbarsComponent],
  providers: [{provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements AfterViewInit{
  // Subcomponents
  @ViewChild(MatPaginator)
  protected paginator!: MatPaginator;

  @ViewChild(UserSearchbarsComponent)
  protected searchbars!: UserSearchbarsComponent;

  // Fields
  protected users$: Observable<User[]> = new Observable<User[]>();
  protected isLoading = false;
  protected searchQuery: Partial<User> = {};

  protected columnsToDisplay: string [] = ['email', 'name', 'firstSurname', 'secondSurname'];
  protected dataLength = 0;
  protected dataPage = 0
  protected dataPageSize = 5;
  protected dataPageSizeOptions = [5, 10, 25, 100];

  // Constructor
  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {
    this.loadUsers();
  }

  onSearch(query: Partial<User>) {
    this.searchQuery = query;
    this.paginator.pageIndex = 0
    this.loadUsers();
  }

  private loadUsers() {
    this.users$ = merge(
      this.paginator.page
    ).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoading = true;

        return this.userService.getUsersByQuery({
          ...this.searchQuery,
          page: this.paginator.pageIndex,
          limit: this.paginator.pageSize
        }).pipe(catchError(() => of(null)));
      }),
      map(response => {
        this.isLoading = false;

        if (!response) {
          return [];
        }

        console.log(response);
        console.log(this.dataPage);

        this.dataLength = response.totalResults;
        this.dataPage = response.currentPage;

        return response.data;
      })
    );
  }
}
