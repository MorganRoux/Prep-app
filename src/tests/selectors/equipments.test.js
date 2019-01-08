import { getVisibleEquipments } from '../../selectors/equipment';
import equipments from '../fixtures/equipment';

test('should select equipements to display without match', () => {
    const visible = getVisibleEquipments(equipments, {text: 'notamatch'});
    expect(visible).toEqual([equipments[3]]);
});

test('should select equipements to display with category match', () => {
    const visible = getVisibleEquipments(equipments, {text: 'mic'});
    expect(visible).toEqual([
        equipments[0],
        equipments[2],
        equipments[3],
        equipments[4],
        equipments[5]
    ]);
});