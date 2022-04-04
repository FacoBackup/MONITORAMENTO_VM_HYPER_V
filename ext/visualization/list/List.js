import PropTypes from 'prop-types'
import styles from './styles/List.module.css'
import Header from "./components/Header";
import React, {useState} from "react";
import keyTemplate from "./templates/keyTemplate";
import useList from "./hook/useList";
import Settings from "./components/Settings";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import {Dropdown,DataProvider, DataRow, DropdownOption, DropdownOptions, useListData} from '@f-ui/core'

export default function List(props) {
    const {keys, keysDispatcher, actions, setOpenSettings, openSettings} = useList(props.keys)
    const lastElementRef = useInfiniteScroll(props.hook.setCurrentPage, props.hook.currentPage, props.hook.loading, props.hook.hasMore)
    const [scrolled, setScrolled] = useState(false)
    const [selfContained, setSelfContained] = useState(true)
    const hook = useListData(keys.filter(k => k.visible), props.hook.data.map(d => d.data), selfContained)

    return (
        <DataProvider.Provider value={hook}>
            <div
                onScroll={event => {
                    if (event.target.scrollTop > 0)
                        setScrolled(true)
                    else
                        setScrolled(false)
                }}
                className={styles.container}
            >
                <Settings
                    open={openSettings}
                    keys={keys} actions={actions} setOpen={setOpenSettings}
                    dispatchKeys={keysDispatcher}/>
                <Header
                    scrolled={scrolled}
                    setSelfContained={setSelfContained}
                    selfContained={selfContained}
                    title={props.title}
                    noFilters={props.noFilters}
                    createOption={props.createOption}
                    onCreate={props.onCreate}
                    hook={props.hook}
                    keys={keys} actions={actions} dispatch={keysDispatcher}
                    setOpenSettings={setOpenSettings}
                />
                <div
                    className={styles.tableWrapper}
                >
                    {props.hook.data.length === 0 ?
                        <div className={styles.empty}>
                            <span className={'material-icons-round'} style={{fontSize: '75px'}}>folder</span>
                            Nada encontrado
                        </div>
                        :
                        null
                    }

                    {props.hook.data.map((e, index) => (
                        <div className={styles.listRow} key={e.id + '-list-row'}>
                            {props.options ? (
                                <Dropdown className={styles.dropdown}>
                                    <DropdownOptions>
                                        {props.options.map((o, oI) => (
                                            <React.Fragment key={oI + 'list-option'}>
                                                <DropdownOption option={{...o, onClick: () => {
                                                        o.onClick(e.data)
                                                    }}}/>
                                            </React.Fragment>
                                        ))}
                                    </DropdownOptions>
                                </Dropdown>
                            ) : null}
                            {props.children ? props.children(e.data) : null}
                            <DataRow
                                noTitle={props.children !== undefined}
                                className={styles.row}
                                styles={{
                                    background: index % 2 === 0 ? 'var(--fabric-background-tertiary)' : undefined,
                                    borderRadius: index === 0 ? '5px 5px 0 0' : index === props.hook.data.length -1 ? '0 0 5px 5px' : 0
                                }}
                                index={index} onClick={() => props.onRowClick(e.data)} reference={lastElementRef}/>
                        </div>
                    ))}
                </div>
            </div>
        </DataProvider.Provider>
    )
}

List.propTypes = {
    children: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        onClick: PropTypes.func,
        icon: PropTypes.any
    })),

    noFilters: PropTypes.bool,
    hook: PropTypes.object.isRequired,
    onRowClick: PropTypes.func.isRequired,
    keys: PropTypes.arrayOf(keyTemplate).isRequired,
    controlButtons: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.element,
        label: PropTypes.any,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    })),
    title: PropTypes.any,

    createOption: PropTypes.bool,
    onCreate: PropTypes.func,
    onlyVisualization: PropTypes.bool
}
