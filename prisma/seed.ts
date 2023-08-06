import {categories} from '../data/category';
import {styles} from '../data/styles';
import {poses} from '../data/poses';

import prisma from '../src/db';

const main = async () => {

    await prisma.category.createMany({
        data: categories,
    })

    await prisma.style.createMany({
        data: styles,
    })

    for (const pose of poses) {
        await prisma.pose.create({
            data: {
                id: pose.id,
                english_name: pose.english_name,
                sanskrit_name: pose.sanskrit_name,
                level: pose.level,
                description: pose.description,
                categoryId: pose.categoryId,
                styles: {
                    create: pose?.styles ? pose.styles.map(style => ({
                        style: {
                            connect: {
                                id: style.id
                            }
                        }
                    })): []
                },
            },
        });
    }
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })