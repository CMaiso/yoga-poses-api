import {Request, Response} from 'express';
import prisma from '../db';

export const getPoses = async (req: Request, res: Response) => {
    const {name, level, category, style} = req.query;

    const nameStr = Array.isArray(name) ? name[0] : name;
    const levelStr = Array.isArray(level) ? level[0] : level;
    const categoryStr = Array.isArray(category) ? category[0] : category;
    const styleStr = Array.isArray(style) ? style[0] : style;

    try {
        let poses;

        if (name) {
            poses = await prisma.pose.findFirst({
                where: {english_name: nameStr},
                include: {
                    category: true,
                    styles: {
                        include: {
                            style: true
                        }
                    }
                }
            });
        } else if (level) {
            poses = await prisma.pose.findMany({
                where: {level: levelStr},
                include: {
                    category: true,
                    styles: {
                        include: {
                            style: true
                        }
                    }
                }
            });
        } else if (category) {
            poses = await prisma.pose.findMany({
                where: {category: {name: categoryStr}},
                include: {
                    category: true,
                    styles: {
                        include: {
                            style: true
                        }
                    }
                }
            });
        } else if (style) {
            poses = await prisma.pose.findMany({
                where: {
                    styles: {
                        some: {
                            style: {
                                name: styleStr
                            }
                        }
                    }
                },
                include: {
                    styles: {
                        include: {
                            style: true
                        }
                    },
                    category: true
                }
            });
        } else {
            poses = await prisma.pose.findMany({
                include: {
                    category: true,
                    styles: {
                        include: {
                            style: true
                        }
                    }
                }
            });

        }
        res.status(200).json({data: poses});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while retrieving pose'});
    }
}
