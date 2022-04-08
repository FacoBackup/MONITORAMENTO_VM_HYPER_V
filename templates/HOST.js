import getQuery from "../ext/getQuery";
import {GROUP_KEYS} from "./KEYS";

export const HOST =[ {
    title: 'Informações básicas',
    groups: '1 3 3',
    rowGap: '4px',
    columnGap: '16px',
    inputs: [
        {
            label: 'Nome',
            placeHolder: 'Nome',
            key: 'name',
            type: 'text',
            width: '100%',
            disabled: true,
        },

        {
            label: 'Núcleos',
            placeHolder: 'Núcleos',
            disabled: true,
            key: 'cores',
            type: 'text',
            width: '100%'
        },
        {
            label: 'Threads',
            placeHolder: 'Threads',
            disabled: true,
            key: 'threads',
            type: 'text',
            width: '100%'
        },
        {
            label: 'RAM',
            placeHolder: 'RAM',
            disabled: true,
            key: 'ram',
            type: 'text',
            width: '100%'
        },
        {
            label: 'Espaço total disco',
            placeHolder: 'Espaço total disco',
           required: true,
            key: 'disk',
            type: 'text',
            width: '100%'
        },


        {
            label: 'Cluster',
            placeHolder: 'Cluster',
            required: true,
            key: 'cluster',
            type: 'text',
            width: '100%'
        },
        {
            label: 'Volume',
            placeHolder: 'Volume',
            key: 'storage',
            type: 'text',
            width: '100%',
            query: getQuery('storage'),
            keys: GROUP_KEYS
        }
    ]
}]