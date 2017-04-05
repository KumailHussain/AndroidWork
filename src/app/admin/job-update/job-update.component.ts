import * as _ from 'lodash';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { IJob } from '../jobs/job.interface';
import { JobUpdateService } from '../job-update/job-update-service';
import { storage } from '../../shared/services/storage.service';

@Component({
    templateUrl: './job-update.component.html',
    styleUrls: ['job-update.component.css'],

})

export class JobUpdateComponent implements OnInit, OnDestroy {
    private id: String;
    private subscription: any;
    public job : IJob;
    public hasFetched: Boolean;
    public hasUpdated: Boolean;
    jobApproved:Boolean;

    constructor(private jobUpdateService: JobUpdateService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
        this.id = params['id'];
        this.hasFetched = false;

        this.jobUpdateService.fetchJob(this.id).subscribe(data => {
            this.job = data;
            this.jobApproved=this.job.jobStatus;
            this.hasFetched = true;
        });
    });
}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    updateStatus(value: IJob) {
        this.hasUpdated = false;

        this.jobUpdateService.updateJobStatus(value, this.job._id).subscribe(data => {
            this.jobApproved=data.jobStatus;
            this.hasUpdated = true;
        });
    }

    update(value: IJob) {
        this.hasUpdated = false;

        this.jobUpdateService.updateJob(value, this.job._id).subscribe(data => {
            this.hasUpdated = true;
            this.job = data;
        });
    }
}

