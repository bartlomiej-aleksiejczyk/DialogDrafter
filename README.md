# DialogDrafter
DialogDrafter is a standalone Electron app designed to simplify the creation of chat logs through a user-friendly interface. Whether crafting dialogues for games, chatbots, or stories, DialogDrafter helps save and design conversations with ease.

### DialogDrafter in action:

![demonstration-04.png](designDocs/screenshots/demonstration-04.png?raw=true "Sample screen #2")
![demonstration-01.png](designDocs%2Fscreenshots%2Fdemonstration-01.png?raw=true "Sample screen #1")

## Features
- **Display in original format:** Display dialogues in a beautiful way.
- **Create and Edit Chat Logs:** Craft dialogues conveniently.
- **Directory Management:** Opt for multiple directories.
- **Importing:** Bring in existing chat logs from various sources.
## How to run using wizard for Windows or Linux (Using Release)
1. Navigate to "Releases" and download the file appropriate for your OS.
2. Install the app using the wizard.
3. Execute the app by running "DialogDrafter".
## How to run and build development version
### Prerequisites

- Git (Installed and configured in PATH)
- Npm (Installed and configured in PATH)

### Setup and Running

Execute the following commands sequentially:

```shell
git clone https://github.com/bartlomiej-aleksiejczyk/DialogDrafter.git
cd DialogDrafter
npm install
npm run dev
```
### Building from Source

1. Open the command line and navigate (`cd`) to your source directory.
2. Execute the following commands sequentially:

```shell
npm install
npx vite build
npm run dist
```

3. The built files will be located in the "electronOutput" directory.

## Usage Guide

1. **Add Directory:** Click on "Add Directory" and select a directory.
2. **Navigate:** Choose the directory in the side menu.
3. **Manage Chats:**
    - Click "New Chat" to create a new chat log or select an existing one from the side menu.
    - To add logs, fill in both text fields and click "Add Pair".
4. **Auto-Save:** Your file will be automatically saved and updated.
## License
This project is licensed under the MIT License.