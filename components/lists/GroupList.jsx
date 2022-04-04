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
import page from "../../public/page.json";
import {STORAGE} from "../../templates/STORAGE";
import useRequest from "../../ext/useRequest";
import {GROUP} from "../../templates/GROUP";

export default function GroupList(props){
    const [current, setCurrent] = useState()
    const hook = useQuery(getQuery('group'))
    const {make} = useRequest(true)
    return(
        <Switcher openChild={current ? 0 : 1} className={styles.wrapper}>
            <FormTemplate
                title={'Grupo'}
                submit={(data) => {
                    make({
                        url: page.host + '/api/group',
                        method: 'post',
                        data: {...data, used_space: parseFloat(data.used_space), space: parseFloat(data.space)}
                    }).then(e => {
                        setCurrent(undefined)
                        hook.clean()
                    })
                }}
                initial={current}
                obj={GROUP}
                create={true}
                handleClose={() => setCurrent(undefined)}/>
            <List
                createOption={true}
                onCreate={() => setCurrent({})}
                onRowClick={e => props.redirect(`group?id=${e.id}`)}
                hook={hook}
                keys={KEYS.GROUP}
                options={[
                    {
                        label: 'Deletar',
                        icon: <span className={'material-icons-round'}>delete_forever</span>,
                        onClick: (e) => {
                            console.log(e)
                            make({
                                url: page.host + '/api/group/' + e.id,
                                method: 'delete'
                            })
                                .then(() => hook.clean())
                                .catch()
                        }
                    }
                ]}
                title={'Grupos'}
            />
        </Switcher>
    )
}

GroupList.propTypes={
    redirect: PropTypes.func
}