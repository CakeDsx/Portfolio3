import React, { useEffect } from 'react';
import { handleProjects } from '../script';
import './ProjectList.css'; 

const ProjectList: React.FC = () => {
    useEffect(() => {
        handleProjects();
    }, []);

    return (
        <section className="project-list">
            <h2 id="projects">My Projects</h2>
            <div id="projectsDiv"></div>
        </section>
    );
};

export default ProjectList;
