interface Project {
    id: number;
    date: {
        day: string;
        month: string;
        year: string;
    };
    description: string;
    tags: string[]; // Include tags in the Project interface
}

async function getJson(): Promise<Record<string, Project> | undefined> {
    const getURL = "http://localhost:3000/getjson";
    try {
        const response = await fetch(getURL);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data: Record<string, Project> = await response.json();
        return data;
    } catch (error) {
        console.error("Unable to fetch data:", error);
        return undefined;
    }
}

export async function handleProjects(): Promise<void> {
    const projects = await getJson();
    if (!projects) return;

    const keys = Object.keys(projects);
    const element = document.getElementById("projectsDiv");

    if (!element) return;

    // Clear existing projects to prevent duplication
    element.innerHTML = '';

    for (const key of keys) {
        const projectItem = document.createElement("div");
        projectItem.className = "project-item";

        const projectDetails = document.createElement("div");
        projectDetails.className = "project-details"; 

        const title = document.createElement("h3"); 
        const linkText = document.createTextNode(key);
        title.appendChild(linkText);
        title.className = "project-title";

        const para = document.createElement("p");
        para.textContent = projects[key].description;
        para.className = "project-description"; 

        const datePara = document.createElement("p");
        datePara.textContent = `${projects[key].date.day}/${projects[key].date.month}/${projects[key].date.year}`;
        datePara.className = "project-date"; 

        const tagsPara = document.createElement("div"); 
        tagsPara.className = "project-tags"; 
        projects[key].tags.forEach(tag => {
            const tagElement = document.createElement("span");
            tagElement.className = "tag"; 
            tagElement.textContent = tag; 
            tagsPara.appendChild(tagElement); 
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button"; // Add delete button class
        deleteButton.onclick = () => deleteProject(key);

       
        projectDetails.appendChild(title); //  title
        projectDetails.appendChild(para);   //  description
        projectDetails.appendChild(datePara); //  date
        projectDetails.appendChild(tagsPara); //  tags

        // Append details and button to the project item
        projectItem.appendChild(projectDetails); 
        projectItem.appendChild(deleteButton); 

        element.appendChild(projectItem); 
    }
}

async function deleteProject(projectId: string): Promise<void> {
    const deleteURL = `http://localhost:3000/deletejson/${projectId}`;
    try {
        const response = await fetch(deleteURL, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete project");
        }
        console.log("Project deleted successfully");
        // refresh the project list after deletion
        await handleProjects();
    } catch (error) {
        console.error("Unable to delete project:", error);
    }
}


handleProjects();
