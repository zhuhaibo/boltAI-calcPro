export interface Calculation {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface CalculatorState {
  display: string;
  history: Calculation[];
  currentExpression: string;
  isError: boolean;
}