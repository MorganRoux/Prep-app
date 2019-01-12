import { createProject, removeProject } from '../../actions/projects'


test('should handle Create project action object', () => {
    const project = {name:'test', id: '4'};

    const action = createProject(project);
    expect(action).toEqual({
        type: 'CREATE_PROJECT',
        project
    });
});


// test('should handle set project action object', () => {
//     const action = setProject(id);
//     expect(action).toEqual({
//         type: 'SET_PROJECT',
//         id
//     });
// })

test('should handle remove project action object', () => {
    const id = '4';
    const action = removeProject(id);
    expect(action).toEqual({
        type: 'REMOVE_PROJECT',
        id
    });
});

test('should fetch user projects data', () => {
    expect(true).toBeFalsy();
})