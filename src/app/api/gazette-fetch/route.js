
// API Route
// app/api/gazette-fetch/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import GazetteApplication from '@/models/gazetteApplication';

export async function GET() {
  try {
    await connectDB();
    
    const applications = await GazetteApplication
      .find({})
      .sort({ applicationDate: -1 })
      .lean();

    const processedApplications = applications.map(app => ({
      _id: app._id.toString(),
      currentName: app.currentName,
      proposedName: app.proposedName,
      address: app.address,
      phoneNumber: app.phoneNumber,
      email: app.email,
      reason: app.reason,
      applicationDate: app.applicationDate,
      status: app.status,
      affidavit: app.affidavit,
      idProof: app.idProof,
      addressProof: app.addressProof,
      newspaperAds: app.newspaperAds,
      applicationForm: app.applicationForm,
      paymentProof: app.paymentProof,
      coverLetter: app.coverLetter,
      photos: app.photos,
      digitalCD: app.digitalCD
    }));

    return NextResponse.json({ 
      success: true, 
      applications: processedApplications 
    });

  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching applications' }, 
      { status: 500 }
    );
  }
}