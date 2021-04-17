import React from "react";
import { Chip, List, ListItem, ListItemIcon } from "@material-ui/core";
import {
  Flare as FlareIcon
} from "@material-ui/icons";

const OnlineList = ({ users }) => {
  return (
    <List>
      {users.map((user, idx) => (
        <ListItem key={`${user}_${idx}`}>
          <ListItemIcon style={{ color: "green" }}>
            <FlareIcon />
          </ListItemIcon>
          <Chip
            label={user}
            color="primary"
          />
        </ListItem>
      ))}
    </List>
  );
};

export default OnlineList;