# Sopaipillas Moby Dick

_Implementación de un servidor Kafka Apache, con la motivación de generar un registro de ventas entre múltiples carros de sopaipillas, para lo cual se generaron los métodos, Producer, Consumer._

Dentro del servidor de Kafka, se generan dos topics: Orderes y Summary, el primer  Topic(Orders) almacena los registros de venta de las sopaipillas junto a los mails, del vendedor y del cocinero. Mientras que el topic summary contiene el los registros de Resumenes que se generan Diariamente, en funcion de la cantidad de sopaipillas vendidas por cada carrito correspondiente.

Finalmente estos resumenes diarios con consumidos para su posterior distribución mediante el envio por mail a los vendedores y cocineros respectivos.

## Ejecución 🔧

Se debe ejecutar cada comando en orden y en una consola diferente para cada uno. Se recomienda usar la consola Tilix para mayor comodidad.

### Comandos:

* $ node producer/.
* $ node consumer/.
* $ node postman/.

## Estructura 🛠️

### Construido con:

**Javascript**

### Creación de topicos:

Estos topicos se generan dentro del archivo encargado de producir su contenido.

```
const stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092'
}, {}, {
    topic: 'orders'
});
```

```
const stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092'
}, {}, {
    topic: 'summary'
});
```

### Ordenes y resumen:

```
fields: [
        {
            name: 'carro',
            type: 'string'
        },
        {
            name: 'qty',
            type: 'string'
        }
    ]
```


## Autores ✒️

* **Christian Muñoz I.** [Kriz](https://github.com/Kriz300)
* **Camilo Rubilar** [Niyet](https://github.com/niyetsin)
* **Raimundo Perez** [Raimundo Perez](https://github.com/raimundoperez8)

## Licencia 📄

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para detalles.
