import React from 'react';
import { render, RenderResult, functions, fireEvent, screen, waitFor, act } from '../../utils/test-utils';
import { Provider } from 'react-redux';
import { setupServer } from 'msw/node'
import handlers from './searchHandlers';

import SearchConsole from './index';
import { store } from '../../utils/redux-config';

let component: RenderResult;

const server = setupServer(...handlers)

describe("Search Console Test Suite", () => {
    beforeAll(() => server.listen({
        onUnhandledRequest: ({ headers, method, url }) => {
            if (headers.get("User-Agent") !== "supertest") {
                throw new Error(`Unhandled ${method} request to ${url}`);
            }
        },
    }));

    beforeEach(() => {
        if (component)
            component.unmount()

        act(() => {
            component = render(
                <Provider store={store}>
                    <SearchConsole />
                </Provider>
            )
        });
        server.resetHandlers()
    });

    afterAll(() => server.close())

    test('It must render the component correcly', () => {
        expect(component.asFragment()).toMatchSnapshot();
    })

    test('It must display basic Search Console components', () => {
        expect(component.getByPlaceholderText(/Type the long keyword/i)).toBeInTheDocument();
        expect(component.getAllByText(/Search/i)[0]).toBeInTheDocument();
    });

    test('It must respond "Please type some keyword." when the input is blank.', async () => {

        functions.writeInInputFoundByPlaceHolder(null, /Type the long keyword/i, "");

        await act(() => {
            fireEvent.click(screen.getAllByText(/Search/i)[1]);
        });

        await waitFor(() => {
            component.rerender(
                <Provider store={store}>
                    <SearchConsole />
                </Provider>
            )
            expect(screen.getByText("Please type some keyword.")).toBeInTheDocument();
        });
    });
});