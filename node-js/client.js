const path = require('path')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const argv = require('minimist')(process.argv.slice(2))
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
})

const PROTO_PATH = path.join(__dirname, '..', 'proto', 'chat.proto')

// TODO: review protoLoader options
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

const { chat: proto } = grpc.loadPackageDefinition(packageDefinition)
const stub = new proto.Chat('localhost:3000', grpc.credentials.createInsecure())

function listen(stream) {
  stream.on('data', ({ user, content, timestamp }) => {
    process.stdout.write(`\r${user.name} | ${timestamp} - ${content}\n> `)
  })
  stream.on('error', err => {
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

function talk(user) {
  return new Promise((res, rej) => {
    readline.question('> ', content => {
      if (content === 'quit') {
        stub.leave(user, err => {
          if (err) rej(err)
          else rej('Leaving chat...')
        })
      } else {
        stub.broadcast({ user, content }, err => {
          if (err) rej(err)
          else res()
        })
      }
    })
  })
}

async function talkLoop(user) {
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

async function main() {
  if (!argv.n) {
    console.log('must provide a username with -n')
    process.exit()
  }
  const user = { name: argv.n }
  const stream = stub.join(user)
  listen(stream)
  await talkLoop(user)
}

if (require.main === module) {
  main()
}
