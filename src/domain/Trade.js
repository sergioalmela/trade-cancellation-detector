export class Trade {
    constructor(time, companyName, orderType, quantity) {
        this.time = new Date(time);
        this.companyName = companyName;
        this.orderType = orderType;
        this.quantity = parseInt(quantity, 10);
    }

    /**
     * @returns {boolean}
     */
    isOrder() {
        return this.orderType === 'D';
    }

    /**
     * @returns {boolean}
     */
    isCancel() {
        return this.orderType === 'F';
    }
}