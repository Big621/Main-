import type { ReactNode } from 'react';
import { StrictMode } from 'react';

import { App } from './App';
import { Root } from './Root';

/**
 * Shared root element wrapper for both Gatsby Browser and SSR APIs.
 *
 * @param element - The root React element to wrap.
 * @returns The wrapped element with Root and StrictMode providers.
 */
export const wrapRootElement = (element: ReactNode) => (
  <StrictMode>
    <Root>{element}</Root>
  </StrictMode>
);

/**
 * Shared page element wrapper for both Gatsby Browser and SSR APIs.
 *
 * @param element - The page React element to wrap.
 * @returns The wrapped element with the App shell.
 */
export const wrapPageElement = (element: ReactNode) => <App>{element}</App>;
