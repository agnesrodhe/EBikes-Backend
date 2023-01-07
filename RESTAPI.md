# WEBIKES API DOCUMENTATION

<p>Hello! If you find your way here you are problaby in the Ebike Buisness and looking for a reliable, safe and structured API? Well you have come to the right place!</p>
<p>WEBIKE offer a firstclass, high preformance API with middleware, OAuth Authentication and JWT tokens stored in cookies for a safe and secure experience</p>

## API USAGE

<p>This API is perfect for a E-bike company or any other rental companys looking to release their app/website in a city. You get endpoints like creating vehicles, adding users, updating cites, parkingspots and chargestation etc.</p>
<p>This API is build in Node and Express and is independent from any client/app/frontend.</p>
<p>Which means you can choose whatever languge that fits you.</p>

## VERSION

<p> This API is currently on V1. Anyone reading this and choose our API will be using the V1 API.</p>

## TERMS OF USE

<p>By using our API you must also accept our terms of use. WEBIKES API can be used for both training purposes (developers) and for rental companies, with only one big term, RESPECT the Api and use it for good purposes only. </p>

## Authentication

<p>Our API uses both OAUTH 2.0 for sign in with github and authentication in the form of JWT token. Most of our routes are secured with middlewares, meaning you need a valid JWT token set as a cookie to be able to pass through the middleware and to the endpoint. The Cookie will only be set once you logged in with our API's login system or through Github OAuth</p>

## TESTS

<p>All of our routes is tested with JEST and Supertest, to guarantee no un expected errors will occur. Our API have over 70 % code coverage<p>



## Users
<details>
<summary>ATTRIBUTES</summary>
<br>

```
id
username
password
firstName
lastName
balance
history
    id
    startPosition
    stopPosition
    stopTime
    startTime
    duration
    cost
role
```
</details>

<details>
<summary>GET users</summary>
<br>

```
 :lock: GET /v1/user/all
```

#### Result:
```
[{
        "_id": "6389d350bbeeb6178a63d732",
        "username": "admin",
        "password": "bcryptopassssssss",
        "role": "admin",
        "history": 
        [
            {
                "bikeId": "6389ffaf8ecea7a848d9eef2",
                "city": "Borlänge",
                "startTime": "2022-12-16T08:13:20.276Z",
                "stopTime": "2022-12-16T08:13:39.269Z",
                "startPosition": [
                    15.397272229871758,
                    60.482947515232176
                ],
                "stopPosition": [
                    15.397272229871758,
                    60.482947515232176
                ],
                "duration": {
                    "minutes": "0",
                    "seconds": "19"
                },
                "cost": "10.45"
            }
        ]
}]
```
</details>

<details>
<summary>GET ONE User</summary>
<br>

```
:lock: GET /v1/customers/{id}
```

#### Result:
```
{
    "_id": "6389d350bbeeb6478a63d732",
    "username": "xxx",
    "password": "xxx",
    "role": "admin",
    "history": [
        {
            "bikeId": "6389ffaf8ecea7a848d9eef2",
            "city": "Borlänge",
            "startTime": "2022-12-16T08:13:20.276Z",
            "stopTime": "2022-12-16T08:13:39.269Z",
            "startPosition": [
                15.397272229871758,
                60.482947515232176
            ],
            "stopPosition": [
                15.397272229871758,
                60.482947515232176
            ],
            "duration": {
                "minutes": "0",
                "seconds": "19"
            },
            "cost": "10.45"
        }
        ]
        
}
```
</details>

<details>
<summary>POST Register user</summary>
<br>

```
POST /v1/user/signup
```
#### Required parameters:
```
username
password
```

#### Result:
```
{
    "_id": "63ae7bfa0b77846013569b2a",
    "username": "nnnnnn",
    "token": "jwttoken",
    "logIn": "success",
    "role": "customer"
}
```

</details>

<details>
<summary>POST User Sign In</summary>
<br>

```
POST /v1/user/signin
```
#### Required parameters:
```
username
password
```

#### Result:
```
{
    "_id": "63ae7bfa0b77846013569b2a",
    "username": "nnnnnn",
    "token": "jwttoken",
    "logIn": "success",
    "role": "customer"
}
```

</details>

<details>
<summary>PUT Update User</summary>
<br>

```
:lock: PUT /v1/user/{id}
```
#### Optional parameters:
```
username,
firstName,
lastName,
balance,
password,
role,
gitHubId,
history

```

#### Exampel:
```
{
    username: "maria"
}

```

