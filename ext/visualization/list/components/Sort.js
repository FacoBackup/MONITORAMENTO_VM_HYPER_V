import PropTypes from 'prop-types'
import styles from '../styles/Row.module.css'
import React, {useRef} from 'react'
import keyTemplate from "../templates/keyTemplate";
import SortField from "./SortField";

export default function Sort(props) {
    const ref = useRef()

    return (
        <div className={styles.headerRow} ref={ref}>
            {props.keys.map((e, i) => (
                <React.Fragment key={i + 'header-row-cell'}>
                    <SortField

                        setSorts={props.setSorts}
                        additionalWidth={e.additionalWidth ? e.additionalWidth : '0px'}
                        value={e} sorts={props.sorts}
                        length={props.keys.length}
                    />
                </React.Fragment>
            ))}

        </div>
    )
}

Sort.propTypes = {
    keys: PropTypes.arrayOf(keyTemplate),
    hasOptions: PropTypes.bool,
    setSorts: PropTypes.func,
    sorts: PropTypes.arrayOf(PropTypes.object)
}
