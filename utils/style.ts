import {PosesOnStyle, Style, StyleFromDatabase} from "../types/Style";
import {Pose} from "../types/Pose";

export const mapStyle = (style: StyleFromDatabase): Style => ({
    id: style?.id,
    name: style?.name,
    description: style?.description,
    poses: style?.poses?.length ? style?.poses?.map(mapPoseForStyle) : [],
})

export const mapPoseForStyle = (pose: PosesOnStyle): Pose => ({
    id: pose.pose.id,
    english_name: pose.pose.english_name,
    sanskrit_name: pose.pose.sanskrit_name,
    level: pose.pose.level,
    description: pose.pose.description,
    category: pose.pose.category,
})