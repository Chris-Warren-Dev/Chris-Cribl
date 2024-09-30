# Cribl File Explorer

## Overview

Simple file explorer web application that displays a file system hierarchy. It showcases folders and files, allowing users to expand and collapse directories, and to view the contents of each directory in a user-friendly interface.

## Project Structure

```
cribl-chris/
│
├── package.json            # Project metadata and dependencies
├── server.cjs              # Express server setup
├── src/                    # Frontend source files
│   ├── index.html          # Main HTML file
│   ├── css/
│   │   └── styles.css      # Styling for the application
│   ├── js/
│   │   ├── api.js          # API call for fetching file system structure
│   │   ├── index.js        # Initialization and main logic
│   │   └── ui.js           # Render methods for sidebar and content
│   │   └── utils.js        # Utility functions
│   └── assets/             # Static assets like icons
│       └── icons/          # Folder and file icons
```

## Installation

1. **Clone the repository:**

```
git clone https://github.com/chris-warren-dev/cribl-chris.git
cd cribl-chris
```

2. **Install dependencies:**

```
npm install
```

## Running the Application

1. **Start the server:**

```
npm start
```

2. **Access the application:**
   Open your browser and navigate to `http://localhost:3000` to view the file explorer.

## Testing

Run the tests with:

```
npm test
```

## Technical Details

### Server (server.cjs)

- Uses Express.js to serve static files and to provide an API endpoint.
- The `/api/filesystem` endpoint returns the file system structure.

### Frontend

- `index.html`: The main entry point, includes the layout and references to styles and scripts.
- `styles.css`: Styles for the layout and components.
- `api.js`: Fetches the file system structure from the server.
- `index.js`: Manages initialization and main logic of the application.
- `ui.js`: Handles the rendering of the sidebar and content views.
- `utils.js`: Includes utility functions for handling file sizes, icons, etc.

### APIs

- **GET `/api/filesystem`**: Retrieves the structure of the file system.

## Dependencies

### Main Dependencies

- `express`: Web framework for Node.js.
- `body-parser`: Middleware for parsing JSON bodies.

### Development Dependencies

- `jest`: Testing framework.
- `supertest`: Library for testing HTTP.
- `babel`: Transpiler for modern JavaScript support.
