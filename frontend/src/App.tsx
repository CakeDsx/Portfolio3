import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import About from './components/About';
import SequenceDiagram from './components/SequenceDiagram';

const Projects: React.FC = () => {
    return (
        <section>
            <ProjectForm />
            <ProjectList />
        </section>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/sequence-diagram" element={<SequenceDiagram />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