#### Result:
```
{
    "_id": "63ae7bfa0b77846013569b2f",
    "username": "maria",
    "password": "jwttoken",
    "role": "customer",
    "history": [],
    "firstName": "maria"
}
```

</details>

<details>
<summary>DEL user</summary>
<br>

```
 :lock: DELETE /v1/user/{id}
```

#### Result:
```
Status Code: 204 No Content
```

</details>

## Bikes
<details>
<summary>ATTRIBUTES</summary>
<br>

```
id
name
active
status
charging
parked
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
Goal
```
</details>

<details>
<summary>GET all bikes</summary>
<br>

```
GET /v1/bikes/
```

#### Result:
```
[
    {
        "_id": "63a266684a667e3353187e46",
        "name": "Bolängebike-update",
        "active": null,
        "status": "working",
        "charging": null,
        "parked": "6389bb5d54dc36eb434c062b",
        "maxspeed": 30,
        "speed": 0,
        "batterylevel": 99,
        "history": [],
        "location": {
            "type": "Point",
            "coordinates": [
                15.445841809505339,
                60.47697963120132
            ],
            "_id": "63a266684a667e3353187e47"
        },
        "inCity": "637e2a5a22f175ffd136d0d7",
    },
    {
        "_id": "63a2666c4a667e3353187e4d",
        "name": "BorlängeBike-2",
        "active": null,
        "status": "working",
        "charging": null,
        "parked": "6389bb5d54dc36eb434c062b",
        "maxspeed": 30,
        "speed": 0,
        "batterylevel": 100,
        "history": [],
        "location": {
            "type": "Point",
            "coordinates": [
                15.445841809505339,
                60.47697963120132
            ],
            "_id": "63a2666c4a667e3353187e4e"
        },
        "inCity": "637e2a5a22f175ffd136d0d7",
    }, ... ]
   
```
</details>

<details>
<summary>GET ONE bike</summary>
<br>

```
GET /v1/bikes/{bikeId}
```

#### Result:
```
{
    "_id": "63a2666d4a667e3353187e55",
    "name": "BorlängeBike-4",
    "active": null,
    "status": "working",
    "charging": null,
    "parked": "6389bb5d54dc36eb434c062b",
    "maxspeed": 30,
    "speed": 0,
    "batterylevel": 100,
    "history": [],
    "location": {
        "type": "Point",
        "coordinates": [
            15.445841809505339,
            60.47697963120132
        ],
        "_id": "63a2666d4a667e3353187e56"
    },
    "inCity": "637e2a5a22f175ffd136d0d7",

}
```
</details>

<details>
<summary>GET all bikes in a specific city</summary>
<br>

```
GET /v1/bikes/city/{cityId}
```

#### Result:
```
[
    {
        "_id": "63a2666d4a667e3353187e55",
        "name": "BorlängeBike-4",
        "active": null,
        "status": "working",
        "charging": null,
        "parked": "6389bb5d54dc36eb434c062b",
        "maxspeed": 30,
        "speed": 0,
        "batterylevel": 100,
        "history": [],
        "location": {
            "type": "Point",
            "coordinates": [
                15.445841809505339,
                60.47697963120132
            ],
            "_id": "63a2666d4a667e3353187e56"
        },
        "inCity": "637e2a5a22f175ffd136d0d7",
        "__v": 0
    }
        ...]
```
</details>

<details>
<summary>GET all non-active bikes in a specific city</summary>
<br>

```
GET /v1/bikes/city/{cityId}/nonActive
```

#### Result:
```
[
    {
        "_id": "63a2666d4a667e3353187e55",
        "name": "BorlängeBike-4",
        "active": null,
        "status": "working",
        "charging": null,
        "parked": "6389bb5d54dc36eb434c062b",
        "maxspeed": 30,
        "speed": 0,
        "batterylevel": 100,
        "history": [],
        "location": {
            "type": "Point",
            "coordinates": [
                15.445841809505339,
                60.47697963120132
            ],
            "_id": "63a2666d4a667e3353187e56"
        },
        "inCity": "637e2a5a22f175ffd136d0d7",
        "__v": 0
    }
        ...]
```
</details>

<details>
<summary>Get all active bikes in specific city</summary>
<br>

```
GET /v1/bikes/city/{cityId}/active
```

