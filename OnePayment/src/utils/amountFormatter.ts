type Amount = number

const AmountFormatter = (amount: Amount): string => {
    const formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedAmount;
};

export default AmountFormatter