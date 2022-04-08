import useQuery from "../../ext/hooks/useQuery";
import List from "../../ext/list/List";
import React, {useState} from "react";
import getQuery from "../../ext/getQuery";

import PropTypes from "prop-types";
import {HOST_KEYS} from "../../templates/KEYS";

export default function HostList(props) {
    const [current, setCurrent] = useState()
    const hook = useQuery(getQuery('host'))


    return (

        <List
            hook={hook}
            keys={HOST_KEYS}
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