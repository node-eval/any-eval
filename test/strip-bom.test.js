'use strict';

const anyEval = require('../index.js');

describe('strip bom', () => {
    it('should strip Bom with .js', () => {
        const fileContents = '\uFEFF"unicorn"';
        const filePath = 'file.js';

        const res = anyEval(fileContents, filePath);

        expect(res).to.be.deep.equal('unicorn');
    });

    it('should strip Bom with .json', () => {
        const fileContents = '\uFEFF"unicorn"';
        const filePath = 'file.json';

        const res = anyEval(fileContents, filePath);

        expect(res).to.be.deep.equal('unicorn');
    });

    it('should strip Bom with .json5', () => {
        const fileContents = '\uFEFF"unicorn"';
        const filePath = 'file.json5';

        const res = anyEval(fileContents, filePath);

        expect(res).to.be.deep.equal('unicorn');
    });
});
