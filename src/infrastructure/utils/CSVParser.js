import { createReadStream } from 'fs';
import { createInterface } from 'readline';

export class CSVParser {
    static parse(csvContent) {
        return csvContent
            .split('\n')
            .filter(Boolean)
            .map(line => line.split(',').map(cell => cell.trim()));
    }

    static async parseStream(filePath) {
        const trades = [];
        const fileStream = createReadStream(filePath);
        const rl = createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        return new Promise((resolve, reject) => {
            rl.on('line', (line) => {
                if (line.trim()) {
                    const row = line.split(',').map(cell => cell.trim());
                    trades.push(row);
                }
            });

            rl.on('error', reject);
            rl.on('close', () => resolve(trades));
        });
    }
}