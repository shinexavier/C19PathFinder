const express = require('express');
const routeMapUpload = require('./../utils/fileuploadUtil').routeMapUpload;
const uploadService = require('./../services/uploadService');
const userService = require('./../services/userService');

const router = express.Router();

async function getUserHandler(req, res, next) {
  const userId = req.params.userId;
  let user;

  try {
    user = await userService.getUser(userId);
  } catch (error) {
    return next(error);
  }

  if (!user) {
    res.status(400);
    return res.send(`user with id - ${userId} doesn't exists`);
  }

  return res.json(user);
}

async function updateUserHandler(req, res, next) {
  const userId = req.params.userId;
  const userObject = req.body;
  
  return userService
    .upsertUser(userId, userObject)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
}

async function routeMapUploadHandler(req, res, next) {
  return uploadService
    .parseUploadFile(req.file.path)
    .then(userService.insertMany)
    .then((users) => {
      return res.json(users);
    })
    .catch((error) => {
      if (error.code == 400) {
        console.log(error);
        return res.send(`file upload failed with error: ${error.message}`);
      } else {
        return next(error);
      }
    });
}

async function verifyUserHandler(req, res, next) {
  const userId = req.params.userId;
  let user;
  let isUserVerified;

  try {
    user = await userService.getUser(userId);
  } catch (error) {
    return next(error);
  }

  if (!user) {
    res.status(400);
    return res.send(`user with id - ${userId} doesn't exists`);
  }

  try {
    isUserVerified = await userService.isUserVerified(userId);
  } catch (error) {
    return next(error);
  }

  if (isUserVerified) {
    res.status(400);
    return res.send(`user with id - ${userId} is already verified`);
  }

  return userService
    .verifyUser(userId)
    .then((flaggedLocationPoints) => {
      return res.json(flaggedLocationPoints);
    })
    .catch(next);
}

router.get('/:userId', getUserHandler);
router.put('/:userId', updateUserHandler);
router.get('/upload/route-map', [
  routeMapUpload.single('file'),
  routeMapUploadHandler,
]);
router.get('/verify/:userId', verifyUserHandler);

module.exports = (app) => {
  app.use('/user', router);
};
