import React, {useEffect, useState} from 'react'
import styles from '../styles/Details.module.css'

import {useRouter} from "next/router";
import {Button, Tab, VerticalTabs} from "@f-ui/core";
import FormTemplate from "../ext/FormTemplate";
import {VM} from "../templates/VM";
import List from "../ext/visualization/list/List";
import page from "../public/page.json";
import useRequest from "../ext/useRequest";
import {STORAGE} from "../templates/STORAGE";
import KEYS from "../templates/KEYS";
import useQuery from "../ext/visualization/hooks/useQuery";
import getQuery from "../components/getQuery";


export default function Storage() {
    const [open, setOpen] = useState(0)
    const {make} = useRequest(false)
    const router = useRouter()
    const [entity, setEntity] = useState()

    const hook = useQuery(getQuery('host', {storage: router.query.id}))

    useEffect(() => {
        if (router.isReady) {
            make({
                url: page.host + '/api/storage/' + router.query.id, method: 'get'
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
                        Volume
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
                                obj={STORAGE}
                            />
                        </Tab>

                        <Tab className={styles.contentWrapper} label={'Hosts vinculados'}>
                            <List
                                onRowClick={() => null}
                                hook={hook}
                                keys={KEYS.HOST}
                                title={'Hosts'}
                            />
                        </Tab>

                    </VerticalTabs>
                </>

            ) : undefined}

        </div>
    )
}
