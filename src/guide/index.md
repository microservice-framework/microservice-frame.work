---
title: The Microservice Framework
type: guide
order: 1
---

The Microservice Framework (mFW) is a powerful and simple way of building scalable and well performing microservice architecture. The corner stone of mFW is the mFW instance. Each individual mFW instance serves either one table or one type of data. By adding SEARCH among the CRUD verbs, mFW fills in the missing piece: managing complex search requests across API endpoints.

## Example 1: A Simple mFW Instance

<p class="tip">The code for this example is available <a href="https://github.com/microservice-framework/example-1">here</a>, on Github.</p>

In our first example, we'll demonstrate CRUDS. We'll create a simple mFW instance that manages the operations of database table called `record`.

To begin, install the mFW-cli globally via NPM.

```
npm install @microservice-framework/mfw-cli -g
```

Afterwards, initialize the application folder. The application folder is a bundle that contains all of your services.


```json
name:  Example-1
version:  (1.0.0)
Mongo URL:  (mongodb://localhost:27017/mfw)
Mongo Options (example: ?replicaSet=rs1&slaveOk=true):
	[ok]	/Volumes/DATA/gor/Sites/Repositories/GitHub/itpatrol/microservice/mfw-cli/2/services created.
	[ok]	/Volumes/DATA/gor/Sites/Repositories/GitHub/itpatrol/microservice/mfw-cli/2/pids created.
	[ok]	/Volumes/DATA/gor/Sites/Repositories/GitHub/itpatrol/microservice/mfw-cli/2/logs created.
	[ok]	/Volumes/DATA/gor/Sites/Repositories/GitHub/itpatrol/microservice/mfw-cli/2/configs created.
	[ok]	.gitignore copied
	[war]	/Volumes/DATA/gor/Sites/Repositories/GitHub/itpatrol/microservice/mfw-cli/2 already exists.
```

Once mFW is installed and the application folder is ready, we can install our example service. We can use files that are on NPM, GitHub, or are present locally. We'll use GitHub.

```json
mfw install github:microservice-framework/example-1 --save
	-	downloading example-1
	-	copiyng example-1 to /Volumes/DATA/gor/Sites/Repositories/GitHub/itpatrol/microservice/mfw-cli/2/services/example-1
	-	installing dependencies for example-1
Mongo URL:  (mongodb://localhost:27017/mfw)
Mongo Table:  (record)
Mongo prefix(db):  (example)
Mongo Options (example: ?replicaSet=rs1&slaveOk=true):
IP or hostname of the server:  (127.0.0.1)
Port:  (15001)
Number of workers:  (2)
Do not change:  (record.json)
SECURE_KEY:  (1597b760b89bbf2a6c70cebad6426cd868458e0669d01d44)
PID file path:  (../../pids/example-1.pid)
Log file path:  (../../logs/example-1.log)
	[ok]	github:microservice-framework/example-1 installed.
start service in debug mode
```

Once configured we can start the instance in development mode, which runs until we stop it.

```json
mfw start -d example-1
  -	starting example-1:start in devel mode
cluster:main Starting up 2 workers. +0ms
cluster:main Worker 9955 is online +68ms
cluster:main Worker 9956 is online +4ms
http:log Listen on :15001 +0ms
http:log Listen on :15001 +0ms
open new terminal and run tests:
```

Great -- the instance is active. The example includes some tests that will hit the different API end-points of our example instance. Open another terminal tab, panel, or window, then run the tests.

```json
cd test/services/example-1 && npm run test

> example-1@1.0.1 test /Volumes/DATA/gor/Sites/Repositories/GitHub/itpatrol/microservice/mfw-cli/2/services/example-1
> mocha  --timeout 15000



RECORD CRUD API
  ✓ POST should return 200 (102ms)
  ✓ SEARCH should return 200 (80ms)
  ✓ GET should return 200
  ✓ DELETE should return 200
  ✓ GET after delete should return nothing


5 passing (248ms)
```

In the other window where your instance is running, you should see the instance respond to the test's input.

