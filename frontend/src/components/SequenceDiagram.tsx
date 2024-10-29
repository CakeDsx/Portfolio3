import React from 'react';

const SequenceDiagram: React.FC = () => {
    return (
        <section id="sequence-diagram">
            <h2>Sequence Diagram - Create New Project</h2>
            <div className="sequence-diagram">
                <div className="participant">User</div>
                <div className="arrow">→</div>
                <div className="participant">Browser</div>
                <div className="arrow">→</div>
                <div className="participant">Server</div>
                <div className="arrow">←</div>
                <div className="participant">Browser</div>
                <div className="arrow">←</div>
                <div className="participant">User</div>
            </div>
            <div className="messages">
                <div>User clicks "Add New Project"</div>
                <div>Browser sends POST request with project data</div>
                <div>Server returns success response</div>
                <div>Browser displays confirmation message</div>
            </div>
        </section>
    );
};

export default SequenceDiagram;