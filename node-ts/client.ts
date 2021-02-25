import * as grpc from '@grpc/grpc-js'
import minimist from 'minimist'
import { createInterface } from 'readline'
import { ChatClient } from './chat_grpc_pb'
import { User, BroadcastMessage, SendMessage } from './chat_pb'

const argv = minimist(process.argv.slice(2))
const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
})

const client = new ChatClient(
  'localhost:3000',
  grpc.credentials.createInsecure()
)

function listen(stream: grpc.ClientReadableStream<BroadcastMessage>) {
  stream.on('data', (msg: BroadcastMessage) => {
    process.stdout.write(
      `\r${msg
        .getUser()
        ?.getName()} | ${msg.getTimestamp()} - ${msg.getContent()}\n> `
    )
  })
  stream.on('error', (err: grpc.ServiceError) => {
    if (err.details.includes('username already registered')) {
      console.log('username already registered')
    } else {
      console.log(err)
    }
    process.exit()
  })
  stream.on('end', () => {
    console.log('server closed the connection')
    process.exit()
  })
}

function talk(user: User): Promise<void> {
  return new Promise((res, rej) => {
    // rej is called with ServiceError and string
    // that's probably an anti-pattern
    readline.question('> ', (content: string) => {
      if (content === 'quit') {
        client.leave(user, err => {
          if (err) rej(err)
          else rej('Leaving chat...')
        })
      } else {
        const msg = new SendMessage()
        msg.setUser(user)
        msg.setContent(content)
        client.broadcast(msg, err => {
          if (err) rej(err)
          else res()
        })
      }
    })
  })
}

async function talkLoop(user: User): Promise<void> {
  while (true) {
    try {
      await talk(user)
    } catch (err) {
      readline.close()
      console.log(err)
      process.exit()
    }
  }
}

async function main(): Promise<void> {
  if (!argv.n) {
    console.log('must provide a username with -n')
    process.exit()
  }

  // the following line works with @ts-ignore:
  // const user = new User([argv.n])

  // for some reason the constructors for message classes
  // are not expecting this argument even though it's a valid way
  // to initialize the message

  // see line 52 of chat_pb.js
  // you should be able to pass an array of initial values
  // where index corresponds the enumeration in the .proto file
  // my guess is that supporting any[] was more trouble than it was worth

  const user = new User()
  user.setName(argv.n)
  const stream: grpc.ClientReadableStream<BroadcastMessage> = client.join(user)
  listen(stream)
  await talkLoop(user)
}

if (require.main === module) {
  main()
}
