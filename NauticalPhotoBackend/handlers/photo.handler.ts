const authUtils = require("../utils/auth/authUtils");
import { Photo } from "../models/Photo.model";
import { Router, Request, Response } from "express";

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

/* Actual Handler */
function handlePhoto(endpoint: String, data: Object) {
  switch (endpoint) {
    case "upload":
      return handleUpload(data);
  }
  return null;
}

function handleUpload(req: any) {
  return new Promise((resolve, reject) => {
    const multerRequest = (req as MulterRequest).files;
    console.log(multerRequest, "is the request");
    if (!multerRequest.file) {
      reject({
        status: 400,
        message: "No file selected",
      });
    }

    const hash = (Math.random() + 1).toString(36).substring(7);

    const stream = require("stream"),
      dataStream = new stream.PassThrough(),
      gcFile = bucket.file(
        hash + "." + multerRequest.file.name.split(".").pop()
      );

    dataStream.push(multerRequest.file.data);
    dataStream.push(null);

    dataStream
      .pipe(
        gcFile.createWriteStream({
          resumable: false,
          validation: false,
          metadata: { "Cache-Control": "public, max-age=31536000" },
        })
      )
      .on("error", (error: Error) => {
        reject({
          status: 500,
          message: "Error processing your request, see below",
          error: error,
        });
      })
      .on("finish", () => {
        resolve({
          status: 200,
          message: "File successfully uploaded!",
        });
      });
  });
}

module.exports.handlePhoto = handlePhoto;
