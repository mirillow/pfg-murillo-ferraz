type MyRequest = {
  method: string;
  headers: { "content-type": string };
  body?: string;
};

type RequestData = {
  id: number;
  request: any;
  sendTimeStamp: number;
  receivedTimeStamp?: number;
  response?: any;
};

const sleep = (ms: number): Promise<void> =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise((f) => setTimeout(f, ms));

const createRequest = (body: number): MyRequest => {
  const x = {
    method: body % 10 === 0 ? "POST" : "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: body % 10 === 0 ? `${body}` : undefined,
  };

  return x;
};

const logResponse = (data: RequestData): void => {
  console.log("## Success\n", data);
};

const executeRequests = async (): Promise<void> => {
  const numberOfRequests = 100;
  const delayBetweenRequests = 1000;
  const date = new Date();
  const requests: RequestData[] = [];
  for (let i = 0; i < 500; i += 1) {
    requests.push({
      id: i,
      request: createRequest(i),
      sendTimeStamp: date.getUTCMilliseconds(),
    });
  }

  // eslint-disable-next-line no-undef
  for (let i = 0; i < numberOfRequests; i += 1) {
    console.log("sending", i);
    fetch("http://34.121.242.204:5000", requests[i].request)
      .then((response) => {
        requests[i].receivedTimeStamp = date.getUTCMilliseconds();
        requests[i].response = response;
        logResponse(requests[i]);
      })
      .catch((error) => {
        console.error("Error on request", i, error, requests[i]);
      });

    // eslint-disable-next-line no-await-in-loop
    await sleep(delayBetweenRequests);
  }
};

executeRequests();
