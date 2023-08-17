const request = require('supertest')
const app = require('../../app.js')

describe('data api', () => {
    it('mendapatkan data products', () => {
        return request(app)
            .get('/products')
            .expect(200);
    });
});