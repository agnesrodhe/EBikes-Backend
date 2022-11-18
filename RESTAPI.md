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
active
max-speed
speed
service-mode
battery
position
history
    user-id
    start-position
    stop-position
    stop-time
    start-time
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

## Cities
<details>
<summary>Attributes</summary>
<br>

```
id
name
parkinglots
    id
    position
    bikes
        id
chargestations
    id
    position
    bikes
        id
```
</details>