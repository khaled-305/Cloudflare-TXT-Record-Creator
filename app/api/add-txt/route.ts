import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { recordName, recordValue, domain } = await request.json();

    // Validate inputs
    if (!recordName || !recordValue || !domain) {
      return NextResponse.json(
        {
          success: false,
          message: "Record name, value, and domain are required",
        },
        { status: 400 }
      );
    }

    const CF_API_TOKEN = process.env.CF_API_TOKEN;
    const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID;

    if (!CF_API_TOKEN || !CF_ACCOUNT_ID) {
      throw new Error("Cloudflare API credentials not configured");
    }

    // First, check if the zone exists
    const zonesResponse = await fetch(
      `https://api.cloudflare.com/client/v4/zones?name=${domain}`,
      {
        headers: {
          Authorization: `Bearer ${CF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const zonesData = await zonesResponse.json();
    let zoneId = zonesData.result?.[0]?.id;

    // If zone doesn't exist, create it
    if (!zoneId) {
      const createZoneResponse = await fetch(
        "https://api.cloudflare.com/client/v4/zones",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${CF_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: domain,
            account: {
              id: CF_ACCOUNT_ID,
            },
            jump_start: true,
          }),
        }
      );

      const createZoneData = await createZoneResponse.json();

      if (!createZoneResponse.ok) {
        throw new Error(
          createZoneData.errors?.[0]?.message || "Failed to create zone"
        );
      }

      zoneId = createZoneData.result.id;
    }

    // Now create the TXT record
    const dnsResponse = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "TXT",
          name: recordName,
          content: recordValue,
          ttl: 120,
        }),
      }
    );

    const dnsData = await dnsResponse.json();

    if (!dnsResponse.ok) {
      throw new Error(
        dnsData.errors?.[0]?.message || "Failed to create TXT record"
      );
    }

    return NextResponse.json({
      success: true,
      message: "TXT record created successfully",
      data: dnsData.result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
