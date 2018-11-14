# API

## Modelos
### Usuario
```json
email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
},
password: {
    type: String,
    required: true
},
role: {
    type: String,
    enum: ['user', 'vet'],
    default: 'user'
},
nombre: String
```
### Mascota
```
nombre: {type: String, required: true},
nacimiento: Number,
raza: String,
dueno: {type: Schema.Types.ObjectId, ref: 'User', required: true},
```

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
## `GET /usuarios/:id/mascotas`
 Obtener mascotas del usuario id.
## `POST /usuarios/:id/mascotas`
Agregar mascota al sistema asociado al usuario id.
## `GET /mascotas`
Lista de todas las mascotas