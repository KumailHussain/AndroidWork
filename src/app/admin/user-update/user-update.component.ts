import * as _ from 'lodash';
import { Component, OnInit, Input } from '@angular/core';
import { SelectedUser } from '../admin-home/selected-user.interface';
import { EditUserService } from '../admin-home/edit-user.service';
import { storage } from '../../shared/services/storage.service';

@Component({
    templateUrl: './user-update.component.html',
    styleUrls: ['./user-update.component.css']
})


export class UserUpdateComponent implements OnInit {

    public selectedUser: SelectedUser;
    public isUpdating: Boolean;
    
    constructor(public editUserService: EditUserService) { }

    ngOnInit() {
        // What a hack!!
        if (!storage.get('selectedUser')) {
            storage.set('selectedUser', this.editUserService.selectedUser);
        }

        if (_.isUndefined(this.editUserService.selectedUser)) {
           this.selectedUser =  storage.get('selectedUser');
        } else {
            this.selectedUser = this.editUserService.selectedUser;
        }
     }


     update(credentials: SelectedUser) {
        this.isUpdating = false;
        this.editUserService.updateUser(credentials).subscribe((data) => {
            this.selectedUser = data;
            this.isUpdating = true;
        });
     }
}

