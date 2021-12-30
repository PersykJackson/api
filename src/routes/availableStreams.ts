import { request, response } from 'express';
import axiosRequest from '../app/request/index';
import { AVAILABLE_STREAMS } from '../app/constants/httpMediaApi';

const availableStreams = async (
  req: typeof request,
  res: typeof response
): Promise<void> => {
  const streams = await axiosRequest.get(AVAILABLE_STREAMS);

  res.status(200).json(streams.data);
};

export default availableStreams;
