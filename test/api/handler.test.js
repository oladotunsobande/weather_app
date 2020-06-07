const expect = require('expect');

const handler = require('../../handler');

describe('Lambda Handler APIs', () => {

  it('should return serverless default message', () => {
    handler.helloWorld({}, {}, (stt, res) => {
      const body = JSON.parse(res.body);

      expect(body.success).toBe(true);
    });
  });

  it('should return city weather', async () => {
    const payload = { city: 'San Francisco' };

    await handler.getCityWeather(
      payload, 
      {}, 
      (stt, res) => {
      const body = JSON.parse(res.body);

      expect(body.success).toBe(true);
      expect(typeof body.data).toBe('object');
    });
  });

});