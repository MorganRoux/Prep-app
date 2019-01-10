import { PrivateRoute } from '../../router/PrivateRoute';
import React from 'react';
import { shallow } from 'enzyme';

test('should render privateRoute', () => {
    const wrapper = shallow (<PrivateRoute />);
    expect(wrapper).toMatchSnapshot();
})