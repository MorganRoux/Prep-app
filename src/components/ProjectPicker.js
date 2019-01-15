import React from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import { startRemoveProject, startCreateProject, setCurrentProject, noCurrentProject } from '../actions/projects';
import database from '../firebase/firebase';

export class ProjectPicker extends React.Component { 

    setCurrentProject = (id) => {
            return database.ref(`/projects/${id}`).once('value')
            .then( (snapshot)=> {
                const projectToSet = snapshot.val();
                this.props.setCurrentProject({...projectToSet, id});
            });
    }

    onChange = (e) => {
        switch(e.target.value) {
        case 'select' : 
            return;
        case 'noproject' : 
            return;
        case 'remove' :    
            this.props.startRemoveProject(this.props.user.currentProject);
            this.props.noCurrentProject();
            return;

        case 'create' :
            this.props.startCreateProject();
            return;

        default:
            this.setCurrentProject(e.target.value)
            return;
        }
    }

    render() {    
        return (
                    <Select
                        native
                        onChange={this.onChange}
                        value={this.props.user.currentProject}
                    >
                    {this.props.user.projects.length > 0 ? (
                        <option key="option-title-select" value="select">Selectionner</option>
                         
                    ) : (
                        <option key="option-title-noproject" value="noproject">Aucun Projet</option>
                    )}
                    
                    { this.props.user.projects.map( (project) => (
                        <option 
                            key = {project.id} 
                            value={project.id}
                        >
                        {project.name}
                        </option>
                    ))}
                    <option key="option-create" value="create">Créer</option>
                    {this.props.user.projects.length > 0 && (
                        <option key="option-remove" value="remove">Supprimer</option>
                    )}
                    </Select>
        );
    }
    
};

const mapStateToProps = (state) => ({
    user: state.user,
    project: state.project
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentProject: (id) => dispatch(setCurrentProject(id)),
    startRemoveProject: (id) => dispatch(startRemoveProject(id)),
    startCreateProject: (id) => dispatch(startCreateProject()),
    noCurrentProject: () => dispatch(noCurrentProject())
})
export default connect(mapStateToProps,mapDispatchToProps)(ProjectPicker);