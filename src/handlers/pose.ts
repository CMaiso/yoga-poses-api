import {Request, Response} from 'express';
import prisma from '../db';

interface newFormat {
    id: string,
    english_name: string,
    sanskrit_name: string,
    level: string,
    description: string,
    category: string,
    styles: string[]
}

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
        }
        if (levelStr) {
            whereConditions = {...whereConditions, level: levelStr};
        }
        if (categoryStr) {
            whereConditions = {...whereConditions, category: {name: categoryStr}};
        }
        if (styleStr) {
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

        const rawData = await prisma.pose.findMany({
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
        const poses = rawData.map(pose => ({
            id: pose.id,
            english_name: pose.english_name,
            sanskrit_name: pose.sanskrit_name,
            level: pose.level,
            description: pose.description,
            category: pose.category.name,
            styles: pose.styles.map(stylePose => (
                stylePose.style.name
            ))
        }));
        res.status(200).json({poses});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while retrieving pose'});
    }
}
