import { EntityId } from '@lct/models/id.model';

// Do not edit
export interface TodoModel extends EntityId {
    title: string;
    completed: boolean;
    completedDate: Date;
}
