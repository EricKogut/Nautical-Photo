import { Router, Request, Response } from "express";
const userHandler = require("../handlers/user.handler.ts");
//IMporting the passport library
const passport = require("passport");
//Passing the imported passport module into the configuration function
require("../utils/auth/passport")(passport);

//Dependencies from google
const process = require("process"); // Required to mock environment variables

// [START gae_flex_storage_app]
const { format } = require("util");
const express = require("express");
const Multer = require("multer");

// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable. See
// https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine
const { Storage } = require("@google-cloud/storage");

// Instantiate a storage client
const storage = new Storage();

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

interface MulterRequest extends Request {
  file: any;
}

// A bucket is a container for objects (files).
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

export const photoRouter = () => {
  const router = Router();

  router.get("/upload", (req: Request, res: Response) => {
    return res.status(200).json({ response: "You are authenticated :)" });
  });

  // Process the file upload and upload to Google Cloud Storage.
  router.post("/upload", multer.single("file"), (req: Request, res, next) => {
    const multerRequest = (req as MulterRequest).file;
    if (!multerRequest.file) {
      res.status(400).send("No file uploaded.");
      return;
    }

    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(multerRequest.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err: Error) => {
      next(err);
    });

    blobStream.on("finish", () => {
      // The public URL can be used to directly access the file via HTTP.
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );
      res.status(200).send(publicUrl);
    });

    blobStream.end(multerRequest.file.buffer);
  });

  return router;
};
