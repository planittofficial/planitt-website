'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Plus, Trash2, Edit3, Save, Calendar } from 'lucide-react';
import { formatIndianCompactCurrency } from '@/lib/numberFormat';

interface DailySIPEntry {
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

const DAILY_SIP_LIMITS = {
    amount: { min: 0, max: 100000 },
    duration: { min: 0, max: 50 },
    rate: { min: 0, max: 50 },
    startYear: { min: 0, max: 50 },
} as const;

const clampValue = (value: number, min: number, max: number) => {
    if (!Number.isFinite(value)) return min;
    return Math.min(max, Math.max(min, value));
};

const DailySIPCalculator: React.FC = () => {
    const [sipEntries, setSipEntries] = useState<DailySIPEntry[]>([
        { id: '1', amount: 100, duration: 5, rate: 12, startYear: 0 }
    ]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [summary, setSummary] = useState({
        totalInvested: 0,
        totalMaturity: 0,
        totalGain: 0
    });

    // Daily SIP Calculation Formula (n = 365)
    const calculateDailySIP = (amount: number, rate: number, years: number) => {
        const dailyRate = rate / 100 / 365;
        const days = years * 365;
        const futureValue = dailyRate > 0
            ? amount * ((Math.pow(1 + dailyRate, days) - 1) / dailyRate) * (1 + dailyRate)
            : amount * days;
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
                    const dailyRate = sip.rate / 100 / 365;
                    const days = sipYear * 365;
                    const invested = sip.amount * days;
                    const maturity = dailyRate > 0
                        ? sip.amount * ((Math.pow(1 + dailyRate, days) - 1) / dailyRate) * (1 + dailyRate)
                        : invested;

                    yearData[`sip${index + 1}_invested`] = invested;
                    yearData[`sip${index + 1}_maturity`] = maturity;
                    totalInvested += invested;
                    totalMaturity += maturity;
                } else if (year > sip.startYear + sip.duration) {
                    // After SIP ends, keep the final value
                    const finalMaturity = calculateDailySIP(sip.amount, sip.rate, sip.duration);
                    yearData[`sip${index + 1}_invested`] = sip.amount * sip.duration * 365;
                    yearData[`sip${index + 1}_maturity`] = finalMaturity;
                    totalInvested += sip.amount * sip.duration * 365;
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
            const invested = sip.amount * sip.duration * 365;
            const maturity = calculateDailySIP(sip.amount, sip.rate, sip.duration);
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
        const newSIP: DailySIPEntry = {
            id: Date.now().toString(),
            amount: 100,
            duration: 5,
            rate: 12,
            startYear: Math.max(...sipEntries.map(sip => sip.startYear + sip.duration), 0)
        };
        setSipEntries([...sipEntries, newSIP]);
    };

    const updateSIP = (id: string, field: keyof DailySIPEntry, value: number) => {
        let clampedValue = value;
        if (field === 'amount') clampedValue = clampValue(value, DAILY_SIP_LIMITS.amount.min, DAILY_SIP_LIMITS.amount.max);
        if (field === 'duration') clampedValue = clampValue(value, DAILY_SIP_LIMITS.duration.min, DAILY_SIP_LIMITS.duration.max);
        if (field === 'rate') clampedValue = clampValue(value, DAILY_SIP_LIMITS.rate.min, DAILY_SIP_LIMITS.rate.max);
        if (field === 'startYear') clampedValue = clampValue(value, DAILY_SIP_LIMITS.startYear.min, DAILY_SIP_LIMITS.startYear.max);

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
                <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white dark:from-emerald-700 dark:to-teal-800">
                    <div className="flex items-center space-x-3 mb-2">
                        <Calendar className="h-8 w-8 text-emerald-100" />
                        <h2 className="text-3xl font-bold">Daily SIP Portfolio Calculator</h2>
                    </div>
                    <p className="text-emerald-100">Plan and track multiple daily SIP investments with enhanced compounding benefits</p>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Input Section */}
                        <div className="xl:col-span-1">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center space-x-2">
                                <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                <span>Daily SIP Entries</span>
                            </h3>
                            <div className="space-y-4">
                                {sipEntries.map((sip, index) => (
                                    <motion.div
                                        key={sip.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-800/50 rounded-lg p-4 border border-emerald-200 dark:border-gray-700"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                                                <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                                <span>Daily SIP {index + 1}</span>
                                            </h4>
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
                                                    Daily Amount (₹)
                                                </label>
                                                <input
                                                    type="number"
                                                    min={DAILY_SIP_LIMITS.amount.min}
                                                    max={DAILY_SIP_LIMITS.amount.max}
                                                    step="10"
                                                    value={sip.amount}
                                                    onChange={(e) => updateSIP(sip.id, 'amount', Number(e.target.value))}
                                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 dark:text-white"
                                                    disabled={editingId !== sip.id}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                                    Duration (Years)
                                                </label>
                                                <input
                                                    type="number"
                                                    min={DAILY_SIP_LIMITS.duration.min}
                                                    max={DAILY_SIP_LIMITS.duration.max}
                                                    value={sip.duration}
                                                    onChange={(e) => updateSIP(sip.id, 'duration', Number(e.target.value))}
                                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 dark:text-white"
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
                                                    min={DAILY_SIP_LIMITS.rate.min}
                                                    max={DAILY_SIP_LIMITS.rate.max}
                                                    value={sip.rate}
                                                    onChange={(e) => updateSIP(sip.id, 'rate', Number(e.target.value))}
                                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 dark:text-white"
                                                    disabled={editingId !== sip.id}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                                    Start Year
                                                </label>
                                                <input
                                                    type="number"
                                                    min={DAILY_SIP_LIMITS.startYear.min}
                                                    max={DAILY_SIP_LIMITS.startYear.max}
                                                    value={sip.startYear}
                                                    onChange={(e) => updateSIP(sip.id, 'startYear', Number(e.target.value))}
                                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 dark:text-white"
                                                    disabled={editingId !== sip.id}
                                                />
                                            </div>

                                            {/* Quick Summary */}
                                            <div className="bg-white dark:bg-gray-900 p-3 rounded border border-emerald-200 dark:border-gray-700">
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    <div className="flex justify-between">
                                                        <span>Daily Investment:</span>
                                                        <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(sip.amount)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Total Invested:</span>
                                                        <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(sip.amount * sip.duration * 365)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Maturity Value:</span>
                                                        <span className="font-medium text-emerald-600 dark:text-emerald-400">{formatCurrency(calculateDailySIP(sip.amount, sip.rate, sip.duration))}</span>
                                                    </div>
                                                    <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-1 mt-1">
                                                        <span className="font-medium">Gain:</span>
                                                        <span className="font-bold text-green-600 dark:text-green-400">
                                                            {formatCurrency(calculateDailySIP(sip.amount, sip.rate, sip.duration) - sip.amount * sip.duration * 365)}
                                                        </span>
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
                                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20"
                                >
                                    <Plus className="h-5 w-5" />
                                    <span>Add Daily SIP</span>
                                </motion.button>
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="xl:col-span-2">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center space-x-2">
                                <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                <span>Daily SIP Growth Visualization</span>
                            </h3>
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

                                        {/* Individual Daily SIP lines */}
                                        {sipEntries.map((sip, index) => (
                                            <Line
                                                key={`sip${index + 1}_invested`}
                                                type="monotone"
                                                dataKey={`sip${index + 1}_invested`}
                                                stroke={colors[index % colors.length]}
                                                strokeWidth={2}
                                                strokeDasharray="5 5"
                                                name={`Daily SIP ${index + 1} Invested`}
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
                                                name={`Daily SIP ${index + 1} Maturity`}
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
                                            stroke={sipEntries.length > 0 ? '#10B981' : '#1f2937'}
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
                                    className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg shadow-emerald-500/20"
                                >
                                    <h4 className="text-sm font-medium opacity-90 mb-2">Total Invested</h4>
                                    <p className="text-2xl font-bold">{formatCurrency(summary.totalInvested)}</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-6 rounded-xl shadow-lg shadow-teal-500/20"
                                >
                                    <h4 className="text-sm font-medium opacity-90 mb-2">Total Maturity</h4>
                                    <p className="text-2xl font-bold">{formatCurrency(summary.totalMaturity)}</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-6 rounded-xl shadow-lg shadow-cyan-500/20"
                                >
                                    <h4 className="text-sm font-medium opacity-90 mb-2">Total Gain</h4>
                                    <p className="text-2xl font-bold">{formatCurrency(summary.totalGain)}</p>
                                    <p className="text-sm opacity-90 mt-1">
                                        {((summary.totalGain / summary.totalInvested) * 100).toFixed(1)}% return
                                    </p>
                                </motion.div>
                            </div>

                            {/* Daily SIP Benefits Info */}
                            <div className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-800/50 rounded-lg p-4 border border-emerald-200 dark:border-gray-700">
                                <h4 className="font-semibold text-emerald-800 dark:text-emerald-400 mb-2 flex items-center space-x-2">
                                    <Calendar className="h-5 w-5" />
                                    <span>Daily SIP Benefits</span>
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-emerald-700 dark:text-emerald-300">
                                    <div>
                                        <p className="font-medium">Higher Compounding:</p>
                                        <p>365 compounding periods vs 12 in monthly SIPs</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Better Rupee Cost Averaging:</p>
                                        <p>More frequent investments reduce market volatility impact</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DailySIPCalculator;
