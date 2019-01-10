import React from 'react'
import { EquipmentAddForm } from '../../components/EquipmentAddForm';
import { shallow } from 'enzyme';
import equipments from '../fixtures/equipment';
import stocklist from '../fixtures/stocklist';


let wrapper, startAddEquipment, enqueueSnackbar;

beforeEach(() => {
    startAddEquipment = jest.fn();
    enqueueSnackbar = jest.fn();
    wrapper = shallow(<EquipmentAddForm 
        kit = {equipments[3]}
        startAddEquipment = {startAddEquipment}
        enqueueSnackbar = {enqueueSnackbar}
        equipments= {equipments}
        stocklist = {stocklist}
    />);

});

test('should render EquipmentAddForm', () => {
    
     expect(wrapper).toMatchSnapshot();
 });

 test('should handle on quantity change', () => {
     const value = '3';
     wrapper.find('input').at(0).simulate('change', { 
         target: {value }
     });
     expect(wrapper.state('quantity')).toBe(value);

 });

 test('should not change if quantity is not a number', () => {

    const value = '3.5';
     wrapper.find('input').at(0).simulate('change', { 
         target: {value }
     });
     expect(wrapper.state('quantity')).toBe('');
    
})
 test('should handle on publicName change', () => {
    const value = 'name';
    wrapper.find('input').at(1).simulate('change', { 
        target: {value }
    });
    expect(wrapper.state('publicName')).toBe(value);
});

test('OnAdd : should display error message if fields empty on add', () => {
    wrapper.find('form').simulate('submit',{preventDefault: () => {}});
    expect(enqueueSnackbar).toHaveBeenLastCalledWith('Informations erronnées', {variant:'error'});
});

test('OnAdd : should display error message if item not found', () => {
    const quantity = '3';
    const publicName = 'notfounditem';

    wrapper.setState(()=>({quantity, publicName}));
    wrapper.find('form').simulate('submit', {preventDefault: () => {}});
    expect(enqueueSnackbar).toHaveBeenLastCalledWith('Élement introuvable', {variant:'error'});
});

test('onAdd : should add an item', () => {
    const quantity = '3';
    const arg = {...stocklist[0], quantity};

    const newState = {
        quantity: '',
        publicName:'', 
    }
    wrapper.setState(()=>({quantity, publicName: stocklist[0].publicName}));
    wrapper.find('form').simulate('submit',{preventDefault: () => {}});

    expect(startAddEquipment).toHaveBeenCalledWith(arg);
    expect(wrapper.state()).toEqual(newState);
    expect(enqueueSnackbar).toHaveBeenLastCalledWith('3x sm57 ajoutés', {variant:'success'});
});



