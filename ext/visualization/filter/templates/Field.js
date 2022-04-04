import PropTypes from 'prop-types'
import styles from '../styles/Field.module.css'
import useFilter from "../hooks/useFilters";
import React from 'react'
import keyTemplate from "../../list/templates/keyTemplate";
import {Button} from "@f-ui/core";


export default function Field(props) {
    const {
        getField,
        changed
    } = useFilter(props.selectedField, props.setSelectedField, props.setSelectorOpen, props.selectorOpen)

    return (
        <div
            className={styles.container}
        >

            {props.selectedField !== null && props.selectedField !== undefined ?
                (
                    <>
                     <div className={styles.title}>
                         <Button

                             variant={'outlined'}

                             className={styles.buttonField}
                             styles={{maxWidth: '30px', justifyContent: 'center', padding: 0}}

                             onClick={() => {
                                 props.setSelectedField(null)
                             }}>
                             <span className={'material-icons-round'}>chevron_left</span>
                         </Button>
                         {props.selectedField?.label}
                     </div>
                        {getField()}
                        <div className={styles.field}>
                            <Button
                                className={styles.buttonField}
                                variant={'filled'}
                                disabled={!changed}
                                onClick={() => props.applyFilter()}>
                                <span style={{fontSize: '1.1rem'}} className="material-icons-round">done</span>
                                Aplicar
                            </Button>
                        </div>
                    </>
                )
                :
                'Nada selecionado'
            }
        </div>
    )
}

Field.propTypes = {
    applyFilter: PropTypes.func,
    keys: PropTypes.arrayOf(keyTemplate).isRequired,
    selectorOpen: PropTypes.bool,
    setSelectorOpen: PropTypes.func,
    selectedField: PropTypes.object,
    setSelectedField: PropTypes.func,

}
