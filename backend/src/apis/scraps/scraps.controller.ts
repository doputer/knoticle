import { Request, Response } from 'express';

import scrapsService from './scraps.service';

const createScrap = async (req: Request, res: Response) => {
  await scrapsService.checkScrapExists(req.body);

  const scrap = await scrapsService.createScrap(req.body);

  res.status(201).send({ scrap });
};

export default {
  createScrap,
};