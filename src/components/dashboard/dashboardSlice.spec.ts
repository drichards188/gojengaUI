import counterReducer, {
    DashboardState,
    increment,
    decrement,
    incrementByAmount,
} from './dashboardSlice';

describe('dashboard reducer', () => {
    const initialState: DashboardState = {
        coinData: {id: 'bitcoin', last: 1, volume: 2400},
        coinList: [{id: 'bitcoin', name: 'og-bitcoin'}],
        amount: 0,
        balance: 0,
        user: 'david',
        password: '12345',
        destination: 'allie',
        message: '',
        loggedIn: false,
        token: 'token',
        status: 'idle'
    };
    it('should handle initial state', () => {
        expect(counterReducer(undefined, {type: 'unknown'})).toEqual({
            value: 0,
            status: 'idle',
        });
    });

    it('should handle increment', () => {
        const actual = counterReducer(initialState, increment());
        expect(actual.amount).toEqual(4);
    });

    it('should handle decrement', () => {
        const actual = counterReducer(initialState, decrement());
        expect(actual.amount).toEqual(2);
    });

    it('should handle incrementByAmount', () => {
        const actual = counterReducer(initialState, incrementByAmount(2));
        expect(actual.amount).toEqual(5);
    });
});
