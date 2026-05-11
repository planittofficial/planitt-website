'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calculator, TrendingUp, IndianRupee, Target } from 'lucide-react';
import { formatIndianCompactCurrency } from '@/lib/numberFormat';

interface CalculatorData {
    monthlyInvestment: number;
    duration: number;
    expectedReturns: number;
    topUpAmount: number;
    topUpFrequency: '6months' | 'annually';
}

interface ChartData {
    year: number;
    investment: number;
    corpus: number;
    gains: number;
}

const LIMITS = {
    monthlyInvestment: { min: 0, max: 1000000 },
    duration: { min: 0, max: 100 },
    expectedReturns: { min: 0, max: 50 },
    topUpAmount: { min: 0, max: 100000 },
} as const;

const clampValue = (value: number, min: number, max: number) => {
    if (!Number.isFinite(value)) return min;
    return Math.min(max, Math.max(min, value));
};

const FinancialCalculator = () => {
    const [formData, setFormData] = useState<CalculatorData>({
        monthlyInvestment: 5000,
        duration: 10,
        expectedReturns: 12,
        topUpAmount: 0,
        topUpFrequency: 'annually'
    });

    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [summary, setSummary] = useState({
        totalInvestment: 0,
        maturityValue: 0,
        totalGains: 0
    });

    useEffect(() => {
        const { monthlyInvestment, duration, expectedReturns, topUpAmount, topUpFrequency } = formData;
        const data: ChartData[] = [];
        const monthlyRate = expectedReturns / 100 / 12;
        let totalInvestment = 0;
        let corpus = 0;
        let gains = 0;

        for (let year = 1; year <= duration; year++) {
            // Calculate total invested up to this year
            totalInvestment = monthlyInvestment * 12 * year;

            // Add top-up if applicable
            if (topUpAmount > 0) {
                if (topUpFrequency === 'annually') {
                    totalInvestment += topUpAmount * year;
                } else if (topUpFrequency === '6months') {
                    totalInvestment += topUpAmount * 2 * year;
                }
            }

            // Calculate corpus using Future Value of Annuity formula (SIP formula)
            // FV = PMT × [((1 + r)^n - 1) / r]
            const monthsInvested = year * 12;
            if (monthlyRate > 0) {
                corpus = monthlyInvestment * ((Math.pow(1 + monthlyRate, monthsInvested) - 1) / monthlyRate);
            } else {
                corpus = monthlyInvestment * monthsInvested;
            }

            // Add top-up corpus if applicable
            if (topUpAmount > 0) {
                if (topUpFrequency === 'annually') {
                    // Add top-up with compound interest for each year
                    for (let topUpYear = 1; topUpYear <= year; topUpYear++) {
                        const topUpMonthsRemaining = (year - topUpYear + 1) * 12;
                        corpus += topUpAmount * Math.pow(1 + monthlyRate, topUpMonthsRemaining);
                    }
                } else if (topUpFrequency === '6months') {
                    // Add top-up with compound interest for each 6-month period
                    for (let topUpPeriod = 1; topUpPeriod <= year * 2; topUpPeriod++) {
                        const topUpMonthsRemaining = (year * 2 - topUpPeriod + 1) * 6;
                        corpus += topUpAmount * Math.pow(1 + monthlyRate, topUpMonthsRemaining);
                    }
                }
            }

            gains = corpus - totalInvestment;

            data.push({
                year,
                investment: Math.round(totalInvestment),
                corpus: Math.round(corpus),
                gains: Math.round(gains)
            });
        }

        setChartData(data);
        setSummary({
            totalInvestment: Math.round(totalInvestment),
            maturityValue: Math.round(corpus),
            totalGains: Math.round(gains)
        });
    }, [formData]);

    const formatCurrency = (value: number) => formatIndianCompactCurrency(value);

    const handleInputChange = (field: keyof CalculatorData, value: number | string) => {
        if (field === 'topUpFrequency') {
            setFormData(prev => ({
                ...prev,
                topUpFrequency: value as '6months' | 'annually'
            }));
            return;
        }

        const numericValue = Number(value);
        let clampedValue = numericValue;

        if (field === 'monthlyInvestment') {
            clampedValue = clampValue(numericValue, LIMITS.monthlyInvestment.min, LIMITS.monthlyInvestment.max);
        } else if (field === 'duration') {
            clampedValue = clampValue(numericValue, LIMITS.duration.min, LIMITS.duration.max);
        } else if (field === 'expectedReturns') {
            clampedValue = clampValue(numericValue, LIMITS.expectedReturns.min, LIMITS.expectedReturns.max);
        } else if (field === 'topUpAmount') {
            clampedValue = clampValue(numericValue, LIMITS.topUpAmount.min, LIMITS.topUpAmount.max);
        }

        setFormData(prev => ({
            ...prev,
            [field]: clampedValue
        }));
    };

    return (
        <section id="calculator" className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
                        <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Investment Calculator
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Plan your financial future with our comprehensive calculator. 
                        See how your investments can grow over time with different scenarios.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Calculator Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-transparent dark:border-gray-800 transition-colors">
                            <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Investment Parameters
                            </h3>

                            {/* Monthly Investment */}
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Monthly Investment (₹)
                                </label>
                                <div className="">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000000"
                                        step="1000"
                                        value={formData.monthlyInvestment}
                                        onChange={(e) => handleInputChange('monthlyInvestment', parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                        style={{
                                            '--slider-value': (formData.monthlyInvestment / 1000000) * 100
                                        } as React.CSSProperties}
                                    />
                                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                                        <span>₹0</span>
                                        <span>₹10,00,000</span>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    min={LIMITS.monthlyInvestment.min}
                                    max={LIMITS.monthlyInvestment.max}
                                    value={formData.monthlyInvestment}
                                    onChange={(e) => handleInputChange('monthlyInvestment', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                />
                            </div>

                            {/* Duration */}
                            <div className="mt-5 space-y-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Duration (Years)
                                </label>
                                <div className="">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={formData.duration}
                                        onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                        style={{
                                            '--slider-value': (formData.duration / 100) * 100
                                        } as React.CSSProperties}
                                    />
                                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                                        <span>0 Year</span>
                                        <span>100 Years</span>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.duration}
                                    onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                />
                            </div>

                            {/* Expected Returns */}
                            <div className="mt-5 space-y-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Expected Returns (% p.a.)
                                </label>
                                <div className="">
                                    <input
                                        type="range"
                                        min="0"
                                        max="50"
                                        step="0.5"
                                        value={formData.expectedReturns}
                                        onChange={(e) => handleInputChange('expectedReturns', parseFloat(e.target.value))}
                                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                        style={{
                                            '--slider-value': (formData.expectedReturns / 50) * 100
                                        } as React.CSSProperties}
                                    />
                                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                                        <span>0%</span>
                                        <span>50%</span>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    step="0.5"
                                    min="0"
                                    max="50"
                                    value={formData.expectedReturns}
                                    onChange={(e) => handleInputChange('expectedReturns', parseFloat(e.target.value) || 0)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                />
                            </div>

                            {/* Top-up Amount */}
                            <div className="mt-5 space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Periodic Top-up (Optional) (₹)
                                    </label>
                                    <select
                                        value={formData.topUpFrequency}
                                        onChange={(e) => handleInputChange('topUpFrequency', e.target.value as '6months' | 'annually')}
                                        className="text-xs bg-gray-100 dark:bg-gray-800 border-none rounded-md px-2 py-1 text-gray-600 dark:text-gray-400"
                                    >
                                        <option value="annually">Every Year</option>
                                        <option value="6months">Every 6 Months</option>
                                    </select>
                                </div>
                                <div className="">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100000"
                                        step="1000"
                                        value={formData.topUpAmount}
                                        onChange={(e) => handleInputChange('topUpAmount', parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                        style={{
                                            '--slider-value': (formData.topUpAmount / 100000) * 100
                                        } as React.CSSProperties}
                                    />
                                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                                        <span>₹0</span>
                                        <span>₹1,00,000</span>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    min="0"
                                    max="100000"
                                    value={formData.topUpAmount}
                                    onChange={(e) => handleInputChange('topUpAmount', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Chart and Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* Chart */}
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg transition-colors">
                            <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-6">
                                Investment Growth Projection
                            </h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-10" />
                                        <XAxis
                                            dataKey="year"
                                            stroke="currentColor"
                                            fontSize={12}
                                            className="text-gray-600 dark:text-gray-400"
                                        />
                                        <YAxis
                                            stroke="currentColor"
                                            fontSize={12}
                                            tickFormatter={(value) => `${(value / 100000).toFixed(1)}L`}
                                            className="text-gray-600 dark:text-gray-400"
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'var(--tooltip-bg)',
                                                borderColor: 'var(--tooltip-border)',
                                                borderRadius: '8px',
                                                color: 'var(--tooltip-text)'
                                            }}
                                            itemStyle={{ color: 'inherit' }}
                                            formatter={(value: number, name: string) => [
                                                formatCurrency(value),
                                                name === 'investment' ? 'Total Investment' :
                                                    name === 'corpus' ? 'Maturity Value' : 'Gains'
                                            ]}
                                            labelFormatter={(year) => `Year ${year}`}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="investment"
                                            stroke="#3B82F6"
                                            strokeWidth={3}
                                            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                                            name="Total Invested"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="corpus"
                                            stroke="#10B981"
                                            strokeWidth={3}
                                            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                                            name="Maturity Value"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="gains"
                                            stroke="#F59E0B"
                                            strokeWidth={3}
                                            dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                                            name="Interest Gained"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center border border-transparent dark:border-blue-800/30 transition-colors">
                                <IndianRupee className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Total Investment</h4>
                                <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                                    {formatCurrency(summary.totalInvestment)}
                                </p>
                            </div>

                            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center border border-transparent dark:border-green-800/30 transition-colors">
                                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
                                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Maturity Value</h4>
                                <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                                    {formatCurrency(summary.maturityValue)}
                                </p>
                            </div>

                            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 text-center border border-transparent dark:border-orange-800/30 transition-colors">
                                <Target className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
                                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Total Gains</h4>
                                <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                                    {formatCurrency(summary.totalGains)}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FinancialCalculator;
