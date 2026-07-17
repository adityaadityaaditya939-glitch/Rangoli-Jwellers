import { generateReactHelpers } from "@uploadthing/react";
import { UploadDropzone as UTUploadDropzone } from "@uploadthing/react";

import { type OurFileRouter } from "@/app/api/uploadthing/core";

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export const UploadDropzone = UTUploadDropzone as any;
