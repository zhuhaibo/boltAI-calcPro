import React, { useState, useEffect } from 'react';
import { RotateCcw, Clock, X } from 'lucide-react';
import type { Calculation, CalculatorState } from '../types/calculator';

const initialState: CalculatorState = {
  display: '0',
  history: [],
  currentExpression: '',
  isError: false,
};

export default function Calculator() {
  const [state, setState] = useState<CalculatorState>(() => {
    const saved = localStorage.getItem('calculatorHistory');
    return {
      ...initialState,
      history: saved ? JSON.parse(saved) : [],
    };
  });

  useEffect(() => {
    localStorage.setItem('calculatorHistory', JSON.stringify(state.history));
  }, [state.history]);

  const handleNumber = (num: string) => {
    if (state.isError) return;
    setState(prev => ({
      ...prev,
      display: prev.display === '0' ? num : prev.display + num,
      currentExpression: prev.currentExpression + num,
    }));
  };

  const handleOperator = (op: string) => {
    if (state.isError) return;
    setState(prev => ({
      ...prev,
      display: op,
      currentExpression: prev.currentExpression + ` ${op} `,
    }));
  };

  const calculate = () => {
    try {
      // Using Function constructor for calculation - safe in this context as we control the input
      const result = new Function('return ' + state.currentExpression)();
      const calculation: Calculation = {
        id: Date.now().toString(),
        expression: state.currentExpression,
        result: result.toString(),
        timestamp: Date.now(),
      };
      
      setState(prev => ({
        ...prev,
        display: result.toString(),
        currentExpression: result.toString(),
        history: [calculation, ...prev.history].slice(0, 10),
        isError: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        display: 'Error',
        isError: true,
      }));
    }
  };

  const clear = () => {
    setState(prev => ({
      ...prev,
      display: '0',
      currentExpression: '',
      isError: false,
    }));
  };

  const recallCalculation = (calc: Calculation) => {
    setState(prev => ({
      ...prev,
      display: calc.result,
      currentExpression: calc.result,
      isError: false,
    }));
  };

  const Button = ({ children, onClick, className = '' }: any) => (
    <button
      onClick={onClick}
      className={`p-4 text-lg font-semibold rounded-lg transition-colors ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto">
      <div className="flex-1 bg-white rounded-2xl shadow-xl p-6">
        <div className="bg-gray-100 p-6 rounded-xl mb-6">
          <div className="text-gray-500 text-sm mb-2">{state.currentExpression || '0'}</div>
          <div className="text-4xl font-bold text-gray-800">{state.display}</div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Button
            onClick={clear}
            className="bg-red-100 text-red-600 hover:bg-red-200"
          >
            C
          </Button>
          <Button
            onClick={() => handleOperator('/')}
            className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
          >
            ÷
          </Button>
          <Button
            onClick={() => handleOperator('*')}
            className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
          >
            ×
          </Button>
          <Button
            onClick={() => handleOperator('-')}
            className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
          >
            −
          </Button>
          
          {[7, 8, 9].map(num => (
            <Button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-gray-100 text-gray-800 hover:bg-gray-200"
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleOperator('+')}
            className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
          >
            +
          </Button>
          
          {[4, 5, 6].map(num => (
            <Button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-gray-100 text-gray-800 hover:bg-gray-200"
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleNumber('.')}
            className="bg-gray-100 text-gray-800 hover:bg-gray-200"
          >
            .
          </Button>
          
          {[1, 2, 3, 0].map(num => (
            <Button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-gray-100 text-gray-800 hover:bg-gray-200"
            >
              {num}
            </Button>
          ))}
          
          <Button
            onClick={calculate}
            className="bg-indigo-600 text-white hover:bg-indigo-700 col-span-2"
          >
            =
          </Button>
        </div>
      </div>

      <div className="lg:w-80 bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Clock size={20} />
            History
          </h3>
          <button
            onClick={() => setState(prev => ({ ...prev, history: [] }))}
            className="text-gray-500 hover:text-gray-700"
          >
            <RotateCcw size={20} />
          </button>
        </div>
        
        <div className="space-y-3">
          {state.history.map((calc) => (
            <div
              key={calc.id}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => recallCalculation(calc)}
            >
              <div className="text-sm text-gray-500">{calc.expression}</div>
              <div className="text-lg font-semibold">{calc.result}</div>
            </div>
          ))}
          {state.history.length === 0 && (
            <div className="text-center text-gray-500 py-4">No calculations yet</div>
          )}
        </div>
      </div>
    </div>
  );
}