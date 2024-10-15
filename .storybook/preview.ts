import 'virtual:uno.css';
import 'virtual:svg-icons-register'
import '../src/index.css'

// @ts-ignore
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
