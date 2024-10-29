import React, { useState } from 'react';
import { z } from 'zod';

// Define your Zod schema for project validation
const projectSchema = z.object({
    title: z.string().min(1, 'Project Name is required'),
    description: z.string().min(1, 'Project Description is required'),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    }),
    tags: z.array(z.string()).optional(),
});

const ProjectForm: React.FC = () => {
    const [tags, setTags] = useState<string>(''); // State to hold tags
    const [errors, setErrors] = useState<string[]>([]); // State to hold validation errors

    const postjson = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log("Form submission initiated"); 
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const postURL = "http://localhost:3000/postjson";
        const title = formData.get("title") as string;
        const date = formData.get("date") as string;
        const description = formData.get("description") as string;

        // Validate form data
        try {
            const dataToValidate = {
                title,
                description,
                date,
                tags: tags.split(',').map(tag => tag.trim()),
            };

            console.log("Validating data:", dataToValidate); 

            // Parse and validate data against the schema
            projectSchema.parse(dataToValidate);
            console.log("Validation successful!"); 

            // Reset errors if validation passes
            setErrors([]);
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error("Validation errors:", error.errors); 
                setErrors(error.errors.map(e => e.message)); // Set errors for display
                return; // Prevent submission if validation fails
            }
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
                        tags: tags.split(',').map(tag => tag.trim()), 
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
                <input 
                    name="tags" 
                    type="text" 
                    placeholder="Tags (comma-separated)" 
                    value={tags} 
                    onChange={(e) => setTags(e.target.value)} 
                />
                <input type="submit" value="Submit" />
            </form>
            {errors.length > 0 && (
                <div>
                    <h3>Validation Errors:</h3>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
};

export default ProjectForm;
