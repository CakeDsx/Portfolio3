import React from 'react';
import useProjects from '../hooks/useProjects';
import './ProjectList.css';

const ProjectList: React.FC = () => {
    const { projects, deleteProject, error } = useProjects();

    return (
        <section className="project-list">
            <h2 id="projects">My Projects</h2>
            {error && <p className="error-message">{error}</p>}
            <div id="projectsDiv">
                {Object.keys(projects).map((key) => {
                    const project = projects[key];
                    return (
                        <div key={key} className="project-item">
                            <div className="project-details">
                                <h3 className="project-title">{key}</h3>
                                <p className="project-description">{project.description}</p>
                                <p className="project-date">
                                    {`${project.date.day}/${project.date.month}/${project.date.year}`}
                                </p>
                                <div className="project-tags">
                                    {project.tags.map((tag, index) => (
                                        <span key={index} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <button
                                className="delete-button"
                                onClick={() => deleteProject(key)}
                            >
                                Delete
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ProjectList;
