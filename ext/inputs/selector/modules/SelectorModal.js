import styles from '../styles/SelectorModal.module.css'
import React from "react";

import PropTypes from "prop-types";
import useInfiniteScroll from "../../../visualization/hooks/useInfiniteScroll";
import {Button, DataRow, Modal} from "@f-ui/core";

export default function SelectorModal(props) {
    const lastElementRef = useInfiniteScroll(props.hook.setCurrentPage, props.hook.currentPage, props.hook.loading, props.hook.hasMore)


    return (<Modal
        open={props.open}
        handleClose={() => {
            props.setOpen(false)
        }}
        blurIntensity={'none'}

        className={styles.wrapper}
    >

        <div className={styles.headerButtons}>
            <div className={styles.header}>
                {props.label}
            </div>

            <Button
                variant={'outlined'}
                onClick={() => props.hook.clean()}
                className={styles.headerButton}
                styles={{marginRight: '4px'}}
                attributes={{
                    title: 'Recarregar dados'
                }}
            >
                <span className="material-icons-round" style={{fontSize: '1.1rem'}}>refresh</span>
            </Button>
            <Button
                variant={'outlined'}
                onClick={() => {
                    props.handleChange(null)
                    props.setOpen(false)
                }} color={"secondary"}
                className={styles.headerButton}
                disabled={!props.value}
                attributes={{
                    title: 'Limpar selecionado'
                }}>
                <span className="material-icons-round" style={{fontSize: '1.1rem'}}>clear_all</span>
            </Button>

        </div>

        {props.value && Object.keys(props.value).length > 0 ? <DataRow
            onClick={() => {
                if (props.onClick) props.onClick()

            }}
            keys={props.keys} object={props.value}
            styles={{minHeight: '45px', padding: 0}}
            selfContained={true}
        /> : <DataRow
            onClick={() => {
                if (props.onClick) props.onClick()

            }}
            styles={{minHeight: '35px', padding: '4px'}}
            keys={[{label: 'Vazio', type: 'string', key: 'k'}]}
            object={{k: 'Nada selecionado'}}
            selfContained={false}
        />}

        <div className={styles.rows}>
            {props.hook.data.length === 0 ? 'Nada encontrado' : props.hook.data.map((e, i) => (
                <React.Fragment key={e.id + '-selector-modal-row-' + i}>
                    <DataRow
                        styles={{height: '52px'}}
                        className={styles.row}
                        onClick={() => {
                            props.handleChange(e.data)
                            props.setOpen(false)
                        }}
                        reference={i === (props.hook.data.length - 1) ? lastElementRef : undefined}
                        keys={props.keys} object={e.data} selfContained={true}
                    />
                </React.Fragment>))}
        </div>
    </Modal>)


}
SelectorModal.propTypes = {
    data: PropTypes.array, keys: PropTypes.array, createOption: PropTypes.bool,

    open: PropTypes.bool, setOpen: PropTypes.func,

    cleanState: PropTypes.func, value: PropTypes.object, handleChange: PropTypes.func,

    label: PropTypes.string, hook: PropTypes.object, identificationKey: PropTypes.string
}
