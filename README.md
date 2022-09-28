# Virtual Desktop Tools
_[Original project](https://github.com/dedean16/kwin-swapdesktop) by [dedean16](https://github.com/dedean16)_


___

## Description
Adds keyboard shortcuts to KWin to:
* Swap the windows with previous/next virtual desktop ;
* Add a desktop before/after current position ;
* Remove current desktop. When removing a desktop, its windows will be moved to the next desktop.


## Default shortcuts
| Action                     | Shortcut                     |
| :------------------------- | :--------------------------- |
| Swap with next desktop     | `Meta + Shift + Alt + Right` |
| Swap with previous desktop | `Meta + Shift + Alt + Left`  |
| Swap with above desktop    | `Meta + Shift + Alt + Up`    |
| Swap with below desktop    | `Meta + Shift + Alt + Down`  |
| Add desktop before         | `Meta +  Alt + )`            |
| Add desktop after          | `Meta + Alt + +`             |
| Remove current desktop     | `Meta + Alt + _`             |

Shortcuts can be changed in KDE settings:
`Settings` -> `Shortcuts` -> search `DESKTOPS`



## Build & install
To build, run the script `create-package` then install from KDE settings:
`Settings` -> `Window Management` -> `KWin Scripts` -> `Install from File` -> select the `.kwinscript` file in project's directory.