import { Request, Response } from 'express';

import usersService from '@apis/users/users.service';

const getUser = async (req: Request, res: Response) => {
  const nickname = req.query.nickname as string;

  const user = await usersService.getUser(nickname);

  return res.status(200).send(user);
};

const getUserBooks = async (req: Request, res: Response) => {
  const { nickname } = req.params;

  const books = await usersService.getUserBooks(nickname);

  return res.status(200).send(books);
};

const getUserBookmarks = async (req: Request, res: Response) => {
  const { nickname } = req.params;

  const books = await usersService.getUserBookmarks(nickname);

  return res.status(200).send(books);
};

const updateUser = async (req: Request, res: Response) => {
  const userProfile = await usersService.updateUser(req.body);

  return res.status(200).send(userProfile);
};

export default {
  getUser,
  getUserBooks,
  getUserBookmarks,
  updateUser,
};
