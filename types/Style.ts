import {Pose} from "./Pose";

export interface Style {
    id: string;
    name: string;
    description: string;
    poses?: Pose[] | [];
}

export interface StyleFromDatabase {
    id: string;
    name: string;
    description: string;
    poses?: PosesOnStyle[] | [];
}

export interface StyleOnPose {
    styleId: string,
    poseId: string,
    style: Style
}

export interface PosesOnStyle {
    styleId: string,
    poseId: string,
    pose: Pose,
}