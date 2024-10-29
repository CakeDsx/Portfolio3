import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { readFile, writeFile } from "node:fs/promises";

const app = new Hono();

app.use("*", cors());

app.use("/statics/*", serveStatic({ root: "./" }));

app.get("/getjson", async (c) => {
    const data = await readFile("./projects.json", "utf-8");
    return c.json(JSON.parse(data));
});

app.post("/postjson", async (c) => {
    const fileName = "projects.json";
    let tempdata;

    try {
        const data = await readFile(`${fileName}`, "utf-8");
        tempdata = JSON.parse(data);
    } catch (err) {
        console.error(`Error reading: ${fileName}`, err);
        return c.text(`Failed to read: ${fileName}`, 500);
    }

    const body = await c.req.json();
    tempdata[Object.keys(body)[0]] = body[Object.keys(body)[0]];
    const newData = JSON.stringify(tempdata, null, 2);

    try {
        await writeFile("projects.json", newData, "utf-8");
        console.log('Insert Successful');
    } catch (err) {
        console.error(`Error writing to: ${fileName}:`, err);
        return c.text(`Failed to write to: ${fileName}`, 500);
    }

    return c.text('Created!', 201);
});

const port = 3000;

console.log("Server is running on port 3000");

serve({
    fetch: app.fetch,
    port,
});
