// /api/connect-mt5/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import MetaApi from 'metaapi.cloud-sdk';

const api = new MetaApi(process.env.META_API_TOKEN!);

export async function POST(req: NextRequest) {
  try {
    const { name, server, login, password } = await req.json();

    if (!name || !server || !login || !password) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // Get or create provisioning profile
    const profiles = await api.provisioningProfileApi.getProvisioningProfiles();
    let profile = profiles.find(p => p.name === 'DefaultMT5');

    if (!profile) {
      profile = await api.provisioningProfileApi.createProvisioningProfile({
        name: 'DefaultMT5',
        version: 5,
        brokerTimezone: 'EET',
        brokerDSTSwitchTimezone: 'EET',
        server,
      });
    }

    const account = await api.metatraderAccountApi.createAccount({
      name,
      type: 'cloud',
      login,
      password,
      server,
      platform: 'mt5',
      provisioningProfileId: profile.id,
      region: 'eu',
    });

    await account.deploy();
    await account.waitConnected();

    return NextResponse.json({ success: true, accountId: account.id });
  } catch (err: any) {
    console.error('MetaApi Error:', err);
    return NextResponse.json({ success: false, message: err.message || 'Server error' }, { status: 500 });
  }
}
