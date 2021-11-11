import { CronJob } from 'cron';
import axios from 'axios';
import generateStreamImage from './generateStreamImage';

const imageCron = new CronJob(
  '*/5 * * * * *',
  async () => {
    const streams = (await axios.get('http://127.0.0.1:8888/api/streams')).data;

    if (streams.live) {
      Object.values(streams.live).forEach((liveStream: any) => {
        if (liveStream?.publisher?.stream) {
          generateStreamImage(liveStream?.publisher?.stream);
        }
      });
    }
  },
  null,
  true
);

export default imageCron;
