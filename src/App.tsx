import React, { useState, useEffect } from 'react';
import { DailyInput } from './components/DailyInput';
import { SavingsDisplay } from './components/SavingsDisplay';
import { SavingsIdeas } from './components/SavingsIdeas';
import { DailyRecord } from './types';
import { Settings } from 'lucide-react';

function App() {
  const [dailyBudget, setDailyBudget] = useState<number>(100000);
  const [budgetInput, setBudgetInput] = useState<string>('100,000');
  const [records, setRecords] = useState<DailyRecord[]>([]);
  const [showBudgetModal, setShowBudgetModal] = useState<boolean>(false);

  useEffect(() => {
    const savedBudget = localStorage.getItem('dailyBudget');
    if (savedBudget) {
      const budget = Number(savedBudget);
      setDailyBudget(budget);
      setBudgetInput(new Intl.NumberFormat('id-ID').format(budget));
    }

    const savedRecords = localStorage.getItem('records');
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

  const handleSaveSpending = (spending: number) => {
    const today = new Date().toISOString().split('T')[0];
    const saving = dailyBudget - spending;
    
    // Remove any existing record for today
    const filteredRecords = records.filter(record => record.date !== today);
    
    const newRecord: DailyRecord = {
      id: crypto.randomUUID(),
      user_id: 'default',
      date: today,
      budget: dailyBudget,
      spending,
      saving,
      created_at: new Date().toISOString()
    };

    const updatedRecords = [...filteredRecords, newRecord];
    setRecords(updatedRecords);
    localStorage.setItem('records', JSON.stringify(updatedRecords));
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value) {
      const number = parseInt(value, 10);
      const formatted = new Intl.NumberFormat('id-ID').format(number);
      setBudgetInput(formatted);
    } else {
      setBudgetInput('');
    }
  };

  const saveBudget = () => {
    const budget = Number(budgetInput.replace(/[^0-9]/g, ''));
    setDailyBudget(budget);
    localStorage.setItem('dailyBudget', budget.toString());
    setShowBudgetModal(false);
  };

  const totalSavings = records.reduce((sum, record) => sum + record.saving, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Savings Tracker</h1>
          <button
            onClick={() => setShowBudgetModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            <Settings className="w-4 h-4" />
            Set Daily Budget
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <DailyInput onSave={handleSaveSpending} dailyBudget={dailyBudget} />
            <SavingsDisplay records={records} />
          </div>
          <SavingsIdeas totalSavings={totalSavings} />
        </div>
      </div>

      {showBudgetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Set Daily Budget</h2>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">Rp</span>
              </div>
              <input
                type="text"
                value={budgetInput}
                onChange={handleBudgetChange}
                className="block w-full pl-12 pr-12 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowBudgetModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={saveBudget}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
