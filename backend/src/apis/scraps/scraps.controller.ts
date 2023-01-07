import { Request, Response } from 'express';

import { Scrap } from '@apis/scraps/scraps.interface';

import scrapsService from './scraps.service';

const getScraps = async (req: Request, res: Response) => {
  const scraps = await scrapsService.getScraps();

  return res.status(200).send(scraps);
};

const createScrap = async (req: Request, res: Response) => {
  const { order, is_original, book_id, article_id } = req.body;

  await scrapsService.createScrap({
    order,
    is_original,
    book_id,
    article_id,
  });

  return res.status(201).send({ book_id, article_id });
};

const updateScrapsOrder = async (req: Request, res: Response) => {
  const scraps = req.body;

  scraps.forEach(async (scrap: Scrap) => {
    await scrapsService.updateScrapOrder(scrap);
  });

  res.status(200).send(scraps);
};

const deleteScrap = async (req: Request, res: Response) => {
  const scrapId = Number(req.params.scrapId);

  const scrap = await scrapsService.deleteScrap(scrapId);

  return res.status(200).send(scrap);
};

export default {
  getScraps,
  createScrap,
  updateScrapsOrder,
  deleteScrap,
};
