import { Request, Response } from 'express';
import prisma from '../db';

export const getAllStyles = async (req: Request, res: Response) => {
    try {
        const styles = await prisma.style.findMany();

        res.json({data: styles});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving poses' });
    }
}

export const getStyleByName = async (req: Request, res: Response) => {
    const name = req.params.name;
    try {
        const style = await prisma.category.findFirst({
            where: { name }
        });

        res.json({data: style});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving pose' });
    }
}

export const getStylesByLevel = async (req: Request, res: Response) => {
    const level = req.params.level;
    try {
        const styles = await prisma.category.findMany({
            where: { level }
        });

        res.json({data: styles});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving poses' });
    }
}
