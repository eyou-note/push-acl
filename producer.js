const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9091", "localhost:9092", "localhost:9093", "localhost:9094"],
});

const producer = kafka.producer();
const payload = { message: "hello world", value: "hello world body" };
const initKafka = async () => {
    await producer.connect();
    await producer.send({
        topic: "test-topic",
        messages: [{ value: JSON.stringify(payload) }],
    });

    await producer.disconnect();
};

initKafka();
