import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from 'react-testing-library';

// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import App from '../App';

afterEach(cleanup);

it('CheckboxWithLabel changes the text after click', async () => {
  const { getByText } = render(<App />);

<<<<<<< HEAD
  const boards = await waitForElement(() => getByText(/board/i));
=======
    const boards = await waitForElement(() => getByText(/Tables/i),)
>>>>>>> fixing test

  expect(boards).toBeTruthy();
});
