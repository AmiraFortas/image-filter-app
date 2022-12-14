import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import { exit } from 'process';
import { FILE } from 'dns';

function isValidURL(inputURL: string) {
  var res = inputURL.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
}

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  app.get("/filteredimage", async (req, res) => {
    let inputURL: string = req.query.image_url;

    if (isValidURL(inputURL) == false) {
      console.log("invalidated URL , check again");
      // send error message if the URL is invalid
      res.status(400).send('invalidated URL , check again');
    }
    else {
      try {
        // call filterImageFromURL(image_url) to filter the image
        const result_image = await filterImageFromURL(inputURL);
        console.log(result_image);
        res.on('finish', function () {
          // deletes any files on the server on finish of the response
          deleteLocalFiles([result_image]);
        });
        // send the resulting file in the response
        res.status(200).sendFile('' + result_image);
      }
      catch {
      // catch any error during processing the image
      res.status(400).send('Unable to process');
    }
  }
}
);

//! END @TODO1

// Root Endpoint

// Displays a simple message to the user
app.get("/", async (req, res) => {
  res.send("try GET /filteredimage?image_url={{}}")
});

// Start the Server
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});
}) ();
