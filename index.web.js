import { AppRegistry } from 'react-native';
import App from './App';

const appName = 'PortfolioApp';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root'),
});
