import React from 'react'
import { EquipmentAddForm } from '../../components/EquipmentAddForm';
import { shallow } from 'enzyme';
import equipments from '../fixtures/equipment';
import stocklist from '../fixtures/stocklist';


let wrapper, addEquipment;

beforeEach(() => {
    addEquipment = jest.fn();
    wrapper = shallow(<EquipmentAddForm 
        kit = {equipments[3]}
        addEquipment = {addEquipment}
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

 test('should handle on publicName change', () => {
    const value = 'name';
    wrapper.find('input').at(1).simulate('change', { 
        target: {value }
    });
    expect(wrapper.state('publicName')).toBe(value);
});

test('OnAdd : should display error message if fields empty on add', () => {
    wrapper.find('.add-button').simulate('click');
    expect(wrapper.state('message')).toBe('Erreur : valeurs invalides');
});

test('OnAdd : should display error message if item not found', () => {
    const quantity = '3';
    const publicName = 'notfounditem';

    wrapper.setState(()=>({quantity, publicName}));
    wrapper.find('.add-button').simulate('click');
    expect(wrapper.state('message')).toBe('Erreur : item non trouvé');
});

test('onAdd : should add an item', () => {
    const quantity = '3';
    const arg = {...stocklist[0], quantity};

    const newState = {
        quantity: '',
        publicName:'', 
        message: 'Élement ajouté !',
        snackBarOpen: true
    }
    wrapper.setState(()=>({quantity, publicName: stocklist[0].publicName}));
    wrapper.find('.add-button').simulate('click');

    expect(addEquipment).toHaveBeenCalledWith(arg);
    expect(wrapper.state()).toEqual(newState);
});



