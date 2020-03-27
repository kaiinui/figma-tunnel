'use strict';

const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');

let exportFigmaImage = (file, nodeId) => {
  const base = "https://api.figma.com/v1/images/";
  
  return axios.request({
    url: `${base}${file}?ids=${nodeId}`,
    method: "get",
    headers: {
      "X-Figma-Token": process.env.FIGMA_ACCESS_TOKEN
    }
  });
}

app.use(bodyParser.urlencoded({extended: true}));

app.get('/images/:file/:node_id', async (req, res) => {
  let file = req.params.file;
  let nodeId = req.params.node_id;
  
  let figmaImages = await exportFigmaImage(file, nodeId); // FIXME: catch
  let url = figmaImages.data.images[nodeId];
  
  res.redirect(url);
})

app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));