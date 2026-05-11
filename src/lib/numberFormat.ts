// Utility function for consistent number formatting across server and client
export const formatIndianNumber = (num: number): string => {
    return new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    }).format(num);
};

// Utility function for currency formatting
export const formatIndianCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(num);
};

// Utility function for compact Indian currency formatting (Lakh/Cr)
export const formatIndianCompactCurrency = (num: number): string => {
    const absNum = Math.abs(num);
    const sign = num < 0 ? '-' : '';

    if (absNum >= 10000000) {
        return `${sign}₹${(absNum / 10000000).toFixed(2).replace(/\.?0+$/, '')}Cr`;
    }

    if (absNum >= 100000) {
        return `${sign}₹${(absNum / 100000).toFixed(2).replace(/\.?0+$/, '')}L`;
    }

    return `${sign}${new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(absNum)}`;
};
