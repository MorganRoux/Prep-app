import React from 'react';
import { shallow } from 'enzyme';
import { EquipmentList, SortableComponent, EquipmentListSortable } from '../../components/EquipmentList';
import equipments from '../fixtures/equipment';

test('should render EquipmentList', () => {
    const wrapper = shallow(<EquipmentList equipments = {equipments}/>);
    expect(wrapper).toMatchSnapshot();

});

test('should render SortableComponent', () => {
    const moveEquipment = jest.fn();
    const wrapper = shallow(
        <SortableComponent 
            equipments = {equipments}
            moveEquipment = {moveEquipment}
        />);
    expect(wrapper).toMatchSnapshot();
});

test('should handle moveEquipment', () => {
    const oldIndex = 4;
    const newIndex = 1;
    const moveEquipment = jest.fn();
    const wrapper = shallow(
        <SortableComponent 
            equipments = {equipments}
            moveEquipment = {moveEquipment}
        />);
    wrapper.find(EquipmentListSortable).simulate('sortEnd',{oldIndex,newIndex});
    expect(moveEquipment).toHaveBeenLastCalledWith(oldIndex, newIndex)
})