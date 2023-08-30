import {Request, Response} from 'express';
import prisma from '../db';

import {getStringValue} from "../../utils/string";
import {mapPose, buildWhereConditions} from "../../utils/pose";

import {PoseFromDatabase} from "../../types/Pose";

export const getPoses = async (req: Request, res: Response) => {
    const {name, level, category, style} = req.query;

    const nameStr = getStringValue(name);
    const levelStr = getStringValue(level);
    const categoryStr = getStringValue(category);
    const styleStr = getStringValue(style);

    try {
        const whereConditions = buildWhereConditions(nameStr, levelStr, categoryStr, styleStr);
        console.log(whereConditions);

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
