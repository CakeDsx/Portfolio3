import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { readFile, writeFile } from "node:fs/promises";

// Initialize the Hono app
const app = new Hono();

// Enable CORS for all routes
app.use("*", cors());

// Serve static files
app.use("/statics/*", serveStatic({ root: "./" }));

// Get JSON data (Read)
app.get("/getjson", async (c) => {
  try {
    const data = await readFile("./projects.json", "utf-8");
    return c.json(JSON.parse(data));
  } catch (err) {
    console.error("Error reading projects.json:", err);
    return c.text("Failed to read projects.json", 500);
  }
});

// Post JSON data (Create)
app.post("/postjson", async (c) => {
  const fileName = "projects.json";
  let tempdata;

  try {
    const data = await readFile(fileName, "utf-8");
    tempdata = JSON.parse(data);
  } catch (err) {
    console.error("Error reading projects.json:", err);
    return c.text("Failed to read projects.json", 500);
  }

  const body = await c.req.json();
  tempdata[Object.keys(body)[0]] = body[Object.keys(body)[0]];
  const newData = JSON.stringify(tempdata, null, 2);

  try {
    await writeFile(fileName, newData, "utf-8");
    console.log("Insert Successful");
  } catch (err) {
    console.error("Error writing to projects.json:", err);
    return c.text("Failed to write to projects.json", 500);
  }

  return c.text("Created!", 201);
});

// Update JSON data (Update)
app.put("/updatejson/:id", async (c) => {
  const fileName = "projects.json";
  let tempdata;

  try {
    const data = await readFile(fileName, "utf-8");
    tempdata = JSON.parse(data);
  } catch (err) {
    console.error("Error reading projects.json:", err);
    return c.text("Failed to read projects.json", 500);
  }

  const projectId = c.req.param("id");

  // Check if the project exists
  if (!(projectId in tempdata)) {
    return c.text(`Project with ID ${projectId} not found`, 404);
  }

  // Get the updated project data from the request
  const updatedData = await c.req.json();

  // Update the existing project data
  tempdata[projectId] = { ...tempdata[projectId], ...updatedData };
  const newData = JSON.stringify(tempdata, null, 2);

  try {
    await writeFile(fileName, newData, "utf-8");
    console.log(`Updated project with ID ${projectId}`);
  } catch (err) {
    console.error("Error writing to projects.json:", err);
    return c.text("Failed to write to projects.json", 500);
  }

  return c.text("Updated!", 200);
});

// Delete JSON data (Delete)
app.delete("/deletejson/:id", async (c) => {
  const fileName = "projects.json";
  let tempdata;

  try {
    const data = await readFile(fileName, "utf-8");
    tempdata = JSON.parse(data);
  } catch (err) {
    console.error("Error reading projects.json:", err);
    return c.text("Failed to read projects.json", 500);
  }

  const projectId = c.req.param("id");

  // Check if the project exists
  if (!(projectId in tempdata)) {
    return c.text(`Project with ID ${projectId} not found`, 404);
  }

  delete tempdata[projectId];
  const newData = JSON.stringify(tempdata, null, 2);

  try {
    await writeFile(fileName, newData, "utf-8");
    console.log(`Deleted project with ID ${projectId}`);
  } catch (err) {
    console.error("Error writing to projects.json:", err);
    return c.text("Failed to write to projects.json", 500);
  }

  return c.text("Deleted!", 200);
});

// Home route
app.get("/", (c) => {
  return c.text("Hello");
});

// Start the server
const port = 3000;

console.log("Server is runninjjg on port 3000");

serve({
  fetch: app.fetch,
  port,
});
