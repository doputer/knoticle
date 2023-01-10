import { Request, Response } from 'express';

import { GetArticle, SearchArticles } from '@apis/articles/articles.interface';
import articlesService from '@apis/articles/articles.service';
import { Scrap } from '@apis/scraps/scraps.interface';
import scrapsService from '@apis/scraps/scraps.service';
import { Forbidden, Message } from '@errors';

const getArticle = async (req: Request, res: Response) => {
  const { articleTitle, bookTitle, owner } = req.query as unknown as GetArticle;

  const article = await articlesService.getArticle({
    articleTitle,
    bookTitle,
    owner,
  });

  return res.status(200).send(article);
};

const searchArticles = async (req: Request, res: Response) => {
  const { query, page, take, isUsers } = req.query as unknown as SearchArticles;

  let userId = res.locals.user?.id;

  if (!userId) userId = 0;

  const searchResult = await articlesService.searchArticles({
    query,
    page,
    take: +take,
    isUsers,
    userId,
  });

  return res.status(200).send(searchResult);
};

const createArticle = async (req: Request, res: Response) => {
  const { title, content, book_id, order } = req.body;

  if (!title.length) throw new Forbidden(Message.ARTICLE_INVALID_TITLE);

  const createdArticle = await articlesService.createArticle({
    title,
    content,
    book_id,
    order,
  });

  return res.status(201).send({ createdArticle });
};

const updateArticle = async (req: Request, res: Response) => {
  const { article, scraps } = req.body;

  if (!article.title.length) throw new Forbidden(Message.ARTICLE_INVALID_TITLE);

  const articleId = Number(req.params.articleId);

  const modifiedArticle = await articlesService.updateArticle(articleId, {
    title: article.title,
    content: article.content,
    book_id: article.book_id,
  });

  const result: any[] = [];

  scraps.forEach(async (scrap: Scrap) => {
    if (scrap.id === 0) {
      result.push(await scrapsService.updateScrapBookId(articleId, article.book_id, scrap));
    } else {
      result.push(await scrapsService.updateScrapOrder(scrap));
    }
  });

  return res.status(201).send({ modifiedArticle, result });
};

const deleteArticle = async (req: Request, res: Response) => {
  const articleId = Number(req.params.articleId);
  const scrapId = Number(req.params.scrapId);

  await articlesService.deleteArticle(articleId);
  await scrapsService.deleteScrap(scrapId);

  return res.status(200).send();
};

const getTemporaryArticle = async (req: Request, res: Response) => {
  if (!res.locals.user) return res.status(200).send();

  const userId = res.locals.user.id;
  const temporaryArticle = await articlesService.getTemporaryArticle(userId);

  return res.status(200).send(temporaryArticle);
};

const createTemporaryArticle = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  const userId = res.locals.user.id;

  const temporaryArticle = await articlesService.createTemporaryArticle({
    title,
    content,
    user_id: userId,
  });

  return res.status(201).send(temporaryArticle);
};

export default {
  getArticle,
  searchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getTemporaryArticle,
  createTemporaryArticle,
};
