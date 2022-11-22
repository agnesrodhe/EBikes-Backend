## Customers
<details>
<summary>Attributes</summary>
<br>

```
id
email
first-name
last-name
balance
history
    id
    start-position
    stop-position
    stop-time
    start-time
    amount
```
</details>

<details>
<summary>Get all the customers</summary>
<br>

```
GET /v1/customers/
```

#### Result:
```
{
    "data": [
        {
            "id": 1,
            "email": "webikes@gmail.com",
            "first-name": "Webikes",
            "last-name": "Scooter",
            "balance": 300,
            "history": [
                {
                    "id": 1,
                    "start-position": ["57.632131", "18.289084"],
                    "stop-position": ["57.632614", "18.290736"],
                    "start-time": "2017-06-08T19:30:39+00:00",
                    "stop-time": "2017-06-08T19:45:00+00:00",
                    "amount": "25"
                },
                {
                    "id": 2,
                    "start-position": ["57.632131", "18.289084"],
                    "stop-position": ["57.632614", "18.290736"],
                    "start-time": "2017-06-08T11:30:39+00:00",
                    "stop-time": "2017-06-08T11:45:00+00:00",
                    "amount": "30"
                },
            ]
        },
        {
            "id": 2,
            "email": "test@gmail.com",
            "first-name": "Test",
            "last-name": "Testsson",
            "balance": 1000,
            "history": [
                {
                    "id": 1,
                    "start-position": ["57.632131", "18.289084"],
                    "stop-position": ["57.632614", "18.290736"],
                    "start-time": "2017-06-08T19:30:39+00:00",
                    "stop-time": "2017-06-08T19:45:00+00:00",
                    "amount": "40"
                }
            ]
        },
        ...
    ]
}
```
</details>

<details>
<summary>Get a specific customer</summary>
<br>

```
GET /v1/customers/{id}
```

#### Result:
```
{
    "data": {
        "id": 1,
        "email": "webikes@gmail.com",
        "first-name": "Webikes",
        "last-name": "Scooter",
        "balance": 300,
        "history": [
            {
                "id": 1,
                "start-position": ["57.632131", "18.289084"],
                "stop-position": ["57.632614", "18.290736"],
                "start-time": "2017-06-08T19:30:39+00:00",
                "stop-time": "2017-06-08T19:45:00+00:00",
                "amount": "25"
            },
            {
                "id": 2,
                "start-position": ["57.632131", "18.289084"],
                "stop-position": ["57.632614", "18.290736"],
                "start-time": "2017-06-08T11:30:39+00:00",
                "stop-time": "2017-06-08T11:45:00+00:00",
                "amount": "30"
            },
        ]
    }
}
```
</details>

<details>
<summary>Add a customer</summary>
<br>

```
POST /v1/customers/
```
#### Required parameters:
```
email
first-name
last-name
```

#### Optional parameters:
```
balance
history
```

#### Result:
```
BEHÖVER SES ÖVER - antingen hela kunden eller inget
```

</details>

## Bikes
<details>
<summary>Attributes</summary>
<br>

```
id
name
active
works
charging
maxspeed
speed
batterylevel
history
    userId
    startPosition
        type
        coordinates []
    stopPosition
        type
        coordinates []
    stopTime
    startTime
location
    type
    coordinates []
    id
inCity
```
</details>

<details>
<summary>Get all bikes</summary>
<br>

```
GET /v1/bikes/
```

#### Result:
```
[
    {
        "_id":"6378a9b4b16448f7cc1b0dab",
        "name":"Bike-0",
        "active":false,
        "works":true,
        "charging":false,
        "maxspeed":30,
        "speed":0,
        "batterylevel":100,
        "history":[],
        "location": {
            "type":"Point",
            "coordinates":[18.33498238846085,57.613584938373215],
            "_id":"6378a9b4b16448f7cc1b0dac"
        },
        "inCity":"6378989b6a6403d2a9c6edb2"
        },
        {
            "_id":"6378a9b9b16448f7cc1b0db2",
            "name":"Bike-1",
            "active":false,
            "works":true,
            "charging":false,
            "maxspeed":30,
            "speed":0,
            "batterylevel":100,
            "history":[],
            "location": {
                "type":"Point",
                "coordinates":[18.323780653590358,57.6251713328071],
                "_id":"6378a9b9b16448f7cc1b0db3"
                },
            "inCity":"6378989b6a6403d2a9c6edb2"
            },
            ...
```
</details>

