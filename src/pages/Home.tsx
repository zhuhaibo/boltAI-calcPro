import React from 'react';
import { Calculator, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const history = JSON.parse(localStorage.getItem('calculatorHistory') || '[]');
  const recentHistory = history.slice(0, 5); // Show only last 5 calculations

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            Welcome to CalcPro
          </h1>
          <p className="mt-6 text-xl text-gray-500">
            A modern, feature-rich calculator with history tracking and more.
          </p>
          <div className="mt-10">
            <Link
              to="/calculator"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Calculator className="mr-2" size={20} />
              Open Calculator
            </Link>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: '标题1',
              description: 'Perform all standard arithmetic calculations with ease.',
            },
            {
              title: '标题2',
              description: 'Keep track of your previous calculations and recall them instantly.',
            },
            {
              title: '标题3',
              description: 'Your calculation history is saved between sessions.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">Recent Calculations</h2>
            </div>
            
            <div className="space-y-4">
              {recentHistory.length > 0 ? (
                recentHistory.map((calc) => (
                  <div
                    key={calc.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div className="text-sm text-gray-500">{calc.expression}</div>
                    <div className="text-lg font-semibold text-gray-900">{calc.result}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(calc.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-4">No calculations yet</p>
                  <Link
                    to="/calculator"
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Start calculating
                  </Link>
                </div>
              )}
            </div>

            {recentHistory.length > 0 && (
              <div className="mt-6 text-center">
                <Link
                  to="/calculator"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  View all calculations
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}