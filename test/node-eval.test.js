'use strict';

const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('node-eval', () => {
    let anyEval, nodeEvalStub;

    beforeEach(() => {
        nodeEvalStub = sinon.stub().returns({});

        anyEval = proxyquire('../index.js', {
            'node-eval': nodeEvalStub
        });
    });

    it('should run `node-eval` by default', () => {
        const fileContents = '{}';

        anyEval(fileContents); // eslint-disable-line no-unused-expressions

        expect(nodeEvalStub).to.be.called; // eslint-disable-line no-unused-expressions
    });


    it('should run `node-eval` for .js extension', () => {
        const fileContents = '{}';
        const filePath = 'file.js';

        anyEval(fileContents, filePath); // eslint-disable-line no-unused-expressions

        expect(nodeEvalStub).to.be.called; // eslint-disable-line no-unused-expressions
    });

    it('should run `node-eval` for .json extension', () => {
        const fileContents = '{}';
        const filePath = 'file.json';

        anyEval(fileContents, filePath); // eslint-disable-line no-unused-expressions

        expect(nodeEvalStub).to.be.called; // eslint-disable-line no-unused-expressions
    });

    it('should provide file contents to `node-eval`', () => {
        const fileContents = '{}';
        const filePath = 'file.js';

        anyEval(fileContents, filePath);

        expect(nodeEvalStub).to.be.calledWith(fileContents);
    });

    it('should provide filename to `node-eval`', () => {
        const filePath = 'file.js';
        const fileContents = '{}';

        anyEval(fileContents, filePath);

        expect(nodeEvalStub).to.be.calledWith(sinon.match.string, filePath);
    });

    it('should provide context to `node-eval`', () => {
        const filePath = 'file.js';
        const fileContents = '{}';
        const context = {};

        anyEval(fileContents, filePath, context)

        expect(nodeEvalStub).to.be.calledWith(sinon.match.string, sinon.match.string, context);
    });
});
