// package: chat
// file: chat.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as chat_pb from "./chat_pb";

interface IChatService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    join: IChatService_IJoin;
    broadcast: IChatService_IBroadcast;
    leave: IChatService_ILeave;
}

interface IChatService_IJoin extends grpc.MethodDefinition<chat_pb.User, chat_pb.BroadcastMessage> {
    path: "/chat.Chat/Join";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<chat_pb.User>;
    requestDeserialize: grpc.deserialize<chat_pb.User>;
    responseSerialize: grpc.serialize<chat_pb.BroadcastMessage>;
    responseDeserialize: grpc.deserialize<chat_pb.BroadcastMessage>;
}
interface IChatService_IBroadcast extends grpc.MethodDefinition<chat_pb.SendMessage, chat_pb.Ack> {
    path: "/chat.Chat/Broadcast";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<chat_pb.SendMessage>;
    requestDeserialize: grpc.deserialize<chat_pb.SendMessage>;
    responseSerialize: grpc.serialize<chat_pb.Ack>;
    responseDeserialize: grpc.deserialize<chat_pb.Ack>;
}
interface IChatService_ILeave extends grpc.MethodDefinition<chat_pb.User, chat_pb.Ack> {
    path: "/chat.Chat/Leave";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<chat_pb.User>;
    requestDeserialize: grpc.deserialize<chat_pb.User>;
    responseSerialize: grpc.serialize<chat_pb.Ack>;
    responseDeserialize: grpc.deserialize<chat_pb.Ack>;
}

export const ChatService: IChatService;

export interface IChatServer extends grpc.UntypedServiceImplementation {
    join: grpc.handleServerStreamingCall<chat_pb.User, chat_pb.BroadcastMessage>;
    broadcast: grpc.handleUnaryCall<chat_pb.SendMessage, chat_pb.Ack>;
    leave: grpc.handleUnaryCall<chat_pb.User, chat_pb.Ack>;
}

export interface IChatClient {
    join(request: chat_pb.User, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<chat_pb.BroadcastMessage>;
    join(request: chat_pb.User, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<chat_pb.BroadcastMessage>;
    broadcast(request: chat_pb.SendMessage, callback: (error: grpc.ServiceError | null, response: chat_pb.Ack) => void): grpc.ClientUnaryCall;
    broadcast(request: chat_pb.SendMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: chat_pb.Ack) => void): grpc.ClientUnaryCall;
    broadcast(request: chat_pb.SendMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: chat_pb.Ack) => void): grpc.ClientUnaryCall;
    leave(request: chat_pb.User, callback: (error: grpc.ServiceError | null, response: chat_pb.Ack) => void): grpc.ClientUnaryCall;
    leave(request: chat_pb.User, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: chat_pb.Ack) => void): grpc.ClientUnaryCall;
    leave(request: chat_pb.User, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: chat_pb.Ack) => void): grpc.ClientUnaryCall;
}

export class ChatClient extends grpc.Client implements IChatClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public join(request: chat_pb.User, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<chat_pb.BroadcastMessage>;
    public join(request: chat_pb.User, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<chat_pb.BroadcastMessage>;
    public broadcast(request: chat_pb.SendMessage, callback: (error: grpc.ServiceError | null, response: chat_pb.Ack) => void): grpc.ClientUnaryCall;
    public broadcast(request: chat_pb.SendMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: chat_pb.Ack) => void): grpc.ClientUnaryCall;
    public broadcast(request: chat_pb.SendMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: chat_pb.Ack) => void): grpc.ClientUnaryCall;
    public leave(request: chat_pb.User, callback: (error: grpc.ServiceError | null, response: chat_pb.Ack) => void): grpc.ClientUnaryCall;
    public leave(request: chat_pb.User, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: chat_pb.Ack) => void): grpc.ClientUnaryCall;
    public leave(request: chat_pb.User, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: chat_pb.Ack) => void): grpc.ClientUnaryCall;
}
