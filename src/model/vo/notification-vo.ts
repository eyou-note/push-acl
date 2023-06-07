import { IDeviceInfoVO } from "../../inferfaces/IDeviceInfoVO";

export class NotificationRecord {
    msgId: string;
    svcId: string;
    deviceIdList: IDeviceInfoVO[];
    rgstDtm: string;

    constructor(raw: Buffer) {
        const rawJson = JSON.parse(raw.toString());
        this.msgId = rawJson.msgId;
        this.svcId = rawJson.svcId;

        this.deviceIdList = rawJson.deviceInfoVO.map(d => ({ devieId: d.deviceId, carId: d.carId, remoteNoti: d.remoteNoti }));
        this.rgstDtm = this.convertDate(rawJson.rgstDtm); // push에서 날짜 가지고 뭐 하는게 있는지 확인해야하나
    }

    private convertDate(date) {
        return new Date(date[0], date[1], date[2], date[3], date[4], date[5]).toString();
    }

    logging() {
        console.log(`msgId : ${this.msgId}, svcId : ${this.svcId}, deviceIdList:${this.deviceIdList}, rgstDtm:${this.rgstDtm}`);
    }
}
