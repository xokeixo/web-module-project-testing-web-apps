import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>)
    const header = screen.queryByText('Contact Form')
    expect(header).toBeInTheDocument()
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)
    const firstname = screen.getByPlaceholderText(/Edd/)
    userEvent.type(firstName, 'Markeisha')
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)
    const submit = screen.getByRole('button')
    userEvent.click(submit)

    await waitFor(() => {
        const error = screen.queryAllByTestId('error')
        expect(error).toHaveLength(3)
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText(/first name*/i)
    userEvent.type(firstName, 'Markeisha')

    const lastName = screen.getByLabelText(/last name*/i)
    userEvent.type(lastName, 'Wallace')

    const button = screen.getByRole('button')
    userEvent.click(button)

    const error = await screen.findAllByTestId('error')
    expect(error).toHaveLength(1)
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)
    const emailField = screen.getByLabelText(/email*/i)
    userEvent.type(emailField, 'iammarkeisha@gmail')

    const errorMessage = await screen.findByText(/email must be a valid email address/i)
    expect(errorMessage).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)
    const submit = screen.getByRole('button')
    userEvent.click(submit)

    const error = await screen.findByText(/lastName is a required field/i)
    expect(error).toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText(/first name*/i)
    userEvent.type(firstName, 'Markeisha')

    const lastName = screen.getByLabelText(/last name*/i)
    userEvent.type(lastName, 'Wallace')

    const email = screen.getByLabelText(/email*/i)
    userEvent.type(email, 'iammarkeisha@gmail.com')

    const button = screen.getByRole('button')
    userEvent.click(button)

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText('Markeisha')
        expect(firstNameDisplay).toBeInTheDocument()

        const lastNameDisplay = screen.queryByText('Wallace')
        expect(lastNameDisplay).toBeInTheDocument()

        const emailDisplay = screen.queryByText('iammarkeisha@gmail.com')
        expect(emailDisplay).toBeInTheDocument()
    })
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText(/First Name*/i)
    userEvent.type(firstName, 'Markeisha')

    const lastName = screen.getByLabelText(/Last Name*/i)
    userEvent.type(lastName, 'Wallace')

    const email = screen.getByLabelText(/Email*/i)
    userEvent.type(email, 'iammarkeisha@gmail.com')

    const message = screen.getByLabelText(/Message/i)
    userEvent.type(message, 'hellooooo')

    const button = screen.getByRole('button')
    userEvent.click(button)

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText('Markeisha')
        expect(firstNameDisplay).toBeInTheDocument()

        const lastNameDisplay = screen.queryByText('Wallace')
        expect(lastNameDisplay).toBeInTheDocument()

        const emailDisplay = screen.queryByText('iammarkeisha@gmail.com')
        expect(emailDisplay).toBeInTheDocument()

        const messageDisplay = screen.queryByText(/hellooooo/i)
        expect(messageDisplay).toBeInTheDocument()
    })
});