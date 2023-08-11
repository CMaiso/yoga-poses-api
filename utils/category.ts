import {Category, CategoryFromDatabase} from "../types/Category";
import {Pose, PoseFromDatabase} from "../types/Pose";
import {Style, StyleOnPose} from "../types/Style";
export const mapCategory = (category: CategoryFromDatabase): Category => ({
    id: category?.id,
    name: category?.name,
    description: category?.description,
    poses: category?.poses?.length ? category.poses.map(mapPoseForCategory) : [],
});

export const mapPoseForCategory = (pose: PoseFromDatabase): Pose => ({
    id: pose.id,
    english_name: pose.english_name,
    sanskrit_name: pose.sanskrit_name,
    level: pose.level,
    description: pose.description,
    styles: pose.styles.map((stylePose: StyleOnPose): Style => ({
        id: stylePose.style.id,
        name: stylePose.style.name,
        description: stylePose.style.description
    }))
});