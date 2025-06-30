import { CSVTradeReader } from './src/infrastructure/reader/CSVTradeReader.js';
import {
    GetCompaniesInvolvedInExcessiveCancellationsQueryHandler,
} from './src/application/query/GetCompaniesInvolvedInExcessiveCancellationsQueryHandler.js';
import {
    GetTotalWellBehavedCompaniesQueryHandler,
} from './src/application/query/GetTotalWellBehavedCompaniesQueryHandler.js';

export class ExcessiveCancellationsChecker {
    /**
     * @param {string} filePath - The path to the CSV file containing trade data.
     * @param {TradeReader} [tradeReader] - Optional: An instance of a class that implements TradeReaderPort.
     */
    constructor(filePath, tradeReader = null) {
        this.filePath = filePath;

        this.tradeReader = tradeReader || new CSVTradeReader(this.filePath);

        this.getCompaniesInvolvedUseCase = new GetCompaniesInvolvedInExcessiveCancellationsQueryHandler(this.tradeReader);
        this.getWellBehavedCompaniesUseCase = new GetTotalWellBehavedCompaniesQueryHandler(this.tradeReader);
    }

    /**
     * Returns an array of companies that are involved in excessive cancelling.
     * @returns {Promise<string[]>} - List of companies involved in excessive cancellations.
     */
    async companiesInvolvedInExcessiveCancellations() {
        try {
            return await this.getCompaniesInvolvedUseCase.execute();
        } catch (e) {
            throw new Error(`Error fetching companies involved in excessive cancellations ${e.message}`);
        }
    }

    /**
     * Returns the total number of companies that are not involved in excessive cancelling.
     * @returns {Promise<number>} - Total number of well-behaved companies.
     */
    async totalNumberOfWellBehavedCompanies() {
        try {
            return await this.getWellBehavedCompaniesUseCase.execute();
        } catch (e) {
            throw new Error(`Error fetching total number of well-behaved companies ${e.message}`);
        }
    }
}
