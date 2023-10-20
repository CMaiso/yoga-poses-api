import {poseDataFromDatabaseFixture, poseFixture} from "../../../utils/fixtures/pose";
import {mapPose, buildWhereConditions} from "../../../utils/pose";
import {getStringValue} from "../../../utils/string";

jest.mock('@prisma/client', () => ({
    pose: {
        findMany: jest.fn(),
    },
}));

import prisma from '../../db';


describe('PoseHandler', () => {
    it('should map from PosesFromDatabase to Poses', () => {
        expect(mapPose(poseDataFromDatabaseFixture)).toEqual(poseFixture);
    });

    describe('should build correct where conditions', () => {
        const {name, level, category, style} = {
            name: 'Moutain Pose',
            level: 'Beginner',
            category: 'Standing',
            style: 'Hatha'
        };

        it('with only one parameter', () => {
            const nameStr = getStringValue('');
            const levelStr = getStringValue('');
            const categoryStr = getStringValue('');
            const styleStr = getStringValue(style);

            expect(buildWhereConditions(nameStr, levelStr, categoryStr, styleStr)).toEqual({
                styles: {some: {style: {name: styleStr}}}
            });
        });

        it('with all parameters', () => {
            const nameStr = getStringValue(name);
            const levelStr = getStringValue(level);
            const categoryStr = getStringValue(category);
            const styleStr = getStringValue(style);

            expect(buildWhereConditions(nameStr, levelStr, categoryStr, styleStr)).toEqual({
                english_name: nameStr,
                level: levelStr,
                category: {name: categoryStr},
                styles: {some: {style: {name: styleStr}}}
            });
        });

        it('with a wrong parameter', () => {
            const nameStr = getStringValue('');
            const levelStr = getStringValue('');
            const categoryStr = getStringValue('');
            const styleStr = getStringValue('');

            expect(buildWhereConditions(nameStr, levelStr, categoryStr, styleStr)).toEqual({});
        });
    });

    describe('getPoses endpoint', () => {
        it('should return poses successfully', async () => {
            const mockPoses = [

            ];

            (prisma.pose.findMany as jest.Mock).mockResolvedValue(mockPoses);

            const response = await request(app).get('/your-endpoint-path?name=someName');

            expect(response.status).toBe(200);
            expect(response.body.poses).toEqual(mockPoses);
            // ... any other assertions you want to make
        });
    });
})