# API

## Endpoints
Todos empiezan con /api

## `POST /register`
```json
{
    "email": "admin",
    "password": "admin"
    "role": ["usuario"/"veterinario"]
}

```
## `POST /login`

```json
{
    "email": "admin",
    "password": "admin"
}
```
Output:
```json
{
    "token": "xxxxxxxxxxxxxxxxxx",
    "user": {
        "_id": "5be8c95dca6a824194b9a146",
        "email": "admin",
        "role": "veterinario"
    }
}
```
