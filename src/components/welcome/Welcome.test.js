import renderer from 'react-test-renderer';
import {Welcome} from './Welcome';
import {cleanup, fireEvent, render} from '@testing-library/react';
import {store} from "../../app/store";
import { Provider } from 'react-redux';

it('check login forms render on time', async () => {
    const {getByText, queryByText} = render(
        <Provider store={store}>
            <Welcome toggle='Restaurant menu'></Welcome>
        </Provider>
    );
// Verify that Dropdown items are hidden from the DOM
    expect(queryByText('Username')).toBeNull();

// Click the Dropdown toggle
    fireEvent.click(getByText('Login'));

// Verify that the Dropdown items now appear in the DOM
    expect(getByText('Username'));
});