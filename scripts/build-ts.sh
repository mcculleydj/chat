#!/bin/bash

BASEDIR=$(dirname "$0")
cd ${BASEDIR}/../node-ts

# JavaScript code generation
npx grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=grpc_js:. \
    --js_out=import_style=commonjs,binary:. \
    --grpc_out=grpc_js:. \
    -I ../proto \
    ../proto/chat.proto