import {Pose} from "./Pose";
export interface Category {
    id: string;
    name: string;
    description: string;
    poses?: Pose[] | [];
}