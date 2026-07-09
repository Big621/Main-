import type { GatsbyBrowser } from 'gatsby';

import {
  wrapPageElement as sharedWrapPageElement,
  wrapRootElement as sharedWrapRootElement,
} from './src/gatsby-wrappers';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => sharedWrapRootElement(element);

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => sharedWrapPageElement(element);
