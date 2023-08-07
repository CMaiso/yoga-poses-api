import {Category} from "./Category";
import {Style, StyleOnPose} from "./Style";
export interface Pose {
    id: string;
    english_name: string;
    sanskrit_name: string;
    level: string;
    description: string;
    category?: Category | string;
    styles?: Style[];
}

export interface PoseFromDatabase {
    id: string;
    english_name: string;
    sanskrit_name: string;
    level: string;
    description: string;
    category: Category;
    styles: StyleOnPose[];
    categoryId: string;
}