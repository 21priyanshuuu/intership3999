// import cron from "node-cron";
// import { checkDatabaseConsistency } from "../lib/checkDatabaseConsistency";

// cron.schedule("*/5 * * * *", () => {
//   console.log("Running database consistency check...");
//   checkDatabaseConsistency();
// });

import { checkDatabaseConsistency } from "../lib/checkDatabaseConsistency";
console.log("Running test script...");

await checkDatabaseConsistency();
