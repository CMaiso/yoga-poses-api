import {Pose, PoseFromDatabase} from "../types/Pose";
import {Style, StyleOnPose} from "../types/Style";

export const mapPose = (pose: PoseFromDatabase): Pose => ({
    id: pose.id,
    english_name: pose.english_name,
    sanskrit_name: pose.sanskrit_name,
    level: pose.level,
    description: pose.description,
    category: pose.category.name,
    styles: pose.styles.map((stylePose: StyleOnPose): Style => ({
        id: stylePose.style.id,
        name: stylePose.style.name,
    }))
})