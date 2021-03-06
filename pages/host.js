import React, {useEffect, useState} from 'react'
import styles from '../styles/Details.module.css'

import {useRouter} from "next/router";
import {Button, Tab, VerticalTabs} from "@f-ui/core";
import FormTemplate from "../ext/FormTemplate";
import page from "../public/page.json";
import {VM_KEYS} from "../templates/KEYS";
import getQuery from "../ext/getQuery";

import {HOST} from "../templates/HOST";


import useQuery from "../ext/hooks/useQuery";
import useRequest from "../ext/hooks/useRequest";
import List from "../ext/list/List";

export default function Host() {
    const [open, setOpen] = useState(0)
    const {make} = useRequest(true)
    const router = useRouter()
    const [entity, setEntity] = useState()

    const hook = useQuery(getQuery('vm', {host: router.query.id}))

    useEffect(() => {
        if (router.isReady) {
            make({
                url: page.host + '/api/host/' + router.query.id, method: 'get'
            }).then(res => {
                setEntity(res?.data)
                hook.clean()
            })
        }
    }, [router.isReady, router.query])

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
                        Host
                        <div>
                            -
                        </div>
                        <div className={styles.data}>
                            {entity?.name}
                        </div>

                    </h1>

                    <VerticalTabs open={open} setOpen={setOpen} className={styles.wrapper}>
                        <Tab className={styles.contentWrapper} label={'Dados b??sicos'}>
                            <FormTemplate
                                title={entity?.name}
                                initial={entity}
                                submit={(data) => {
                                    make({
                                        url: page.host + '/api/host/' + data.id,
                                        method: 'PUT',
                                        data: {...data, storage: data.storage?.id}
                                    })
                                }}
                                obj={HOST}
                            />
                        </Tab>

                        <Tab className={styles.contentWrapper} label={'M??quinas vinculadas'}>
                            <List
                                onRowClick={() => null}
                                hook={hook}
                                keys={VM_KEYS}
                                title={'M??quinas'}
                            />
                        </Tab>

                    </VerticalTabs>
                </>

            ) : undefined}

        </div>
    )
}
