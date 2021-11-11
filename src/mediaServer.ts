import MediaServer from 'node-media-server';
import rtmpConfig from './app/configs/rtmpConfig';
import generateStreamImage from './app/helpers/generateStreamImage';

const getStreamKeyFromStreamPath = (path: string) => {
  const parts = path.split('/');

  return parts[parts.length - 1];
};

const mediaServer = new MediaServer(rtmpConfig.rtmp_server);

mediaServer.on('prePublish', async (id, streamPath, args) => {
  const streamKey = getStreamKeyFromStreamPath(streamPath);
  generateStreamImage(streamKey);

  console.log('Stream connected!', `Stream key: ${streamKey}`);
});

export default mediaServer;