```
http:log Request: POST: / +1m
http:debug Data: {"user":"example-user","body":"Example record body"} +5ms
microservice:validate Validate:requestDetails { url: '',
microservice:validate   headers:
microservice:validate    { accept: 'application/json',
microservice:validate      'user-agent': 'MicroserviceClient.1.0.1',
microservice:validate      signature: 'sha256=8cd4b6b01bb4a238720bafeed09efa5f9bf043dd8b061d240a833a11f5e1ca9a',
microservice:validate      host: '127.0.0.1:15001',
microservice:validate      'content-type': 'application/json',
microservice:validate      'content-length': '52',
microservice:validate      connection: 'close' },
microservice:validate   _buffer: '{"user":"example-user","body":"Example record body"}',
microservice:validate   method: 'POST' }  +3ms
microservice:validate Validate:SignatureSystem +4ms
http:debug Parsed data: { user: 'example-user', body: 'Example record body' } +1ms
http:debug Handler responce:
http:debug  { code: 200,
http:debug   answer:
http:debug    { user: 'example-user',
http:debug      body: 'Example record body',
http:debug      created: 1494780200312,
http:debug      changed: 1494780200312,
http:debug      token: 'e837d5b5e14c767057c4bbfb56aaa7cde46313f577d8b7b9',
http:debug      id: 591889281bbf3626e3777d5d } } +52ms
http:log Request: SEARCH: / +1m
http:debug Data: {"user":"example-user"} +4ms
microservice:validate Validate:requestDetails { url: '',
microservice:validate   headers:
microservice:validate    { accept: 'application/json',
microservice:validate      'user-agent': 'MicroserviceClient.1.0.1',
microservice:validate      signature: 'sha256=ca30653f44e4feda5bb1625619ae9a53adf010851310f078bdcb72aa462fcdbb',
microservice:validate      host: '127.0.0.1:15001',
microservice:validate      'content-type': 'application/json',
microservice:validate      'content-length': '23',
microservice:validate      connection: 'close' },
microservice:validate   _buffer: '{"user":"example-user"}',
microservice:validate   method: 'SEARCH' }  +3ms
microservice:validate Validate:SignatureSystem +4ms
http:debug Parsed data: { user: 'example-user' } +0ms
http:debug Handler responce:
http:debug  { code: 200,
http:debug   answer:
http:debug    [ { user: 'example-user',
http:debug        body: 'Example record body',
http:debug        created: 1494780200312,
http:debug        changed: 1494780200312,
http:debug        token: 'e837d5b5e14c767057c4bbfb56aaa7cde46313f577d8b7b9',
http:debug        id: 591889281bbf3626e3777d5d } ],
http:debug   headers: { 'x-total-count': 1 } } +54ms
http:log Request: GET: /591889281bbf3626e3777d5d +104ms
microservice:validate Validate:requestDetails { url: '591889281bbf3626e3777d5d',
microservice:validate   headers:
microservice:validate    { accept: 'application/json',
microservice:validate      'user-agent': 'MicroserviceClient.1.0.1',
microservice:validate      token: 'e837d5b5e14c767057c4bbfb56aaa7cde46313f577d8b7b9',
microservice:validate      host: '127.0.0.1:15001',
microservice:validate      connection: 'close' },
microservice:validate   _buffer: '',
microservice:validate   method: 'GET' }  +1ms
microservice:validate Validate:TokenSystem +0ms
http:debug Parsed data: {} +12ms
http:debug Handler responce:
http:debug  { code: 200,
http:debug   answer:
http:debug    { user: 'example-user',
http:debug      body: 'Example record body',
http:debug      created: 1494780200312,
http:debug      changed: 1494780200312,
http:debug      token: 'e837d5b5e14c767057c4bbfb56aaa7cde46313f577d8b7b9',
http:debug      id: 591889281bbf3626e3777d5d } } +5ms
http:log Request: DELETE: /591889281bbf3626e3777d5d +33ms
microservice:validate Validate:requestDetails { url: '591889281bbf3626e3777d5d',
microservice:validate   headers:
microservice:validate    { accept: 'application/json',
microservice:validate      'user-agent': 'MicroserviceClient.1.0.1',
microservice:validate      token: 'e837d5b5e14c767057c4bbfb56aaa7cde46313f577d8b7b9',
microservice:validate      host: '127.0.0.1:15001',
microservice:validate      'content-length': '0',
microservice:validate      connection: 'close' },
microservice:validate   _buffer: '',
microservice:validate   method: 'DELETE' }  +1ms
microservice:validate Validate:TokenSystem +0ms
http:debug Parsed data: {} +9ms
http:debug Handler responce:
http:debug  { code: 200,
http:debug   answer:
http:debug    { user: 'example-user',
http:debug      body: 'Example record body',
http:debug      created: 1494780200312,
http:debug      changed: 1494780200312,
http:debug      token: 'e837d5b5e14c767057c4bbfb56aaa7cde46313f577d8b7b9',
http:debug      id: 591889281bbf3626e3777d5d } } +5ms
http:log Request: GET: /591889281bbf3626e3777d5d +24ms
microservice:validate Validate:requestDetails { url: '591889281bbf3626e3777d5d',
microservice:validate   headers:
microservice:validate    { accept: 'application/json',
microservice:validate      'user-agent': 'MicroserviceClient.1.0.1',
microservice:validate      token: 'e837d5b5e14c767057c4bbfb56aaa7cde46313f577d8b7b9',
microservice:validate      host: '127.0.0.1:15001',
microservice:validate      connection: 'close' },
microservice:validate   _buffer: '',
microservice:validate   method: 'GET' }  +0ms
microservice:validate Validate:TokenSystem +0ms
microservice:validate MongoClient:findOneAndUpdate object not found. +3ms
http:debug Validation error: Not found +0ms
```

