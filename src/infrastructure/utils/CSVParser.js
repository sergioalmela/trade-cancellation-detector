export class CSVParser {
    static parse(csvContent) {
        return csvContent
            .split('\n')
            .filter(Boolean)
            .map(line => line.split(',').map(cell => cell.trim()));
    }
}