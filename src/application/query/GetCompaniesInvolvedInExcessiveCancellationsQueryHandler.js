import { Company } from '../../domain/Company.js';

export class GetCompaniesInvolvedInExcessiveCancellationsQueryHandler {
    constructor(tradeReader) {
        this.tradeReader = tradeReader;
    }

    /**
     * @returns {Promise<string[]>} - List of companies involved in excessive cancellations.
     */
    async execute() {
        const trades = await this.tradeReader.getTrades();
        const companiesMap = this.mapTradesToCompanies(trades);

        return Array.from(companiesMap.values())
            .filter(company => company.isExcessivelyCancelling())
            .map(company => company.name);
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
