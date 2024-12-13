import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../src/App';

describe('Questionnaire App', () => {
  test('renders welcome message and instructions', () => {
    render(<App />);
    expect(screen.getByText('Welcome to the Questionnaire!')).toBeInTheDocument();
    expect(screen.getByText('Please answer the following questions. Use the Next and Previous buttons to navigate.')).toBeInTheDocument();
  });

  test('navigates to question page on start', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Start'));
    expect(screen.getByText('What is your favorite color?')).toBeInTheDocument();
    expect(screen.getByText('Select your hobbies:')).toBeInTheDocument();
    expect(screen.getByText('Choose your preferred pet:')).toBeInTheDocument();
  });

  test('allows navigation between questions', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Review Your Responses')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Previous'));
    expect(screen.getByText('What is your favorite color?')).toBeInTheDocument();
  });

  test('submits the questionnaire and shows confirmation', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Thank you for completing the questionnaire!')).toBeInTheDocument();
    expect(screen.getByText('We will contact you with the results soon.')).toBeInTheDocument();
  });
});
