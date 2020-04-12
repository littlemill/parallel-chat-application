import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar:{
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function PermanentDrawerRight() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [click, setClick] = React.useState(true);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClick = () => {
    setClick(!click);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} style = {{ fontSize: "24px"}}>
          <b>EGGIE</b>
      </div>
        <Divider />

      <List>
        <ListItem button onClick={handleClick}>
            <ListItemIcon > <GroupAddIcon /> </ListItemIcon>
            <ListItemText primary= "Avaliable groups" />
            {click ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={click} timeout="auto" unmountOnExit>
            <List> 
            {['All mail', 'Trash', 'Spam'].map((text) => (
            <ListItem button key={text} className={classes.nested}>
                <ListItemText primary={text}/>
                <ListItemSecondaryAction>
                    <AddIcon edge="end" />
                </ListItemSecondaryAction>
            </ListItem>
            ))}
            </List>
        </Collapse>
      </List>
      <Divider />

      <List>
        <ListItem button onClick={handleOpen}>
            <ListItemIcon> <GroupIcon /> </ListItemIcon>
            <ListItemText primary= "My groups" />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
        {['All mail', 'Trash', 'Spam'].map((text) => (
        <ListItem button key={text} className={classes.nested}>
          <ListItemText primary={text} />
        </ListItem>
        ))}
        </List>
        </Collapse>
      </List>

<Divider />
      <List>
          <ListItem button>
            <ListItemIcon><AddCircleRoundedIcon /> </ListItemIcon>
            <ListItemText primary= "Create new group" />
          </ListItem>
      </List>
      </Drawer>
    </div>
  );
}
