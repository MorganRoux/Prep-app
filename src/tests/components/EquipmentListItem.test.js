import React from 'react';
import { shallow } from 'enzyme';
import { EquipmentListItem } from '../../components/EquipmentListItem';
import equipments from '../fixtures/equipment'
import stocklist from '../fixtures/equipment'

let wrapper, removeEquipment, enqueueSnackbar

beforeEach( () => {
    removeEquipment = jest.fn();
    enqueueSnackbar = jest.fn();
    wrapper = shallow(<EquipmentListItem 
                            equipment = {equipments[0]}
                            stocklist = {stocklist}
                            removeEquipment = {removeEquipment}
                            enqueueSnackbar = {enqueueSnackbar}
                        />);
});

test('should render EquipmentListItem', () => {
    expect(wrapper).toMatchSnapshot();

});

test('should handle onRemove', () => {
    wrapper.find('.delbutton').simulate('click');
    expect(removeEquipment).toHaveBeenCalledWith(equipments[0].id);
    expect(enqueueSnackbar).toHaveBeenCalledWith('Item supprimé', {variant:'success'});

});

test('should handle onPublicNameChange', () => {

});

test('should handle onStockNameChange', () => {
    
});

test('should handle onQuantityChange', () => {
    
});