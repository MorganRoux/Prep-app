import React from 'react';
import { shallow } from 'enzyme';
import { EquipmentList } from '../../components/EquipmentList';
import equipments from '../fixtures/equipments';

test('should render Equipment List', () => {
    const wrapper = shallow(<EquipmentList equipments = {equipments}/>);
    expect(wrapper).toMatchSnapshot();

})