// package: chat
// file: chat.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class User extends jspb.Message { 
    getName(): string;
    setName(value: string): User;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): User.AsObject;
    static toObject(includeInstance: boolean, msg: User): User.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): User;
    static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
    export type AsObject = {
        name: string,
    }
}

export class SendMessage extends jspb.Message { 

    hasUser(): boolean;
    clearUser(): void;
    getUser(): User | undefined;
    setUser(value?: User): SendMessage;
    getContent(): string;
    setContent(value: string): SendMessage;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendMessage.AsObject;
    static toObject(includeInstance: boolean, msg: SendMessage): SendMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendMessage;
    static deserializeBinaryFromReader(message: SendMessage, reader: jspb.BinaryReader): SendMessage;
}

export namespace SendMessage {
    export type AsObject = {
        user?: User.AsObject,
        content: string,
    }
}

export class BroadcastMessage extends jspb.Message { 

    hasUser(): boolean;
    clearUser(): void;
    getUser(): User | undefined;
    setUser(value?: User): BroadcastMessage;
    getContent(): string;
    setContent(value: string): BroadcastMessage;
    getTimestamp(): string;
    setTimestamp(value: string): BroadcastMessage;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BroadcastMessage.AsObject;
    static toObject(includeInstance: boolean, msg: BroadcastMessage): BroadcastMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BroadcastMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BroadcastMessage;
    static deserializeBinaryFromReader(message: BroadcastMessage, reader: jspb.BinaryReader): BroadcastMessage;
}

export namespace BroadcastMessage {
    export type AsObject = {
        user?: User.AsObject,
        content: string,
        timestamp: string,
    }
}

export class Ack extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Ack.AsObject;
    static toObject(includeInstance: boolean, msg: Ack): Ack.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Ack, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Ack;
    static deserializeBinaryFromReader(message: Ack, reader: jspb.BinaryReader): Ack;
}

export namespace Ack {
    export type AsObject = {
    }
}
