import React from 'react';
import { shallow } from 'enzyme';
import equipmentsReducer from '../../reducers/equipment';
import equipments from '../fixtures/equipment';
import stocklist from '../fixtures/stocklist';

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

test('should add equipment if not a kit', () => {
    const quantity= '2';
    const item = {...stocklist[1], quantity};
    const newItem = {
        category: stocklist[1].category,
        quantity,
        stockName: stocklist[1].stockName,        
        id: expect.any(String),           
        parentId: null,       
        parentName: null
    }
    const action = {
        type: 'ADD_EQUIPMENT',
        item
    }
    const prevState = equipments;
    const state = equipmentsReducer(prevState, action);
    expect(state).toEqual([...prevState, newItem])

});


test('should add equipement if it\'s a kit', () => {
    const quantity= '2';
    const kit = stocklist[3];
    const item = {...kit, quantity};
    const id = expect.any(String);
    const newItem = [{
        category: 'kit',
        quantity,
        stockName: 'kit1',        
        id: expect.any(String),         
        parentId: null,       
        parentName: null
    }, {
        category: 'microphone',
        quantity: 3,
        stockName: 'sm57',
        id: expect.any(String),
        parentId: expect.any(String),
        parentName: 'kit1'
    }, {
        category: 'microphone',
        quantity: 10,
        stockName: 'B52',
        id: expect.any(String),
        parentId: expect.any(String),
        parentName: 'kit1'
    }, {
        category: 'other',
        quantity: 5,
        stockName: 'B91',
        id: expect.any(String),
        parentId: expect.any(String),
        parentName: 'kit1'
    }];
    
    const action = {
        type: 'ADD_EQUIPMENT',
        item
    }
    const prevState = equipments;
    const state = equipmentsReducer(prevState, action);
    expect(state).toEqual([...prevState, ...newItem])
});


test('should move equipment in the state', () => {
    const prevState = [
        equipments[0],
        equipments[1],
        equipments[2],
        equipments[3]
    ];
    const oldIndex = 2;
    const newIndex = 1;
    const action = {
        type: 'MOVE_EQUIPMENT',
        oldIndex,
        newIndex
    }

    const state = equipmentsReducer(prevState, action);
    expect(state).toEqual([
        equipments[0],
        equipments[2],
        equipments[1],
        equipments[3]
    ]);

})