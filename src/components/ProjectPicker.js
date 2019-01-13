import React from 'react';
import { connect } from 'react-redux';
import { setCurrentProject } from '../actions/user';
import Select from '@material-ui/core/Select';
import { removeProject } from '../actions/projects';

export class ProjectPicker extends React.Component { 

    onChange = (e) => {
        if(e.target.value !== 'remove') {
            this.props.setCurrentProject(e.target.value);
        } else {
            this.props.removeProject(this.props.user.currentProject);
            this.props.setCurrentProject('');
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
                    <option key="option-title-select" value="">Selectionner</option>
                    ) : (
                    <option key="option-title-noproject" value="">Aucun Projet</option>
                    )}
                    
                    { this.props.user.projects.map( (project) => (
                        <option 
                            key = {project.id} 
                            value={project.id}
                        >
                        {project.name}
                        </option>
                    ))}
                    {this.props.user.projects.length > 0 && (
                        <option key="option-remove" value="remove">Supprimer</option>
                    )}
                    </Select>
        );
    }
    
};

const mapStateToProps = (state) => ({
    user: state.user,
    projects: state.projects
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentProject: (id) => dispatch(setCurrentProject(id)),
    removeProject: (id) => dispatch(removeProject(id))
})
export default connect(mapStateToProps,mapDispatchToProps)(ProjectPicker);