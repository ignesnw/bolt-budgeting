import React, { useState, useEffect } from 'react';
import { formatRupiah } from '../utils/currency';
import { PiggyBank, Wallet } from 'lucide-react';

interface DailyInputProps {
  onSave: (spending: number) => void;
  dailyBudget: number;
}

export function DailyInput({ onSave, dailyBudget }: DailyInputProps) {
  const [spending, setSpending] = useState<string>('');
  const [todayRecorded, setTodayRecorded] = useState<boolean>(false);

  useEffect(() => {
    const records = localStorage.getItem('records');
    if (records) {
      const today = new Date().toISOString().split('T')[0];
      const parsedRecords = JSON.parse(records);
      const hasTodayRecord = parsedRecords.some((record: any) => record.date === today);
      setTodayRecorded(hasTodayRecord);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const spendingAmount = Number(spending.replace(/[^0-9]/g, ''));
    if (spendingAmount > 0) {
      onSave(spendingAmount);
      setSpending('');
      setTodayRecorded(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value) {
      const number = parseInt(value, 10);
      const formatted = new Intl.NumberFormat('id-ID').format(number);
      setSpending(formatted);
    } else {
      setSpending('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="text-blue-600" />
        <h2 className="text-xl font-semibold">Daily Spending Input</h2>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-600">
          Daily Budget: {formatRupiah(dailyBudget)}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="spending" className="block text-sm font-medium text-gray-700">
            Today's Spending
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">Rp</span>
            </div>
            <input
              type="text"
              id="spending"
              value={spending}
              onChange={handleChange}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
              placeholder="0"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PiggyBank className="w-4 h-4 mr-2" />
          {todayRecorded ? 'Update Today\'s Record' : 'Record Spending'}
        </button>
      </form>
    </div>
  );
}
