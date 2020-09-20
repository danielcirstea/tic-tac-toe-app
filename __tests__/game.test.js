// public/scripts/game.js
const {postRequest} = require("../public/scripts/game");

describe('postRequest', () => {
    const mocks = {
        url: 'http://someurl.com/api',
        payload: {
            id: '1234',
            action: `Some player action`,
        },
    }
    afterEach(() => {
        global.fetch.mockClear();
        delete global.fetch;
    });

    test('should post moves data', async () => {
        const expected = {
            success: true,
        };

        global.fetch = jest.fn().mockImplementation(() => Promise.resolve(expected));

        const mockedResult = await postRequest(mocks.url + '/moves', mocks.payload);
        expect(mockedResult).toMatchObject(expected);
    });

    test('should get history data', async () => {
        const expected = [{
            _id: '0001',
            action: "Some player action"
        }];

        global.fetch = jest.fn().mockImplementation(() => Promise.resolve(expected));

        const mockedResult = await postRequest(mocks.url + '/history', {id: mocks.payload.id});
        expect(mockedResult).toMatchObject(expected);
    });

    test('should fail post moves if no payload', async () => {
        const expected = {
            error: "Missing parameters.",
        };

        global.fetch = jest.fn().mockImplementation(() => Promise.resolve(expected));

        const mockedResult = await postRequest(mocks.url + '/history', undefined);
        expect(mockedResult).toMatchObject(expected);
    });

});