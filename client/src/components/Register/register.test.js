import React from 'react';
import 'jest-dom/extend-expect';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
  } from 'react-testing-library';

import Register from './Register';

describe("Register component", ()=>{
    it("Should mount without crashing", ()=>{
        render(<Register />)
    })
})