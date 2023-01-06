import { CurrentStockData } from './currentStockData.model';
import { StockCompanyName } from './stockCompanyName.model';
export interface StockData {
    companyData: StockCompanyName;
    value: CurrentStockData;
}
