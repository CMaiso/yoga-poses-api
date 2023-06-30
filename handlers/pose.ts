import { Request, Response } from 'express';
import prisma from '../db';

export const getAllPoses = async (req: Request, res: Response) => {
    try {
        const poses = await prisma.pose.findMany();

        res.json({data: poses});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving poses' });
    }
}

export const getOnePose = async (req: Request, res: Response) => {
    const name = req.params.name;
    try {
        const pose = await prisma.pose.findFirst({
            where: { name }
        });

        res.json({data: pose});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving pose' });
    }
}

export const getPosesByLevel = async (req: Request, res: Response) => {
    const level = req.params.level;
    try {
        const poses = await prisma.pose.findMany({
            where: { level }
        });

        res.json({data: poses});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving poses' });
    }
}
