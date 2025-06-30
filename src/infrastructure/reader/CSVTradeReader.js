import { CSVParser } from '../utils/CSVParser.js';
import { TradeFactory } from '../../domain/TradeFactory.js';
import {TradeReader} from "../../domain/TradeReader.js";

export class CSVTradeReader extends TradeReader {
    constructor(filePath) {
        super();
        this.filePath = filePath;
    }

    /**
     * @returns {Promise<Trade[]>}
     */
    async getTrades() {
        const rows = await CSVParser.parseStream(this.filePath);

        return rows.map(row => TradeFactory.fromCSVRow(row)).filter(Boolean);
    }
}
