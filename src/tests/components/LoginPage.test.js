import { LoginPage } from '../../components/LoginPage';
import { shallow } from 'enzyme';
import React from 'react'


test('should render LoginPage', () => {
    const startLogin = jest.fn();
    const history = { push: jest.fn() };
    const wrapper = shallow(<LoginPage startLogin={startLogin} history={history}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should handle click on Login button', () => {
    const startLogin = jest.fn();
    const wrapper = shallow(<LoginPage startLogin={startLogin} history={history}/>);
    wrapper.find('button').simulate('click');
    expect(startLogin).toHaveBeenCalled();

});