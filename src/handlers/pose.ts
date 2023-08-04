import {Request, Response} from 'express';
import prisma from '../db';

export const getPoses = async (req: Request, res: Response) => {
    const {name, level, category, style} = req.query;

    const nameStr = Array.isArray(name) ? name[0] : name;
    const levelStr = Array.isArray(level) ? level[0] : level;
    const categoryStr = Array.isArray(category) ? category[0] : category;
    const styleStr = Array.isArray(style) ? style[0] : style;

    try {
        let whereConditions = {};

        if (nameStr) {
            whereConditions = {...whereConditions, english_name: nameStr};
        } if (levelStr) {
            whereConditions = {...whereConditions, level: levelStr};
        } if (categoryStr) {
            whereConditions = {...whereConditions, category: {name: categoryStr}};
        } if (styleStr) {
            whereConditions = {
                ...whereConditions,
                styles: {
                    some: {
                        style: {
                            name: styleStr
                        }
                    }
                }
            };
        }

        console.log(whereConditions);
        const poses = await prisma.pose.findMany({
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
        res.status(200).json({data: poses});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while retrieving pose'});
    }
}
