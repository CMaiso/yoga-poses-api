import {Request, Response} from 'express';
import prisma from '../db';

import {getStringValue} from "../../utils/string";
import {mapPose} from "../../utils/pose";

import {PoseFromDatabase} from "../../types/Pose";

export const getPoses = async (req: Request, res: Response) => {
    const {name, level, category, style} = req.query;

    const nameStr = getStringValue(name);
    const levelStr = getStringValue(level);
    const categoryStr = getStringValue(category);
    const styleStr = getStringValue(style);

    const buildWhereConditions = (
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

    try {
        const whereConditions = buildWhereConditions(nameStr, levelStr, categoryStr, styleStr);

        const posesResponse: PoseFromDatabase[] = await prisma.pose.findMany({
            where: whereConditions,
            include: {
                category: true,
                styles: {
                    include: {
                        style: true
                    }
                }
            }
        });

        const poses = posesResponse.map(mapPose);

        res.status(200).json({poses});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while retrieving pose'});
    }
}
