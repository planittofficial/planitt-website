'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Target, PiggyBank } from 'lucide-react';
import { formatIndianCompactCurrency } from '@/lib/numberFormat';

interface NPSData {
    monthlyContribution: number;
    age: number;
    retirementAge: number;
    expectedReturns: number;
    annuityPercent: number;
    expectedAnnuityReturns: number;
}

interface ChartData {
    age: number;
    investment: number;
    corpus: number;
    gains: number;
}

const NPSCalculator = () => {
    const [formData, setFormData] = useState<NPSData>({
        monthlyContribution: 10000,
        age: 25,
        retirementAge: 60,
        expectedReturns: 10,
        annuityPercent: 40,
        expectedAnnuityReturns: 6
    });

    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [summary, setSummary] = useState({
        totalInvestment: 0,
        totalCorpus: 0,
        totalGains: 0,
        lumpSumAmount: 0,
        annuityAmount: 0,
        expectedMonthlyPension: 0
    });

    const calculateNPS = useCallback(() => {
        const data: ChartData[] = [];
        const monthlyRate = formData.expectedReturns / 100 / 12;
        const totalYears = formData.retirementAge - formData.age;

        let totalInvested = 0;
        let currentCorpus = 0;

        for (let year = 1; year <= totalYears; year++) {
            const monthsInYear = 12;
            for (let month = 1; month <= monthsInYear; month++) {
                currentCorpus = (currentCorpus + formData.monthlyContribution) * (1 + monthlyRate);
                totalInvested += formData.monthlyContribution;
            }

            data.push({
                age: formData.age + year,
                investment: Math.round(totalInvested),
                corpus: Math.round(currentCorpus),
                gains: Math.round(currentCorpus - totalInvested)
            });
        }

        const lumpSumAmount = currentCorpus * (1 - formData.annuityPercent / 100);
        const annuityAmount = currentCorpus * (formData.annuityPercent / 100);
        const expectedMonthlyPension = (annuityAmount * (formData.expectedAnnuityReturns / 100)) / 12;

        setChartData(data);
        setSummary({
            totalInvestment: Math.round(totalInvested),
            totalCorpus: Math.round(currentCorpus),
            totalGains: Math.round(currentCorpus - totalInvested),
            lumpSumAmount: Math.round(lumpSumAmount),
            annuityAmount: Math.round(annuityAmount),
            expectedMonthlyPension: Math.round(expectedMonthlyPension)
        });
    }, [formData]);

    useEffect(() => {
        calculateNPS();
    }, [calculateNPS]);

    const formatCurrency = (value: number) => formatIndianCompactCurrency(value);

    const handleInputChange = (field: keyof NPSData, value: number) => {
        let clampedValue = value;

        switch (field) {
            case 'monthlyContribution':
                clampedValue = Math.min(Math.max(value, 0), 1000000);
                break;
            case 'age':
                clampedValue = Math.min(Math.max(value, 0), 60);
                break;
            case 'retirementAge':
                clampedValue = Math.min(Math.max(value, formData.age), 75);
                break;
            case 'expectedReturns':
                clampedValue = Math.min(Math.max(value, 0), 15);
                break;
            case 'annuityPercent':
                clampedValue = Math.min(Math.max(value, 0), 100);
                break;
            case 'expectedAnnuityReturns':
                clampedValue = Math.min(Math.max(value, 0), 15);
                break;
        }

        if (formData[field] === clampedValue && field !== 'age') return;

        setFormData(prev => {
            const newData = { ...prev, [field]: clampedValue };
            if (field === 'age' && newData.retirementAge < clampedValue) {
                newData.retirementAge = Math.min(clampedValue, 75);
            }
            return newData;
        });
    };

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6">
                        <PiggyBank className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        NPS Calculator
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Plan your retirement with the National Pension System. Estimate your corpus and monthly pension.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-transparent dark:border-gray-800 transition-colors">
                            <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-8">
                                Retirement Planning Parameters
                            </h3>

                            {/* Monthly Contribution */}
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Monthly Contribution (₹)
                                    </label>
                                    <span className="text-blue-600 font-bold">{formatCurrency(formData.monthlyContribution)}</span>
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000000"
                                        step="500"
                                        value={formData.monthlyContribution}
                                        onChange={(e) => handleInputChange('monthlyContribution', parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>₹500</span>
                                        <span>₹10L</span>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    value={formData.monthlyContribution}
                                    onChange={(e) => handleInputChange('monthlyContribution', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                />
                            </div>

                            {/* Age */}
                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Current Age
                                        </label>
                                        <span className="text-blue-600 font-bold">{formData.age} yrs</span>
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="60"
                                            value={formData.age}
                                            onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>0</span>
                                            <span>60</span>
                                        </div>
                                    </div>
                                    <input
                                        type="number"
                                        value={formData.age}
                                        onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Retirement Age
                                        </label>
                                        <span className="text-blue-600 font-bold">{formData.retirementAge} yrs</span>
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="range"
                                            min={formData.age}
                                            max="75"
                                            value={formData.retirementAge}
                                            onChange={(e) => handleInputChange('retirementAge', parseInt(e.target.value))}
                                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>{formData.age}</span>
                                            <span>75</span>
                                        </div>
                                    </div>
                                    <input
                                        type="number"
                                        value={formData.retirementAge}
                                        onChange={(e) => handleInputChange('retirementAge', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Returns and Annuity */}
                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Expected Returns (%)
                                        </label>
                                        <span className="text-blue-600 font-bold">{formData.expectedReturns}%</span>
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="15"
                                            step="0.5"
                                            value={formData.expectedReturns}
                                            onChange={(e) => handleInputChange('expectedReturns', parseFloat(e.target.value))}
                                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>1%</span>
                                            <span>15%</span>
                                        </div>
                                    </div>
                                    <input
                                        type="number"
                                        value={formData.expectedReturns}
                                        step="0.1"
                                        onChange={(e) => handleInputChange('expectedReturns', parseFloat(e.target.value) || 0)}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Annuity Purchase (%)
                                        </label>
                                        <span className="text-blue-600 font-bold">{formData.annuityPercent}%</span>
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={formData.annuityPercent}
                                            onChange={(e) => handleInputChange('annuityPercent', parseInt(e.target.value))}
                                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>0%</span>
                                            <span>100%</span>
                                        </div>
                                    </div>
                                    <input
                                        type="number"
                                        value={formData.annuityPercent}
                                        onChange={(e) => handleInputChange('annuityPercent', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Expected Annuity Returns (%)
                                    </label>
                                    <span className="text-blue-600 font-bold">{formData.expectedAnnuityReturns}%</span>
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="15"
                                        step="0.5"
                                        value={formData.expectedAnnuityReturns}
                                        onChange={(e) => handleInputChange('expectedAnnuityReturns', parseFloat(e.target.value))}
                                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>1%</span>
                                        <span>15%</span>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    value={formData.expectedAnnuityReturns}
                                    step="0.1"
                                    onChange={(e) => handleInputChange('expectedAnnuityReturns', parseFloat(e.target.value) || 0)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                />
                            </div>
                        </div>

                        {/* Retirement Summary */}
                        <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-6 opacity-90">Retirement Projections</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-blue-100 text-sm mb-1">Expected Corpus</p>
                                        <p className="text-3xl font-bold">{formatCurrency(summary.totalCorpus)}</p>
                                    </div>
                                    <div>
                                        <p className="text-blue-100 text-sm mb-1">Monthly Pension</p>
                                        <p className="text-3xl font-bold text-green-300">{formatCurrency(summary.expectedMonthlyPension)}</p>
                                    </div>
                                    <div>
                                        <p className="text-blue-100 text-sm mb-1">Lump Sum Withdrawal</p>
                                        <p className="text-xl font-semibold">{formatCurrency(summary.lumpSumAmount)}</p>
                                    </div>
                                    <div>
                                        <p className="text-blue-100 text-sm mb-1">Wealth Gained</p>
                                        <p className="text-xl font-semibold">{formatCurrency(summary.totalGains)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -right-8 -bottom-8 opacity-10">
                                <Target className="h-48 w-48" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg h-full min-h-[500px] flex flex-col transition-colors">
                            <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-6">
                                Corpus Growth over the Years
                            </h3>
                            <div className="flex-1 min-h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-10" />
                                        <XAxis
                                            dataKey="age"
                                            stroke="currentColor"
                                            className="text-gray-600 dark:text-gray-400"
                                            fontSize={12}
                                            label={{ value: 'Age', position: 'insideBottom', offset: -5 }}
                                        />
                                        <YAxis
                                            stroke="currentColor"
                                            className="text-gray-600 dark:text-gray-400"
                                            fontSize={12}
                                            tickFormatter={(value) => `${(value / 10000000).toFixed(1)}Cr`}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                borderColor: '#e5e7eb',
                                                borderRadius: '12px',
                                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                            }}
                                            formatter={(value: number) => formatCurrency(value)}
                                            labelFormatter={(age) => `Age: ${age}`}
                                        />
                                        <Legend verticalAlign="top" height={36} />
                                        <Line
                                            type="monotone"
                                            dataKey="corpus"
                                            name="Total Corpus"
                                            stroke="#3B82F6"
                                            strokeWidth={3}
                                            dot={false}
                                            activeDot={{ r: 8 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="investment"
                                            name="Total Invested"
                                            stroke="#10B981"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default NPSCalculator;
