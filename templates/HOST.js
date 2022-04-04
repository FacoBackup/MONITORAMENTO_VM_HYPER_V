import getQuery from "../components/getQuery";
import KEYS from "./KEYS";

export const HOST = {
    title: 'Informações básicas',
    groups: '2 1',
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
            label: 'Espaço total disco',
            placeHolder: 'Espaço total disco',
            disabled: true,
            key: 'disk',
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
            label: 'Cluster',
            placeHolder: 'Cluster',
            disabled: true,
            key: 'cluster',
            type: 'text',
            width: '100%'
        },
        {
            label: 'Volume',
            placeHolder: 'Volume',
            disabled: true,
            key: 'storage',
            type: 'text',
            width: '100%',
            query: getQuery('storage'),
            keys: KEYS.GROUP
        }
    ]
}