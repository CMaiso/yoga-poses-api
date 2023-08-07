import {Request, Response} from 'express';
import prisma from '../db';

import {getStringValue} from "../../utils/string";
import {mapCategory} from "../../utils/category";

import {Category} from "../../types/Category";

export const getCategories = async (req: Request, res: Response) => {
    const {name} = req.query;
    const nameStr = getStringValue(name);

    try {
        let categoriesResponse: Category[];

        if (nameStr) {
            const categoryData: Category = await prisma.category.findFirst({
                where: {name: nameStr},
                include: {poses: {include: {styles: {include: {style: true}}}}},
            });
            categoriesResponse = [mapCategory(categoryData)];
        } else {
            const categoriesData = await prisma.category.findMany({
                include: {poses: {include: {styles: {include: {style: true}}}}},
            });
            categoriesResponse = categoriesData.map(mapCategory);
        }

        res.json({categories: categoriesResponse});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while retrieving categories'});
    }
}
