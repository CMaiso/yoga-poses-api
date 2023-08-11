import {Pose, PoseFromDatabase} from "./Pose";
export interface Category {
    id: string;
    name: string;
    description: string;
    poses?: Pose[] | [];
}

export interface CategoryFromDatabase {
    id: string;
    name: string;
    description: string;
    poses: PoseFromDatabase[] | [];
}