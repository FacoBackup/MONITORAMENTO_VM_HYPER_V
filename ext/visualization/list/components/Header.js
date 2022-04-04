import PropTypes from 'prop-types'
import styles from '../styles/Header.module.css'
import React from "react";
import useHeader from "../hook/useHeader";
import keyTemplate from "../templates/keyTemplate";
import Filter from "../../filter/Filter";

import Sort from "./Sort";
import {Button, Dropdown, DropdownOption, DropdownOptions} from "@f-ui/core";


export default function Header(props) {
    const {
        getType,
        parseDate,
        open,
        setOpen
    } = useHeader(props.dispatch, props.actions)


    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                {props.title}
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Dropdown hideArrow={true} className={styles.button}>
                        <span className="material-icons-round" style={{fontSize: '1.3rem'}}>more_vert</span>
                        <DropdownOptions>

                            <DropdownOption option={{
                                label: 'Recarregar',
                                icon: <span className="material-icons-round"
                                            style={{fontSize: '1.3rem'}}>refresh</span>,
                                onClick: () => {
                                    props.hook.clean()
                                }
                            }}/>
                            <DropdownOption option={{
                                label: 'Configurações',
                                icon: <span className="material-icons-round"
                                            style={{fontSize: '1.3rem'}}>settings</span>,
                                onClick: () => {
                                    props.setOpenSettings(true)
                                }
                            }}/>
                            <DropdownOption option={{
                                label: 'Detalhes',
                                icon: props.selfContained ? <span className="material-icons-round"
                                            style={{fontSize: '1.3rem'}}>check</span> : undefined,
                                onClick: () => {
                                    props.setSelfContained(!props.selfContained)
                                }
                            }}/>
                        </DropdownOptions>
                    </Dropdown>

                    <Button
                        styles={{display: props.createOption ? undefined : 'none', color: 'white'}}
                        onClick={() => props.onCreate()} variant={"filled"}
                        className={styles.button}>
                      <span className="material-icons-round"
                            style={{fontSize: '1.3rem'}}
                      >
                            add
                        </span>
                    </Button>
                </div>
            </div>

            {props.noFilters ?
                null
                :
                <div className={styles.filters}>
                    <Button
                        styles={{display: !props.noFilters ? undefined : 'none', gap: '16px'}}
                        onClick={() => setOpen(true)} variant={"outlined"}
                        className={styles.button}>
                        Filtrar
                        <span className="material-icons-round"
                              style={{fontSize: '1.3rem'}}
                        >
                            add
                        </span>
                    </Button>
                    <Filter
                        keys={props.keys.filter(e => !e.deeperFieldKey)} filters={props.hook.filters}
                        setFilters={props.hook.setFilters}
                        getType={getType} open={open} setOpen={setOpen}
                        parseDate={parseDate}
                    />
                </div>
            }
            <Sort
                keys={props.keys.filter(e => e.visible === true)}
                sorts={props.hook.sorts}
                setSorts={props.hook.setSorts}

            />
        </div>

    )
}

Header.propTypes = {

    scrolled: PropTypes.bool,

    hook: PropTypes.object,
    noFilters: PropTypes.bool,
    dispatch: PropTypes.func,
    actions: PropTypes.object,

    title: PropTypes.any,

    keys: PropTypes.arrayOf(keyTemplate).isRequired,

    setOpenSettings: PropTypes.func,

    createOption: PropTypes.bool,
    onCreate: PropTypes.func,


    setSelfContained: PropTypes.func,
    selfContained: PropTypes.bool
}
