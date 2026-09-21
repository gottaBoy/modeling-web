import { InternalMessageText } from './internal-message-text';
import { InternalMessageDefaultProvider } from '../common';

export class InternalMessageTextProvider extends InternalMessageDefaultProvider {
  component = InternalMessageText;
}
