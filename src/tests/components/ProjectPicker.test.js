import React from 'react';
import { ProjectPicker} from '../../components/ProjectPicker';
import user from '../fixtures/user';
import { project } from '../fixtures/projects'
import { shallow } from 'enzyme';
import Select from '@material-ui/core/Select';
import { setupFirebase } from '../fixtures/firebase';

let setCurrentProject, startRemoveProject, startCreateProject, noCurrentProject, wrapper;

beforeEach( (done) => {
    setCurrentProject = jest.fn();
    startRemoveProject = jest.fn();
    startCreateProject = jest.fn();
    noCurrentProject = jest.fn();
    wrapper = shallow(
        <ProjectPicker 
            setCurrentProject={setCurrentProject}
            startRemoveProject={startRemoveProject}
            startCreateProject={startCreateProject}
            noCurrentProject={noCurrentProject}
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
    wrapper.find(Select).simulate('change', {target:{value: 'remove'}});
    expect(noCurrentProject).toHaveBeenCalled();
    expect(startRemoveProject).toHaveBeenCalled();
    expect(startCreateProject).not.toHaveBeenCalled();

});

test('should handle create selection', () => {
    wrapper.find(Select).simulate('change', {target:{value: 'create'}});
    expect(setCurrentProject).not.toHaveBeenCalled()
    expect(startRemoveProject).not.toHaveBeenCalled();
    expect(startCreateProject).toHaveBeenCalled();
})

