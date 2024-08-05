import dbConnectPrimary from "../lib/dbConnectPrimary";
import dbConnectSecondary from "../lib/dbConnectSecondary";
import CampaignPrimary from "../models/CampaignPrimary";
import CampaignSecondary from "../models/CampaignSecondary";

async function monitorChanges() {
  await dbConnectPrimary();
  await dbConnectSecondary();

  const changeStreamPrimary = CampaignPrimary.watch();
  const changeStreamSecondary = CampaignSecondary.watch();

  changeStreamPrimary.on("change", (change) => {
    console.log("Change detected in primary database:", change);
    // Sync changes with secondary database or log them
  });

  changeStreamSecondary.on("change", (change) => {
    console.log("Change detected in secondary database:", change);
    // Sync changes with primary database or log them
  });
}

monitorChanges().catch(console.error);