Hit `CTRL + C` to close the instance. We can also create instances as services which run in the background.

```json
mfw start example-1
  -	starting example-1:start
  [ok]	example-1:start started
```

Once running, you can check in on the status of the instance.

```json
mfw status
  -	checking example-1:status

  SERVICE    VERSION   PID   CPU    MEM    Comment
 -------------------------------------------------------
  example-1  1.0.1     9326  0.60   37
 -------------------------------------------------------
  1 / 0                      0.6 %  37 Mb
```

When it comes time to stop the service...

```shell
mfw stop example-1
  -	stopping example-1:stop
```

You have access to logging, too:

```shell
tail -f logs/example-1.log

Sun, 14 May 2017 16:45:24 GMT cluster:main Starting up 2 workers.
Sun, 14 May 2017 16:45:24 GMT cluster:main Worker 9978 is online
Sun, 14 May 2017 16:45:24 GMT cluster:main Worker 9977 is online
Sun, 14 May 2017 16:45:24 GMT http:log Listen on :15001
Sun, 14 May 2017 16:45:24 GMT http:log Listen on :15001
```

And finally, when you create an instance, a schema is created at `scehma/record.json`. When you specify your schema in this file, each `POST` request will be validated to match the specification. The schema for our example is:

```
{
  "id": "/Record",
  "type": "object",
  "properties": {
    "user": {
      "description": "Record username.",
      "type": "string",
      "required": true
    },
    "body": {
      "type": "string",
      "description": "Record body.",
      "required": true
    }
  }
}
```

## Example 2: POST/SEARCH Middleware

<p class="tip">The code for this example is available <a href="https://github.com/microservice-framework/example-2">here</a>, on Github.</p>

The first example was an exploration of a simple service using CRUDS on a mFW instance representing one table. Our second example demonstrates a mFW instance but with middleware applied to `POST` and `SEARCH`.

We'll initialize a directory...

```
mfw setup test
name:  Example-2
version:  (1.0.0)
Mongo URL:  (mongodb://localhost:27017/mfw)
Mongo Options (example: ?replicaSet=rs1&slaveOk=true):
	[ok]	/Users/admin/test/services created.
	[ok]	/Users/admin/test/logs created.
	[ok]	/Users/admin/test/pids created.
	[ok]	/Users/admin/test/configs created.
	[ok]	.gitignore copied
```

Afterwards, we can pull our code down from GitHub and install it as an instance.

```
mfw install github:microservice-framework/example-2 --save
	-	downloading example-2
	-	copiyng example-2 to /Users/admin/test/services/example-2
	-	installing dependencies for example-2
Mongo URL:  (mongodb://localhost:27017/mfw)
Mongo Table:  (record)
Mongo prefix(db):  (example)
Mongo Options (example: ?replicaSet=rs1&slaveOk=true):
IP or hostname of the server:  (127.0.0.1)
Port:  (15002)
Number of workers:  (2)
Do not change:  (record.json)
SECURE_KEY:  (c0748e3ded9bff02a9db7cc4b02877df1b5141d71355934d)
PID file path:  (../../pids/example-2.pid)
Log file path:  (../../logs/example-2.log)
	[ok]	github:microservice-framework/example-2 installed.
```

We'll want to start our service in development mode:

```
mfw start -d example-2
  -	starting example-2:start in devel mode
cluster:main Starting up 2 workers. +0ms
cluster:main Worker 10404 is online +68ms
cluster:main Worker 10405 is online +4ms
http:log Listen on :15002 +0ms
http:log Listen on :15002 +0ms
```

Open up another terminal and now let's run our test package:

