interface Project {
    id: number;
    date: {
        day: string;
        month: string;
        year: string;
    };
    description: string;
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
        const a = document.createElement("a");
        const li = document.createElement("li");
        const para = document.createElement("p");

        const linkText = document.createTextNode(key);

        a.appendChild(linkText);
        a.title = key;
        a.href = `/${key}`;
        li.appendChild(a);

        para.textContent = projects[key].description;

        element.appendChild(li);
        element.appendChild(para);
    }
}