<details>
<summary>Get a specific bike</summary>
<br>

```
GET /v1/bikes/{id}
```

#### Result:
```
[
    {
        "_id":"6378a9b4b16448f7cc1b0dab",
        "name":"Bike-0",
        "active":false,
        "works":true,
        "charging":false,
        "maxspeed":30,
        "speed":0,
        "batterylevel":100,
        "history":[],
        "location": {
            "type":"Point",
            "coordinates":[18.33498238846085,57.613584938373215],
            "_id":"6378a9b4b16448f7cc1b0dac"
        },
        "inCity":"6378989b6a6403d2a9c6edb2"
    }
]
```
</details>

## Prices
<details>
<summary>Attributes</summary>
<br>

```
id
startFee
penaltyFee
minuteTaxa
bonus
```
</details>

<details>
<summary>Get pricelist</summary>
<br>

```
GET /v1/prices/
```

#### Result:
```
{
    data: {
        "id": "1234567876543sw23r123v4n",
        "startFee": 10,
        "penaltyFee": 40,
        "minuteTaxa": 1.50,
        "bonus": 0
    }
}
```
</details>

<details>
<summary>Update pricelist</summary>
<br>

```
PUT /v1/prices/{id}
```

#### Required parameters:
```

```

#### Optional parameters:
```
VET EJ
```

#### Result:
```
{
    data: {
        "id": "1234567876543sw23r123v4n",
        "startFee": 10,
        "penaltyFee": 40,
        "minuteTaxa": 1.50,
        "bonus": 0
    }
}
```
</details>

## Cities
<details>
<summary>Attributes</summary>
<br>

```
id
name
location
    type
    coordinates []
    id
```
</details>

<details>
<summary>Get all cities</summary>
<br>

```
GET /v1/cities/
```

#### Result:
```
[
    {
        "_id":"6378989b6a6403d2a9c6edb1",
        "name":"Visby",
        "location": {
            "type":"Polygon",
            "coordinates": [
                [
                    [18.29249949427583,57.64387592528371],
                    [18.262487705224146,57.6091959939576],
                    [18.350071601600348,57.6110636569031],
                    [18.350071601600348,57.64387592528371],
                    [18.29249949427583,57.64387592528371]
                ]
            ],
            "_id":"6378989b6a6403d2a9c6edb2"
        },
        ...
    ]
```
</details>

<details>
<summary>Get a specific city</summary>
<br>

```
GET /v1/cities/{id}
```

#### Result:
```
[
    {
        "_id":"6378989b6a6403d2a9c6edb1",
        "name":"Visby",
        "location": {
            "type":"Polygon",
            "coordinates": [
                [
                    [18.29249949427583,57.64387592528371],
                    [18.262487705224146,57.6091959939576],
                    [18.350071601600348,57.6110636569031],
                    [18.350071601600348,57.64387592528371],
                    [18.29249949427583,57.64387592528371]
                ]
            ],
            "_id":"6378989b6a6403d2a9c6edb2"
        }
    ]
```
</details>

<details>
<summary>Add a city</summary>
<br>

```
POST /v1/cities/
```

#### Required parameters:
```
name
location
```

#### Result:
```
message: "New city created"
```
</details>

<details>
<summary>Delete a city (do not delete a city if you aren't sure you should)</summary>
<br>

```
DELETE /v1/cities/{id}
```

#### Required parameters:
```
id
```

#### Result:
```
-
```
</details>