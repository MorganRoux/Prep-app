import React from 'react';
import { ProjectPicker} from '../../components/ProjectPicker';
import user from '../fixtures/user';
import projects from '../fixtures/projects'
import { shallow } from 'enzyme';
import Select from '@material-ui/core/Select';

let setCurrentProject, removeProject, wrapper;
beforeEach( () => {
    setCurrentProject = jest.fn();
    removeProject = jest.fn();
    wrapper = shallow(
        <ProjectPicker 
            setCurrentProject={setCurrentProject}
            removeProject={removeProject}
            user={user}
            projects={projects}
        />);
});

test('should render ProjectPicker', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle select change', () => {
    const id = '1'
    wrapper.find(Select).simulate('change', {target:{value: id}});
    expect(setCurrentProject).toHaveBeenCalledWith(id);
    expect(removeProject).not.toHaveBeenCalled();

});

test('should handle remove selection', () => {
    wrapper.find(Select).simulate('change', {target:{value: 'remove'}});
    expect(setCurrentProject).toHaveBeenCalledWith('');
    expect(removeProject).toHaveBeenCalled();

})

