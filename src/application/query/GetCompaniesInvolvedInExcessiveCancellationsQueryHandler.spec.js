import { GetCompaniesInvolvedInExcessiveCancellationsQueryHandler } from './GetCompaniesInvolvedInExcessiveCancellationsQueryHandler.js';
import { StubTradeReader } from '../../infrastructure/stub/StubTradeReader.js';

describe('GetCompaniesInvolvedInExcessiveCancellationsQueryHandler', () => {
    let stubReader;
    let handler;

    beforeEach(() => {
        stubReader = new StubTradeReader();
        handler = new GetCompaniesInvolvedInExcessiveCancellationsQueryHandler(stubReader);
    });

    describe('Given trades data', () => {
        it('When companies are excessively cancelling, Then it should identify the companies', async () => {
            stubReader.add('2021-01-01 01:00:00', 'Ape accountants', 'F', 10000);
            stubReader.add('2021-01-01 01:00:00', 'Ape accountants', 'F', 10000);
            stubReader.add('2021-01-01 01:00:00', 'Cauldron cooking', 'F', 6000);
            stubReader.add('2021-01-01 01:00:00', 'Cauldron cooking', 'D', 5000);

            const result = await handler.execute();

            expect(result).toEqual(['Ape accountants', 'Cauldron cooking']);
        });

        it('When no companies are excessively cancelling, Then it should return an empty list', async () => {
            stubReader.add('2021-01-01 01:00:00', 'Normal traders', 'D', 3000);
            stubReader.add('2021-01-01 01:00:00', 'Normal traders', 'F', 1000);

            const result = await handler.execute();

            expect(result).toEqual([]);
        });

        it('When input is invalid, Then it should return empty', async () => {
            stubReader.add('invalid', 'Invalid Co', 'X', 0);

            const result = await handler.execute();

            expect(result).toEqual([]);
        });

        it('When trades are outside the 60-second window, Then it return empty', async () => {
            stubReader.add('2021-01-01 01:00:00', 'Ape accountants', 'F', 10000);
            stubReader.add('2021-01-01 01:01:01', 'Ape accountants', 'F', 10000);

            const result = await handler.execute();

            expect(result).toEqual([]);
        });

        it('When multiple trades within the 60-second window, Then it should correctly calculate excessive cancellations', async () => {
            stubReader.add('2021-01-01 01:00:00', 'Rapid traders', 'D', 4000);
            stubReader.add('2021-01-01 01:00:30', 'Rapid traders', 'F', 3000);
            stubReader.add('2021-01-01 01:00:40', 'Rapid traders', 'F', 2000);

            const result = await handler.execute();

            expect(result).toEqual(['Rapid traders']);
        });
    });
});
