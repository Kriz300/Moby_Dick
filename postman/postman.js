const Kafka = require('node-rdkafka');
const avro = require('avsc');

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
    'group.id': 'postman-1',
    'metadata.broker.list': 'localhost:9092',
}, {});

consumer.connect();

consumer.on('ready', () => {
    console.log('consumer ready..')
    consumer.subscribe(['summary']);
    consumer.consume();
}).on('data', function(data) {
    console.log(`received message: ${eventType.fromBuffer(data.value)}`);
});