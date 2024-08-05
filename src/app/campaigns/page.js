import React from "react";
import dbConnectPrimary from "../../lib/dbConnectPrimary";
import CampaignPrimary from "../../models/CampaignPrimary";

export default async function CampaignsPage() {
  await dbConnectPrimary();
  const campaigns = await CampaignPrimary.find({});

  return (
    <div>
      <h1>Campaigns</h1>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign._id}>
            <h2>{campaign.title}</h2>
            <p>{campaign.description}</p>
            <p>Goal: {campaign.goalAmount}</p>
            <p>Current: {campaign.currentAmount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
