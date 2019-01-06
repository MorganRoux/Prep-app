import React from 'react';
import { shallow } from 'enzyme';
import equipmentsReducer from '../../reducers/equipment';
import equipments from '../fixtures/equipment';


test('should set default state', ()=>{
    const state = equipmentsReducer(undefined, '@@INIT');
    expect(state).toEqual(equipments);
});

test('should remove equipement by id', ()=>{
    const id = equipments[1].id;
    const action = {
        type: 'REMOVE_EQUIPMENT',
        id
    }
    const state = equipmentsReducer(
        [equipments[0],equipments[1],equipments[2]],
        action);
    expect(state).toEqual([equipments[0], equipments[2]]);

});