import React from 'react'
import { EquipmentKit } from '../../components/EquipmentKit';
import { shallow } from 'enzyme';
import kits from '../fixtures/kits';
import equipments from '../fixtures/equipment';

test('should render EquipmentKit', () => {
    const wrapper = shallow(<EquipmentKit 
                                kit = {equipments[3]}
                                kits = {kits}
                            />);
    // expect(wrapper).toMatchSnapshot();
 });