```
cd test/services/example-2 && npm run test

> example-2@1.0.1 test /Users/admin/test/services/example-2
> mocha  --timeout 15000



  RECORD CRUD API
    ✓ POST record 1 should return 200 (124ms)
    ✓ POST record 2 should return 200 (103ms)
    ✓ POST record 2 should return 200 and previosly saved record
    ✓ SEARCH should return 200 (59ms)
    ✓ GET should record 1 return 200
    ✓ GET should record 2 return 200 (60ms)
    ✓ DELETE record1 should return 200
    ✓ DELETE record2 should return 200
    ✓ GET after delete should return nothing
    ✓ GET after delete should return nothing


  10 passing (439ms)
```

The terminal running your mFW instance will respond:

```
http:log Request: POST: / +1m
http:debug Data: {"user":"example-user","body":"Example record body","record_id":1} +3ms
microservice:validate Validate:requestDetails { url: '',
microservice:validate   headers:
microservice:validate    { accept: 'application/json',
microservice:validate      'user-agent': 'MicroserviceClient.1.0.1',
microservice:validate      signature: 'sha256=1c69cbf4b479e67990d714dce2da252baa4cb7c7ef9ceb92d50a02147f3b7a5e',
microservice:validate      host: '127.0.0.1:15002',
microservice:validate      'content-type': 'application/json',
microservice:validate      'content-length': '66',
microservice:validate      connection: 'close' },
microservice:validate   _buffer: '{"user":"example-user","body":"Example record body","record_id":1}',
microservice:validate   method: 'POST' }  +2ms
microservice:validate Validate:SignatureSystem +4ms
http:debug Parsed data: { user: 'example-user',
http:debug   body: 'Example record body',
http:debug   record_id: 1 } +1ms
microservice:search MongoClient:toArray object not found. +59ms
http:debug Handler responce:
http:debug  { code: 200,
http:debug   answer:
http:debug    { user: 'example-user',
http:debug      body: 'Example record body',
http:debug      record_id: 1,
http:debug      created: 1494783753927,
http:debug      changed: 1494783753927,
http:debug      token: 'd83ef602138324eb169d5aa4d397beba4811059e049cb2b1',
http:debug      id: 59189709e53e1828a43c7348 } } +19ms
http:log Request: POST: / +1m
http:debug Data: {"user":"example-user-2","body":"Example record body 2","record_id":2} +3ms
microservice:validate Validate:requestDetails { url: '',
microservice:validate   headers:
microservice:validate    { accept: 'application/json',
microservice:validate      'user-agent': 'MicroserviceClient.1.0.1',
microservice:validate      signature: 'sha256=12adf535c62ef422e307289adc561d841d524b5447375ffaf8c5b6880dccea99',
microservice:validate      host: '127.0.0.1:15002',
microservice:validate      'content-type': 'application/json',
microservice:validate      'content-length': '70',
microservice:validate      connection: 'close' },
microservice:validate   _buffer: '{"user":"example-user-2","body":"Example record body 2","record_id":2}',
microservice:validate   method: 'POST' }  +3ms
microservice:validate Validate:SignatureSystem +5ms
http:debug Parsed data: { user: 'example-user-2',
http:debug   body: 'Example record body 2',
http:debug   record_id: 2 } +1ms
microservice:search MongoClient:toArray object not found. +58ms
http:debug Handler responce:
http:debug  { code: 200,
http:debug   answer:
http:debug    { user: 'example-user-2',
http:debug      body: 'Example record body 2',
http:debug      record_id: 2,
http:debug      created: 1494783754046,
http:debug      changed: 1494783754046,
http:debug      token: 'b0d46acc8408348b769d9cc6f16a15fe445c6584963ea366',
http:debug      id: 5918970a21403d28a5148cb1 } } +15ms
http:log Request: POST: / +124ms
http:debug Data: {"user":"example-user","body":"Example record body","record_id":2} +1ms
microservice:validate Validate:requestDetails { url: '',
microservice:validate   headers:
microservice:validate    { accept: 'application/json',
microservice:validate      'user-agent': 'MicroserviceClient.1.0.1',
microservice:validate      signature: 'sha256=70cd1d2c533d9cded10cdd67919a36cee4eec1f4c58618b5dd2464b17a766b5a',
microservice:validate      host: '127.0.0.1:15002',
microservice:validate      'content-type': 'application/json',
microservice:validate      'content-length': '66',
microservice:validate      connection: 'close' },
microservice:validate   _buffer: '{"user":"example-user","body":"Example record body","record_id":2}',
microservice:validate   method: 'POST' }  +0ms
microservice:validate Validate:SignatureSystem +0ms
http:debug Parsed data: { user: 'example-user',
http:debug   body: 'Example record body',
http:debug   record_id: 2 } +1ms
http:debug Handler responce:
http:debug  { code: 200,
http:debug   answer:
http:debug    { user: 'example-user-2',
http:debug      body: 'Example record body 2',
http:debug      record_id: 2,
http:debug      created: 1494783754046,
http:debug      changed: 1494783754046,
http:debug      token: 'b0d46acc8408348b769d9cc6f16a15fe445c6584963ea366',
http:debug      id: 5918970a21403d28a5148cb1 },
http:debug   headers: { 'x-total-count': 1 } } +6ms
http:log Request: SEARCH: / +21ms
http:debug Data: {"body":{"$regex":"body","$options":"i"}} +1ms
microservice:validate Validate:requestDetails { url: '',
microservice:validate   headers:
microservice:validate    { accept: 'application/json',
microservice:validate      'user-agent': 'MicroserviceClient.1.0.1',
microservice:validate      signature: 'sha256=d757f5bc8cf5f334c488f228d488425a4bf6531a5988ec98f1f8bdac1bc76f74',
microservice:validate      host: '127.0.0.1:15002',
microservice:validate      'content-type': 'application/json',
microservice:validate      'content-length': '41',
microservice:validate      connection: 'close' },
microservice:validate   _buffer: '{"body":{"$regex":"body","$options":"i"}}',
microservice:validate   method: 'SEARCH' }  +0ms
microservice:validate Validate:SignatureSystem +43ms
http:debug Parsed data: { body: { '$regex': 'body', '$options': 'i' } } +0ms
http:debug Handler responce:
http:debug  { code: 200,
http:debug   answer:
http:debug    [ { user: [Object],
http:debug        body: 'Example record body',
http:debug        record_id: 1,
http:debug        created: 1494783753927,
http:debug        changed: 1494783753927,
http:debug        token: 'd83ef602138324eb169d5aa4d397beba4811059e049cb2b1',
http:debug        id: 59189709e53e1828a43c7348 },
http:debug      { user: [Object],
http:debug        body: 'Example record body 2',
http:debug        record_id: 2,
http:debug        created: 1494783754046,
http:debug        changed: 1494783754046,
http:debug        token: 'b0d46acc8408348b769d9cc6f16a15fe445c6584963ea366',
http:debug        id: 5918970a21403d28a5148cb1 } ],
http:debug   headers: { 'x-total-count': 2 } } +10ms
http:log Request: GET: /59189709e53e1828a43c7348 +64ms
microservice:validate Validate:requestDetails { url: '59189709e53e1828a43c7348',
microservice:validate   headers:
microservice:validate    { accept: 'application/json',
microservice:validate      'user-agent': 'MicroserviceClient.1.0.1',
microservice:validate      token: 'd83ef602138324eb169d5aa4d397beba4811059e049cb2b1',
microservice:validate      host: '127.0.0.1:15002',
microservice:validate      connection: 'close' },
microservice:validate   _buffer: '',
microservice:validate   method: 'GET' }  +0ms
microservice:validate Validate:TokenSystem +1ms
http:debug Parsed data: {} +6ms
http:debug Handler responce:
http:debug  { code: 200,
http:debug   answer:
http:debug    { user: 'example-user',
http:debug      body: 'Example record body',
http:debug      record_id: 1,
http:debug      created: 1494783753927,
http:debug      changed: 1494783753927,
http:debug      token: 'd83ef602138324eb169d5aa4d397beba4811059e049cb2b1',
http:debug      id: 59189709e53e1828a43c7348 } } +4ms
http:log Request: GET: /5918970a21403d28a5148cb1 +21ms
microservice:validate Validate:requestDetails { url: '5918970a21403d28a5148cb1',
microservice:validate   headers:
microservice:validate    { accept: 'application/json',
microservice:validate      'user-agent': 'MicroserviceClient.1.0.1',
microservice:validate      token: 'b0d46acc8408348b769d9cc6f16a15fe445c6584963ea366',
microservice:validate      host: '127.0.0.1:15002',
microservice:validate      connection: 'close' },
microservice:validate   _buffer: '',
microservice:validate   method: 'GET' }  +0ms
microservice:validate Validate:TokenSystem +46ms
http:debug Parsed data: {} +5ms
http:debug Handler responce:
http:debug  { code: 200,
http:debug   answer:
http:debug    { user: 'example-user-2',
http:debug      body: 'Example record body 2',
http:debug      record_id: 2,
http:debug      created: 1494783754046,
http:debug      changed: 1494783754046,
http:debug      token: 'b0d46acc8408348b769d9cc6f16a15fe445c6584963ea366',
http:debug      id: 5918970a21403d28a5148cb1 } } +6ms
http:log Request: DELETE: /59189709e53e1828a43c7348 +64ms
microservice:validate Validate:requestDetails { url: '59189709e53e1828a43c7348',
microservice:validate   headers:
microservice:validate    { accept: 'application/json',
microservice:validate      'user-agent': 'MicroserviceClient.1.0.1',
microservice:validate      token: 'd83ef602138324eb169d5aa4d397beba4811059e049cb2b1',
microservice:validate      host: '127.0.0.1:15002',
microservice:validate      'content-length': '0',
microservice:validate      connection: 'close' },
microservice:validate   _buffer: '',
microservice:validate   method: 'DELETE' }  +1ms
microservice:validate Validate:TokenSystem +0ms
http:debug Parsed data: {} +3ms
http:debug Handler responce:
http:debug  { code: 200,
http:debug   answer:
http:debug    { user: 'example-user',
http:debug      body: 'Example record body',
http:debug      record_id: 1,
http:debug      created: 1494783753927,
http:debug      changed: 1494783753927,
http:debug      token: 'd83ef602138324eb169d5aa4d397beba4811059e049cb2b1',
http:debug      id: 59189709e53e1828a43c7348 } } +7ms
http:log Request: DELETE: /5918970a21403d28a5148cb1 +17ms
microservice:validate Validate:requestDetails { url: '5918970a21403d28a5148cb1',
microservice:validate   headers:
microservice:validate    { accept: 'application/json',
microservice:validate      'user-agent': 'MicroserviceClient.1.0.1',
microservice:validate      token: 'b0d46acc8408348b769d9cc6f16a15fe445c6584963ea366',
microservice:validate      host: '127.0.0.1:15002',
microservice:validate      'content-length': '0',
microservice:validate      connection: 'close' },
microservice:validate   _buffer: '',
microservice:validate   method: 'DELETE' }  +0ms
microservice:validate Validate:TokenSystem +1ms
http:debug Parsed data: {} +3ms
http:debug Handler responce:
http:debug  { code: 200,
http:debug   answer:
http:debug    { user: 'example-user-2',
http:debug      body: 'Example record body 2',
http:debug      record_id: 2,
http:debug      created: 1494783754046,
http:debug      changed: 1494783754046,
http:debug      token: 'b0d46acc8408348b769d9cc6f16a15fe445c6584963ea366',
http:debug      id: 5918970a21403d28a5148cb1 } } +9ms
http:log Request: GET: /59189709e53e1828a43c7348 +19ms
microservice:validate Validate:requestDetails { url: '59189709e53e1828a43c7348',
microservice:validate   headers:
microservice:validate    { accept: 'application/json',
microservice:validate      'user-agent': 'MicroserviceClient.1.0.1',
microservice:validate      token: 'd83ef602138324eb169d5aa4d397beba4811059e049cb2b1',
microservice:validate      host: '127.0.0.1:15002',
microservice:validate      connection: 'close' },
microservice:validate   _buffer: '',
microservice:validate   method: 'GET' }  +0ms
microservice:validate Validate:TokenSystem +0ms
microservice:validate MongoClient:findOneAndUpdate object not found. +3ms
http:debug Validation error: Not found +0ms
http:log Request: GET: /5918970a21403d28a5148cb1 +12ms
microservice:validate Validate:requestDetails { url: '5918970a21403d28a5148cb1',
microservice:validate   headers:
microservice:validate    { accept: 'application/json',
microservice:validate      'user-agent': 'MicroserviceClient.1.0.1',
microservice:validate      token: 'b0d46acc8408348b769d9cc6f16a15fe445c6584963ea366',
microservice:validate      host: '127.0.0.1:15002',
microservice:validate      connection: 'close' },
microservice:validate   _buffer: '',
microservice:validate   method: 'GET' }  +0ms
microservice:validate Validate:TokenSystem +0ms
microservice:validate MongoClient:findOneAndUpdate object not found. +8ms
http:debug Validation error: Not found +1ms
```

Just like before, you can run `mfw start` without `-d` to start it as a service, get the `status`, and `stop`, and check the logs in `logs/example-2`.