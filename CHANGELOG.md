# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2023-10-18

### Added

- Preview mode for markdown files that allows:
    - Display of the entire file content.
    - Neatly formatted content display.

### Changed

- Appearance of a "New Chat" window to be more informative.

## [0.1.0] - 2023-10-15 - Initial release

### Added

- Ability to register a directory with chat logs using the "Add Directory" button.
- Ability to create a new chat log in the selected directory using the "Add Chat" button.
- Functionality to add content to the chat log in the displayed chat.
- Ability to rename a directory using the "Rename item" option in the directory dropdown.
- Ability to unregister a directory using the "remove item" option in the directory dropdown.
- Button to scroll down in the currently displayed chat.
- Side menu for directory browsing.
- Directory and file selection in the side menu.
- JSON schema validation for the config file and handling of improper format.
- Handling for absent config files.
- Handling for non-existent files.
- Handling for general I/O errors.
- Handling for corrupted or removed working files.
- App icon.

[unreleased]: https://github.com/bartlomiej-aleksiejczyk/DialogDrafter/tree/dev
[0.2.0]: https://github.com/bartlomiej-aleksiejczyk/DialogDrafter/releases/tag/v0.2
[0.1.0]: https://github.com/bartlomiej-aleksiejczyk/DialogDrafter/releases/tag/v0.1