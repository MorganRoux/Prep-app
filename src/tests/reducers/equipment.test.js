import React from 'react';
import { shallow } from 'enzyme';
import equipmentsReducer from '../../reducers/equipment';
import equipments from '../fixtures/equipment';


test('should set default state', ()=>{
    const state = equipmentsReducer(undefined, '@@INIT');
    expect(state).toEqual(equipments);
});

test('should remove equipement by id', ()=>{
    const key = equipments[1].key;
    const action = {
        type: 'REMOVE_EQUIPMENT',
        key
    }
    const state = equipmentsReducer(
        [equipments[0],equipments[1],equipments[2]],
        action);
    expect(state).toEqual([equipments[0], equipments[2]]);

});