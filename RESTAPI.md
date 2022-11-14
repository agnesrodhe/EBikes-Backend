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
