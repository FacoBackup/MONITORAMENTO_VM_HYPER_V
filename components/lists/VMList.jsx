import useQuery from "../../ext/hooks/useQuery";
import List from "../../ext/list/List";
import React from "react";
import getQuery from "../../ext/getQuery";

import PropTypes from "prop-types";
import {VM_KEYS} from "../../templates/KEYS";

export default function VMList(props){
    const hook = useQuery(getQuery('vm'))
    return(

            <List
                hook={hook}
                keys={VM_KEYS}
                onRowClick={e => props.redirect(`vm?id=${e.id}`)}
                title={'Máquinas virtuais'}
            />

    )
}


VMList.propTypes={
    redirect: PropTypes.func
}