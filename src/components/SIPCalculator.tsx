'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Plus, Trash2, Edit3, Save } from 'lucide-react';
import { formatIndianCompactCurrency } from '@/lib/numberFormat';

interface SIPEntry {
    id: string;
    amount: number;
    duration: number;
    rate: number;
    startYear: number;
}

interface ChartData {
    year: number;
    [key: string]: number;
}

const SIP_LIMITS = {
    amount: { min: 0, max: 1000000 },
    duration: { min: 0, max: 50 },
    rate: { min: 0, max: 50 },
    startYear: { min: 0, max: 50 },
} as const;

const clampValue = (value: number, min: number, max: number) => {
    if (!Number.isFinite(value)) return min;
    return Math.min(max, Math.max(min, value));
};

const SIPCalculator: React.FC = () => {
    const [sipEntries, setSipEntries] = useState<SIPEntry[]>([
        { id: '1', amount: 5000, duration: 5, rate: 12, startYear: 0 }
    ]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [summary, setSummary] = useState({
        totalInvested: 0,
        totalMaturity: 0,
        totalGain: 0
    });

    // SIP Calculation Formula
    const calculateSIP = (amount: number, rate: number, years: number) => {
        const monthlyRate = rate / 100 / 12;
        const months = years * 12;
        const futureValue = monthlyRate > 0
            ? amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
            : amount * months;
        return futureValue;
    };

    // Generate chart data
    const generateChartData = useCallback(() => {
        const maxDuration = Math.max(...sipEntries.map(sip => sip.startYear + sip.duration));
        const data: ChartData[] = [];

        for (let year = 1; year <= maxDuration; year++) {
            const yearData: ChartData = { year };
            let totalInvested = 0;
            let totalMaturity = 0;

            sipEntries.forEach((sip, index) => {
                if (year >= sip.startYear + 1 && year <= sip.startYear + sip.duration) {
                    const sipYear = year - sip.startYear;
                    const monthlyRate = sip.rate / 100 / 12;
                    const months = sipYear * 12;
                    const invested = sip.amount * months;
                    const maturity = monthlyRate > 0
                        ? sip.amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
                        : invested;

                    yearData[`sip${index + 1}_invested`] = invested;
                    yearData[`sip${index + 1}_maturity`] = maturity;
                    totalInvested += invested;
                    totalMaturity += maturity;
                } else if (year > sip.startYear + sip.duration) {
                    // After SIP ends, keep the final value
                    const finalMaturity = calculateSIP(sip.amount, sip.rate, sip.duration);
                    yearData[`sip${index + 1}_invested`] = sip.amount * sip.duration * 12;
                    yearData[`sip${index + 1}_maturity`] = finalMaturity;
                    totalInvested += sip.amount * sip.duration * 12;
                    totalMaturity += finalMaturity;
                }
            });

            yearData.totalInvested = totalInvested;
            yearData.totalMaturity = totalMaturity;
            data.push(yearData);
        }

        setChartData(data);
    }, [sipEntries]);

    // Calculate summary
    const calculateSummary = useCallback(() => {
        let totalInvested = 0;
        let totalMaturity = 0;

        sipEntries.forEach(sip => {
            const invested = sip.amount * sip.duration * 12;
            const maturity = calculateSIP(sip.amount, sip.rate, sip.duration);
            totalInvested += invested;
            totalMaturity += maturity;
        });

        setSummary({
            totalInvested,
            totalMaturity,
            totalGain: totalMaturity - totalInvested
        });
    }, [sipEntries]);

    useEffect(() => {
        generateChartData();
        calculateSummary();
    }, [generateChartData, calculateSummary]);

    const addSIP = () => {
        const newSIP: SIPEntry = {
            id: Date.now().toString(),
            amount: 5000,
            duration: 5,
            rate: 12,
            startYear: Math.max(...sipEntries.map(sip => sip.startYear + sip.duration), 0)
        };
        setSipEntries([...sipEntries, newSIP]);
    };

    const updateSIP = (id: string, field: keyof SIPEntry, value: number) => {
        let clampedValue = value;
        if (field === 'amount') clampedValue = clampValue(value, SIP_LIMITS.amount.min, SIP_LIMITS.amount.max);
        if (field === 'duration') clampedValue = clampValue(value, SIP_LIMITS.duration.min, SIP_LIMITS.duration.max);
        if (field === 'rate') clampedValue = clampValue(value, SIP_LIMITS.rate.min, SIP_LIMITS.rate.max);
        if (field === 'startYear') clampedValue = clampValue(value, SIP_LIMITS.startYear.min, SIP_LIMITS.startYear.max);

        setSipEntries(sipEntries.map(sip =>
            sip.id === id ? { ...sip, [field]: clampedValue } : sip
        ));
    };

    const deleteSIP = (id: string) => {
        setSipEntries(sipEntries.filter(sip => sip.id !== id));
    };

    const startEditing = (id: string) => {
        setEditingId(id);
    };

    const stopEditing = () => {
        setEditingId(null);
    };

    const formatCurrency = (amount: number) => formatIndianCompactCurrency(amount);

    const colors = [
        '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
        '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
    ];

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen bg-transparent">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-transparent dark:border-gray-800 transition-colors"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white dark:from-blue-700 dark:to-indigo-800">
                    <h2 className="text-3xl font-bold mb-2">SIP Portfolio Calculator</h2>
                    <p className="text-blue-100">Plan and track multiple SIP investments with dynamic growth visualization</p>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Input Section */}
                        <div className="xl:col-span-1">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">SIP Entries</h3>
                            <div className="space-y-4">
                                {sipEntries.map((sip, index) => (
                                    <motion.div
                                        key={sip.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-medium text-gray-700 dark:text-gray-300">SIP {index + 1}</h4>
                                            <div className="flex space-x-2">
                                                {editingId === sip.id ? (
                                                    <button
                                                        onClick={stopEditing}
                                                        className="p-1 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded"
                                                    >
                                                        <Save className="h-4 w-4" />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => startEditing(sip.id)}
                                                        className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded"
                                                    >
                                                        <Edit3 className="h-4 w-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteSIP(sip.id)}
                                                    className="p-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                                    Monthly Amount (₹)
                                                </label>
                                                <input
                                                    type="number"
                                                    min={SIP_LIMITS.amount.min}
                                                    max={SIP_LIMITS.amount.max}
                                                    step="100"
                                                    value={sip.amount}
                                                    onChange={(e) => updateSIP(sip.id, 'amount', Number(e.target.value))}
                                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                                                    disabled={editingId !== sip.id}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                                    Duration (Years)
                                                </label>
                                                <input
                                                    type="number"
                                                    min={SIP_LIMITS.duration.min}
                                                    max={SIP_LIMITS.duration.max}
                                                    value={sip.duration}
                                                    onChange={(e) => updateSIP(sip.id, 'duration', Number(e.target.value))}
                                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                                                    disabled={editingId !== sip.id}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                                    Expected Return (% p.a.)
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    min={SIP_LIMITS.rate.min}
                                                    max={SIP_LIMITS.rate.max}
                                                    value={sip.rate}
                                                    onChange={(e) => updateSIP(sip.id, 'rate', Number(e.target.value))}
                                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                                                    disabled={editingId !== sip.id}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                                    Start Year
                                                </label>
                                                <input
                                                    type="number"
                                                    min={SIP_LIMITS.startYear.min}
                                                    max={SIP_LIMITS.startYear.max}
                                                    value={sip.startYear}
                                                    onChange={(e) => updateSIP(sip.id, 'startYear', Number(e.target.value))}
                                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                                                    disabled={editingId !== sip.id}
                                                />
                                            </div>

                                            {/* Quick Summary */}
                                            <div className="bg-white dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    <div>Invested: <span className="text-gray-900 dark:text-white">{formatCurrency(sip.amount * sip.duration * 12)}</span></div>
                                                    <div>Maturity: <span className="text-gray-900 dark:text-white">{formatCurrency(calculateSIP(sip.amount, sip.rate, sip.duration))}</span></div>
                                                    <div className="font-medium text-green-600 dark:text-green-400">
                                                        Gain: {formatCurrency(calculateSIP(sip.amount, sip.rate, sip.duration) - sip.amount * sip.duration * 12)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                <motion.button
                                    onClick={addSIP}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/20"
                                >
                                    <Plus className="h-5 w-5" />
                                    <span>Add SIP</span>
                                </motion.button>
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="xl:col-span-2">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Growth Visualization</h3>
                            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-800">
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-10" />
                                        <XAxis
                                            dataKey="year"
                                            stroke="currentColor"
                                            className="text-gray-600 dark:text-gray-400"
                                            fontSize={12}
                                        />
                                        <YAxis
                                            stroke="currentColor"
                                            className="text-gray-600 dark:text-gray-400"
                                            fontSize={12}
                                            tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                                        />
                                        <Tooltip
                                            formatter={(value: number, name: string) => [
                                                formatCurrency(value),
                                                name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
                                            ]}
                                            labelFormatter={(year) => `Year ${year}`}
                                            contentStyle={{
                                                backgroundColor: 'var(--tooltip-bg)',
                                                borderColor: 'var(--tooltip-border)',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                                color: 'var(--tooltip-text)'
                                            }}
                                            itemStyle={{ color: 'inherit' }}
                                        />
                                        <Legend />

                                        {/* Individual SIP lines */}
                                        {sipEntries.map((sip, index) => (
                                            <Line
                                                key={`sip${index + 1}_invested`}
                                                type="monotone"
                                                dataKey={`sip${index + 1}_invested`}
                                                stroke={colors[index % colors.length]}
                                                strokeWidth={2}
                                                strokeDasharray="5 5"
                                                name={`SIP ${index + 1} Invested`}
                                                dot={false}
                                            />
                                        ))}

                                        {sipEntries.map((sip, index) => (
                                            <Line
                                                key={`sip${index + 1}_maturity`}
                                                type="monotone"
                                                dataKey={`sip${index + 1}_maturity`}
                                                stroke={colors[index % colors.length]}
                                                strokeWidth={3}
                                                name={`SIP ${index + 1} Maturity`}
                                                dot={false}
                                            />
                                        ))}

                                        {/* Total lines */}
                                        <Line
                                            type="monotone"
                                            dataKey="totalInvested"
                                            stroke="#6b7280"
                                            strokeWidth={2}
                                            strokeDasharray="5 5"
                                            name="Total Invested"
                                            dot={false}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="totalMaturity"
                                            stroke={sipEntries.length > 0 ? '#3B82F6' : '#1f2937'}
                                            strokeWidth={4}
                                            name="Total Portfolio"
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Summary Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white p-6 rounded-xl shadow-lg shadow-blue-500/20"
                                >
                                    <h4 className="text-sm font-medium opacity-90 mb-2">Total Invested</h4>
                                    <p className="text-2xl font-bold">{formatCurrency(summary.totalInvested)}</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white p-6 rounded-xl shadow-lg shadow-green-500/20"
                                >
                                    <h4 className="text-sm font-medium opacity-90 mb-2">Total Maturity</h4>
                                    <p className="text-2xl font-bold">{formatCurrency(summary.totalMaturity)}</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 text-white p-6 rounded-xl shadow-lg shadow-purple-500/20"
                                >
                                    <h4 className="text-sm font-medium opacity-90 mb-2">Total Gain</h4>
                                    <p className="text-2xl font-bold">{formatCurrency(summary.totalGain)}</p>
                                    <p className="text-sm opacity-90 mt-1">
                                        {((summary.totalGain / summary.totalInvested) * 100).toFixed(1)}% return
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SIPCalculator;
