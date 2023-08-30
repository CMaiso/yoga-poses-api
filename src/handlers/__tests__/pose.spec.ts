import {poseDataFromDatabaseFixture, poseFixture} from "../../../utils/fixtures/pose";
import {mapPose, buildWhereConditions} from "../../../utils/pose";
import {getStringValue} from "../../../utils/string";


describe('PoseHandler', () => {
    it('should map from PosesFromDatabase to Poses',() => {
        expect(mapPose(poseDataFromDatabaseFixture)).toEqual(poseFixture);
    });

    it('should build correct where conditions', () => {
        const {name, level, category, style} = {name: 'Moutain Pose', level: 'Beginner', category: 'Standing', style:'Hatha'};

        it('with only one parameter', () => {
            const nameStr = getStringValue('');
            const levelStr = getStringValue('');
            const categoryStr = getStringValue('');
            const styleStr = getStringValue(style);

            expect(buildWhereConditions(nameStr, levelStr, categoryStr, styleStr )).toEqual({
                styles: { some: { style: { name: styleStr } } }
            });
        });

        it('with all parameters', () => {
            const nameStr = getStringValue(name);
            const levelStr = getStringValue(level);
            const categoryStr = getStringValue(category);
            const styleStr = getStringValue(style);

            expect(buildWhereConditions(nameStr, levelStr, categoryStr, styleStr )).toEqual({
                english_name: nameStr,
                level: levelStr,
                category: { name: categoryStr },
                styles: { some: { style: { name: styleStr } } }
            });
        });
    });
})