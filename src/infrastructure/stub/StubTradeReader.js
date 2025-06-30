import { TradeReader } from '../../domain/TradeReader.js';
import { Trade } from '../../domain/Trade.js';

export class StubTradeReader extends TradeReader {
    constructor() {
        super();
        this.tradesToReturn = [];
    }

    /**
     * @param {string} orderDate - Date of the order.
     * @param {string} companyName - Name of the company.
     * @param {string} orderType - Type of the order.
     * @param {number} quantity - Quantity of the order.
     */
    add(orderDate, companyName, orderType, quantity) {
        this.tradesToReturn.push(new Trade(orderDate, companyName, orderType, quantity));
    }

    /**
     * @returns {Promise<Trade[]>} - List of Trade objects based on the predefined data.
     */
    async getTrades() {
        return this.tradesToReturn;
    }
}
