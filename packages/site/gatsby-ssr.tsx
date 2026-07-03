import type { GatsbySSR } from 'gatsby';

import {
  wrapPageElement as sharedWrapPageElement,
  wrapRootElement as sharedWrapRootElement,
} from './src/gatsby-wrappers';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) =>
  sharedWrapRootElement(element);

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }) =>
  sharedWrapPageElement(element);
