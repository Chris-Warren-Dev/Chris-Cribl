import request from 'supertest'
import app from '../../server.cjs'

describe('GET /api/filesystem', () => {
  it('should return the file system structure', async () => {
    const response = await request(app)
      .get('/api/filesystem')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body).toBeInstanceOf(Array)
    expect(response.body).toHaveLength(1)
    expect(response.body[0]).toHaveProperty('type')
    expect(response.body[0]).toHaveProperty('name')
    expect(response.body[0]).toHaveProperty('modified')
    expect(response.body[0]).toHaveProperty('size')
    expect(response.body[0]).toHaveProperty('children')
  })
})

describe('GET /', () => {
  it('should serve the main HTML file', async () => {
    const response = await request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)

    expect(response.text).toContain('<!DOCTYPE html>')
  })
})
