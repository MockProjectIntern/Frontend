import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Import CSS
import s from './MenuListItem.module.scss'

const MenuListItem = ({
    index,
    isHeader,
    icon,
    title,
    link,
    childItems,
    openedItem,
    handleOpenedSidebarItemChange
}) => {
    const [isClicked, setIsClicked] = useState(false);
    const isOpen = openedItem && openedItem === index && isClicked;

    const togglePanelCollapse = (index) => {
        setIsClicked(!isClicked);
        handleOpenedSidebarItemChange(index);
    }

    useEffect(() => {
        if (openedItem !== index)
        setIsClicked(false);
    }, [openedItem])

    if (!childItems) {
        if (isHeader) {
            return (
                <div className={s.headerItem}>
                    <NavLink
                        to={link}
                        className={({ isActive }) => 
                            isActive ? s.headerItemActive : ''
                        }
                    >
                        <span className={s.menuItemIcon}>
                            {icon}
                        </span>
                        <div className={s.menuItemTitle}>
                            <p>{title}</p>
                        </div>
                    </NavLink>
                </div>
            )
        }
        return (
            <div>
                <NavLink
                    to={link}
                    className={({ isActive }) => 
                        isActive ? s.childItemActive : ''
                    }
                >
                    <div className={s.menuItemTitle}>
                        <p>{title}</p>
                    </div>
                </NavLink>
            </div>
        )
    }
    return (
        <div className={s.headerItem}>
            <div 
                className={classNames("d-flex", s.headerItemActive, { [s.collapsed]: isOpen })}
                onClick={() => togglePanelCollapse(index)}
            >
                <span className={s.menuItemIcon}>
                    {icon}
                </span>
                <div className={s.menuItemTitle}>
                    <p>{title}</p>
                </div>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
            <Collapse className={s.panel} isOpen={isOpen}>
                {
                    childItems && childItems.map((childItem, index) => {
                        return (
                            <MenuListItem 
                                key={index}
                                isHeader={false}
                                icon={null}
                                title={childItem.title}
                                link={childItem.link}
                            />
                        )
                    })
                }
            </Collapse>
        </div>
    )
}

export default MenuListItem