import React, { useEffect } from 'react';
import { handleProjects } from '../script'; // Import handleProjects

const ProjectList: React.FC = () => {
    useEffect(() => {
        handleProjects();
    }, []);

    return (
        <section>
            <h2 id="projects">My Projects</h2>
            <div id="projectsDiv"></div>
        </section>
    );
};

export default ProjectList;
