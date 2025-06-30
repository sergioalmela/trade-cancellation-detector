import { TradeWindow } from './TradeWindow.js';

export class Company {
    constructor(name) {
        this.name = name;
        this.trades = [];
    }

    addTrade(trade) {
        this.trades.push(trade);
    }

    /**
     * @returns {boolean}
     */
    isExcessivelyCancelling() {
        const tradeWindows = TradeWindow.createWindows(this.trades);

        return tradeWindows.some(window => window.isExcessive());
    }
}
