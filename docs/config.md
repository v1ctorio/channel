# Configuration file

The configuration file is `joinchannel.config.json` at the root of the repo.

## Keys

### `channel_id`

The ID of the channel where members will be added after approved.

### `title`

Text to show in the header of the site and title of the slack embed.

### `body`

Description to show in site and slack embed.

### `confirmationMessage`

Message sent to members after their join request gets successfully dispatched. \
Set to empty string (`""`) or `false` to disable.

### `approvalMessage`

#### `channel`

ID of the channel or user to send the approval message.

#### `text`

Body of the approval message. Supports the following variables: `{mention}, {username}`



---
The rest is self-explanatory.