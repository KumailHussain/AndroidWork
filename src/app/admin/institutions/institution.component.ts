import * as _ from 'lodash';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Institution } from './institution.interface';
import { InstitutionService } from './institution.service';

@Component({
    templateUrl: './institution.component.html'
})

export class AdminInstitutionComponent implements OnInit {
    public hasFetched: Boolean;
    public institutions : Array<Institution>;
    constructor(private institutionService: InstitutionService, private router : Router) {
        this.hasFetched = false;
    }

    ngOnInit() {
        this.institutionService.fetchInstitutions().subscribe(data => {
            this.hasFetched = true;
            this.institutions = data;
        });
    }

    navigate(value) {
        this.router.navigate(['admin/institution', value._id]);
    }

    remove(value) {
          this.institutionService.deleteInstitution(value._id).subscribe(data => {
               this.institutions = _.filter(this.institutions, institution => institution._id !== value._id);
        });
    }
}
