import React, {useCallback, useMemo, useState} from "react";

import styles from '../../list/styles/Header.module.css'

import Selector from "../../../inputs/selector/Selector";
import useQuery from "../../hooks/useQuery";
import {Checkbox, DateField, TextField} from "@f-ui/core";

export default function useFilter(filter, setFilter, setSelectorOpen, selectorOpen) {
    const [onInput, setOnInput] = useState(undefined)
    const [changed, setChanged] = useState(false)
    const query = useMemo(() => {
        return filter?.query ? filter.query : {}
    }, [filter])
    let hook = useQuery(query)

    const handleChange = (value) => {
        setFilter(prevState => {
            if (filter.type === 'object')
                return {
                    ...prevState,
                    value: value,
                    objectLabel: value[query?.keys[0]?.key]
                }
            else
                return {
                    ...prevState,
                    value: value
                }
        })
        setChanged(true)
    }
    const getField = useCallback(() => {
        let field

        const baseProps = {
            type: filter.type,
            key: filter.key,
            label: filter.label
        }
        const dateNumber = (val) => (
            <div className={styles.fieldWrapper}>
                {val}

                <Checkbox
                    checked={filter.greater_than}
                    handleCheck={() => {
                        setFilter(prevState => {
                            return {...baseProps, ...{value: prevState.value, greater_than: true}}
                        })
                    }}
                    label={'Maior que.'}
                />

                <Checkbox
                    checked={filter.less_than}
                    handleCheck={() => {
                        setFilter(prevState => {
                            return {...baseProps, ...{value: prevState.value, less_than: true}}
                        })
                    }}
                    label={'Menor que.'}
                />


                <Checkbox
                    checked={filter.equal_to}
                    handleCheck={() => {
                        setFilter(prevState => {
                            return {...baseProps, ...{value: prevState.value, equal_to: true}}
                        })
                    }}
                    label={'Iqual a'}
                />


            </div>
        )
        switch (filter.type) {
            case 'string': {
                field = (
                    <div className={styles.fieldWrapper}>
                        <TextField
                            label={filter.label} width={'100%'} disabled={false}
                            handleChange={value => handleChange(value.target.value)}
                            value={filter.value}
                            placeholder={filter.label}
                        />


                        <Checkbox
                            checked={filter.equal_to}
                            handleCheck={() => {
                                setFilter(prevState => {
                                    return {...baseProps, ...{value: prevState.value, equal_to: true}}
                                })
                            }}
                            label={'É igual a.'}
                        />


                        <Checkbox
                            checked={filter.different_from}
                            handleCheck={() => {
                                setFilter(prevState => {
                                    return {...baseProps, ...{value: prevState.value, different_from: true}}
                                })
                            }}
                            label={'Não é (case sensitive).'}
                        />

                        <Checkbox
                            checked={filter.contains}
                            handleCheck={() => {
                                setFilter(prevState => {
                                    return {...baseProps, ...{value: prevState.value, contains: true}}
                                })
                            }}
                            label={'Contém.'}
                        />
                    </div>
                )
                break
            }
            case 'number': {
                field = dateNumber((
                    <TextField
                        label={filter.label} width={'100%'}
                        disabled={false} required={false}
                        handleChange={value => handleChange(value.target.value)}
                        type={'number'} placeholder={filter.label}
                        value={filter.value}
                    />
                ))
                break
            }
            case 'object': {
                field = (
                    <Selector
                        keys={query && query.keys ? query.keys : []}
                        hook={hook} open={selectorOpen} onClick={() => setSelectorOpen(true)}
                        handleClose={() => setSelectorOpen(false)}
                        handleChange={entity => handleChange(entity)}
                        value={filter.value}
                        label={filter.label}
                        required={false}
                        placeholder={filter.label}
                        width={'100%'}/>
                )
                break
            }
            case 'date': {
                field = dateNumber((
                    <DateField
                        label={filter.label} width={'100%'} disabled={false} required={false}
                        handleChange={value => handleChange(value)}
                        value={filter.value}
                    />
                ))
                break
            }
            default :
                break

        }
        return field
    }, [filter, hook])

    return {getField, changed, setChanged, onInput, setOnInput}
}
