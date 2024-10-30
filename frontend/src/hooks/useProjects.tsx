import { useState, useEffect } from 'react';

interface Project {
    id: number;
    date: {
        day: string;
        month: string;
        year: string;
    };
    description: string;
    tags: string[];
}

const useProjects = () => {
    const [projects, setProjects] = useState<Record<string, Project>>({});
    const [error, setError] = useState<string | null>(null);

    // Fetch projects from the backend
    const fetchProjects = async () => {
        try {
            const response = await fetch("http://localhost:3000/getjson");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data: Record<string, Project> = await response.json();
            setProjects(data);
        } catch (error) {
            console.error("Unable to fetch data:", error);
            setError("Unable to fetch data");
        }
    };

    // Delete a project by its ID
    const deleteProject = async (projectId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/deletejson/${projectId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete project");
            }
            // Update the projects list after successful deletion
            setProjects(prevProjects => {
                const updatedProjects = { ...prevProjects };
                delete updatedProjects[projectId];
                return updatedProjects;
            });
        } catch (error) {
            console.error("Unable to delete project:", error);
            setError("Unable to delete project");
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return { projects, fetchProjects, deleteProject, error };
};

export default useProjects;
