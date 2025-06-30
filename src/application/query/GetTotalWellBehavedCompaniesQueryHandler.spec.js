import { GetTotalWellBehavedCompaniesQueryHandler } from './GetTotalWellBehavedCompaniesQueryHandler.js';
import { StubTradeReader } from '../../infrastructure/stub/StubTradeReader.js';

describe('GetTotalWellBehavedCompaniesQueryHandler', () => {
    let stubReader;
    let handler;

    beforeEach(() => {
        stubReader = new StubTradeReader();
        handler = new GetTotalWellBehavedCompaniesQueryHandler(stubReader);
    });

    describe('Given trades data', () => {
        it('When companies are well-behaved, Then it should return the correct count', async () => {
            stubReader.add('2021-01-01 01:00:00', 'Well Behaved Co', 'D', 100);

            const result = await handler.execute();
            expect(result).toBe(1);
        });

        it('When input is empty, Then it should return zero', async () => {
            const result = await handler.execute();
            expect(result).toBe(0);
        });

        it('When input is invalid, Then it should count them as well-behaved', async () => {
            stubReader.add('2021-01-01', 'Invalid Co', 'X', 100);

            const result = await handler.execute();
            expect(result).toBe(1);
        });

        it('When trades are within the 60-second window but not excessively cancelling, Then it should count them as well-behaved', async () => {
            stubReader.add('2021-01-01 01:00:00', 'Normal Co', 'D', 5000);
            stubReader.add('2021-01-01 01:00:30', 'Normal Co', 'F', 1000);

            const result = await handler.execute();
            expect(result).toBe(1);
        });

        it('When trades exceed the 60-second window, Then companies should still be counted as well-behaved', async () => {
            stubReader.add('2021-01-01 01:00:00', 'Slow traders', 'D', 3000);
            stubReader.add('2021-01-01 01:01:01', 'Slow traders', 'F', 1000);

            const result = await handler.execute();
            expect(result).toBe(1);
        });
    });
});
