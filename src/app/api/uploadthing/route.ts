import { createRouteHandlerClient } from "uploadthing/next";

import { ourFileRouter } from "./core";

export const { GET, POST } = createRouteHandlerClient({
  router: ourFileRouter,
});
