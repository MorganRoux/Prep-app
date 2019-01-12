import React from 'react';
import { ProfilePage } from '../../components/ProfilePage';

import { shallow } from 'enzyme';


test('should render profile page', () => {

    const wrapper = shallow(<ProfilePage/>);
    expect(wrapper).toMatchSnapshot();
});


