import { Company } from '../../domain/Company.js';

export class GetTotalWellBehavedCompaniesQueryHandler {
    constructor(tradeReader) {
        this.tradeReader = tradeReader;
    }

    /**
     * @returns {Promise<number>} - Total number of well-behaved companies.
     */
    async execute() {
        const trades = await this.tradeReader.getTrades();
        const companiesMap = this.mapTradesToCompanies(trades);

        const excessivelyCancelling = Array.from(companiesMap.values())
            .filter(company => company.isExcessivelyCancelling())
            .length;

        return companiesMap.size - excessivelyCancelling;
    }

    /**
     * @param {Trade[]} trades - Array of Trade entities.
     * @returns {Map<string, Company>} - A map of company names to Company objects.
     */
    mapTradesToCompanies(trades) {
        const companiesMap = new Map();

        trades.forEach(trade => {
            if (!companiesMap.has(trade.companyName)) {
                companiesMap.set(trade.companyName, new Company(trade.companyName));
            }
            companiesMap.get(trade.companyName).addTrade(trade);
        });

        return companiesMap;
    }
}
