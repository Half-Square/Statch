/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-22 18:44:16                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-11-30 16:49:55                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Interfaces
  * Create new item
*/

/* Imports */
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "lodash";
/***/

/* Services */
import { RecoveryService } from "src/app/services/recovery.service";
import { RequestService } from "src/app/services/request.service";
import { ToastService } from "src/app/services/toast.service";
import { UserService } from "src/app/services/user.service";
import { FilterSortService } from "src/app/services/filter-sort.service";
/***/

/* Interfaces */
import { ILabels, IProjects, ITasks, ITickets, IUsers, IVersions } from "src/app/interfaces";
/***/

type ProjectSortKey = keyof IProjects;
type TaskSortKey = keyof ITasks;
type TicketSortKey = keyof ITickets;

// Créez un type d'union pour les clés de tri des différentes interfaces
type SortKey = ProjectSortKey | TaskSortKey | TicketSortKey;


/* eslint-disable  @typescript-eslint/no-explicit-any */
@Component({
  selector: "view-ptt-all",
  templateUrl: "./ptt-all.view.html",
  styleUrls: ["./ptt-all.view.scss"]
})
export class PttAllView implements OnInit, OnDestroy {
  public elements: IProjects[] | ITasks[] | ITickets[];
  public type: string;
  public id: string;
  public versions: IVersions[] = [];
  public filteredSortedItems: IProjects[] | ITasks[] | ITickets[];
  public filters: any = {
    owner: [],
    assignments: [],
    version: [],
    status: [],
    labels: [],
    level: []
  };
  public sortBy: SortKey;
  public users: IUsers[];
  public labels: ILabels[] = [];
  public readonly status: {id: string, status: string}[] = [
    {id: "new", status: "new"},
    {id: "progress", status: "progress"},
    {id: "done", status: "done"},
    {id: "reject", status: "reject"},
    {id: "wait", status: "wait"}
  ];
  public readonly levels: {id: string, level: string}[] = [
    {id: "low", level: "low"},
    {id: "normal", level: "normal"},
    {id: "moderate", level: "moderate"},
    {id: "high", level: "high"}
  ];

  private qSub: Subscription;
  private pSub: Subscription;
  private subsciption: Subscription[] = [];

  constructor(private router: Router,
              private recovery: RecoveryService,
              private api: RequestService,
              private toast: ToastService,
              private user: UserService,
              private route: ActivatedRoute,
              private filterSort: FilterSortService) {
  }

  ngOnInit(): void {
    this.qSub = this.route.queryParams.subscribe((queries) => {
      this.id = queries["id"];
    });

    this.pSub = this.route.paramMap.subscribe((params) => {
      this.subsciption.map((s) => s.unsubscribe());
      this.type = params.get("type") as string;

      this.subsciption = [
        this.recovery.get(this.type).subscribe((data) => {
          this.elements = data;
          this.filteredSortedItems = data;
        }),
        this.recovery.get("users").subscribe((u) => this.users = u),
        this.recovery.get("versions").subscribe((v) => this.versions = [...v, {id: null, name: "No version"}])
      ];
    });
  }

  ngOnDestroy(): void {
    if (this.qSub) this.qSub.unsubscribe();
    if (this.pSub) this.pSub.unsubscribe();
    this.subsciption.map((s) => s.unsubscribe());
  }

  /**
  * Create new item
  */
  public createItem(): void {
    let url = "";

    switch(this.type) {
    case "projects": url = "projects"; break;
    case "tasks": url = `projects/${this.id}/tasks`; break;
    case "tickets": url = `tasks/${this.id}/tickets`; break;
    }

    this.api.post(`api/${url}`, {
      name: `New ${this.type.slice(0, -1)}`,
      description: `It's a new ${this.type.slice(0, -1)}!`
    }, this.user.getUser()?.token)
      .then((ret) => {
        this.recovery.updateData(ret, this.type);
        this.router.navigate([`/${this.type}/${(ret as {id: string}).id}`]);
      }).catch((err) => {
        console.error(err);
        this.toast.print(`Error >> ${err.message || err.statusText}`, "error");
      });
  }
  /***/

  /**
  * Filter list by parent
  * @param elements - List of items
  * @return - Filtered list
  */
  public filterByParent(elements:  any[]): any[] {
    if (!this.id || this.id == "") return elements;

    return _.filter(elements, (el) => (
      (el as ITasks).projectId == this.id ||
      (el as ITickets).taskId == this.id ||
      this.type == "projects"
    ));
  }
  /***/


  public addFilter(collection: string, event: Event): void {
    if (this.filters.hasOwnProperty(collection)) {
      this.filters[collection] = event;
      this.applyFiltersAndSort();
    }
  }

  public applyFiltersAndSort(): void {
    const filtersEmpty = Object.values(this.filters)
      .every(collection => Array.isArray(collection) && collection.length === 0);
    if ("projectId" in this.elements[0]) {
      this.filteredSortedItems =
        this.filterSort.filterItems(this.elements  as ITasks[], this.filters);
      this.filteredSortedItems =
        this.filterSort.sortItems<ITasks>(
          this.filteredSortedItems as ITasks[], this.sortBy as TaskSortKey);
    } else if ("taskId" in this.elements[0]) {
      this.filteredSortedItems =
        this.filterSort.filterItems(this.elements  as ITickets[], this.filters);
      this.filteredSortedItems =
        this.filterSort.sortItems<ITickets>(
          this.filteredSortedItems as ITickets[], this.sortBy as TicketSortKey);
    } else if (!("projectId" in this.elements[0]) || !("taskId" in this.elements[0])) {
      this.filteredSortedItems =
        this.filterSort.filterItems(this.elements  as IProjects[], this.filters);
      this.filteredSortedItems =
        this.filterSort.sortItems<IProjects>(
          this.filteredSortedItems as IProjects[], this.sortBy as ProjectSortKey);
    }
    if(filtersEmpty)
      this.filteredSortedItems = this.elements;
  }
}