#### Result:
```
[
    {
        "_id": "63a2666d4a667e3353187e55",
        "name": "BorlängeBike-4",
        "active": "54a2556d4a667e3353187e99",
        "status": "working",
        "charging": null,
        "parked": "6389bb5d54dc36eb434c062b",
        "maxspeed": 30,
        "speed": 0,
        "batterylevel": 100,
        "history": [],
        "location": {
            "type": "Point",
            "coordinates": [
                15.445841809505339,
                60.47697963120132
            ],
            "_id": "63a2666d4a667e3353187e56"
        },
        "inCity": "637e2a5a22f175ffd136d0d7",
        "__v": 0
    }
        ...]
```
</details>

<details>
<summary>POST create bike</summary>
<br>

```
POST /v1/bikes
```

#### Optional parameters:
```
name
active
status
charging
parked
maxspeed
speed
batterylevel
location
    type
    coordinates []
inCity
goal
```

#### Result:
```
{
        "_id": "63a266aeac0012250686b380",
        "name": "BorlängeBike-18",
        "active": null,
        "status": "working",
        "charging": null,
        "parked": "6389bb5d54dc36eb434c062b",
        "maxspeed": 30,
        "speed": 30,
        "batterylevel": 90,
        "history": [],
        "location": {
            "type": "Point",
            "coordinates": [
                15.445841809505339,
                60.47697963120132
            ],
            "_id": "63a266aeac0012250686b381"
        },
        "inCity": "637e2a5a22f175ffd136d0d7",
    }
```
</details>

<details>
<summary>PUT update a specific bike</summary>
<br>

```
PUT /v1/bikes/{bikeId}
```

#### Optional parameters:
```
name
active
status
charging
parked
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
inCity
goal
```

#### Exampel:
```
{
    speed: 30
}

```

#### Result:
```
{
        "_id": "63a266aeac0012250686b380",
        "name": "BorlängeBike-18",
        "active": null,
        "status": "working",
        "charging": null,
        "parked": "6389bb5d54dc36eb434c062b",
        "maxspeed": 30,
        "speed": 30,
        "batterylevel": 90,
        "history": [],
        "location": {
            "type": "Point",
            "coordinates": [
                15.445841809505339,
                60.47697963120132
            ],
            "_id": "63a266aeac0012250686b381"
        },
        "inCity": "637e2a5a22f175ffd136d0d7",
    }
```
</details>

<details>
<summary>DEL bike</summary>
<br>

```
 DELETE /v1/bikes
```

#### Result:
```
Status Code: 204 No Content
```

</details>

## Charge Stations
<details>
<summary>ATTRIBUTES</summary>
<br>

```
id
name
location
    type
    cordinates []
inCity
```
</details>
<details>
<summary>GET All chargestations</summary>
<br>

 :lock:
```
 GET /v1/chargestations
```
#### Result:
```
[
    {
        "_id": "6389c2afc91d95b9359c65td",
        "name": "BorlängeChargeSt-1",
        "location": {
            "type": "Point",
            "coordinates": [
                15.38155740293545,
                60.502827272149624
            ],
            "_id": "6389c2afc91d95b9359c65de"
        },
        "inCity": "637e2a5a22f175ffd136d0d7"
    }... ]
```
</details>

<details>
<summary>GET All chargestations IN City</summary>
<br>

```
 :lock: GET /v1/chargestations/city/{cityId}
```
#### Result:
```
[
    {
        "_id": "6389c2afc91d95b9359c65td",
        "name": "BorlängeChargeSt-1",
        "location": {
            "type": "Point",
            "coordinates": [
                15.38155740293545,
                60.502827272149624
            ],
            "_id": "6389c2afc91d95b9359c65de"
        },
        "inCity": "637e2a5a22f175ffd136d0d7"
    }... ]
```
</details>

<details>
<summary>GET One chargestation</summary>
<br>

```
 :lock: GET /v1/chargestations/{id}
```
#### Result:
```
[
    {
        "_id": "6389c2afc91d95b9359c65td",
        "name": "BorlängeChargeSt-1",
        "location": {
            "type": "Point",
            "coordinates": [
                15.38155740293545,
                60.502827272149624
            ],
            "_id": "6389c2afc91d95b9359c65de"
        },
        "inCity": "637e2a5a22f175ffd136d0d7"
    }... ]
```
</details>

<details>
<summary>POST Create chargestation</summary>
<br>

```
 :lock: POST /v1/chargestations/
```
#### Required parameters:
```
name
location
    type
    coordinates []
inCity

```
#### Result:
```
    {
        "_id": "6389c2afc91d95b9359c65td",
        "name": "BorlängeChargeSt-1",
        "location": {
            "type": "Point",
            "coordinates": [
                15.38155740293545,
                60.502827272149624
            ],
            "_id": "6389c2afc91d95b9359c65de"
        },
        "inCity": "637e2a5a22f175ffd136d0d7"
    }
```
</details>

