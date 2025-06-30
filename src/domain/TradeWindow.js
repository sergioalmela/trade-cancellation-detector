export class TradeWindow {
    constructor(startTime) {
        this.startTime = startTime;
        this.orders = 0;
        this.cancels = 0;
        this.cancelCount = 0;
    }

    addTrade(trade) {
        if (trade.isOrder()) {
            this.orders += trade.quantity;
        } else if (trade.isCancel()) {
            this.cancels += trade.quantity;
            this.cancelCount += 1;
        }
    }

    isExcessive() {
        if (this.orders === 0 && this.cancelCount === 1) {
            return false;
        }

        if (this.orders === 0 && this.cancelCount > 1) {
            return true;
        }

        return this.orders > 0 && this.cancels / (this.orders + this.cancels) > 1 / 3;
    }

    /**
     * @param {Trade[]} trades - Sorted list of trades by time.
     * @returns {TradeWindow[]} - Array of TradeWindow objects.
     */
    static createWindows(trades) {
        trades.sort((a, b) => a.time - b.time);
        const windows = [];
        let currentWindow = null;

        for (const trade of trades) {
            if (!currentWindow || (trade.time - currentWindow.startTime) / 1000 > 60) {
                currentWindow = new TradeWindow(trade.time);
                windows.push(currentWindow);
            }

            currentWindow.addTrade(trade);
        }

        return windows;
    }
}
