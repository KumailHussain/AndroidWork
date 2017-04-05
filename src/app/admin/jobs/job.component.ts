import * as _ from 'lodash';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IJob } from './job.interface';
import { AdminJobService } from './job.service';

@Component({
    templateUrl: './job.component.html'
})

export class AdminJobComponent implements OnInit { 
    public hasFetched: Boolean;
    public jobs : Array<IJob>;
    constructor(private adminJobService: AdminJobService, private router : Router) { 
        this.hasFetched = false;
    }

    ngOnInit() {
        this.adminJobService.fetchJobs().subscribe(data => { 
            this.hasFetched = true;
            this.jobs = data;
        });
    }

    navigate(value) {
        this.router.navigate(['admin/job', value._id])
    }

    remove(value) {
          this.adminJobService.deleteJob(value._id).subscribe(data => {
               this.jobs = _.filter(this.jobs, job => job._id !== value._id);
          });
    }

    view(value) {
        this.router.navigate(['admin/view-appliers', value._id])
    }

}
