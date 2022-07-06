#!/bin/bash
./compile-dana.sh

docker build -t distributor:latest -f- . < distributor.Dockerfile
docker build -t remote-dist:latest -f- . < remotedist.Dockerfile
docker build -t server-ctl:latest -f- . < serverCTL.Dockerfile

docker tag distributor:latest andrepapoti/distributor:latest
docker tag remote-dist:latest andrepapoti/remote-dist:latest
docker tag server-ctl:latest andrepapoti/server-ctl:latest

docker push andrepapoti/server-ctl:latest 
docker push andrepapoti/distributor:latest 
docker push andrepapoti/remote-dist:latest 