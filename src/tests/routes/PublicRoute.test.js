import { PublicRoute } from '../../router/PublicRoute';
import React from 'react';
import { shallow } from 'enzyme';

test('should render privateRoute', () => {
    const wrapper = shallow (<PublicRoute />);
    expect(wrapper).toMatchSnapshot();
})