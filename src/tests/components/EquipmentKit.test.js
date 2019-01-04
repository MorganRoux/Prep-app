import React from 'react'
import { EquipmentKit } from '../../components/EquipmentKit';
import { shallow } from 'enzyme';
import kits from '../fixtures/kits';
import equipments from '../fixtures/equipment';

let wrapper, removeEquipment;

beforeEach(() => {
    removeEquipment = jest.fn();
    wrapper = shallow(<EquipmentKit 
        kit = {equipments[3]}
        kits = {kits}
        removeEquipment = {removeEquipment}
        equipments= {equipments}
    />);

});

test('should render EquipmentKit', () => {
    
    // expect(wrapper).toMatchSnapshot();
 });

 test('should handle onRemove', () => {
   
 })