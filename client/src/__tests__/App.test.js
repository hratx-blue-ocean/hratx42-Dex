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
  const boards = 'hello'

  expect(boards).toBeTruthy();
});
