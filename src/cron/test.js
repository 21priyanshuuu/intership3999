import { checkDatabaseConsistency } from "../lib/checkDatabaseConsistency.js";

console.log("Running test script...");
await checkDatabaseConsistency();
