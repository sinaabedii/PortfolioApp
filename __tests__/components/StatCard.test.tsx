import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { configureStore } from '@reduxjs/toolkit';
import { StatCard } from '@components/dashboard/StatCard';
import settingsReducer from '@store/slices/settingsSlice';
import { lightTheme } from '@theme/index';

const createTestStore = () =>
  configureStore({
    reducer: { settings: settingsReducer },
    preloadedState: { settings: { theme: 'light', language: 'en', notifications: true, biometricEnabled: false } },
  });

const renderWithProviders = (component: React.ReactElement) => {
  const store = createTestStore();
  return render(
    <Provider store={store}>
      <PaperProvider theme={lightTheme}>{component}</PaperProvider>
    </Provider>,
  );
};

describe('StatCard', () => {
  it('renders title and value correctly', () => {
    renderWithProviders(
      <StatCard title="Projects" value="12" icon="folder" color="#6200EE" width={150} />,
    );

    expect(screen.getByText('Projects')).toBeTruthy();
    expect(screen.getByText('12')).toBeTruthy();
  });

  it('renders with custom delay', () => {
    renderWithProviders(
      <StatCard title="Tasks" value="5" icon="check" color="#4CAF50" delay={200} width={150} />,
    );

    expect(screen.getByText('Tasks')).toBeTruthy();
  });
});
