const commissionBands = [
    {title: 'Band 5', threshold: 2000000, rate: 0.25, name: 'bandFive'},
    {title: 'Band 4', threshold: 1500000, rate: 0.20, name: 'bandFour'},
    {title: 'Band 3', threshold: 1000000, rate: 0.15, name: 'bandThree'},
    {title: 'Band 2', threshold: 500000, rate: 0.10, name: 'bandTwo'},
    {title: 'Band 1', threshold: 0, rate: 0.00, name: 'bandOne'}
];

const calculateCommission = (value: string) => {
    let valueInPence = Number(parseFloat(value) * 100)

    const commission: { [key: string]: { rate: number, commission: number, threshold: number, title: string } } = {}
    for (const band of commissionBands) {

        commission[band.name] = {rate: band.rate * 100, commission: 0, title: band.title, threshold: band.threshold};

        if (valueInPence > band.threshold) {
            commission[band.name].commission = Math.ceil((valueInPence - band.threshold) * band.rate)
            valueInPence = band.threshold;
        }
    }

    return commission
}

export default calculateCommission;