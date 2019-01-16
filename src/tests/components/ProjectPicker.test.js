import React from 'react';
import { ProjectPicker} from '../../components/ProjectPicker';
import user from '../fixtures/user';
import { project } from '../fixtures/projects'
import { shallow } from 'enzyme';
import Select from '@material-ui/core/Select';
import { setupFirebase } from '../fixtures/firebase';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const createMockStore = configureMockStore([thunk]);

let setCurrentProject, startRemoveProject, startCreateProject, noCurrentProject, wrapper, updateProjectName;

beforeEach( (done) => {
    setCurrentProject = jest.fn();
    startRemoveProject = jest.fn();
    startCreateProject = jest.fn();
    noCurrentProject = jest.fn();
    updateProjectName = jest.fn();
    wrapper = shallow(
        <ProjectPicker 
            setCurrentProject={setCurrentProject}
            startRemoveProject={startRemoveProject}
            startCreateProject={startCreateProject}
            noCurrentProject={noCurrentProject}
            updateProjectName={updateProjectName}
            projectName={''}
            user={user}
            project={project}
        />);

    setupFirebase().then( () => {
        done(); 
    }); 
});

test('should render ProjectPicker', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle select change', (done) => {
    const id = 'idp1'
    wrapper.find(Select).simulate('change', {target:{value: id}})
        expect(startRemoveProject).not.toHaveBeenCalled();
        expect(startCreateProject).not.toHaveBeenCalled();
        done();
    });

test(' should retrieve the project from the database', (done) => {
    const id = 'idp3';
    wrapper.instance().setCurrentProject(id).then( () => {
        expect(setCurrentProject).toHaveBeenCalledWith({
            id: 'idp3',
            name: 'projet3',
            staff: {
                '1625HT28': {
                    name: 'Morgan',
                    email: 'mail@mail.com',
                    role: '5'
                },
                'oiiu567' : {
                    name: 'Morgan2',
                    email: 'mail2@mail.com',
                    role: '5'
                }
            }
        });
        done();
    });
});

test('should handle remove selection', () => {
    wrapper.find('.removeproject').simulate('click');
    expect(noCurrentProject).toHaveBeenCalled();
    expect(startRemoveProject).toHaveBeenCalled();
    expect(startCreateProject).not.toHaveBeenCalled();

});

test('should handle create selection', () => {
    wrapper.find('.addproject').simulate('click');
    expect(setCurrentProject).not.toHaveBeenCalled()
    expect(startRemoveProject).not.toHaveBeenCalled();
    expect(startCreateProject).toHaveBeenCalled();
})

test('onEditName', () => {
    const store = createMockStore({user});
    const name = 'test'
    const projectData = {...project, name}
    wrapper.find('.editproject').simulate('click');
    wrapper.find('.projectname').simulate('change',{ target:{value: name} });
    wrapper.find('form').simulate('submit', {preventDefault: () => {}});
    expect(updateProjectName).toHaveBeenCalledWith(projectData);
});

test('onChangeEditName', () => {
    const store = createMockStore({user});
    wrapper.find('.editproject').simulate('click');
    const value = 'test';
     wrapper.find('.projectname').simulate('change', { 
         target: {value }
     });
     expect(wrapper.state('projectName')).toBe(value);

    
});

test('onEditClose', () => {
    const store = createMockStore({user});
    wrapper.find('.editproject').simulate('click');
    wrapper.find('form').simulate('reset', { preventDefault: () => {} });
    expect(wrapper.state('projectName')).toBe('');
});

test('onEditOpen', () => {
    const store = createMockStore({user, project});
    wrapper.find('.editproject').simulate('click');
    expect(wrapper.state('projectName')).toBe(store.getState().project.name);
});
