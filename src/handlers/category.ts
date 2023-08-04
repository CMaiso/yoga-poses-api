import { Request, Response } from 'express';
import prisma from '../db';

export const getCategories = async (req: Request, res: Response) => {
    const { name } = req.query;
    const nameStr = Array.isArray(name) ? name[0] : name;

    let categories;

    try {
        if (name) {
            categories = await prisma.category.findFirst({
                where: { name: nameStr },
                include: {
                    poses: true,
                }
            });
        } else {
            categories = await prisma.category.findMany({
                include: {
                    poses: true,
                }
            });
        }

        res.json({data: categories});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving categories' });
    }
}
