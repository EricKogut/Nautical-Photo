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
      case "get/public":
      return handleGetPublic(data);
  }
  return null;
}

function handleUpload(req: any) {
  return new Promise((resolve, reject) => {
    if (!req.params) {
      reject({
        status: 403,
        message: "No email given!",
      });
    }

    const multerRequest = (req as MulterRequest).files;
    if (!multerRequest.file) {
      reject({
        status: 400,
        message: "No file selected",
      });
    }

    const hash = (Math.random() + 1).toString(36).substring(7);

    const fileExtention = multerRequest.file.name.split(".").pop();

    const stream = require("stream"),
      dataStream = new stream.PassThrough(),
      gcFile = bucket.file(hash + "." + fileExtention);

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
        //Creating a new user
        const newPhoto = new Photo({
          name: multerRequest.file.name,
          owner: req.params.email,
          url:
            "https://storage.googleapis.com/nautical-photo-pictures/" +
            hash +
            "." +
            fileExtention,
          public: true,
          likes: 0,
        });

        try {
          newPhoto.save().then((photo) => {
            //This function grabs the id off the user object
            resolve({
              status: 200,
              message: "File successfully uploaded!",
            });
          });
        } catch (err) {
          reject({
            status: 500,
            success: false,
            message: err,
          });
        }
      });
  });
}

function handleGetPublic(req: any) {
  return new Promise((resolve, reject) => {
    Photo.find({public:true}).sort({"created_at":1}).then((photos)=>{
      resolve({status:200, success:true, message:photos})
    }
    )

    
  })
  }

module.exports.handlePhoto = handlePhoto;
