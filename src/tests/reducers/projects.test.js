import projectsReducer from '../../reducers/projects';



test('should set default state', () => {
    const action = {type: '@@INIT'};
    const state = projectsReducer({},action);
    expect(state).toEqual({});
})

test('should create project in the reducer', () => {
    const project = {name : 'testproject', id:'6'}
    const action = {
        type: 'CREATE_PROJECT',
        project
    };

    const newState = projectsReducer(null, action);
    expect(newState).toEqual([{
        ...project,
        role: '5'
    }]);
});

test('should remove project from the reducer', () => {
    const id = '1';
    const action = {
        type: 'REMOVE_PROJECT',
        id
    };
    const state =[{
        name: 'project1',
        id: '1',
        role: '5'
    }, {
        name: 'project2',
        id: '2',
        role: '5'
    }];

    const newState = projectsReducer(state,action);
    expect(newState).toEqual([{
        name: 'project2',
        id: '2',
        role: '5'
    }]);
})