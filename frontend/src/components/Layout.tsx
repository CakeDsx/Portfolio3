import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <header>
                <h1>My Portfolio</h1>
                <nav>
                    <ul>
                        <li><a href="#about">About</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#sequence-diagram">Sequence Diagram</a></li>
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
