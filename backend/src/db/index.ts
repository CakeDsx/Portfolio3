import db from "./db.js"
import { setup } from "./setup.js";

(async () => {
    console.log(process.env.DATABASE_URL)
  await setup(db);
})();