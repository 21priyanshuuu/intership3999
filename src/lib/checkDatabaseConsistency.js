import dbConnectPrimary from "./dbConnectPrimary";
import dbConnectSecondary from "./dbConnectSecondary";
import CampaignPrimary from "../models/CampaignPrimary";
import CampaignSecondary from "../models/CampaignSecondary";

export async function checkDatabaseConsistency() {
  try {
    await dbConnectPrimary();
    await dbConnectSecondary();

    const primaryCampaigns = await CampaignPrimary.find({});
    const secondaryCampaigns = await CampaignSecondary.find({});

    const primaryMap = new Map();
    primaryCampaigns.forEach((campaign) =>
      primaryMap.set(campaign._id.toString(), campaign)
    );

    const discrepancies = [];
    secondaryCampaigns.forEach((secondaryCampaign) => {
      const primaryCampaign = primaryMap.get(secondaryCampaign._id.toString());
      if (
        !primaryCampaign ||
        JSON.stringify(primaryCampaign) !== JSON.stringify(secondaryCampaign)
      ) {
        discrepancies.push({
          primary: primaryCampaign,
          secondary: secondaryCampaigns,
        });
      }
    });

    if (discrepancies.length > 0) {
      console.log("Discrepancies found:", discrepancies);
      // Handle discrepancies (e.g., sync databases)
    } else {
      console.log("No discrepancies found");
    }
  } catch (error) {
    console.error("Error checking database consistency:", error);
  }
}
