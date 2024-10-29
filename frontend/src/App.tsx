import React, { useEffect } from 'react';
import Layout from './components/Layout';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import { handleProjects } from './script';
import About from './components/About';
import SequenceDiagram from './components/SequenceDiagram';

const App: React.FC = () => {
    useEffect(() => {
        handleProjects();
    }, []);

    return (
        <Layout>
            <section>
              <About/>
              <SequenceDiagram/>
                <ProjectForm />
                <ProjectList />
            </section>
        </Layout>
    );
};

export default App;
