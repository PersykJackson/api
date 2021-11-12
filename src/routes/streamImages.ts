import { request, response } from 'express';
import * as fs from 'fs';

const streamImages = async (
  req: typeof request,
  res: typeof response
): Promise<void> => {
  if (req.query.key) {
    if (fs.existsSync(`server/streamImages/${req.query.key}.png`)) {
      res
        .status(200)
        .sendFile(
          `${process.env.APP_ROOT}/server/streamImages/${req.query.key}.png`
        );
    } else {
      res.status(404).json('Image not found!');
    }
  } else {
    res.status(422).json('Empty stream key!');
  }
};

export default streamImages;
