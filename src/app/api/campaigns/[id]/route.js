import dbConnectPrimary from "../../../../lib/dbConnectPrimary";
import dbConnectSecondary from "../../../../lib/dbConnectSecondary";
import CampaignPrimary from "../../../../models/CampaignPrimary";
import CampaignSecondary from "../../../../models/CampaignSecondary";

export async function GET(request, { params }) {
  await dbConnectPrimary();
  const { id } = params;
  const campaign = await CampaignPrimary.findById(id);
  if (!campaign) {
    return new Response(JSON.stringify({ success: false }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return new Response(JSON.stringify({ success: true, data: campaign }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PUT(request, { params }) {
  await dbConnectPrimary();
  await dbConnectSecondary();
  const { id } = params;
  const data = await request.json();

  const campaignPrimary = await CampaignPrimary.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  const campaignSecondary = await CampaignSecondary.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!campaignPrimary || !campaignSecondary) {
    return new Response(JSON.stringify({ success: false }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(
    JSON.stringify({ success: true, data: campaignPrimary }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function DELETE(request, { params }) {
  await dbConnectPrimary();
  await dbConnectSecondary();
  const { id } = params;

  const deletedCampaignPrimary = await CampaignPrimary.deleteOne({ _id: id });
  const deletedCampaignSecondary = await CampaignSecondary.deleteOne({
    _id: id,
  });

  if (!deletedCampaignPrimary || !deletedCampaignSecondary) {
    return new Response(JSON.stringify({ success: false }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify({ success: true, data: {} }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
