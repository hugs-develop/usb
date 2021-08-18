const usbDetect = require('usb-detection');

class Usb {
    get usbDetect() {
        return this._usbDetect;
    }

    set #usbDetect(value) {
        this._usbDetect = value;
        this.startMonitoring();
    }

    constructor() {
        this.#usbDetect = usbDetect;
    }

    startMonitoring() {
        this.usbDetect.startMonitoring();
    }

    stopMonitoring() {
        this.usbDetect.stopMonitoring();
    }

    /**
     * @returns {Promise<Device[]>}
     */
    async find() {
        const devices = await this.usbDetect.find();
        console.log(`Found ${devices?.length} devices`);
        return (devices || []).sort((a, b) => a.deviceAddress - b.deviceAddress);
    }
}
module.exports = Usb;
