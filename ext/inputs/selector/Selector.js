import React, {useState} from 'react'
import styles from './styles/Selector.module.css'
import SelectorModal from "./modules/SelectorModal";
import PropTypes from "prop-types";
import shared from './styles/Shared.module.css'
import {Button, DataRow, ToolTip} from "@f-ui/core";
import useQuery from "../../visualization/hooks/useQuery";

export default function Selector(props) {
    const [open, setOpen] = useState(false)
    const hook = useQuery(props.query)
    return (<>

            <SelectorModal
                {...props} open={open}
                hook={hook}
                setOpen={setOpen}/>
            <div
                style={{
                    width: props.width, maxWidth: props.width, display: 'grid', gap: '4px'
                }}
            >
                <div
                    className={shared.labelContainer}
                    style={{
                        visibility: props.value !== null && props.value !== undefined ? 'visible' : 'hidden',
                        opacity: props.value !== null && props.value !== undefined ? '1' : '0',
                        transition: 'visibility 0.2s ease,opacity 0.2s ease',
                        textTransform: 'capitalize',
                    }}
                >
                    <div className={shared.overflow}>
                        {props.label}
                    </div>
                </div>
                <div
                    className={[shared.wrapper, styles.buttonWrapper].join(' ')}
                    data-highlight={open ? open : undefined}
                    data-disabled={props.disabled ? props.disabled : undefined}
                >

                    {props.value !== null && props.value !== undefined ? <DataRow
                        styles={{
                            height: props.height ? props.height : '45px',
                            border: 'none',
                            userSelect: 'none',
                            cursor: props.disabled ? 'default' : 'pointer'
                        }}
                        onClick={() => {
                            if (props.onClick)
                                props.onClick()
                            else setOpen(true)
                        }}
                        keys={props.keys} object={props.value} selfContained={true}
                    /> : <Button
                        disabled={props.disabled}
                        highlight={open}

                        styles={{
                            height: props.height ? props.height : '45px',
                            overflow: "hidden",
                            maxWidth: 'unset',
                            marginTop: 'unset',
                            zIndex: 5
                        }}
                        className={[styles.button, shared.labelContainer].join(' ')}
                        onClick={() => {
                            if (props.onClick)
                                props.onClick()
                            else setOpen(true)
                        }}
                    >
                        {props.placeholder}
                        <span
                            style={{fontSize: '1.2rem'}}
                            className="material-icons-round">launch</span>

                    </Button>}
                </div>
                <div className={shared.alertLabel}
                     style={{
                         color: props.value === null || props.value === undefined ? '#ff5555' : undefined,
                     }}>
                    {props.required ? 'Este campo é obrigatório' : null}
                    {props.helperText ? <div className={shared.helperText}>
                        <span className="material-icons-round" style={{fontSize: '1rem'}}>info</span>
                        <ToolTip content={props.helperText} align={'start'}/>
                    </div> : null}
                </div>
            </div>

        </>)
}

Selector.propTypes = {
    helperText: PropTypes.string,
    onClick: PropTypes.func,

    label: PropTypes.any,
    placeholder: PropTypes.any,
    required: PropTypes.bool,
    value: PropTypes.object,
    handleChange: PropTypes.func,
    disabled: PropTypes.bool,
    width: PropTypes.string,


    query: PropTypes.object.isRequired,
    keys: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['string', 'number', 'object', 'date']),
        maskStart: PropTypes.any,
        maskEnd: PropTypes.any,
        additionalWidth: PropTypes.string
    })).isRequired
}

