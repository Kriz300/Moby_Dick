const express = require("express");
const session = require('express-session');
const cors = require("cors");

const Kafka = require('node-rdkafka');
const avro = require('avsc');

const app = express();
const PORT = "3000";

app.use(cors());

app.use(session({
    secret: 'KafkaP',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
}));

var eventType = avro.Type.forSchema({
    type: 'record',
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
});

const stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092'
}, {}, {
    topic: 'orders'
});

stream.on('error', (err) => {
    console.error('Error in our kafka stream');
    console.error(err);
});

app.get("/", (req, res) => {
    res.send("holamundo");
})

app.get("/order/:carro&:qty", async (req,res) => { //express
    const carro = req.params.carro ;
    const qty = req.params.qty ;

    const event = { carro, qty };
    const success = stream.write(eventType.toBuffer(event));
    var response;
    
    if (success) {
        console.log(`message queued (${JSON.stringify(event)})`);
        response = "Orden Aceptada";
    } else {
        console.log('Too many messages in the queue already..');
        response = "Orden Rechazada";
    }
    res.send(response);
});

app.listen(PORT, () => console.log(`Running on Port ${PORT}`));