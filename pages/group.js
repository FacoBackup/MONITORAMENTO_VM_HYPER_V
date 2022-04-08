import React, {useEffect, useState} from 'react'
import styles from '../styles/Details.module.css'

import {useRouter} from "next/router";
import {Button, Tab, VerticalTabs} from "@f-ui/core";
import FormTemplate from "../ext/FormTemplate";
import page from "../public/page.json";
import {VM_KEYS} from "../templates/KEYS";

import getQuery from "../components/getQuery";
import {GROUP} from "../templates/GROUP";

import useQuery from "../ext/hooks/useQuery";
import useRequest from "../ext/hooks/useRequest";
import List from "../ext/list/List";


export default function Group() {
    const [open, setOpen] = useState(0)
    const {make} = useRequest(false)
    const router = useRouter()
    const [entity, setEntity] = useState()

    const hook = useQuery(getQuery('vm', {group: router.query.id}))

    useEffect(() => {
        if (router.isReady) {
            make({
                url: page.host + '/api/group/' + router.query.id, method: 'get'
            }).then(res => {
                setEntity(res.data)
                hook.clean()
            })
        }
    }, [router.isReady, router.query])

    return (<div className={styles.modal}>
            {entity !== undefined ? (<>
                    <h1 className={styles.header}>
                        <Button className={styles.button} variant={'outlined'} onClick={() => {
                            router.push('/')
                            setOpen(0)
                        }}>
                            <span className={'material-icons-round'}
                                  style={{fontSize: '1.2rem'}}>chevron_left</span>
                        </Button>
                        Grupo
                        <div>
                            -
                        </div>
                        <div className={styles.data}>
                            {entity?.name}
                        </div>

                    </h1>

                    <VerticalTabs open={open} setOpen={setOpen} className={styles.wrapper}>
                        <Tab className={styles.contentWrapper} label={'Dados básicos'}>
                            <FormTemplate
                                title={entity?.name}
                                initial={entity}
                                obj={GROUP}
                            />
                        </Tab>

                        <Tab className={styles.contentWrapper} label={'Máquinas no grupo'}>
                            <List
                                onRowClick={() => null}
                                hook={hook}
                                keys={VM_KEYS}
                                title={'Máquinas'}
                            />
                        </Tab>

                    </VerticalTabs>
                </>

            ) : undefined}

        </div>
    )
}
