import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import * as _ from 'lodash';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-table',
    template: `
        <table>
  <tr class="headers">
    <th *ngFor="let header of headers">{{ header }}</th>
  </tr>
  <tr *ngFor="let value of data">
  <td *ngFor="let key of value | keys">{{value[key]}}</td>
   <td class="icons">
        <i class="glyphicon glyphicon-eye-open" title="View who Applied for this job" *ngIf="path=='jobs'" (click)="view(value)"></i>        
        <i class="fa fa-pencil-square-o" (click)="edit(value)"></i>
        <i class="fa fa-trash" (click)="remove(value)"></i>        
   </td>
  </tr>
</table>
    `,
    styles: [`
    table {
    border-collapse: collapse;
    width: 100%;
}

th, td {
    text-align: left;
    padding: 8px;
}


.headers {
    font-size: 16px;
    color: darkslategray !important;
    background: transparent !important;
    text-transform: uppercase;
}

tr:nth-child(even){background-color: #222939; color: white;}
tr:nth-child(odd){background-color: #343b4c; color: white;}

i {
    padding-right: 10px;
    cursor: pointer;
}

.icons {
    text-align: right;
}
    
    `]
})
export class TableComponent implements OnChanges {
    public headers: any[];
    path:String;

    @Input() data: any[];

    @Output() onEdit: EventEmitter<string> = new EventEmitter<string>();
    @Output() onRemove: EventEmitter<string> = new EventEmitter<string>();
    @Output() onView: EventEmitter<string> = new EventEmitter<string>();

    constructor(private route:ActivatedRoute) {
        this.path=route.snapshot.url[0].path;
    }

    edit(value) {
        this.onEdit.emit(value);
    }

    remove(value) {
        this.onRemove.emit(value);
    }

    view(value){
        this.onView.emit(value);
    }

    static getHeaders(data: any[]): any[] {
        return TableComponent.startCaseHeadings(_.keys(_.head(data)));
    }

    static startCaseHeadings(headings: any[]): any[] {
        return _.map(headings, heading => _.startCase(heading));
    }

    ngOnChanges() {
        if (_.isEmpty(this.headers)) {
            if (!_.isEmpty(this.data)) {
                const withoutIds = _.map(this.data, value => _.omit(value, ['_id', '__v']))
                this.headers = TableComponent.getHeaders(withoutIds)
            }

        }
    }

}
