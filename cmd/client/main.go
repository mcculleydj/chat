package main

import (
	"bufio"
	"context"
	"errors"
	"flag"
	"fmt"
	"io"
	"log"
	"os"
	"strings"
	"time"

	"github.com/mcculleydj/chat/pkg/proto"

	"google.golang.org/grpc"
)

func listen(stream proto.Chat_JoinClient, errChan chan error) {
	for {
		msg, err := stream.Recv()
		if err == io.EOF {
			log.Println("connection terminated by server")
			errChan <- err
			return
		}
		if err != nil {
			// TODO: look into grpc status lib for better error handling
			if strings.Contains(err.Error(), "username already registered") {
				errChan <- errors.New("username already registered")
				return
			}
			log.Println("error receiving msg:", err.Error())
			errChan <- err
			return
		}
		fmt.Printf("%s | %s - %s\n", msg.User.Name, msg.Timestamp, msg.Content)
	}
}

func talk(client proto.ChatClient, user *proto.User, errChan chan error) {
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		if scanner.Text() == "quit" {
			_, err := client.Leave(context.Background(), user)
			if err != nil {
				errChan <- err
				return
			}
			errChan <- errors.New("")
			return
		}

		_, err := client.Broadcast(context.Background(), &proto.Message{
			User:      user,
			Content:   scanner.Text(),
			Timestamp: time.Now().Format("15:04:05"),
		})
		if err != nil {
			log.Println("error sending msg:", err.Error())
			errChan <- err
		}
	}
}

func main() {
	name := flag.String("n", "", "username")
	flag.Parse()
	if *name == "" {
		log.Fatal("must supply a username with the -n flag")
	}

	// WithBlock blocks until the underlying connection is up.
	// Otherwise Dial returns immediately and connecting to the server happens in background.
	conn, err := grpc.Dial("localhost:3000", grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatal(err.Error())
	}
	defer conn.Close()

	client := proto.NewChatClient(conn)
	user := &proto.User{Name: *name}
	errChan := make(chan error)

	stream, err := client.Join(context.Background(), user)
	if err != nil {
		log.Fatal(err.Error())
	}

	go listen(stream, errChan)
	go talk(client, user, errChan)

	err = <-errChan
	if err.Error() == "" {
		fmt.Println("Leaving chat...")
	} else {
		fmt.Println(err.Error())
	}
}
