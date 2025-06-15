#!/bin/bash
./scripts/compile-dana.sh

docker build . -t docker.io/murilloff/distributor -f app/distributor.Dockerfile
docker build . -t docker.io/murilloff/remote-dist -f app/remotedist.Dockerfile
docker build . -t docker.io/murilloff/server-ctl -f server-ctl/serverCTL.Dockerfile

docker push docker.io/murilloff/server-ctl:latest 
docker push docker.io/murilloff/distributor:latest 
docker push docker.io/murilloff/remote-dist:latest 

# docker build . -t andrepapoti/distributor -f ../app/distributor.Dockerfile
# docker build . -t andrepapoti/remote-dist -f ../app/remotedist.Dockerfile
# docker build . -t andrepapoti/server-ctl -f ../server-ctl/serverCtl.Dockerfile

# docker push andrepapoti/server-ctl:latest 
# docker push andrepapoti/distributor:latest 
# docker push andrepapoti/remote-dist:latest 

