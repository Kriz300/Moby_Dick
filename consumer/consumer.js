  
const express = require("express");
const session = require('express-session');
const cors = require("cors");

const Kafka = require('node-rdkafka');
const avro = require('avsc');

const app = express();
const PORT = "3001";

app.use(cors());

app.use(session({
    secret: 'KafkaC',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
}));

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var eventType = avro.Type.forSchema({
    type: 'record',
    fields: [
        {
            name: 'carro',
            type: "string"
        },
        {
            name: 'qty',
            type: 'string',
        }
    ]
});

var consumer = new Kafka.KafkaConsumer({
    'group.id': 'app-2',
    'metadata.broker.list': 'localhost:9092',
}, {});

const stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092'
}, {}, {
    topic: 'summary'
});

stream.on('error', (err) => {
    console.error('Error in our kafka stream');
    console.error(err);
});

var list_count_order = [];
var order;
var flagRes = 0;

var flag = 0;
var count = 0;
var kill = 0;

function SendResume() { //express
    
    for (var [carro, qty] of Object.entries(list_count_order)) {

        var qty = (qty.toString());
        var event = { carro, qty };

        var success = stream.write(eventType.toBuffer(event));  
        
        if (success) {
            console.log(`message queued (${JSON.stringify(event)})`);
        } else {
            console.log('Too many messages in the queue already..');
        }
    }
    list_count_order = [];
    console.log("resumen cargado en sistema.")
}

consumer.on('ready', function () {

    consumer.subscribe(['orders']);
    console.log('consumer ready..');
    //console.log(consumer.consume(1));
    var consumeInterval = setInterval( async function () {
        if (flag == count) {
            kill++;
        }
        flag = count;
        consumer.consume(1);
        sleep(300);
        if (kill == 2) {
            consumer.disconnect();
            //console.log("F");
            flag = 0;
            count = 0;
            kill = 0;
            //flagRes = 1;
            SendResume();
            clearInterval(consumeInterval);
        }

    }, 1000);
})
.on('data', function (data) {
    //order = eventType.fromBuffer(data.value)
    count++;
    var buffer =(eventType.fromBuffer(data.value));
    order = `${buffer.carro}`;
    //console.log(`received message: ${order}`);
    if (list_count_order[order]) 
    {
        list_count_order[order] = list_count_order[order] + parseInt(buffer.qty);
    } else {
        list_count_order[order] = parseInt(buffer.qty);
    }
    console.log(list_count_order);
});

app.get("/", (req, res) => {
    res.send("holamundo2");
})

app.get("/resume", async (req,res) => { //express
    console.log("consumiendo");
    consumer.connect();
    var response = "Generando Resumen";

    /*
    while (1) {
        if (flagRes == 1) {
            response = "resumen generado";
            break;
        }
        else if (flagRes == 2) {
            response = "404";
            break;
        }
    }
    console.log("fuera loop");
    SendResume();
    flagRes = 0;
    list_count_order = [];
    */
    res.send(response);
});

app.listen(PORT, () => console.log(`Running on Port ${PORT}`));