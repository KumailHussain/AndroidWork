import * as _ from 'lodash';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Institution } from '../institutions/institution.interface';
import { InstitutionUpdateService } from '../institution-update/institution-update-service';
import { storage } from '../../shared/services/storage.service';

@Component({
    templateUrl: './institution-update.component.html',
    styleUrls: ['./institution-update.component.css']
})

export class InstitutionUpdateComponent implements OnInit, OnDestroy {
    private id: String;
    private subscription: any;
    public institution: Institution;
    public hasFetched: Boolean;
    public hasUpdated: Boolean;

    constructor(private institutionUpdateService: InstitutionUpdateService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
         this.id = params['id'];
         this.hasFetched = false;

        this.institutionUpdateService.fetchInstitution(this.id).subscribe(data => {
            this.institution = data;
            this.hasFetched = true;
        });
    });
}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    update(value: Institution) {
        this.hasUpdated = false;
        this.institutionUpdateService.updateInstitution(value, this.institution._id).subscribe(data => {
            this.hasUpdated = true;
            this.institution = data;
        });
    }
}

