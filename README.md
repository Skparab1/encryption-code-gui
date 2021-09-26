# Encryption code GUI
## With Great Graphics comes great capability

# Main features that work

## Starting Animation
- Hover operated with text

## Accounts
- Account data is stored locally, so accounts are only one one device
- Signin, Creating account, Forgot password, and Signing out work locally
- however, whenever you close browser window, you account data will be deleted
  - to solve this, I am creating a global read only account framework
  - with this, it will be able to read account data from anywhere.
  - however, you will not be able to stora any data.

## Settings
- Animated color theme change selector
- To do selectors/buttons 
  - Turning off sync 
    - actually this is in account but im probably going to remove it altogether because it can be used to manipulate accounts
    - this one is animated, i'll likely use the same framework for the other switch selectors
  - Automatically invoke on screen keyboard when input box is pressed
    - the functionality and button are done for this, but i'm going to change the position and add text.
  - show light up for on screen keyboard
  - disable/enable press shift to click
    - when testing i found that sometimes when typing a caps letter shift+letter can wrongly invoke this feature, and if it's over abuttone then it can change your screen
    - however this isn't a big deal because even if you exit the screen everything will be saved and if you type an extra letter then you can backspace it not a huge deal
    
## Loading animation
- has horizontal top bar
- spinning wheel

## On screen keyboard
- has full functionality to type (including caps lock and shift key)
- invoking and revoking keyboard works
- working on light up key feedback (top row is done)

## Syncing
- Encryption code is synced across all tabs and windows, even private windows, of the same browser. 
  - For some tests it works across private windows, for some it doesn't, but it ALWAYS works across tabs and non-private windows
- If Encryption code GUI is open in multiple tabs or windows, the account status will be synced.
- So, if you sign in one tab, the other account will automatically sign itself in
- if you sign out in one tab, the other tab's session will expire and it will log you out.

## Additional minor features
- turn off sync (although i will likely take this out....it can be used to manipulate the signin)
- user shift to click instead of clicking the mouse
- press any key to begin in addition to hovering
- setting to automaticaly invoke keyboard when clicking in input prompt
