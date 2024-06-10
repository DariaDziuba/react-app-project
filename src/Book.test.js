import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ProductsDispatchContext } from 'scripts/ProductContext';
import Book from './components/product/Book';
import { CURRENCY } from "./settings";

describe('Book component', () => {
    const book = {
        id: '1',
        name: 'Book Name',
        author: 'Author Name',
        imageUrl: 'image-url',
        price: 10
    };

    it('renders book details correctly', () => {
        render(
            <MemoryRouter>
                <Book book={book} />
            </MemoryRouter>
        );

        expect(screen.getByText(book.name)).toBeInTheDocument();
        expect(screen.getByText(book.author)).toBeInTheDocument();
        expect(screen.getByAltText(book.name)).toBeInTheDocument();
        expect(screen.getByText(`${book.price} ${CURRENCY}`)).toBeInTheDocument();
    });

    it('dispatches add action when "Add To Cart" button is clicked', () => {
        const dispatchMock = jest.fn();
        render(
            <ProductsDispatchContext.Provider value={dispatchMock}>
                <MemoryRouter>
                    <Book book={book} />
                </MemoryRouter>
            </ProductsDispatchContext.Provider>
        );

        const addToCartButton = screen.getByText('Add To Cart');
        userEvent.click(addToCartButton);

        expect(dispatchMock).toHaveBeenCalledWith({ type: 'add', book });
    });
});
