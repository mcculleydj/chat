package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net"
	"sync"
	"time"

	"github.com/mcculleydj/chat/pkg/proto"
	"google.golang.org/grpc"
)

type connection struct {
	stream  proto.Chat_JoinServer
	errChan chan error
}

type chatServer struct {
	connections map[string]*connection
	sync.Mutex
	proto.UnimplementedChatServer
}

var bot *proto.User

func init() {
	bot = &proto.User{Name: "ChatBot"}
}

func (s *chatServer) Join(u *proto.User, stream proto.Chat_JoinServer) error {
	errChan := make(chan error)
	// way to use defer and still perform bot broadcast safely here?
	s.Lock()
	if _, ok := s.connections[u.Name]; ok {
		s.Unlock()
		return errors.New("username already registered")
	}
	s.connections[u.Name] = &connection{stream, errChan}
	s.Unlock()
	// TODO: what to do with context?

	// TODO: what to do if this fails?
	s.Broadcast(context.Background(), &proto.Message{
		User:      bot,
		Content:   fmt.Sprintf("%s has joined...", u.Name),
		Timestamp: time.Now().Format("15:04:05"),
	})

	// will block until there is an error calling stream.Send()
	err := <-errChan

	// remove user from map if they can't be reached
	s.Leave(context.Background(), u)

	return err
}

func (s *chatServer) Broadcast(ctx context.Context, msg *proto.Message) (*proto.Ack, error) {
	// TODO: what to do with context?

	s.Lock()
	defer s.Unlock()
	for name, conn := range s.connections {
		go func(thisName string, thisConn *connection) {
			if thisName == msg.User.Name {
				return
			}
			err := thisConn.stream.Send(msg)
			if err != nil {
				fmt.Printf("error sending to %s: %v\n", thisName, err)
				thisConn.errChan <- err
			}
		}(name, conn)
	}

	// TODO: should this function return an error if .Send() generates an error
	// if it does not how does a client know that this message did not reach everyone?

	return &proto.Ack{}, nil
}

func (s *chatServer) Leave(ctx context.Context, u *proto.User) (*proto.Ack, error) {
	s.Lock()
	delete(s.connections, u.Name)
	s.Unlock()

	return s.Broadcast(context.Background(), &proto.Message{
		User:      bot,
		Content:   fmt.Sprintf("%s has left...", u.Name),
		Timestamp: time.Now().Format("15:04:05"),
	})
}

func main() {
	lis, err := net.Listen("tcp", "localhost:3000")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	// TODO: is NewServer() insecure by default? need to pass this in Node
	grpcServer := grpc.NewServer()
	server := &chatServer{connections: make(map[string]*connection)}
	proto.RegisterChatServer(grpcServer, server)

	// .Serve() is blocking until .Stop() or .GracefulStop() is called
	// .Serve() also returns an error
	grpcServer.Serve(lis)
}
