# Sopaipillas Moby Dick

_._

## Ejecución 🔧





## Estructura 🛠️

### Construido con:

**Javascript**

### Creación de topicos:

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
