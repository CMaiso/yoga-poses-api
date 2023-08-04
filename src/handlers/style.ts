import { Request, Response } from 'express';
import prisma from '../db';

export const getStyles = async (req: Request, res: Response) => {
    const { name } = req.query;
    const nameStr = Array.isArray(name) ? name[0] : name;

    let styles;

    try {
        if (name) {
           styles = await prisma.style.findFirst({
                where: { name: nameStr }
            });
        } else {
            styles = await prisma.style.findMany();
        }

        res.json({data: styles});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving styles' });
    }
}
