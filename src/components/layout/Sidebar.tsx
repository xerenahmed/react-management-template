import {
    Box,
    Button,
    Collapse,
    Divider,
    Drawer,
    Hidden,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Typography,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { DensityMediumOutlined, ExpandLess, ExpandMore } from '@mui/icons-material/';
import Navigation from './Navigation';
import { SIDEBAR } from '../../utils/constants';

const Sidebar: FC = () => {
    const [isShowing, setShowing] = useState<boolean>(false);
    const toggleShowing = () => setShowing((value) => !value);

    return (
        <Box>
            <Hidden mdDown>
                <Box
                    sx={{
                        position: 'relative',
                        paddingY: '20px',
                        paddingX: '10px',
                        boxShadow: 1,
                        height: '100vh',
                        '&:hover': { boxShadow: 2 },
                    }}
                >
                    <Link to={'/'}>
                        <Typography variant="h5" fontWeight={300} marginBottom={2} paddingLeft={2} letterSpacing={2}>
                            EA Studios
                        </Typography>
                    </Link>
                    <List>
                        {Navigation.map((nav, index) => (
                            <SidebarListItem key={index} {...nav} />
                        ))}
                    </List>

                    <Typography variant="body1" fontStyle={'italic'} color="#444" position={'absolute'} bottom={'44px'}>
                        Always to the top!
                    </Typography>
                </Box>
            </Hidden>
            <Hidden mdUp>
                <Box display={'flex'} alignItems={'center'} marginTop={2}>
                    <Button onClick={toggleShowing} sx={{ marginRight: 3 }}>
                        <DensityMediumOutlined />
                    </Button>
                    <Link to={'/'}>
                        <Typography variant={'h5'}>EA Studios</Typography>
                    </Link>
                </Box>
                <Drawer anchor={SIDEBAR.anchor} open={isShowing} onClose={toggleShowing}>
                    <Box sx={{ width: 250 }} role="presentation">
                        <List
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    EA Studios
                                </ListSubheader>
                            }
                        >
                            {Navigation.map((nav, index) => (
                                <SidebarListItem key={index} {...nav} onClickLink={() => setShowing(false)} />
                            ))}
                        </List>
                        <Divider />
                    </Box>
                </Drawer>
            </Hidden>
        </Box>
    );
};

type SidebarListItemProps = {
    title: string;
    icon: JSX.Element;
    href?: string;
    marginLeft?: number;
    onClickLink?: () => any;
    children?: SidebarListItemProps[];
};
const SidebarListItem: FC<SidebarListItemProps> = ({ title, icon, href, children, marginLeft = 0, onClickLink }) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    return (
        <>
            <ListItemButton onClick={() => setOpen((value) => !value)} sx={{ marginLeft }}>
                <ListItemIcon sx={{ minWidth: '36px' }}>{icon}</ListItemIcon>
                {href ? (
                    <Link to={href} onClick={onClickLink}>
                        <ListItemText primary={title} />
                    </Link>
                ) : (
                    <ListItemText primary={title} />
                )}
                {!!children && (isOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            {!!children && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ background: '#eee' }}>
                        {children.map((child, index) => (
                            <SidebarListItem
                                key={index}
                                {...child}
                                onClickLink={onClickLink}
                                marginLeft={marginLeft + 3}
                            />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};

export default Sidebar;
