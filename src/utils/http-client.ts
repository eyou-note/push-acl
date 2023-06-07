import { NotificationRecord } from "../model/vo/notification-vo";

const getRequest = (method: string, record: NotificationRecord) => ({
    method,
    headers: { "Content-Type": "application/json" },
});

export const sendToCcspPush = (record: NotificationRecord) => {
    // 여기서 브랜드별로 호출해준다.
    // const url = getBrandManagerUrl(); //not implement
    // 여기를 axios로 하실거면 수정하시면 됩니다.
    const url = "";
    fetch(url, getRequest("GET", record))
        .then(res => console.log(res))
        .catch(err => console.error(err));
};
