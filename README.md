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
nombre: String,
telefono: Number,
domicilio: String
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

## `POST /usuarios`
```json
{
    "email": "admin",
    "password": "admin"
    "role": ["user"/"vet"],
    "telefono": 12345,
    "domicilio": "asdasd"
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
        "role": "vet"
    }
}
```
## `GET /usuarios/:id/mascotas`
 Obtener mascotas del usuario id.
## `POST /usuarios/:id/mascotas`
Agregar mascota al sistema asociado al usuario id.
## `GET /mascotas`
Lista de todas las mascotas

## `GET /me`
Perfil del usuario conectado
```json
{
  "_id": "5beac89abe69d731bc098b37",
  "role": "vet",
  "email": "vet",
  "nombre": "veterinarioski",
  "createdAt": "2018-11-13T12:50:34.925Z",
  "updatedAt": "2018-11-13T12:50:34.925Z",
  "__v": 0,
  "mascotas": [
    {
      "_id": "5beba19fbbd6773874e6169f",
      "nombre": "Martín",
      "nacimiento": 3234,
      "raza": "Humano",
      "dueno": "5beac89abe69d731bc098b37",
      "__v": 0
    }
  ]
}
```