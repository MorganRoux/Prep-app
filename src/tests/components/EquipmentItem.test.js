import React from 'react';
import { shallow } from 'enzyme';
import { EquipmentItem } from '../../components/EquipmentItem';
import equipments from '../fixtures/equipment'
import stocklist from '../fixtures/equipment'

let wrapper, startRemoveEquipment, enqueueSnackbar

beforeEach( () => {
    startRemoveEquipment = jest.fn();
    enqueueSnackbar = jest.fn();
    wrapper = shallow(<EquipmentItem 
                            equipment = {equipments[0]}
                            stocklist = {stocklist}
                            startRemoveEquipment = {startRemoveEquipment}
                            enqueueSnackbar = {enqueueSnackbar}
                        />);
});

test('should render EquipmentListItem', () => {
    expect(wrapper).toMatchSnapshot();

});

test('should handle onRemove', () => {
    wrapper.find('.delbutton').simulate('click');
    expect(startRemoveEquipment).toHaveBeenCalledWith(equipments[0].id);
    expect(enqueueSnackbar).toHaveBeenCalledWith('Item supprimé', {variant:'success'});

});

test('should handle onPublicNameChange', () => {

});

test('should handle onStockNameChange', () => {
    
});

test('should handle onQuantityChange', () => {
    
});