import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Log environment variables for debugging
console.log('UploadThing App ID:', process.env.UPLOADTHING_APP_ID);
console.log('UploadThing Secret:', process.env.UPLOADTHING_SECRET ? 'Set' : 'Not set');

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
