import { themes } from '@storybook/theming';
import '../src/components/index.js';
import '../src/gallery/gallery.css';

/** @type { import('@storybook/react').Preview } */
export default {
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'page', values: [{ name: 'page', value: '#000000' }] },
    docs: { theme: themes.dark },
    controls: { expanded: true },
    options: { storySort: { order: ['Introduction', 'Action', 'Action & Input Extras', 'Inputs & Forms', 'Selection', 'Navigation', 'Surfaces & Feedback', 'Content States & Cooper', 'Data Display', 'Activity & Collaboration', 'Data Visualisation', 'Map & Canvas'] } },
  },
};
