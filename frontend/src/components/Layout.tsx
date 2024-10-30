import React from 'react';
import { Link } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <header>
                <h1>My Portfolio</h1>
                <nav>
                    <ul>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/projects">Projects</Link></li>
                        <li><Link to="/sequence-diagram">Sequence Diagram</Link></li>
                    </ul>
                </nav>
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; 2024 My Portfolio</p>
            </footer>
        </div>
    );
};

export default Layout;
