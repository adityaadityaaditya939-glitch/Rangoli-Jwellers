import { generateReactHelpers } from "@uploadthing/react";
import { UploadDropzone as UTUploadDropzone } from "@uploadthing/react";

import { type OurFileRouter } from "@/app/api/uploadthing/core";

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UploadDropzone = UTUploadDropzone as any;
