import React from 'react'
import { EquipmentHeader } from '../../components/EquipmentHeader';
import { shallow } from 'enzyme';

let wrapper, setTextFilter, startLogout;
beforeEach( () => {
    startLogout = jest.fn();
    setTextFilter = jest.fn();
    wrapper = shallow(<EquipmentHeader 
            setTextFilter={setTextFilter}
            startLogout = {startLogout}
            />);
});

test('should render EquipmentHeader', () => {
    expect(wrapper).toMatchSnapshot();
});


test('should handle onSearchChange', () => {
    const value = 'test';
    
    wrapper.find('.search-field').simulate('change', {target : {value}});
    expect(wrapper.state('searchText')).toBe(value);
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should handle logout', () => {
    wrapper.find('.logout-button').simulate('click');
    expect(startLogout).toHaveBeenCalled();

});