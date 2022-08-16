import {render, screen} from '@testing-library/react';

import Button, {ButtonProps} from './button';

describe('<Button /> in components/common/button', () => {
  const setup = ({children = 'Button content', ...rest}: ButtonProps) => render(<Button {...rest}>{children}</Button>);

  test('should render without crashing', () => {
    setup({});
    const text = screen.getByText(/Button content/);

    expect(screen).toBeDefined();
    expect(text).toBeInTheDocument();
  });

  test('should render button with loading prop equal true', () => {
    setup({loading: true});

    const loadingSpan = screen.getByTestId('button-loading');
    expect(loadingSpan).toBeInTheDocument();
  });

  test('should render button with loading prop equal false', () => {
    setup({loading: false});
    expect(() => screen.getByTestId('button-loading')).toThrow();
  });

  // TODO: write more test cases
});
