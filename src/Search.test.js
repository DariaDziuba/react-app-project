import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from './appComponents/Search';

describe('Search component', () => {
    it('renders input field and icon correctly', () => {
        const setSearchValue = jest.fn();
        const setSelectedPage = jest.fn();

        const { asFragment, getByPlaceholderText, getByTestId } = render(
            <Search setSearchValue={setSearchValue} searchValue="" setSelectedPage={setSelectedPage} />
        );

        const inputElement = getByPlaceholderText('Type to search');
        const searchIcon = getByTestId('search-icon');

        // Assert the initial snapshot
        expect(asFragment()).toMatchSnapshot();

        // Trigger a change event on the input field
        fireEvent.change(inputElement, { target: { value: 'test' } });
        // Assert the snapshot after change
        expect(asFragment()).toMatchSnapshot();
    });

    it('calls setSearchValue and setSelectedPage after typing with a delay', async () => {
        const setSearchValue = jest.fn();
        const setSelectedPage = jest.fn();

        render(
            <Search setSearchValue={setSearchValue} searchValue="" setSelectedPage={setSelectedPage} />
        );

        const inputElement = screen.getByPlaceholderText('Type to search');

        fireEvent.change(inputElement, { target: { value: 'test' } });

        await waitFor(() => {
            expect(setSearchValue).toHaveBeenCalledTimes(1);
            expect(setSearchValue).toHaveBeenCalledWith('test');
            expect(setSelectedPage).toHaveBeenCalledTimes(1);
            expect(setSelectedPage).toHaveBeenCalledWith(1);
        });
    });
});
