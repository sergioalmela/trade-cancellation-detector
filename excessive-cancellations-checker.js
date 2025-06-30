import { CSVTradeReader } from './src/infrastructure/reader/CSVTradeReader.js';
import {
    GetCompaniesInvolvedInExcessiveCancellationsQueryHandler,
} from './src/application/query/GetCompaniesInvolvedInExcessiveCancellationsQueryHandler.js';
import {
    GetTotalWellBehavedCompaniesQueryHandler,
} from './src/application/query/GetTotalWellBehavedCompaniesQueryHandler.js';

class ExcessiveCancellationsChecker {
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

async function main() {
    console.log('🔍 Trade Cancellation Detector\n');
    
    try {
        const checker = new ExcessiveCancellationsChecker('data/trades.csv');
        
        console.log('📊 Analyzing trade data with streaming...\n');

        console.log('🔍 Finding companies with excessive cancellations...');
        const excessiveCompanies = await checker.companiesInvolvedInExcessiveCancellations();
        console.log(`Found ${excessiveCompanies.length} companies with excessive cancellations:`);
        excessiveCompanies.forEach(company => console.log(`  - ${company}`));
        
        console.log('\n📈 Counting well-behaved companies...');
        const wellBehavedCount = await checker.totalNumberOfWellBehavedCompanies();
        console.log(`Total well-behaved companies: ${wellBehavedCount}`);
        
        console.log('\n✅ Analysis complete!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

main();
