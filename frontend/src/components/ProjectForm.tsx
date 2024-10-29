import React from 'react';

const ProjectForm: React.FC = () => {
    const postjson = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const postURL = "http://localhost:3000/postjson";
        const title = formData.get("title") as string;
        const date = formData.get("date") as string;
        const description = formData.get("description") as string;

        if (!title || !date || !description) {
            console.error("Missing form data");
            return;
        }

        const [year, month, day] = date.split("-");

        try {
            const response = await fetch(postURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    [title]: {
                        id: Date.now(),
                        date: {
                            day: day,
                            month: month,
                            year: year,
                        },
                        description: description,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to post data");
            }

            console.log("Replacing Window");
            window.location.replace("/");
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };

    return (
        <section>
            <h2>Add Projects</h2>
            <form onSubmit={postjson}>
                <input name="title" type="text" placeholder="Project Name" required />
                <input name="description" type="text" placeholder="Project Description" required />
                <input name="date" type="date" required />
                <input type="submit" value="Submit" />
            </form>
        </section>
    );
};

export default ProjectForm;