<details>
<summary>PUT Update chargestation</summary>
<br>

```
 :lock: PUT /v1/chargestations/{id}
```
#### Optional parameters:
```
name
location
    type
    coordinates []
inCity

```

#### Exampel

```
{
    name: "updated name"
}
```

#### Result:
```
    {
        "_id": "6389c2afc91d95b9359c65cd",
        name: "updated name",
        "location": {
            "type": "Point",
            "coordinates": [
                15.38155740293545,
                60.502827272149624
            ],
            "_id": "6389c2afc91d95b9359c65de"
        },
        "inCity": "637e2a5a22f175ffd136d0d7"
    }
```
</details>

## Parking
<details>
<summary>ATTRIBUTES</summary>
<br>

```
id
name
location
    type
    cordinates []
inCity
```
</details>
<details>
<summary>GET All parking</summary>
<br>

```
 :lock: GET /v1/parking
```
#### Result:
```
[
    {
        "_id": "6389c2afc91d95b9359cdetd",
        "name": "BorlängeParking-1",
        "location": {
            "type": "Point",
            "coordinates": [
                15.38155740293545,
                60.502827272149624
            ],
            "_id": "6389c2afc91d95b9359c65de"
        },
        "inCity": "637e2a5a22f175ffd136d0d7"
    }... ]
```
</details>

<details>
<summary>GET All parking IN City</summary>
<br>

```
 :lock: GET /v1/parking/city/{cityId}
```
#### Result:
```
[
    {
        "_id": "6389c2afc91d95b9359ddetd",
        "name": "BorlängeParking-1",
        "location": {
            "type": "Point",
            "coordinates": [
                15.38155740293545,
                60.502827272149624
            ],
            "_id": "6389c2afc91d95b9359c65de"
        },
        "inCity": "637e2a5a22f175ffd136d0d7"
    }... ]
```
</details>

<details>
<summary>GET One Parking</summary>
<br>

```
 :lock: GET /v1/parking/{id}
```
#### Result:
```
[
    {
        "_id": "6389c2afc91d95b9359c65td",
        "name": "BorlängeChargeSt-1",
        "location": {
            "type": "Point",
            "coordinates": [
                15.38155740293545,
                60.502827272149624
            ],
            "_id": "6389c2afc91d95b9359c65de"
        },
        "inCity": "637e2a5a22f175ffd136d0d7"
    }... ]
```
</details>

<details>
<summary>POST Create parking</summary>
<br>

```
 :lock: POST /v1/parking
```
#### Required parameters:
```
name
location
    type
    coordinates []
inCity

```
#### Result:
```
    {
        "_id": "6389c2afc91d95b9359c65td",
        "name": "BorlängeParking-1",
        "location": {
            "type": "Point",
            "coordinates": [
                15.38155740293545,
                60.502827272149624
            ],
            "_id": "6389c2afc91d95b9359c65de"
        },
        "inCity": "637e2a5a22f175ffd136d0d7"
    }
```
</details>

<details>
<summary>PUT Update Parking</summary>
<br>

```
 :lock: PUTT /v1/parking/{id}
```
#### Optional parameters:
```
name
location
    type
    coordinates []
inCity

```

#### Exampel

```
{
    name: "updated name"
}
```

#### Result:
```
    {
        "_id": "6389c2afc91d95b9359c65cd",
        name: "updated name",
        "location": {
            "type": "Point",
            "coordinates": [
                15.38155740293545,
                60.502827272149624
            ],
            "_id": "6389c2afc91d95b9359c65de"
        },
        "inCity": "637e2a5a22f175ffd136d0d7"
    }
```
</details>


## Prices
<details>
<summary>ATTRIBUTES</summary>
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
<summary>PUT Update pricelist</summary>
<br>

```
PUT /v1/prices/{id}
```

#### Optional parameters:
```
id
startFee
penaltyFee
minuteTaxa
bonus

```

#### Exampel 
```
{
    MinuteTaxa: 2
}
```

#### Result:
```
{
    "id": "1234567876543sw23r123v4n",
    "startFee": 10,
    "penaltyFee": 40,
    "minuteTaxa": 2,
    "bonus": 0
}

```
</details>

## Cities
<details>
<summary>ATTRIBUTES</summary>
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
<summary>GET all cities</summary>
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
<summary>GET ONE city</summary>
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
StatusCode: 204 No content
```
</details>