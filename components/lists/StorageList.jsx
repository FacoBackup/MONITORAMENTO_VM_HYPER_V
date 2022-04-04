import {Switcher} from "@f-ui/core";
import styles from "../../styles/Home.module.css";
import Vm from "../../pages/vm";
import List from "../../ext/visualization/list/List";
import KEYS from "../../templates/KEYS";
import React, {useState} from "react";
import useQuery from "../../ext/visualization/hooks/useQuery";
import getQuery from "../getQuery";
import PropTypes from "prop-types";
import FormTemplate from "../../ext/FormTemplate";
import {STORAGE} from "../../templates/STORAGE";
import useRequest from "../../ext/useRequest";
import page from '../../public/page.json'

export default function StorageList(props) {
    const [current, setCurrent] = useState()
    const hook = useQuery(getQuery('storage'))
    const {make} = useRequest(true)
    return (
        <Switcher openChild={current ? 0 : 1} className={styles.wrapper}>
            <FormTemplate
                title={'Volume'}
                submit={(data) => {
                    make({
                        url: page.host + '/api/storage',
                        method: 'post',
                        data: {...data, used_space: parseFloat(data.used_space), space: parseFloat(data.space)}
                    }).then(e => {
                        setCurrent(undefined)
                        hook.clean()
                    })
                }}
                initial={current}
                obj={STORAGE}
                create={true}
                handleClose={() => setCurrent(undefined)}/>
            <List
                hook={hook}
                keys={KEYS.STORAGE}
                createOption={true}
                onCreate={() => setCurrent({})}
                onRowClick={e => props.redirect(`storage?id=${e.id}`)}
                title={'Volumes'}
                options={[
                    {
                        label: 'Deletar',
                        icon: <span className={'material-icons-round'}>delete_forever</span>,
                        onClick: (e) => {
                            console.log(e)
                            make({
                                url: page.host + '/api/storage/' + e.id,
                                method: 'delete'
                            })
                                .then(() => hook.clean())
                                .catch()
                        }
                    }
                ]}
            />
        </Switcher>
    )
}

StorageList.propTypes = {
    redirect: PropTypes.func
}