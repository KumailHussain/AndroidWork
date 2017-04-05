import {Component, OnInit, Input} from '@angular/core';
import {viewAppliedJobService} from "./viewAppliedJob.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    templateUrl: 'viewAppliedJob.component.html',
    styleUrls: ['viewAppliedJob.component.css'],
  providers: [viewAppliedJobService]
})

export class viewAppliedJobComponent implements OnInit{

  appliedJobs:any=[];
  id:string;
  appliedNotification:boolean

  constructor(private _viewAppliedJobService: viewAppliedJobService,private route: ActivatedRoute){}

  getAppliedJobs()
  {
     this.id= this.route.snapshot.params['id'];

          this._viewAppliedJobService.getAppliedJobs(this.id)
          .subscribe(
              data => {
                  this.appliedJobs = data;
                  if(this.appliedJobs.length>0)
                  {
                    this.appliedNotification=true
                  }
                  else
                  {
                      this.appliedNotification=false
                  }
              },
          );
  }

  ngOnInit() {
      this.getAppliedJobs();
  }
}
