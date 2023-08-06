import { Request, Response } from 'express';
import prisma from '../db';

export const getCategories = async (req: Request, res: Response) => {
    const { name } = req.query;
    const nameStr = Array.isArray(name) ? name[0] : name;

    let rawData;

    try {
        if (name) {
            rawData = await prisma.category.findFirst({
                where: { name: nameStr },
                include: {
                    poses: {
                        include: {
                            category: true
                        }
                    }
                }
            });

            const category = {
                id: rawData?.id,
                name: rawData?.name,
                description: rawData?.description,
                poses: rawData?.poses?.length ? rawData?.poses.map((pose: any) => ({
                    id: pose.id,
                    english_name: pose.english_name,
                    sanskrit_name: pose.sanskrit_name,
                    level: pose.level,
                    description: pose.description,
                    category: pose.category
                })) : []
            };

            res.json({category});
        } else {
            rawData = await prisma.category.findMany({
                include: {
                    poses: {
                        include: {
                            category: true
                        }
                    }
                }
            });

            const categories = rawData.map((category: any) => ({
                id: category?.id,
                name: category?.name,
                description: category?.description.name,
                poses: category?.poses?.length ? category?.poses.map((pose: any) => ({
                    id: pose.id,
                    english_name: pose.english_name,
                    sanskrit_name: pose.sanskrit_name,
                    level: pose.level,
                    description: pose.description,
                    category: pose.category
                })) : []
            }));
            res.json({categories});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving categories' });
    }
}
