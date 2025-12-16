import { device, element, by, expect } from 'detox';

describe('Authentication Flow', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show login screen on app launch', async () => {
    await expect(element(by.text('Login'))).toBeVisible();
  });

  it('should show validation errors for empty form', async () => {
    await element(by.text('Sign In')).tap();
    await expect(element(by.text('This field is required'))).toBeVisible();
  });

  it('should navigate to register screen', async () => {
    await element(by.text('Sign Up')).tap();
    await expect(element(by.text('Register'))).toBeVisible();
  });

  it('should navigate to forgot password screen', async () => {
    await element(by.text('Forgot Password?')).tap();
    await expect(element(by.text('Reset Password'))).toBeVisible();
  });

  it('should login with valid credentials', async () => {
    await element(by.placeholder('Email')).typeText('test@example.com');
    await element(by.placeholder('Password')).typeText('password123');
    await element(by.text('Sign In')).tap();
    // After successful login, should see Dashboard
    await expect(element(by.text('Dashboard'))).toBeVisible();
  });
});
