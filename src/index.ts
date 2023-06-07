import { IKafkaConsumer, PushConsumer } from "./kafka/consumer";

const runConsumer = async () => {
    try {
        const consumer: IKafkaConsumer = new PushConsumer("my-group"); // 브로커, 컨슈머그룹, 토픽 정보 넘김

        await consumer.connect();
        await consumer.subscribe("test-topic");
        await consumer.run();
    } catch (error) {
        console.error("Error:", error);
    }
};

runConsumer().catch(console.error);
