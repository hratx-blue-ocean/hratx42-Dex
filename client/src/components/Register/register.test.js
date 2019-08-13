import React from 'react';

import global from '../../../utils/global';
<<<<<<< HEAD
import http from '../../../services/http/__mocks__/http'
=======
import http from '../../../services/http/http'
>>>>>>> 852cb0997c5e8d1a0d4ac98e488d1bbafbfe6d41

import Register from './Register';

import sinon from 'sinon';
import 'jest-dom/extend-expect';
import {
    render,
    fireEvent,
  } from 'react-testing-library';


describe("Register component", ()=>{
    const {container, getByPlaceholderText, getAllByPlaceholderText} = render(<Register />);
    let form, emailInput, passwordInput, spy;
    beforeAll(()=>{
        global.flash = jest.fn();
        spy = {
<<<<<<< HEAD
            postUser: sinon.spy(http, 'postUser')
=======
            postUser: sinon.spy(http.users, 'post')
>>>>>>> 852cb0997c5e8d1a0d4ac98e488d1bbafbfe6d41
        }
        form = container.querySelector('form');
        emailInput = getByPlaceholderText(/email/i);
        passwordInput = getAllByPlaceholderText(/password/i);
    })
    it("Should contain form inputs for email and password", ()=>{
        expect(form).toBeTruthy();
        expect(emailInput).toBeTruthy();
        expect(passwordInput).toBeTruthy();
    })
    it('Should not post user when mismatching passwords are entered', ()=>{
        fireEvent.change(passwordInput[0], {target: {value: '1'}})
        fireEvent.change(passwordInput[1], {target: {value: '2'}})
        fireEvent.submit(form);
        expect(spy.postUser.called).not.toBeTruthy();
    })
    it('Should post user when matching passwords are entered', ()=>{
        fireEvent.change(passwordInput[0], {target: {value: '1'}})
        fireEvent.change(passwordInput[1], {target: {value: '1'}})
        fireEvent.submit(form)
        expect(spy.postUser.called).toBeTruthy();
    })

})