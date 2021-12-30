import { request, response } from 'express';

export const swagger = async (
  req: typeof request,
  res: typeof response
): Promise<void> => {
  res.sendFile('../app/swaggerUI/index.html');
};
