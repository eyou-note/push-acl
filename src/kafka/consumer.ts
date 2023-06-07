import { Kafka, logLevel, Consumer as KafkaConsumer, EachMessagePayload } from "kafkajs";
import { NotificationRecord } from "../model/vo/notification-vo";
import { sendToCcspPush } from "../utils/http-client";

export interface IKafkaConsumer {
    connect(): Promise<void>;
    run(): Promise<void>;
    subscribe(topic: string): Promise<void>;
}

export class PushConsumer implements IKafkaConsumer {
    private consumer: KafkaConsumer;

    constructor(private groupId: string) {
        const kafka = new Kafka({
            clientId: "my-app",
            brokers: ["localhost:9091", "localhost:9092", "localhost:9093", "localhost:9094"],
            logLevel: logLevel.INFO,
        });

        this.consumer = kafka.consumer({ groupId });
    }

    async run(): Promise<void> {
        await this.consumer.run({
            partitionsConsumedConcurrently: 4,

            eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
                const record = new NotificationRecord(message.value);
                record.logging();

                sendToCcspPush(record); //not implement.
            },
        });
    }

    async connect(): Promise<void> {
        await this.consumer.connect();
    }

    async subscribe(topic: string): Promise<void> {
        await this.consumer.subscribe({ topic, fromBeginning: true });
    }
}
