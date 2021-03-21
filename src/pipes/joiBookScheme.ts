import * as Joi from 'joi';

export const updateBookSchema = Joi.object().keys({
  _id: Joi.string().optional(),
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string().min(10).max(300).optional(),
  authors: Joi.string().min(10).max(300).required().optional(),
  favorite: Joi.string().min(2).max(3).required().optional(),
  fileCover: Joi.string().min(10).max(100).required().optional(),
  fileName: Joi.string().min(10).max(50).required().optional(),
});
