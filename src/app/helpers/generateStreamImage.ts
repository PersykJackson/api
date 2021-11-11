import { spawn } from 'child_process';
import rtmpConfig from '../configs/rtmpConfig';

const generateStreamImage = (streamKey: string): void => {
  spawn(
    rtmpConfig.rtmp_server.trans.ffmpeg,
    [
      '-y',
      '-i',
      `http://127.0.0.1:8888/live/${streamKey}/index.m3u8`,
      '-ss',
      '00:00:01',
      '-vf',
      'scale=-2:300',
      `server/streamImages/${streamKey}.png`,
    ],
    { detached: true, stdio: 'ignore' }
  ).unref();
};

export default generateStreamImage;
