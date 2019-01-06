import React from 'react';
import { shallow } from 'enzyme';
import { EquipmentListItem } from '../../components/EquipmentListItem';
import equipments from '../fixtures/equipment'
import stocklist from '../fixtures/equipment'

let wrapper, removeEquipment;

beforeEach( () => {
    removeEquipment = jest.fn();
    wrapper = shallow(<EquipmentListItem 
                            equipment = {equipments[0]}
                            stocklist = {stocklist}
                            removeEquipment = {removeEquipment}
                        />);
});

test('should render EquipmentLIstItem', () => {
    expect(wrapper).toMatchSnapshot();

});

test('should handle onRemove', () => {
    wrapper.find('.delbutton').simulate('click');
    expect(removeEquipment).toHaveBeenCalledWith(equipments[0].id);
});

test('should handle onPublicNameChange', () => {

});

test('should handle onStockNameChange', () => {
    
});

test('should handle onQuantityChange', () => {
    
});