const express = require('express')
const path = require('path')

const app = express()
const PORT = 3000

const fileSystem = [
  {
    type: 'folder',
    name: 'Files',
    modified: new Date(),
    size: 0,
    children: [
      {
        type: 'folder',
        name: 'Documents',
        modified: new Date(),
        size: 0,
        children: [
          {
            type: 'folder',
            name: 'Invoices',
            modified: new Date(),
            size: 0,
            children: [
              {
                type: 'file',
                name: 'invoice.pdf',
                modified: new Date(),
                size: 1234
              }
            ]
          },
          {
            type: 'file',
            name: 'Document.txt',
            modified: new Date(),
            size: 1234
          }
        ]
      },
      {
        type: 'folder',
        name: 'Images',
        modified: new Date(),
        size: 0,
        children: [
          {
            type: 'file',
            name: 'image.png',
            modified: new Date(),
            size: 1234
          }
        ]
      },
      {
        type: 'folder',
        name: 'System',
        modified: new Date(),
        size: 0,
        children: [
          {
            type: 'file',
            name: 'Log.txt',
            modified: new Date(),
            size: 1234
          }
        ]
      },
      {
        type: 'file',
        name: 'Description.rtf',
        modified: new Date(),
        size: 1500
      },
      {
        type: 'file',
        name: 'Description.txt',
        modified: new Date(),
        size: 2400
      },
      {
        type: 'file',
        name: 'Untitled.xyz',
        modified: new Date(),
        size: 40000
      }
    ]
  }
]

// Middleware to parse JSON bodies
app.use(express.json())

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname, 'src')))

// Endpoint to fetch the file system structure
app.get('/api/filesystem', (req, res) => {
  res.json(fileSystem)
})

// Serve the main HTML file on root request
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'))
})

// Start the server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

module.exports = app
