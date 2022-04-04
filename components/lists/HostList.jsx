import {Switcher} from "@f-ui/core";
import styles from "../../styles/Home.module.css";
import Vm from "../../pages/vm";
import List from "../../ext/visualization/list/List";
import KEYS from "../../templates/KEYS";
import React, {useState} from "react";
import useQuery from "../../ext/visualization/hooks/useQuery";
import getQuery from "../getQuery";
import PropTypes from "prop-types";

export default function HostList(props) {
    const [current, setCurrent] = useState()
    const hook = useQuery(getQuery('host'))


    return (

        <List
            hook={hook}
            keys={KEYS.HOST}
            onRowClick={e => {
                console.trace(e)
                props.redirect(`host?id=${e.name}`)
            }}
            title={'Hosts físicos'}
        />
    )
}
HostList.propTypes = {
    redirect: PropTypes.func
}