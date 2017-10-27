// This file contains single trip db queries.
const db = require('../config/dynamo-client');

async function hasUser(email) {
  const data = await db.get({
    TableName: 'PandoraUserInfo',
    Key: { email },
  }).promise();
  return Boolean(data.Item);
}

async function getUser(email) {
  const data = await db.get({
    TableName: 'PandoraUserInfo',
    Key: { email },
  }).promise();
  if (!data.Item) {
    throw new Error('User not found');
  }
  return data.Item;
}

async function createUser(email, hashedPassword, username) {
  return db.put({
    TableName: 'PandoraUserInfo',
    Item: { email, hashedPassword, username },
  }).promise();
}

async function setUserRoom(email, roomName, characterName) {
  if (!roomName) {
    return db.update({
      TableName: 'PandoraUserInfo',
      Key: { email },
      UpdateExpression: 'REMOVE roomName, characterName',
    }).promise();
  }

  let exp = '';
  let vals = {};
  if (!characterName) {
    exp = 'SET roomName = :r';
    vals = { ':r': roomName };
  } else {
    exp = 'SET roomName = :r, characterName = :c';
    vals = { ':r': roomName, ':c': characterName };
  }
  return db.update({
    TableName: 'PandoraUserInfo',
    Key: { email },
    UpdateExpression: exp,
    ExpressionAttributeValues: vals,
  }).promise();
}

async function getRoom(roomName) {
  const data = await db.get({
    TableName: 'PandoraRooms',
    Key: { roomName },
  }).promise();
  if (!data.Item) {
    throw new Error('Room not found');
  }
  return data.Item;
}

async function setRoom(room) {
  return db.put({
    TableName: 'PandoraRooms',
    Item: room,
  }).promise();
}

async function getRoomNames() {
  const data = await db.scan({
    TableName: 'PandoraRooms',
    ProjectionExpression: 'roomName',
  }).promise();
  return data.Items.map(item => item.roomName);
}

async function isRoomPaused(roomName) {
  const data = await db.get({
    TableName: 'PandoraRooms',
    Key: { roomName },
    ProjectionExpression: 'paused',
  }).promise();
  return data.Item.paused;
}

async function setRoomPaused(roomName, value) {
  return db.update({
    TableName: 'PandoraRooms',
    Key: { roomName },
    UpdateExpression: 'SET paused = :p',
    ExpressionAttributeValues: {
      ':p': value,
    },
  }).promise();
}

async function getGame(gameName) {
  const data = await db.get({
    TableName: 'PandoraGames',
    Key: { gameName },
  }).promise();
  return data.Item;
}

async function getAction(gameName, actionName) {
  const data = await db.get({
    TableName: 'PandoraActions',
    Key: { gameName, actionName },
  }).promise();
  return data.Item;
}

async function getGameActions(gameName) {
  const data = await db.query({
    TableName: 'PandoraActions',
    KeyConditionExpression: '#gn = :gn',
    ExpressionAttributeNames: {
      '#gn': 'gameName',
    },
    ExpressionAttributeValues: {
      ':gn': gameName,
    },
  }).promise();
  return data.Items;
}

module.exports = {
  hasUser,
  getUser,
  createUser,
  setUserRoom,
  getRoom,
  getRoomNames,
  setRoom,
  isRoomPaused,
  setRoomPaused,
  getGame,
  getAction,
  getGameActions,
};
