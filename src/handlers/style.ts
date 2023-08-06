import {Request, Response} from 'express';
import prisma from '../db';

export const getStyles = async (req: Request, res: Response) => {
    const {name} = req.query;
    const nameStr = Array.isArray(name) ? name[0] : name;

    let rawData;

    try {
        if (name) {
            rawData = await prisma.style.findFirst({
                where: {name: nameStr},
                include: {
                    poses: {
                        include: {
                            pose: {
                                include: {
                                    category: true,
                                }
                            },
                        },
                    }
                }
            });
            const style = {
                id: rawData?.id,
                name: rawData?.name,
                poses: rawData?.poses.map((pose: any) => ({
                    id: pose.pose.id,
                    english_name: pose.pose.english_name,
                    sanskrit_name: pose.pose.sanskrit_name,
                    level: pose.pose.level,
                    description: pose.pose.description,
                    category: pose.pose.category
                }))
            };
            res.json({style});
        } else {
            rawData = await prisma.style.findMany({
                include: {
                    poses: {
                        include: {
                            pose: {
                                include: {
                                    category: true,
                                }
                            },
                        }
                    }
                }
            });

            const styles = rawData.map((style: any) => ({
                id: style.id,
                name: style.name,
                poses: style.poses.map((pose: any) => ({
                    id: pose.pose.id,
                    english_name: pose.pose.english_name,
                    sanskrit_name: pose.pose.sanskrit_name,
                    level: pose.pose.level,
                    description: pose.pose.description,
                    category: pose.pose.category
                }))
            }));

            res.json({styles});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while retrieving styles'});
    }
}
