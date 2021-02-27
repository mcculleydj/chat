import argparse
import concurrent.futures
import grpc
import chat_pb2
import chat_pb2_grpc


def listen(stub: chat_pb2_grpc.ChatStub, name: str):
    """
    Listens on the stream for new server messages
    Will be spawned in a separate thread, so we need to wrap in try/except to catch the eventual exception from the channel closing on shutdown
    """
    try:
        for message in stub.Join(chat_pb2.User(name=name)):
            print(f"\r{message.user.name} | {message.timestamp} - {message.content}\n> ", end="")
    except Exception:
        # channel close (I hope)
        pass


def post(stub: chat_pb2_grpc.ChatStub, user: chat_pb2.User):
    """
    Loops on user input to send broadcast to server
    Exits on recept of "quit" message
    """
    while True:
        message = input("\r> ")
        if not message:
            continue
        elif message == "quit":
            return
        stub.Broadcast(
            chat_pb2.BroadcastMessage(
                user=user,
                content=message
            )
        )


def main():
    """
    Run the chat client
    The listener is spawned in a thread because it can be exited via channel closure
    The post function is kept in the main thread because it is difficult to close a blocked thread (blocked by input())
    On ctrl-c, trigger the leave function, close the channel, and wait for the listener future to return
    """
    channel = grpc.insecure_channel("localhost:3000")
    stub = chat_pb2_grpc.ChatStub(channel)
    with concurrent.futures.ThreadPoolExecutor(1) as executor:
        future = executor.submit(listen, stub, args.name)
        try:
            post(stub, chat_pb2.User(name=args.name))
        except KeyboardInterrupt:
            pass
        finally:
            print("Leaving chat...")
            stub.Leave(chat_pb2.User(name=args.name))
            channel.close()
            future.result()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("-n", "--name", dest="name", type=str, required=True, help="username for sending messages")
    args = parser.parse_args()
    main()
