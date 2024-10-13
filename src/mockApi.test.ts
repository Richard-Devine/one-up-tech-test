import calculateCommission from "./mockApi.ts";

jest.mock('./mockApi.ts', () => {
    const originalModule = jest.requireActual('./mockApi.ts');
    return {
        ...originalModule,
        __esModule: true,
        commissionBands: [
            {title: 'Band 5', threshold: 2000000, rate: 0.25, name: 'bandFive'},
            {title: 'Band 4', threshold: 1500000, rate: 0.20, name: 'bandFour'},
            {title: 'Band 3', threshold: 1000000, rate: 0.15, name: 'bandThree'},
            {title: 'Band 2', threshold: 500000, rate: 0.10, name: 'bandTwo'},
            {title: 'Band 1', threshold: 0, rate: 0.00, name: 'bandOne'}
        ]
    };
});

const mockCommissions = [
    {value: 2500000, band: 'bandFive', commission: 125000, rate: 25, title: 'Band 5'},
    {value: 1600000, band: 'bandFour', commission: 20000, rate: 20, title: 'Band 4'},
    {value: 1100000, band: 'bandThree', commission: 15000, rate: 15, title: 'Band 3'},
    {value: 600000, band: 'bandTwo', commission: 10000, rate: 10, title: 'Band 2'},
    {value: 400000, band: 'bandOne', commission: 0, rate: 0, title: 'Band 1'},
]

test.each(mockCommissions)('should return correct commission for a value in band 5', (mockCommission) => {
    const value = mockCommission.value;
    const result = calculateCommission(value);

    expect(result[mockCommission.band].commission).toEqual(mockCommission.commission);
    expect(result[mockCommission.band].rate).toEqual(mockCommission.rate);
    expect(result[mockCommission.band].title).toEqual(mockCommission.title);
});

test('should calculate 0 commission for higher bands 1000000', () => {
    const result = calculateCommission(1000000);
    expect(result.bandOne.commission).toEqual(0);
    expect(result.bandTwo.commission).toEqual(50000);
    expect(result.bandThree.commission).toEqual(0);
    expect(result.bandFour.commission).toEqual(0);
    expect(result.bandFive.commission).toEqual(0);
});

test('should return zero commission for all bands if value is zero', () => {
    const result = calculateCommission(0);

    expect(result.bandOne.commission).toBe(0);
    expect(result.bandTwo.commission).toBe(0);
    expect(result.bandThree.commission).toBe(0);
    expect(result.bandFour.commission).toBe(0);
    expect(result.bandFive.commission).toBe(0);
});