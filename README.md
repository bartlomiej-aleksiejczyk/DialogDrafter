# DialogDrafter
DialogDrafter is a standalone Electron app designed to simplify the creation of chat logs through a user-friendly interface. Whether crafting dialogues for games, chatbots, or stories, DialogDrafter helps save and design conversations with ease.

### DialogDrafter in action:

![demonstration-01.png](design-docs%2Fscreenshots%2Fdemonstration-01.png?raw=true "Sample screen")

## Features
- **Create and Edit Chat Logs:** Craft dialogues conveniently.
- **Directory Management:** Opt for multiple directories.
- **Importing:** Bring in existing chat logs from various sources.
## How to run using wizard for Windows (from release)
* Navigate to "Releases" and download the file appropriate for Windows.
* Install the app using the wizard.
* Execute the app by running "DialogDrafter".
## Building from Source

1. Open the command line and navigate (`cd`) to your desired directory.
2. Execute the following commands sequentially:

   ```shell
   npx vite build
   npm run dist
   ```

3. The built files will be located in the "electronOutput" directory.

## How to run development version
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
## Usage Guide

1. **Add Directory:** Click on "Add Directory" and select a directory.
2. **Navigate:** Choose the directory in the side menu.
3. **Manage Chats:**
    - Click "New Chat" to create a new chat log or select an existing one from the side menu.
    - To add logs, fill in both text fields and click "Add Pair".
4. **Auto-Save:** Your file will be automatically saved and updated.
## License
This project is licensed under the MIT License.