import database from '../../firebase/firebase';
import equipments from '../fixtures/equipment';
import { users } from '../fixtures/user';
import projects from '../fixtures/projects';


export const setupFirebase = () => {

    const promise = [];
    const usersData = {};
    const userProjectData = {};
    const equipmentData = {};
    const projectsData = {};
    const staffData = {};

    equipments.forEach(({ category, quantity , id, stockName, parentId=null, parentName=null }) => {
        equipmentData[id] = { 
            category, 
            quantity, 
            stockName, 
            parentId, 
            parentName 
        };
    });

    users.forEach( ({uid, name, email}) => {
        staffData[uid] = {
            name,
            email,
            role: '5'
        }
    })

    projects.forEach( ({ id, name,role }) => {
        userProjectData[id] = {
            name,
            role
        };

        projectsData[id] = {
            about: {
                name
            },
            staff : staffData,
            equipments : equipmentData
        }
    });
    users.forEach(({ uid, currentProject, name, email }) => {
        usersData[uid] = {
            profile: {
                name,
                email
            },
            currentProject,
            projects: userProjectData
        }
    });

  
    return database.ref('users').set(usersData)
    .then( () => {
         database.ref('projects').set(projectsData)
    });
}