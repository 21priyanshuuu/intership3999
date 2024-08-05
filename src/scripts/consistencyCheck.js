// import dbConnectPrimary from "../lib/primary.js";
// import dbConnectSecondary from "../lib/secondary.js";
import db from "../lib/db.js";
import CampaignPrimary from "../models/CampaignPrimary.js";
import CampaignSecondary from "../models/CampaignSecondary.js";

async function consistencyCheck() {
  // await dbConnectPrimary();
  // await dbConnectSecondary();
  db();

  const primaryCampaigns = await CampaignPrimary.find({});
  const secondaryCampaigns = await CampaignSecondary.find({});

  // Compare primary and secondary campaigns
  const discrepancies = [];
  primaryCampaigns.forEach((primary) => {
    const secondary = secondaryCampaigns.find((sec) =>
      sec._id.equals(primary._id)
    );
    if (!secondary || JSON.stringify(primary) !== JSON.stringify(secondary)) {
      discrepancies.push({ primary, secondary });
    }
  });

  if (discrepancies.length > 0) {
    console.log("Discrepancies found:", discrepancies);
    // Handle discrepancies (e.g., alert, log, or fix)
  } else {
    console.log("No discrepancies found. Data is consistent.");
  }
}

consistencyCheck().catch(console.error);
