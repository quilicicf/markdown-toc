const _ = require('lodash');

const loadDataSets = require('./loadDataSets');
const { formatFromFile, formatFromString } = require('../index');

const FILE_CONTENTS = {
  SIMPLE: {
    INPUT_PATH: '',
    OUTPUT_PATH: '',
    INPUT: '',
    OUTPUT: '',
  },
  DEFAULT_TOC_CONF: {
    INPUT_PATH: '',
    OUTPUT_PATH: '',
    INPUT: '',
    OUTPUT: '',
  },
  OVERWRITTEN_STRINGIFY_OPTIONS: {
    INPUT_PATH: '',
    OUTPUT_PATH: '',
    INPUT: '',
    OUTPUT: '',
  },
};

const ALTERNATIVE_STRINGIFY_OPTIONS = {
  bullet: '-',
  emphasis: '*',
  fences: false,
  gfm: true,
  listItemIndent: 'tab',
  rule: '_',
  ruleSpaces: true,
  strong: '*',
};

describe('Format & generate ToC', () => {

  beforeAll(() => _.assign(FILE_CONTENTS, loadDataSets(FILE_CONTENTS)));

  test('It should format from string', async () => {
    const { contents: markdownWithToc } = await formatFromString(FILE_CONTENTS.SIMPLE.INPUT);

    expect(markdownWithToc).toEqual(FILE_CONTENTS.SIMPLE.OUTPUT);
  });

  test('It should format from file', async () => {
    const { contents: markdownWithToc } = await formatFromFile(FILE_CONTENTS.SIMPLE.INPUT_PATH);

    expect(markdownWithToc).toEqual(FILE_CONTENTS.SIMPLE.OUTPUT);
  });

  test('It should be idempotent', async () => {
    const { contents: markdownFormattedOnce } = await formatFromString(FILE_CONTENTS.SIMPLE.INPUT);
    const { contents: markdownFormattedTwice } = await formatFromString(markdownFormattedOnce);

    expect(markdownFormattedTwice).toEqual(markdownFormattedOnce);
  });

  test('It should use default ToC configuration when undefined', async () => {
    const { contents: formattedMarkdown } = await formatFromString(FILE_CONTENTS.DEFAULT_TOC_CONF.INPUT);

    expect(formattedMarkdown).toEqual(FILE_CONTENTS.DEFAULT_TOC_CONF.OUTPUT);
  });

  test('It should overwrite default stringify options when formatting from string', async () => {
    const inputMarkdown = FILE_CONTENTS.OVERWRITTEN_STRINGIFY_OPTIONS.INPUT;
    const { contents: formattedMarkdown } = await formatFromString(inputMarkdown, {}, ALTERNATIVE_STRINGIFY_OPTIONS);

    expect(formattedMarkdown).toEqual(FILE_CONTENTS.OVERWRITTEN_STRINGIFY_OPTIONS.OUTPUT);
  });

  test('It should overwrite default stringify options when formatting from file', async () => {
    const inputMarkdown = FILE_CONTENTS.OVERWRITTEN_STRINGIFY_OPTIONS.INPUT_PATH;
    const { contents: formattedMarkdown } = await formatFromFile(inputMarkdown, {}, ALTERNATIVE_STRINGIFY_OPTIONS);

    expect(formattedMarkdown).toEqual(FILE_CONTENTS.OVERWRITTEN_STRINGIFY_OPTIONS.OUTPUT);
  });
});