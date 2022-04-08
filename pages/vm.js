import styles from '../styles/Details.module.css'

import {Button, Tab, VerticalTabs} from "@f-ui/core";
import React, {useEffect, useState} from "react";
import useQuery from "../ext/hooks/useQuery";
import useRequest from "../ext/hooks/useRequest";
import List from "../ext/list/List";
import page from '../public/page.json'
import FormTemplate from "../ext/FormTemplate";
import {VM} from "../templates/VM";
import {useRouter} from "next/router";
import getQuery from "../ext/getQuery";

const keysNW = [{
    label: 'Nome', key: 'name', type: 'string', visible: true
}, {label: 'Mac', key: 'mac_address', type: 'string', visible: true}, {
    label: 'IP', key: 'ip_address', type: 'string', visible: true
}, {
    label: 'Pool', key: 'pool_name', type: 'string', visible: true
}, {
    label: 'Status', key: 'status_description', type: 'string', visible: true
}]

const keysHD = [{
    label: 'Nome', key: 'name', type: 'string', visible: true
}, {
    label: 'Descrição', key: 'path', type: 'string', visible: true
}, {
    label: 'Espaço livre', key: 'space', type: 'string', visible: true, method: (setColor, field, entity) => {
        return entity.space / 5500000
    }
}, {
    label: 'Espaço usado', key: 'used_space', type: 'string', visible: true
}]


export default function Vm() {
    const {make} = useRequest(false)
    const router = useRouter()

    const [entity, setEntity] = useState()
    useEffect(() => {
        if (router.isReady) {
            make({
                url: page.host + '/api/vm/' + router.query.id, method: 'get'
            }).then(res => {
                setEntity(res.data)
            })
        }
    }, [router.isReady, router.query])


    const hook = useQuery(getQuery('rede_vm/' + entity?.id))
    const hookHD = useQuery(getQuery('disco_vm/' + entity?.id))

    useEffect(() => {
        hook.clean()
        hookHD.clean()
    }, [entity])
    const [open, setOpen] = useState(0)

    return (
        <div className={styles.modal}>
            {entity !== undefined ? (<>
                    <h1 className={styles.header}>
                        <Button className={styles.button} variant={'outlined'} onClick={() => {
                            router.push('/')
                            setOpen(0)
                        }}>
                            <span className={'material-icons-round'}
                                  style={{fontSize: '1.2rem'}}>chevron_left</span>
                        </Button>
                        Máquina virtual
                        <div>
                            -
                        </div>
                        <div className={styles.data}>
                            {entity?.name} ({entity?.host?.name})
                        </div>
                    </h1>

                    <VerticalTabs open={open} setOpen={setOpen} className={styles.wrapper}>
                        <Tab className={styles.contentWrapper} label={'Dados básicos'}>
                            <FormTemplate
                                title={entity?.name}
                                initial={{...entity, created_on: (new Date(entity.created_on)).toString()}}
                                submit={(data) => {
                                    make({
                                        url: page.host + '/api/vm/' + data.id,
                                        method: 'PUT',
                                        data: {...data, group: data.group?.id}
                                    })
                                }}
                                obj={VM}/>
                        </Tab>

                        <Tab className={styles.contentWrapper} label={'Rede'}>
                            <List
                                onRowClick={() => null}
                                hook={hook}
                                keys={keysNW}
                                title={'Placas de rede'}
                            />

                        </Tab>

                        <Tab className={styles.contentWrapper} label={'Disco'}>

                            <List
                                onRowClick={() => null}
                                hook={hookHD}
                                keys={keysHD}
                                title={'Discos'}
                            />

                        </Tab>
                    </VerticalTabs>
                </>

            ) : undefined}

        </div>)
}

