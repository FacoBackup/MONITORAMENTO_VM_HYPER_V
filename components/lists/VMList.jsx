import List from "../../ext/visualization/list/List";
import KEYS from "../../templates/KEYS";
import React from "react";
import useQuery from "../../ext/visualization/hooks/useQuery";
import getQuery from "../getQuery";
import PropTypes from "prop-types";

export default function VMList(props){
    const hook = useQuery(getQuery('vm'))

    return(

            <List
                hook={hook}
                keys={KEYS.VM}
                onRowClick={e => props.redirect(`vm?id=${e.id}`)}
                title={'Máquinas virtuais'}
            />

    )
}


VMList.propTypes={
    redirect: PropTypes.func
}