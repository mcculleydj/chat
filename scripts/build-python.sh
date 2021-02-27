#!/bin/bash

CURRENTDIR=$(pwd)
BASEDIR=$(dirname "$0")
cd ${BASEDIR}/../py

python3 -m grpc_tools.protoc \
    --python_out=. \
    --grpc_python_out=. \
    -I../proto \
    ../proto/chat.proto

cd ${CURRENTDIR}