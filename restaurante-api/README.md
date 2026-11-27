# Restaurante API

API REST desarrollada con Node.js, Express y MongoDB para gestionar restaurantes y sus pedidos mediante operaciones CRUD.

El proyecto implementa una relación de uno a muchos (1:N), donde un restaurante puede tener múltiples pedidos y cada pedido puede contener varios productos.

## 1. Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Nodemon
- JavaScript con ES Modules

## 2. Requisitos previos

Para ejecutar el proyecto se necesita:

- Node.js instalado.
- npm instalado.
- MongoDB instalado y en ejecución, o una instancia de MongoDB Atlas.
- Git para clonar el repositorio.

## 3. Instalación y configuración

### Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### Entrar a la carpeta del proyecto

```bash
cd restaurante-api
```

### Instalar las dependencias

```bash
npm install
```

### Configurar las variables de entorno

Crear el archivo `.env` utilizando la plantilla `.env.example`.

En PowerShell:

```powershell
Copy-Item .env.example .env
```

Configurar el archivo `.env` con los siguientes valores:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/restaurante_db
```

Si se utiliza MongoDB Atlas, se debe reemplazar la URI por la cadena de conexión correspondiente.

**Importante:** El archivo `.env` contiene información de configuración privada y no debe subirse al repositorio. El archivo `.env.example` sirve como plantilla.

### Ejecutar el servidor

```bash
npm run dev
```

La API estará disponible en:

`http://localhost:3000`

## 4. Verificación del funcionamiento

Para comprobar que el servidor está funcionando correctamente:

```powershell
curl.exe http://localhost:3000/api/health
```

La ruta `/api/health` permite verificar el estado de la API.

## 5. Modelo de datos y relación uno a muchos

El proyecto utiliza dos modelos principales:

### Restaurante

Representa los establecimientos registrados en el sistema.

Sus atributos son:

- `nombre`: nombre del restaurante.
- `direccion`: dirección del establecimiento.
- `telefono`: número telefónico.
- `ciudad`: ciudad donde se encuentra.

### Pedido

Representa los pedidos realizados a un restaurante.

Sus atributos son:

- `restauranteId`: identificador del restaurante relacionado.
- `cliente`: nombre del cliente.
- `fecha`: fecha de creación del pedido.
- `estado`: estado actual del pedido.
- `total`: valor total del pedido.
- `productos`: lista de productos incluidos en el pedido.

### Relación entre las entidades

La relación es de uno a muchos (1:N):

- Un restaurante puede tener muchos pedidos.
- Cada pedido pertenece a un restaurante.
- Cada pedido puede almacenar varios productos como documentos embebidos.

La relación se implementa mediante `ObjectId` y `ref` de Mongoose.

## 6. Endpoints disponibles

Todos los endpoints utilizan la ruta base:

`http://localhost:3000/api`

### Endpoints de restaurantes

| Método HTTP | Endpoint | Descripción |
|---|---|---|
| POST | `/restaurantes` | Crear un restaurante |
| GET | `/restaurantes` | Listar restaurantes con paginación |
| GET | `/restaurantes/:id` | Consultar un restaurante por ID |
| PUT | `/restaurantes/:id` | Actualizar un restaurante |
| DELETE | `/restaurantes/:id` | Eliminar un restaurante |

### Endpoints de pedidos

| Método HTTP | Endpoint | Descripción |
|---|---|---|
| POST | `/pedidos` | Crear un pedido |
| GET | `/pedidos` | Listar pedidos con paginación |
| GET | `/pedidos/:id` | Consultar un pedido por ID |
| PUT | `/pedidos/:id` | Actualizar un pedido |
| DELETE | `/pedidos/:id` | Eliminar un pedido |
| POST | `/pedidos/:id/productos` | Agregar un producto a un pedido existente |

### Endpoint adicional

| Método HTTP | Endpoint | Descripción |
|---|---|---|
| GET | `/health` | Verificar el estado de la API |

## 7. Paginación

Los endpoints para listar restaurantes y pedidos permiten utilizar paginación mediante dos parámetros:

- `page`: número de página que se desea consultar.
- `limit`: cantidad de registros que se mostrarán por página.

Ejemplo:

