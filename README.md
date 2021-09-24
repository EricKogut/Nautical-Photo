# Nautical Photo
[Try it out :)](https://nautical-photo.uc.r.appspot.com/#/) Please note that the backend server may need a minute to spin-up, if it is not working at first, refresh the page.  For a technical explanation please see the backend folder for a more comprehensive README (basic explanation in the frontend folder as well).
![Landing](https://storage.googleapis.com/nautical-photo-pictures/Animation.gif)


[Nautical Photo](https://nautical-photo.uc.r.appspot.com/#/) is my submission to the 2021 [Shopify Developer Intern Challenge](https://docs.google.com/document/d/1eg3sJTOwtyFhDopKedRD6142CFkDfWp1QvRKXNTPIOc/edit). It tasked us with creating a photo repository application. GCP credentials and MongoDB credentials available upon request: please email eric.jkogut@gmail.com

I opted to create a relatively simple "Instagram" clone. Unfortunately, I was unable to follow a TDD process, in that I wanted to ensure that the key features were possible and viable.

### Primary objectives / Functional Requirements

1. Give any user the ability to view the explore page to view public pictures
2. Allow users to register accounts, and sign in to their accounts
3. Allow logged-in users to like public photos, and upload their own
4. Allow users to download, delete and change the viewing settings of their picture (public/private)
5. Update the user feed immediately with the changes to likes, deletion, private/public toggle, download


### Secondary objectives / Non-Functional Requirements
1. Use GCP for photo storage as [Shopify uses GCP as well](https://cloud.google.com/press-releases/2021/0527/shopify-expands-globally-with-google-cloud)
2. Deploy the web application to be publicly accessible (no one like to have to install and run packages ;) )
3. Protect routes that shouldn't be accessible to a user that is not logged in

### Main Takeaway
The photo upload stopped me from achieving some additional things that I was thinking would be "nice to haves". I created a custom solution to upload the blob via my backend, but that took a fair amount of time and effort. The [existing solution](https://cloud.google.com/appengine/docs/flexible/nodejs/using-cloud-storage) would require me to download the photo to my backend server, upload it, then delete it from the node server. Amplify file upload in React and Firebase in Angular makes the process fairly painless in that each provides an abstracted solution (which I have both used). Nonetheless, I learned a lot about file uploads, blobs, and the GCP solutions in taking this harder route in hopes of achieving the secondary objectives.

### Next Steps
1. Fix up the use of types in the backend and frontend -> I used the any type as a bandaid solution which could (will) blow up in the future
2. Add better, more comprehensive loading states
3. Create separate pages for loading the photo files, right now the backend is getting all of the available public photots (ruh roh)
4. Make it more pretty (I realize that the password input box is not of type password, but that is ok for now)
5. Add more user config settings and flows (password reset), photo user data, comments, etc.



---
# Views

## Once the User is logged in, they are able to upload photos:
![alt text](https://storage.googleapis.com/nautical-photo-pictures/LoginUpload.gif)

---
## Mobile view

#### Here we can see that you are able to upload pictures, and like the pictures on the feed. Sorry about the compression, needed to fit it in 1 video.

![alt text](https://storage.googleapis.com/nautical-photo-pictures/photoupload-1%20(1).gif)

From your view, clicking the "eye" icon, makes the image private, hiding it from the main feed.

#### Downloading and deleting photos
![alt text](https://storage.googleapis.com/nautical-photo-pictures/mobileupload%20and%20toggle%20view%20settings%20-compressed.gif)


---


