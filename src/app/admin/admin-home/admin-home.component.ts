import * as _ from 'lodash';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as I from './selected-user.interface';
import { EditUserService } from './edit-user.service';
import { StatsService } from './stats.service';
import { storage } from '../../shared/services/storage.service';

@Component({
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent implements OnInit, OnDestroy {
    public selectedUser: I.SelectedUser;
    public users: Array<I.SelectedUser>;
    private hasFetched: Boolean;
    public hasFetchedStats: Boolean;
    public stats: I.IStats;

     constructor(public editUserService: EditUserService, public statsService: StatsService, public router: Router){
        this.hasFetched = false;
        this.hasFetchedStats = false;
        this.remove = this.remove.bind(this);
     }

     static filterUsers(users: Array<I.SelectedUser>) : Array<I.SelectedUser> {
        const isTrue = user => user._id !== storage.get('user').id ||  user._id !== storage.get('user')._id;
       return _.filter(users, user => isTrue);
    }

    ngOnInit() {
        this.editUserService.fetchUsers().subscribe(data => {
            this.hasFetched = true;
            this.users = AdminHomeComponent.filterUsers(data);
        });

        this.statsService.fetchStats().subscribe(data => {
            this.stats = data;
            this.hasFetchedStats = true;
        });
    }

    ngOnDestroy() {
        this.editUserService.selectedUser = this.selectedUser;
    }


    navigate(value) {
        this.selectedUser = value;
        this.router.navigate(['admin/user-update']);
    }


    remove(value) {
           this.editUserService.removeUser(value._id).subscribe(() => {
               this.users = _.filter(this.users, user => user._id !== value._id);
        });
    }
}
