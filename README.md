# Trade Cancellation Detector

A Node.js application that analyzes trade data to detect companies engaged in excessive order cancellations. Built with clean architecture principles and domain-driven design.

## Features

- **Excessive Cancellation Detection**: Identifies companies with cancellation ratios exceeding 1/3 in any 60-second window
- **Well-Behaved Company Analysis**: Counts companies that maintain proper trading behavior
- **CSV Data Processing**: Handles large CSV files with trade transaction data
- **Clean Architecture**: Built with hexagonal architecture and DDD principles
- **Comprehensive Testing**: Full test coverage with Jest

## Installation

```bash
npm install
```

## Usage

```javascript
import { ExcessiveCancellationsChecker } from './excessive-cancellations-checker.js';

const checker = new ExcessiveCancellationsChecker('data/trades.csv');

// Get companies involved in excessive cancellations
const excessiveCompanies = await checker.companiesInvolvedInExcessiveCancellations();
console.log('Companies with excessive cancellations:', excessiveCompanies);

// Get count of well-behaved companies
const wellBehavedCount = await checker.totalNumberOfWellBehavedCompanies();
console.log('Well-behaved companies:', wellBehavedCount);
```

## Data Format

The application processes CSV files with trade data in the following format:

```
Time,CompanyName,OrderType,Quantity
2015-02-28 07:58:14,Bank of Mars,D,140
2015-02-28 08:00:13,Bank of Mars,D,500
2015-02-28 08:01:13,Bank of Mars,F,200
```

### Fields:
- **Time**: Timestamp of the trade message (YYYY-MM-DD HH:MM:SS)
- **CompanyName**: Name of the trading company (no commas allowed)
- **OrderType**:
  - `D` = New order (Demand)
  - `F` = Cancel order
- **Quantity**: Number of shares/units in the order

## Business Logic

A company is considered to be engaged in **excessive cancelling** if, in any given **60-second period**, the ratio of cumulative cancelled quantity to cumulative total quantity (orders + cancels) exceeds **1/3**.

### Example:
- During 08:00:14 to 08:01:13, Bank of Mars made 400 total orders (200 new + 200 cancels)
- Cancellation ratio: 200/400 = 50% (exceeds 1/3 threshold)
- Result: Bank of Mars is flagged for excessive cancelling

## Architecture

The project follows clean architecture principles with clear separation of concerns:

### Domain Layer (`src/domain/`)
- **Trade.js**: Core trade entity with business logic
- **TradeWindow.js**: 60-second time window analysis logic
- **Company.js**: Company entity
- **TradeReader.js**: Interface for data access

### Application Layer (`src/application/`)
- **GetCompaniesInvolvedInExcessiveCancellationsQueryHandler.js**: Use case for finding excessive cancellers
- **GetTotalWellBehavedCompaniesQueryHandler.js**: Use case for counting well-behaved companies

### Infrastructure Layer (`src/infrastructure/`)
- **CSVTradeReader.js**: CSV file implementation of TradeReader
- **CSVParser.js**: CSV parsing utilities
- **StubTradeReader.js**: Test stub for mocking data

## Testing

Run the test suite:

```bash
npm test
```

The project includes comprehensive unit tests covering:
- Domain logic for trade analysis
- Application use cases
- Infrastructure components
- Integration tests with sample data

## Requirements

- Node.js 18+
- npm or yarn

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request
