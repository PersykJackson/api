import MediaServer from 'node-media-server';
import rtmpConfig from './app/configs/rtmpConfig';

const getStreamKeyFromStreamPath = (path: string) => {
  const parts = path.split('/');

  return parts[parts.length - 1];
};

const mediaServer = new MediaServer(rtmpConfig.rtmp_server);

mediaServer.on('prePublish', async (id, streamPath, args) => {
  const streamKey = getStreamKeyFromStreamPath(streamPath);
  console.log('Stream connected!', `Stream key: ${streamKey}`);
  // TODO: add auth system;
});

export default mediaServer;
