/** @type { import('@storybook/react-vite').StorybookConfig } */
export default {
  stories: ['../src/docs/*.mdx', '../src/stories/**/*.stories.jsx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y', '@storybook/addon-designs'],
  framework: { name: '@storybook/react-vite', options: {} },
  docs: { defaultName: 'Docs' },
  core: { disableTelemetry: true },
};
