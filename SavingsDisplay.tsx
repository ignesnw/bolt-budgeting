import React from 'react';
import { formatRupiah } from '../utils/currency';
import { DailyRecord } from '../types';
import { Coins } from 'lucide-react';

interface SavingsDisplayProps {
  records: DailyRecord[];
}

export function SavingsDisplay({ records }: SavingsDisplayProps) {
  const totalSavings = records.reduce((sum, record) => sum + record.saving, 0);
  const weeklyTotal = records
    .slice(-7)
    .reduce((sum, record) => sum + record.saving, 0);
  const monthlyTotal = records
    .slice(-30)
    .reduce((sum, record) => sum + record.saving, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Coins className="text-green-600" />
        <h2 className="text-xl font-semibold">Savings Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 mb-1">Total Savings</p>
          <p className="text-xl font-bold text-green-700">{formatRupiah(totalSavings)}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 mb-1">Weekly Savings</p>
          <p className="text-xl font-bold text-blue-700">{formatRupiah(weeklyTotal)}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600 mb-1">Monthly Savings</p>
          <p className="text-xl font-bold text-purple-700">{formatRupiah(monthlyTotal)}</p>
        </div>
      </div>
    </div>
  );
}