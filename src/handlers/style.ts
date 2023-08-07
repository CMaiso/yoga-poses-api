import {Request, Response} from 'express';
import prisma from '../db';

import {getStringValue} from "../../utils/string";
import {mapStyle} from "../../utils/style";
import {StyleFromDatabase, Style} from "../../types/Style";

export const getStyles = async (req: Request, res: Response) => {
    const {name} = req.query;
    const nameStr = getStringValue(name);

    try {
        let styleResponse: Style[];
        
        if (name) {
            const styleData: StyleFromDatabase | null = await prisma.style.findFirst({
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
            if (styleData) {
                styleResponse = [mapStyle(styleData)];
            } else {
                styleResponse = []
            }
        } else {
            const styleData = await prisma.style.findMany({
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

            styleResponse = styleData.map(mapStyle);
        }

        res.json({style: styleResponse});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while retrieving styles'});
    }
}
