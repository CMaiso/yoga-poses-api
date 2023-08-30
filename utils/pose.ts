import {Pose, PoseFromDatabase} from "../types/Pose";
import {Style, StyleOnPose} from "../types/Style";

export const mapPose = (pose: PoseFromDatabase): Pose => ({
    id: pose.id,
    english_name: pose.english_name,
    sanskrit_name: pose.sanskrit_name,
    level: pose.level,
    description: pose.description,
    category: pose?.category?.name,
    styles: pose.styles.map((stylePose: StyleOnPose): Style => ({
        id: stylePose.style.id,
        name: stylePose.style.name,
        description: stylePose.style.description
    }))
})

export const buildWhereConditions = (
    nameStr?: string, levelStr?: string, categoryStr?: string, styleStr?: string
) => {
    let whereConditions = {};

    if (nameStr) whereConditions = {...whereConditions, english_name: nameStr};
    if (levelStr) whereConditions = {...whereConditions, level: levelStr};
    if (categoryStr) whereConditions = {...whereConditions, category: {name: categoryStr}};
    if (styleStr) {
        whereConditions = {
            ...whereConditions,
            styles: {
                some: {
                    style: {name: styleStr}
                }
            }
        };
    }

    return whereConditions;
};