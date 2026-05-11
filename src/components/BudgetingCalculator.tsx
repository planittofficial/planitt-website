
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Calculator, Camera, TrendingUp, IndianRupee, Target } from 'lucide-react';
import domtoimage from 'dom-to-image';
import CombinedSnapshot1 from './CombinedSnapshot1';
import CombinedSnapshot2 from './CombinedSnapshot2';
import { formatIndianCompactCurrency } from '@/lib/numberFormat';

interface BudgetData {
    monthlyIncome: number;
    monthlyExpense: number;
}

interface PieData {
    name: string;
    value: number;
    color: string;
    [key: string]: string | number | boolean | null | undefined;
}

interface SIPChartData {
    year: number;
    investment: number;
    corpus: number;
    gains: number;
}

const BudgetingCalculator = () => {
    const [budgetData, setBudgetData] = useState<BudgetData>({
        monthlyIncome: 50000,
        monthlyExpense: 35000
    });

    const [pieData, setPieData] = useState<PieData[]>([]);
    const [totalSavings, setTotalSavings] = useState(0);
    const [savingsPercentage, setSavingsPercentage] = useState(0);
    const [securityStatus, setSecurityStatus] = useState('');
    const [sipDuration, setSipDuration] = useState(10);
    const [sipChartData, setSipChartData] = useState<SIPChartData[]>([]);
    const [sipSummary, setSipSummary] = useState({
        totalInvestment: 0,
        maturityValue: 0,
        totalGains: 0
    });
    const [goalAmount, setGoalAmount] = useState(15000000); // 1.5 crores default
    const [goalDuration, setGoalDuration] = useState(25);
    const [monthlySIPRequired, setMonthlySIPRequired] = useState(0);
    const chartRef = useRef<HTMLDivElement>(null);
    const dashboardRef = useRef<HTMLDivElement>(null);
    const snapshot1Ref = useRef<HTMLDivElement>(null);
    const snapshot2Ref = useRef<HTMLDivElement>(null);

    const formatCurrency = (amount: number) => formatIndianCompactCurrency(amount);

    const calculateSIP = useCallback(() => {
        if (totalSavings <= 0) return;

        const monthlyInvestment = totalSavings;
        const expectedReturns = 18; // Fixed at 18%
        const monthlyRate = expectedReturns / 100 / 12;
        const data: SIPChartData[] = [];
        let totalInvested = 0;
        let corpus = 0;
        let gains = 0;

        for (let year = 1; year <= sipDuration; year++) {
            // Calculate total invested up to this year
            totalInvested = monthlyInvestment * 12 * year;

            // Calculate corpus using Future Value of Annuity formula
            // FV = PMT × [((1 + r)^n - 1) / r]
            const monthsInvested = year * 12;
            if (monthlyRate > 0) {
                corpus = monthlyInvestment * ((Math.pow(1 + monthlyRate, monthsInvested) - 1) / monthlyRate);
            } else {
                corpus = monthlyInvestment * monthsInvested;
            }

            gains = corpus - totalInvested;

            data.push({
                year,
                investment: Math.round(totalInvested),
                corpus: Math.round(corpus),
                gains: Math.round(gains)
            });
        }

        setSipChartData(data);
        setSipSummary({
            totalInvestment: Math.round(totalInvested),
            maturityValue: Math.round(corpus),
            totalGains: Math.round(gains)
        });
    }, [totalSavings, sipDuration]);

    const calculateBudget = useCallback(() => {
        const savings = budgetData.monthlyIncome - budgetData.monthlyExpense;
        setTotalSavings(savings);

        const percentage = budgetData.monthlyIncome > 0 ? (savings / budgetData.monthlyIncome) * 100 : 0;
        setSavingsPercentage(percentage);

        // Determine security status
        if (percentage >= 30) {
            setSecurityStatus('Very Secure');
        } else if (percentage >= 20) {
            setSecurityStatus('Secure');
        } else if (percentage >= 10) {
            setSecurityStatus('Moderate');
        } else {
            setSecurityStatus('Needs Improvement');
        }

        // Create pie chart data
        const data: PieData[] = [
            {
                name: 'Monthly Expenses',
                value: budgetData.monthlyExpense,
                color: '#3B82F6' // Blue
            },
            {
                name: 'Savings',
                value: savings,
                color: '#10B981' // Green
            }
        ];

        setPieData(data);
    }, [budgetData]);

    useEffect(() => {
        calculateBudget();
    }, [budgetData, calculateBudget]);

    useEffect(() => {
        calculateSIP();
    }, [calculateSIP]);

    const calculateGoalSIP = useCallback(() => {
        const expectedReturns = 18; // Fixed at 18%
        const monthlyRate = expectedReturns / 100 / 12;
        const totalMonths = goalDuration * 12;

        // Calculate monthly SIP required using PMT formula
        // PMT = FV / [((1 + r)^n - 1) / r]
        if (totalMonths <= 0) {
            setMonthlySIPRequired(0);
        } else if (monthlyRate > 0) {
            const monthlySIP = goalAmount / (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate));
            setMonthlySIPRequired(monthlySIP);
        } else {
            setMonthlySIPRequired(goalAmount / totalMonths);
        }
    }, [goalAmount, goalDuration]);

    useEffect(() => {
        calculateGoalSIP();
    }, [calculateGoalSIP]);

    const handleInputChange = (field: keyof BudgetData, value: number) => {
        let clampedValue = value;
        if (field === 'monthlyIncome') {
            clampedValue = Math.max(0, Math.min(500000, value));
        } else if (field === 'monthlyExpense') {
            clampedValue = Math.max(0, Math.min(400000, value));
        }
        setBudgetData(prev => ({
            ...prev,
            [field]: clampedValue
        }));
    };

    const takeSnapshot1 = async () => {
        try {
            if (!snapshot1Ref.current) {
                alert('Snapshot component not found. Please try again.');
                return;
            }

            // Show loading message
            const originalButtonText = document.querySelector('[data-snapshot-button-1]')?.textContent;
            const snapshotButton = document.querySelector('[data-snapshot-button-1]') as HTMLButtonElement;
            if (snapshotButton) {
                snapshotButton.textContent = 'Capturing...';
                snapshotButton.disabled = true;
            }

            // Wait a bit for components to render
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Debug: Check if component has content
            console.log('Snapshot1 element:', snapshot1Ref.current);
            console.log('Snapshot1 innerHTML length:', snapshot1Ref.current?.innerHTML?.length);

            // Capture the snapshot component using dom-to-image
            const dataUrl = await domtoimage.toJpeg(snapshot1Ref.current, {
                quality: 0.95,
                bgcolor: '#ffffff',
                width: 1200,
                height: snapshot1Ref.current.scrollHeight
            });

            // Create download link
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `SIP Investment Projection-${new Date().toISOString().split('T')[0]}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Show success message
            alert('SIP Investment Projection snapshot captured successfully! Check your downloads folder.');

            // Restore button state
            if (snapshotButton) {
                snapshotButton.textContent = originalButtonText || 'Take Snapshot';
                snapshotButton.disabled = false;
            }

        } catch (error) {
            console.error('Error capturing snapshot:', error);
            alert('Failed to capture snapshot. Please try again.');

            // Restore button state
            const snapshotButton = document.querySelector('[data-snapshot-button-1]') as HTMLButtonElement;
            if (snapshotButton) {
                snapshotButton.textContent = 'Take Snapshot';
                snapshotButton.disabled = false;
            }
        }
    };

    const takeSnapshot2 = async () => {
        try {
            if (!snapshot2Ref.current) {
                alert('Snapshot component not found. Please try again.');
                return;
            }

            // Show loading message
            const originalButtonText = document.querySelector('[data-snapshot-button-2]')?.textContent;
            const snapshotButton = document.querySelector('[data-snapshot-button-2]') as HTMLButtonElement;
            if (snapshotButton) {
                snapshotButton.textContent = 'Capturing...';
                snapshotButton.disabled = true;
            }

            // Wait a bit for components to render
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Debug: Check if component has content
            console.log('Snapshot2 element:', snapshot2Ref.current);
            console.log('Snapshot2 innerHTML length:', snapshot2Ref.current?.innerHTML?.length);

            // Capture the snapshot component using dom-to-image
            const dataUrl = await domtoimage.toJpeg(snapshot2Ref.current, {
                quality: 0.95,
                bgcolor: '#ffffff',
                width: 1200,
                height: snapshot2Ref.current.scrollHeight
            });

            // Create download link
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `Goal Amount Calculation-${new Date().toISOString().split('T')[0]}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Show success message
            alert('Goal Amount Calculation snapshot captured successfully! Check your downloads folder.');

            // Restore button state
            if (snapshotButton) {
                snapshotButton.textContent = originalButtonText || 'Take Snapshot';
                snapshotButton.disabled = false;
            }

        } catch (error) {
            console.error('Error capturing snapshot:', error);
            alert('Failed to capture snapshot. Please try again.');

            // Restore button state
            const snapshotButton = document.querySelector('[data-snapshot-button-2]') as HTMLButtonElement;
            if (snapshotButton) {
                snapshotButton.textContent = 'Take Snapshot';
                snapshotButton.disabled = false;
            }
        }
    };

    return (
        <section id="budgeting-section" className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <div ref={dashboardRef} data-dashboard className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Your Style of Spending and Saving
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Track your monthly income and expenses to understand your financial patterns and optimize your savings.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Input Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col"
                    >
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-lg dark:shadow-gray-950/50 border border-transparent dark:border-gray-800 flex-1 flex flex-col transition-colors">
                            <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Monthly Financial Overview
                            </h3>

                            <div className="flex-1 flex flex-col justify-between">
                                <div className="space-y-4">
                                    {/* Monthly Income */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Monthly Income (₹)
                                        </label>
                                        <div className="mb-2">
                                            <input
                                                type="range"
                                                min="0"
                                                max="500000"
                                                step="1000"
                                                value={budgetData.monthlyIncome}
                                                onChange={(e) => handleInputChange('monthlyIncome', parseInt(e.target.value))}
                                                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                                style={{
                                                    '--slider-value': (budgetData.monthlyIncome / 500000) * 100
                                                } as React.CSSProperties}
                                            />
                                            <div className="flex justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                <span>₹0</span>
                                                <span>₹5L</span>
                                            </div>
                                        </div>
                                        <input
                                            type="number"
                                            value={budgetData.monthlyIncome}
                                            onChange={(e) => handleInputChange('monthlyIncome', parseInt(e.target.value) || 0)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-colors"
                                        />
                                    </div>

                                    {/* Monthly Expense */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Monthly Expenses (₹)
                                        </label>
                                        <div className="mb-2">
                                            <input
                                                type="range"
                                                min="0"
                                                max="400000"
                                                step="1000"
                                                value={budgetData.monthlyExpense}
                                                onChange={(e) => handleInputChange('monthlyExpense', parseInt(e.target.value))}
                                                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                                style={{
                                                    '--slider-value': (budgetData.monthlyExpense / 400000) * 100
                                                } as React.CSSProperties}
                                            />
                                            <div className="flex justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                <span>₹0</span>
                                                <span>₹4L</span>
                                            </div>
                                        </div>
                                        <input
                                            type="number"
                                            value={budgetData.monthlyExpense}
                                            onChange={(e) => handleInputChange('monthlyExpense', parseInt(e.target.value) || 0)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Summary Cards */}
                                <div className="grid grid-cols-2 gap-3 mt-6">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center transition-colors">
                                        <IndianRupee className="h-5 w-5 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1 text-xs">Total Income</h4>
                                        <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                                            {formatCurrency(budgetData.monthlyIncome)}
                                        </p>
                                    </div>

                                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 text-center transition-colors">
                                        <TrendingUp className="h-5 w-5 text-red-600 dark:text-red-400 mx-auto mb-1" />
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1 text-xs">Total Expenses</h4>
                                        <p className="text-lg font-bold text-red-700 dark:text-red-300">
                                            {formatCurrency(budgetData.monthlyExpense)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Chart Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col"
                    >
                        {/* Pie Chart */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-lg dark:shadow-gray-950/50 border border-transparent dark:border-gray-800 flex-1 flex flex-col transition-colors" ref={chartRef}>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                                <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                    Spending & Saving Distribution
                                </h3>
                                <button
                                    onClick={takeSnapshot1}
                                    data-snapshot-button-1
                                    className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm w-full sm:w-auto"
                                >
                                    <Camera className="h-4 w-4 mr-2" />
                                    Take Snapshot
                                </button>
                            </div>

                            <div className="flex-1 min-h-[300px] sm:min-h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={120}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Financial Health Assessment - Full Width */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-8"
                >
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg dark:shadow-gray-950/50 border border-transparent dark:border-gray-800 transition-colors">
                        <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Financial Health Assessment
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center transition-colors">
                                <Target className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
                                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Total Savings per Month</h4>
                                <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                                    {formatCurrency(totalSavings)}
                                </p>
                            </div>

                            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 text-center transition-colors">
                                <Calculator className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Savings Percentage</h4>
                                <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                                    {savingsPercentage.toFixed(1)}%
                                </p>
                            </div>

                            <div className={`rounded-xl p-6 text-center transition-colors ${securityStatus === 'Very Secure' ? 'bg-green-50 dark:bg-green-900/20' :
                                securityStatus === 'Secure' ? 'bg-blue-50 dark:bg-blue-900/20' :
                                    securityStatus === 'Moderate' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                                        'bg-red-50 dark:bg-red-900/20'
                                }`}>
                                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Financial Status</h4>
                                <p className={`text-2xl font-bold ${securityStatus === 'Very Secure' ? 'text-green-700 dark:text-green-300' :
                                    securityStatus === 'Secure' ? 'text-blue-700 dark:text-blue-300' :
                                        securityStatus === 'Moderate' ? 'text-yellow-700 dark:text-yellow-300' :
                                            'text-red-700 dark:text-red-300'
                                    }`}>
                                    {securityStatus}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SIP Calculator Section */}
                <motion.div
                    id="sip-section"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-16"
                >
                    <div className="text-center mb-12">
                        <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            SIP Investment Projection
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            See how your monthly savings can grow over time with a systematic investment plan at 18% annual returns.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* SIP Input Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="flex flex-col"
                        >
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-lg dark:shadow-gray-950/50 border border-transparent dark:border-gray-800 flex-1 flex flex-col transition-colors">
                                <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    SIP Parameters
                                </h3>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="space-y-4">
                                        {/* Fixed Monthly Investment (from savings) */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Monthly Investment (₹) - From Your Savings
                                            </label>
                                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 transition-colors">
                                                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                                    {formatCurrency(totalSavings)}
                                                </p>
                                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                    Automatically calculated from your budget
                                                </p>
                                            </div>
                                        </div>

                                        {/* Fixed Expected Returns */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Expected Returns (% p.a.)
                                            </label>
                                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 transition-colors">
                                                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                                    18%
                                                </p>
                                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                    Fixed rate for optimal growth
                                                </p>
                                            </div>
                                        </div>

                                        {/* Duration */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Duration (Years)
                                            </label>
                                            <div className="mb-2">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="30"
                                                    value={sipDuration}
                                                    onChange={(e) => setSipDuration(parseInt(e.target.value))}
                                                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                                    style={{
                                                        '--slider-value': ((sipDuration - 1) / (30 - 1)) * 100
                                                    } as React.CSSProperties}
                                                />
                                                <div className="flex justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                    <span>0 Year</span>
                                                    <span>30 Years</span>
                                                </div>
                                            </div>
                                            <input
                                                type="number"
                                                value={sipDuration}
                                                onChange={(e) => setSipDuration(Math.max(0, Math.min(30, parseInt(e.target.value) || 0)))}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* SIP Chart Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="flex flex-col"
                        >
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-lg dark:shadow-gray-950/50 border border-transparent dark:border-gray-800 flex-1 flex flex-col transition-colors">
                                <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    Investment Growth Projection
                                </h3>

                                <div className="flex-1 min-h-[300px] sm:min-h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={sipChartData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:opacity-10" />
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
                                                tickFormatter={(value) => `${(value / 100000).toFixed(1)}L`}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'var(--tooltip-bg)',
                                                    borderColor: 'var(--tooltip-border)',
                                                    color: 'var(--tooltip-text)'
                                                }}
                                                itemStyle={{ color: 'inherit' }}
                                                formatter={(value: number, name: string) => [
                                                    formatCurrency(value),
                                                    name === 'investment' ? 'Total Invested' :
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
                                                name="Gains"
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* SIP Summary - Full Width */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mt-8"
                    >
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg dark:shadow-gray-950/50 border border-transparent dark:border-gray-800 transition-colors">
                            <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                SIP Investment Summary
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center transition-colors">
                                    <IndianRupee className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Total Investment</h4>
                                    <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                                        {formatCurrency(sipSummary.totalInvestment)}
                                    </p>
                                </div>

                                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center transition-colors">
                                    <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
                                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Maturity Value</h4>
                                    <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                                        {formatCurrency(sipSummary.maturityValue)}
                                    </p>
                                </div>

                                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 text-center transition-colors">
                                    <Target className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
                                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Total Gains</h4>
                                    <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">
                                        {formatCurrency(sipSummary.totalGains)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Goal Amount Calculator Section */}
                <motion.div
                    id="goal-section"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-16"
                >
                    <div className="text-center mb-12">
                        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4 mb-6">
                            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                                Goal Amount Calculator
                            </h2>
                            <button
                                onClick={takeSnapshot2}
                                data-snapshot-button-2
                                className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm w-full sm:w-auto"
                            >
                                <Camera className="h-4 w-4 mr-2" />
                                Take Snapshot
                            </button>
                        </div>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Calculate the monthly SIP required to achieve your financial freedom goal at 18% annual returns.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-lg dark:shadow-gray-950/50 border border-transparent dark:border-gray-800 transition-colors">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Input Section */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="space-y-4"
                                >
                                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        Set Your Financial Goal
                                    </h3>

                                    {/* Freedom Number (Goal Amount) */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Freedom Number (Goal Amount) (₹)
                                        </label>
                                        <div className="mb-2">
                                            <input
                                                type="range"
                                                min="0"
                                                max="100000000"
                                                step="100000"
                                                value={goalAmount}
                                                onChange={(e) => setGoalAmount(parseInt(e.target.value))}
                                                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                                style={{
                                                    '--slider-value': (goalAmount / 100000000) * 100
                                                } as React.CSSProperties}
                                            />
                                            <div className="flex justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                <span>₹0</span>
                                                <span>₹10Cr</span>
                                            </div>
                                        </div>
                                        <input
                                            type="number"
                                            value={goalAmount}
                                            onChange={(e) => setGoalAmount(Math.max(0, Math.min(100000000, parseInt(e.target.value) || 0)))}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-colors"
                                            placeholder="Enter your goal amount"
                                        />
                                    </div>

                                    {/* Duration */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Duration (Years)
                                        </label>
                                        <div className="mb-2">
                                            <input
                                                type="range"
                                                min="0"
                                                max="40"
                                                value={goalDuration}
                                                onChange={(e) => setGoalDuration(parseInt(e.target.value))}
                                                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                                style={{
                                                    '--slider-value': (goalDuration / 40) * 100
                                                } as React.CSSProperties}
                                            />
                                            <div className="flex justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                <span>0 Years</span>
                                                <span>40 Years</span>
                                            </div>
                                        </div>
                                        <input
                                            type="number"
                                            value={goalDuration}
                                            onChange={(e) => setGoalDuration(Math.max(0, Math.min(40, parseInt(e.target.value) || 0)))}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-colors"
                                            placeholder="Enter duration in years"
                                        />
                                    </div>

                                    {/* Fixed Expected Returns */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Expected Returns (% p.a.)
                                        </label>
                                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 transition-colors">
                                            <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                                18%
                                            </p>
                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                Fixed rate for optimal growth
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Result Section */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="space-y-4"
                                >
                                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        Monthly SIP Required
                                    </h3>

                                    {/* Main Result Card */}
                                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 sm:p-6 text-center text-white shadow-lg shadow-green-500/20">
                                        <Calculator className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-3" />
                                        <h4 className="text-base sm:text-lg font-semibold mb-2">Monthly SIP Value</h4>
                                        <p className="text-2xl sm:text-3xl font-bold mb-2">
                                            {formatCurrency(monthlySIPRequired)}
                                        </p>
                                        <p className="text-green-100 text-xs sm:text-sm">
                                            Required monthly investment to achieve your goal
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Summary Cards - Below the main component */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="mt-6 sm:mt-8"
                            >
                                <h4 className="font-heading text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                                    Goal Summary
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 sm:p-4 text-center transition-colors">
                                        <Target className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1 text-xs sm:text-sm">Goal Amount</h4>
                                        <p className="text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-300">
                                            {formatCurrency(goalAmount)}
                                        </p>
                                    </div>

                                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 sm:p-4 text-center transition-colors">
                                        <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1 text-xs sm:text-sm">Duration</h4>
                                        <p className="text-lg sm:text-xl font-bold text-purple-700 dark:text-purple-300">
                                            {goalDuration} Years
                                        </p>
                                    </div>

                                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 sm:p-4 text-center transition-colors">
                                        <IndianRupee className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1 text-xs sm:text-sm">Total Investment</h4>
                                        <p className="text-lg sm:text-xl font-bold text-orange-700 dark:text-orange-300">
                                            {formatCurrency(monthlySIPRequired * goalDuration * 12)}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Snapshot Components - Positioned off-screen but visible for html2canvas */}
            <div style={{
                position: 'fixed',
                left: '-2000px',
                top: '0px',
                zIndex: -1,
                visibility: 'visible',
                opacity: 1
            }}>
                <div ref={snapshot1Ref} style={{ width: '1200px' }}>
                    <CombinedSnapshot1
                        monthlyIncome={budgetData.monthlyIncome}
                        monthlyExpense={budgetData.monthlyExpense}
                        totalSavings={totalSavings}
                        savingsPercentage={savingsPercentage}
                        financialStatus={securityStatus}
                        sipDuration={sipDuration}
                        sipTotalInvestment={sipSummary.totalInvestment}
                        sipMaturityValue={sipSummary.maturityValue}
                        sipTotalGains={sipSummary.totalGains}
                        sipChartData={sipChartData.map(item => ({
                            year: item.year,
                            totalInvested: item.investment,
                            maturityValue: item.corpus,
                            gains: item.gains
                        }))}
                    />
                </div>

                <div ref={snapshot2Ref} style={{ width: '1200px' }}>
                    <CombinedSnapshot2
                        goalAmount={goalAmount}
                        goalDuration={goalDuration}
                        monthlySIP={monthlySIPRequired}
                        totalInvestment={monthlySIPRequired * goalDuration * 12}
                    />
                </div>
            </div>
        </section>
    );
};

export default BudgetingCalculator;