```http
GET /api/restaurantes?page=1&limit=10
```

La respuesta incluye información como:

- Total de registros.
- Página actual.
- Límite de registros por página.
- Total de páginas.
- Lista de restaurantes o pedidos.

El límite máximo permitido es de 100 registros por página.

## 8. Validaciones implementadas

La API utiliza validaciones de Mongoose para garantizar la integridad de la información.

1. El nombre del restaurante es obligatorio y debe tener mínimo 3 caracteres.
2. La dirección, el teléfono y la ciudad son campos obligatorios.
3. El teléfono debe contener exactamente 10 dígitos.
4. Los campos de texto utilizan `trim` para eliminar espacios al inicio y al final.
5. El nombre del cliente es obligatorio.
6. La cantidad de productos debe ser como mínimo 1.
7. El precio de cada producto y el total del pedido no pueden ser negativos.
8. El estado del pedido solamente admite los valores: `Pendiente`, `Preparando`, `Entregado` y `Cancelado`.
9. El restaurante relacionado con un pedido debe existir.

También se utiliza `runValidators: true` al actualizar documentos para aplicar las validaciones del modelo.

## 9. Pruebas de la API con curl

Los siguientes ejemplos están preparados para PowerShell de Windows. Se utiliza `curl.exe` para ejecutar las solicitudes HTTP.

### 9.1 Crear un restaurante

```powershell
curl.exe -X POST http://localhost:3000/api/restaurantes `
  -H "Content-Type: application/json" `
  --data-raw '{"nombre":"Café Ñandú","direccion":"Carrera 7 # 20-15","telefono":"3001234567","ciudad":"Pereira"}'
```

La respuesta contiene el restaurante creado y su identificador `_id`.

Guardar ese identificador para utilizarlo al crear pedidos.

### 9.2 Consultar todos los restaurantes

```powershell
curl.exe "http://localhost:3000/api/restaurantes?page=1&limit=10"
```

### 9.3 Consultar un restaurante por ID

Reemplazar `ID_RESTAURANTE` por el identificador real:

```powershell
curl.exe http://localhost:3000/api/restaurantes/ID_RESTAURANTE
```

### 9.4 Actualizar un restaurante

```powershell
curl.exe -X PUT http://localhost:3000/api/restaurantes/ID_RESTAURANTE `
  -H "Content-Type: application/json" `
  --data-raw '{"nombre":"Café Ñandú Gourmet","direccion":"Carrera 8 # 15-20","telefono":"3001234567","ciudad":"Pereira"}'
```

### 9.5 Eliminar un restaurante

```powershell
curl.exe -X DELETE http://localhost:3000/api/restaurantes/ID_RESTAURANTE
```

### 9.6 Crear un pedido

Reemplazar `ID_RESTAURANTE` por el identificador de un restaurante existente:

```powershell
curl.exe -X POST http://localhost:3000/api/pedidos `
  -H "Content-Type: application/json" `
  --data-raw '{"restauranteId":"ID_RESTAURANTE","cliente":"Daniel","total":25000,"estado":"Pendiente","productos":[{"nombre":"Hamburguesa clásica","cantidad":1,"precio":25000}]}'
```

Guardar el identificador `_id` del pedido creado.

### 9.7 Consultar todos los pedidos

```powershell
curl.exe "http://localhost:3000/api/pedidos?page=1&limit=10"
```

### 9.8 Consultar un pedido por ID

```powershell
curl.exe http://localhost:3000/api/pedidos/ID_PEDIDO
```

### 9.9 Actualizar un pedido

```powershell
curl.exe -X PUT http://localhost:3000/api/pedidos/ID_PEDIDO `
  -H "Content-Type: application/json" `
  --data-raw '{"cliente":"Daniel Arango","estado":"Preparando","total":25000}'
```

### 9.10 Agregar un producto a un pedido

Este endpoint permite agregar un nuevo producto al arreglo `productos` de un pedido existente:

```powershell
curl.exe -X POST http://localhost:3000/api/pedidos/ID_PEDIDO/productos `
  -H "Content-Type: application/json" `
  --data-raw '{"nombre":"Jugo natural de mango","cantidad":2,"precio":5000}'
```

### 9.11