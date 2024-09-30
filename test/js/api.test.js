import { fetchFileSystem } from '../../src/js/api'

describe('fetchFileSystem', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('returns data when the fetch call is successful', async () => {
    const mockData = [{ type: 'folder', name: 'Files' }]
    fetch.mockResponseOnce(JSON.stringify(mockData))

    const data = await fetchFileSystem()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('/api/filesystem')
    expect(data).toEqual(mockData)
  })

  it('logs an error when the fetch call fails', async () => {
    console.error = jest.fn()
    fetch.mockReject(new Error('Failed to fetch'))

    const data = await fetchFileSystem()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(
      'Failed to fetch file system data',
      expect.any(Error)
    )
    expect(data).toBeUndefined()
  })
})
