# Planned features

---

## User Experience

1. Working file
    1. Make single question/answer editable.
    2. Enter to add message.
2. Click outside context menu leave.
3. Configuration files
    1. Add modal with information about config error and give user choice to exit app or create new config file.
    2. Add option to restore/add default config in case of broken file.
    3. Add migration mechanism.
    4. Add handling for specific changes in config. For example "Added new directory" instead of "Config successfully.
       changed".
4. Press ESC to leave modal.
5. Freeze scrolls when modal.
6. Fix vanishing scrollbar when modal.
7. DropdownHeight and width of sideMenu context menu might be unresponsive despite working good.

---

## Usability

1. Add remove/rename file feature

---

## Robustness

1. Check what will happen when process crashes during write "Changes are written to disk atomically, so if the process
   crashes during write, it will not corrupt the existing config."
2. Channel filenames-data should not be recycled it must be used in only one place. Additionally, it should be removed
   after component unmount.
3. Fix Context Bridge, as sharing entire ipcRenderer it is a security
   vulnerability [source](https://stackoverflow.com/questions/66913598/ipcrenderer-on-is-not-a-function).
4. Change app architecture
    1. Destruct applicationConfig to atomic values not nested object.
    2. Handle change of application state (file saving, config alteration, loading data, error) by flags or by treating app as finite state machine using XEvent library(most preferably).
