import getQuery from "../components/getQuery";
import KEYS from "./KEYS";

export const STORAGE=  {
    title: 'Informações básicas',
    groups: '2 2',
    rowGap: '4px',
    columnGap: '16px',
    inputs: [
        {
            label: 'Nome',
            placeHolder: 'Nome',
            required: true,
            key: 'name',
            type: 'text',
            width: '100%',

        },
        {
            label: 'Pure ID',
            placeHolder: 'Pure ID',
            required: true,

            key: 'pure_id',
            type: 'text',
            width: '100%',
        },
        {
            label: 'Espaço total',
            placeHolder: 'Espaço total',
            required: true,

            key: 'space',
            type: 'text',
            width: '100%',
            customProps: {
                type: 'number'
            }
        },
        {
            label: 'Espaço utilizado',
            placeHolder: 'Espaço utilizado',
            required: true,

            key: 'used_space',
            type: 'text',
            width: '100%',
            customProps: {
                type: 'number'
            }
        },
    ]
}