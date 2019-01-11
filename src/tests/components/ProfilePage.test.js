import React from 'react';
import { ProfilePage } from '../../components/ProfilePage';
import user from '../fixtures/user';
import projects from '../fixtures/projects'
import { shallow } from 'enzyme';
import Select from '@material-ui/core/Select';

test('should render profile page', () => {

    const setCurrentProject = jest.fn();
    const wrapper = shallow(
        <ProfilePage 
            setCurrentProject={setCurrentProject}
            user={user}
            projects={projects}
        />);
    expect(wrapper).toMatchSnapshot();
});

test('should handle select change', () => {

    const setCurrentProject = jest.fn();
    const id='1';
    const wrapper = shallow(
        <ProfilePage 
            setCurrentProject={setCurrentProject}
            user={user}
            projects={projects}
        />);
    wrapper.find(Select).simulate('change', {target:{value: id}});
    expect(setCurrentProject).toHaveBeenCalledWith(id);

});

