# MaterialNote
<img src="http://tedeckel.me/images/materialnote.jpg" width="300">

MaterialNote is a web application inspired by Evernote. MaterialNote allows users to:

- Create an account
- Log in / Log out
- Create, read, edit, and delete notes
- Organize notes within Notebooks
- Style notes while editing

## Features
Both notes and notebooks are displayed on the sidebar, while note editing is done in an open source WYSIWYG text editor. The interface is inspired by Google's modern apps like Inbox and Keep.

## Note rendering
```javascript
  selectNote: function (note) {
    var url = "notes/" + note.id;
    this.context.router.push(url);
  }
}
```
When a note is selected, the url changes according to each specific note. This is done by the `react-router`.

## Technologies used
- PostgreSQL database
- Rails
- React
- Flux
- Material Design Lite

## Bonus Features (TBD)
- [ ] Search through notes for blocks of text
- [ ] Set reminders on notes
- [ ] Changelogs for Notes
- [ ] Multiple sessions
- [ ] Automatic saving
