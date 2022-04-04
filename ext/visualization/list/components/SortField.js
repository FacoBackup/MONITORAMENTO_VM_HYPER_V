import PropTypes from "prop-types";
import React, {useRef, useState} from "react";

import styles from '../styles/Row.module.css'
import keyTemplate from "../templates/keyTemplate";
import {Button, ToolTip} from "@f-ui/core";

export default function SortField(props) {
    const ref = useRef()
    const [currentSort, setCurrentSort] = useState(undefined)

    return (

        <Button
            className={styles.cell}

            disabled={props.value.type === 'object'}
            onClick={() => {
                const exists = props.sorts.findIndex(e => e.key === props.value.key)
                switch (currentSort) {
                    case 'desc': {
                        setCurrentSort('asc')
                        let value = [...props.sorts]
                        value[exists] = {key: props.value.key, asc: true, desc: false}
                        props.setSorts(value)
                        break
                    }
                    case 'asc': {
                        setCurrentSort(undefined)

                        let value = [...props.sorts]
                        value.splice(exists, 1)
                        props.setSorts(value)

                        break
                    }
                    default: {
                        setCurrentSort('desc')

                        props.setSorts([...props.sorts, {key: props.value.key, asc: false, desc: true}])
                        break
                    }
                }
            }}
            reference={ref}
        >

            <div className={styles.overflow}>
                {props.value.label}
                <ToolTip content={props.value.label.toUpperCase()}/>
            </div>
            <span className="material-icons-round"
                  style={{
                      transform: currentSort === 'desc' ? 'rotate(180deg)' : undefined,
                      fontSize: '1.1rem',
                      transition: '150ms linear',
                      color: currentSort === undefined ? '#999999' : 'inherit'
                  }}
            >
              keyboard_arrow_down
            </span>
        </Button>

    )
}

SortField.propTypes = {

    length: PropTypes.number,
    additionalWidth: PropTypes.string,
    value: keyTemplate,
    sorts: PropTypes.array,
    setSorts: PropTypes.func
}