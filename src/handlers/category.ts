import { Request, Response } from 'express';
import prisma from '../db';

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany();

        res.json({data: categories});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving categories' });
    }
}

export const getCategoryByName = async (req: Request, res: Response) => {
    const name = req.params.name;
    try {
        const category = await prisma.category.findFirst({
            where: { name }
        });

        res.json({data: category});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving category by name' });
    }
}
