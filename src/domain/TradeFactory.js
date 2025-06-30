import { Trade } from './Trade.js';

export class TradeFactory {
    /**
     * @param {string[]} row - Array of CSV fields.
     * @returns {Trade|null} - Returns a Trade entity or null if the row is invalid.
     */
    static fromCSVRow(row) {
        const [time, companyName, orderType, quantity] = row;

        if (!time || !companyName || !orderType || isNaN(quantity)) {
            console.warn(`Skipping malformed row: ${row}`);
            return null;
        }

        try {
            return new Trade(time, companyName, orderType, parseInt(quantity, 10));
        } catch (error) {
            console.warn(`Error creating trade from row: ${row}, Error: ${error.message}`);
            return null;
        }
    }
}
