import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
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
import { makeStyles, useTheme } from '@material-ui/core/styles';

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
  // necessary for content to be below app bar
  toolbar:{
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  
  const drawer = (
    <div>
      <div className={classes.toolbar} style = {{ fontSize: "24px"}}>
          <b>EGGIE</b>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={handleClick}>
            <ListItemIcon > <GroupAddIcon /> </ListItemIcon>
            <ListItemText primary= "Avaliable groups" />
            {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List style = {{paddingLeft: theme.spacing(4)}}> 
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
        <ListItem button onClick={handleClick}>
            <ListItemIcon> <GroupIcon /> </ListItemIcon>
            <ListItemText primary= "My groups" />
            {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List style = {{paddingLeft: theme.spacing(4)}}>
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
    </div>
  );

  return (

    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor="left"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}


export default ResponsiveDrawer;
