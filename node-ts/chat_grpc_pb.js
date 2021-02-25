// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var chat_pb = require('./chat_pb.js');

function serialize_chat_Ack(arg) {
  if (!(arg instanceof chat_pb.Ack)) {
    throw new Error('Expected argument of type chat.Ack');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chat_Ack(buffer_arg) {
  return chat_pb.Ack.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chat_BroadcastMessage(arg) {
  if (!(arg instanceof chat_pb.BroadcastMessage)) {
    throw new Error('Expected argument of type chat.BroadcastMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chat_BroadcastMessage(buffer_arg) {
  return chat_pb.BroadcastMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chat_SendMessage(arg) {
  if (!(arg instanceof chat_pb.SendMessage)) {
    throw new Error('Expected argument of type chat.SendMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chat_SendMessage(buffer_arg) {
  return chat_pb.SendMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chat_User(arg) {
  if (!(arg instanceof chat_pb.User)) {
    throw new Error('Expected argument of type chat.User');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chat_User(buffer_arg) {
  return chat_pb.User.deserializeBinary(new Uint8Array(buffer_arg));
}


var ChatService = exports.ChatService = {
  join: {
    path: '/chat.Chat/Join',
    requestStream: false,
    responseStream: true,
    requestType: chat_pb.User,
    responseType: chat_pb.BroadcastMessage,
    requestSerialize: serialize_chat_User,
    requestDeserialize: deserialize_chat_User,
    responseSerialize: serialize_chat_BroadcastMessage,
    responseDeserialize: deserialize_chat_BroadcastMessage,
  },
  broadcast: {
    path: '/chat.Chat/Broadcast',
    requestStream: false,
    responseStream: false,
    requestType: chat_pb.SendMessage,
    responseType: chat_pb.Ack,
    requestSerialize: serialize_chat_SendMessage,
    requestDeserialize: deserialize_chat_SendMessage,
    responseSerialize: serialize_chat_Ack,
    responseDeserialize: deserialize_chat_Ack,
  },
  leave: {
    path: '/chat.Chat/Leave',
    requestStream: false,
    responseStream: false,
    requestType: chat_pb.User,
    responseType: chat_pb.Ack,
    requestSerialize: serialize_chat_User,
    requestDeserialize: deserialize_chat_User,
    responseSerialize: serialize_chat_Ack,
    responseDeserialize: deserialize_chat_Ack,
  },
};

exports.ChatClient = grpc.makeGenericClientConstructor(ChatService);
