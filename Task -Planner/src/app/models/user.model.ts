import { EntityId } from '@lct/models/id.model';

// Do not edit
export interface UserModel extends EntityId {
    name: string;
    phone: string;
    username: string;
    email: string;
}
