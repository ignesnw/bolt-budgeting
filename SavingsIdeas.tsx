import React from 'react';
import { formatRupiah } from '../utils/currency';
import { SavingsIdea } from '../types';
import { Lightbulb, Bitcoin, Plane, GraduationCap } from 'lucide-react';

interface SavingsIdeasProps {
  totalSavings: number;
}

export function SavingsIdeas({ totalSavings }: SavingsIdeasProps) {
  const ideas: SavingsIdea[] = [
    {
      title: 'Invest in Bitcoin',
      description: 'Current BTC price allows you to buy approximately 0.001 BTC',
      amount: 500000000,
      category: 'investment'
    },
    {
      title: 'One-way ticket to Singapore',
      description: 'Economy class ticket from Jakarta to Singapore',
      amount: 1500000,
      category: 'travel'
    },
    {
      title: "Children's Pre-school Fund",
      description: '3 months of quality pre-school education',
      amount: 9000000,
      category: 'education'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'investment':
        return <Bitcoin className="text-yellow-500" />;
      case 'travel':
        return <Plane className="text-blue-500" />;
      case 'education':
        return <GraduationCap className="text-purple-500" />;
      default:
        return <Lightbulb className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="text-yellow-600" />
        <h2 className="text-xl font-semibold">What You Can Do With Your Savings</h2>
      </div>

      <div className="space-y-4">
        {ideas.map((idea, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border ${
              totalSavings >= idea.amount ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              {getCategoryIcon(idea.category)}
              <h3 className="font-semibold">{idea.title}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">{idea.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                Required: {formatRupiah(idea.amount)}
              </span>
              {totalSavings >= idea.amount ? (
                <span className="text-green-600 text-sm font-medium">Available!</span>
              ) : (
                <span className="text-gray-500 text-sm">
                  {formatRupiah(idea.amount - totalSavings)} more needed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}