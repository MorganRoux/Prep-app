import React from 'react';
import { shallow } from 'enzyme';
import { EquipmentListItem } from '../../components/EquipmentListItem';
import equipments from '../fixtures/equipment'
import stocklist from '../fixtures/equipment'

let wrapper, onRemove;

beforeEach( () => {
    onRemove = jest.fn();
    wrapper = shallow(<EquipmentListItem 
                            equipment = {equipments[0]}
                            stocklist = {stocklist}
                            onRemove = {onRemove}
                        />);
});

test('should render EquipmentLIstItem', () => {
    expect(wrapper).toMatchSnapshot();

});

test('should handle onRemove', () => {
    wrapper.find('button').simulate('click');
    expect(onRemove).toHaveBeenCalledWith(equipments[0].key);
});

test('should handle onPublicNameChange', () => {

});

test('should handle onStockNameChange', () => {
    
});

test('should handle onQuantityChange', () => {
    
});