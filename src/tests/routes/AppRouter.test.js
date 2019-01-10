import AppRouter from '../../router/AppRouter';
import { shallow } from 'enzyme';
import React from 'react'

test('should render AppRouter' , () => {
    const wrapper = shallow(<AppRouter />);
    expect(wrapper).toMatchSnapshot();
})