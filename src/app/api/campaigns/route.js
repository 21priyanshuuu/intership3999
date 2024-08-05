import dbConnectPrimary from "../../../lib/dbConnectPrimary";
import dbConnectSecondary from "../../../lib/dbConnectSecondary";
import CampaignPrimary from "../../../models/CampaignPrimary";
import CampaignSecondary from "../../../models/CampaignSecondary";

export async function GET(request) {
  await dbConnectPrimary();
  const campaigns = await CampaignPrimary.find({});
  return new Response(JSON.stringify({ success: true, data: campaigns }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request) {
  await dbConnectPrimary();
  await dbConnectSecondary();
  const data = await request.json();

  const campaignPrimary = new CampaignPrimary(data);
  const campaignSecondary = new CampaignSecondary(data);

  await campaignPrimary.save();
  await campaignSecondary.save();

  return new Response(
    JSON.stringify({ success: true, data: campaignPrimary }),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
