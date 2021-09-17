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
  files: any;
}

// A bucket is a container for objects (files).
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

export const photoRouter = () => {
  const router = Router();

  router.get("/upload", async function (req: Request, res: Response) {
    return res.status(200).json({ response: "You are authenticated :)" });
  });

  // Process the file upload and upload to Google Cloud Storage.
  router.post(
    "/upload",
    multer.single("file"),
    async function (req: Request, res, next) {
      const multerRequest = (req as MulterRequest).files;
      console.log(multerRequest, "is the request");
      if (!multerRequest.file) {
        res.status(400).send("No file uploaded.");
        return;
      }

      const stream = require("stream"),
        dataStream = new stream.PassThrough(),
        gcFile = bucket.file(multerRequest.file.name);
      dataStream.push(multerRequest.file.data);
      dataStream.push(null);

      await new Promise((resolve, reject) => {
        dataStream
          .pipe(
            gcFile.createWriteStream({
              resumable: false,
              validation: false,
              metadata: { "Cache-Control": "public, max-age=31536000" },
            })
          )
          .on("error", (error: Error) => {
            reject(error);
          })
          .on("finish", () => {
            resolve(true);
          });
      });
    }
  );

  return router;
};
