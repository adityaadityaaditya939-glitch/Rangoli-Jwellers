import { createRouteHandler } from "uploadthing/next";
import { NextRequest } from "next/server";

import { ourFileRouter } from "./core";

// Log environment variables for debugging
console.log('UploadThing App ID:', process.env.UPLOADTHING_APP_ID);
console.log('UploadThing Secret:', process.env.UPLOADTHING_SECRET ? 'Set' : 'Not set');

const handler = createRouteHandler({
  router: ourFileRouter,
});

export const GET = async (req: NextRequest) => {
  try {
    return await handler.GET(req);
  } catch (error) {
    console.error('UploadThing GET error:', error);
    throw error;
  }
};

export const POST = async (req: NextRequest) => {
  try {
    return await handler.POST(req);
  } catch (error) {
    console.error('UploadThing POST error:', error);
    throw error;
  }
};
