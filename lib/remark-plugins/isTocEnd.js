import { TOC_END_MATCHER } from '../constants.js';

export default (part) => part.type === 'html' && TOC_END_MATCHER.test(part.value);
