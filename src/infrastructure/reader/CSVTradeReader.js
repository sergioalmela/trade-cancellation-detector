import { readFileSync } from 'fs';
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
        const rawCSV = readFileSync(this.filePath, 'utf8');
        const rows = CSVParser.parse(rawCSV);

        return rows.map(row => TradeFactory.fromCSVRow(row)).filter(Boolean);
    }
}
