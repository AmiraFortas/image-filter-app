# Image Filter App 

Image Filter App is a simple cloud application developed for filtering an given image. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

### Setup Node Environment

You'll need to create a new node server. Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`
3. run the build server with `npm run build`
### Deploying your system

Follow the process described in the course to `eb init` a new application and `eb create` a new environment to deploy your image-filter service! Don't forget you can use `eb deploy` to push changes.


## Testing 
:warning: **For this app to work you need to provide images from pexels.com ou unsplash.com**: Be very careful here!
the request URL should be like this: ``try GET /filteredimage?image_url={{}}``

here is an example:
:warning: **replace www.myapp.com with your website URL**:
``www.myapp.com/filteredimage?image_url=https://images.pexels.com/photos/5098634/pexels-photo-5098634.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load``