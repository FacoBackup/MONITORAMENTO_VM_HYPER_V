import getQuery from "../ext/getQuery";
import {GROUP_KEYS} from "./KEYS";


export const VM = [{
    title: 'Informações básicas',
    groups: '3 2 3 3 2 2 1',
    rowGap: '4px',
    columnGap: '16px',
    inputs: [
        {
            label: 'Nome',
            placeHolder: 'Nome',
            required: false,
            disabled: true,
            key: 'name',
            type: 'text',
            width: '100%',

        },
        {
            label: 'Caminho',
            placeHolder: 'Caminho',
            required: false,
            disabled: true,
            key: 'path',
            type: 'text',
            width: '100%',
        },
        {
            label: 'Data de criação',
            placeHolder: 'Data de criação',
            required: false,
            disabled: true,
            key: 'created_on',
            type: 'date',
            width: '100%',
        },
        {
            label: 'Descrição',
            placeHolder: 'Descrição',
            required: false,
            disabled: true,
            key: 'description',
            type: 'text',
            width: '100%',
            customProps: {
                variant: 'area'
            }
        },

        {
            label: 'Núcleos',
            placeHolder: 'Núcleos',
            required: false,
            disabled: true,
            key: 'cores',
            type: 'text',
            width: '100%',
        },
        {
            label: 'RAM',
            placeHolder: 'RAM',
            required: false,
            disabled: true,
            key: 'nationality',
            type: 'text',
            width: '100%',
        },
        {
            label: 'Sistema operacional',
            placeHolder: 'Sistema operacional',
            required: false,
            disabled: true,
            key: 'operating_system',
            type: 'text',
            width: '100%',
        },
        {
            label: 'Descrição status',
            placeHolder: 'Descrição status',
            required: false,
            disabled: true,
            key: 'status_description',
            type: 'text',
            width: '100%',
        },
        {
            label: 'Tempo ativo dias',
            placeHolder: 'Tempo ativo dias',
            required: false,
            disabled: true,
            key: 'up_time_days',
            type: 'text',
            width: '100%',
        },
        {
            label: 'Tempo ativo horas',
            placeHolder: 'Tempo ativo horas',
            required: false,
            disabled: true,
            key: 'up_time_hours',
            type: 'text',
            width: '100%',
        },
        {
            label: 'Dias totais ativo',
            placeHolder: 'Dias totais ativo',
            required: false,
            disabled: true,
            key: 'total_days',
            type: 'text',
            width: '100%',
        },
        {
            label: 'Horas totais ativo',
            placeHolder: 'Horas totais ativo',
            required: false,
            disabled: true,
            key: 'total_hours',
            type: 'text',
            width: '100%',
        },

        {
            label: 'MAC',
            placeHolder: 'MAC',
            required: false,
            disabled: true,
            key: 'mac',
            type: 'text',
            width: '100%',
        },

        {
            label: 'Host físico',
            placeHolder: 'Host físico',
            required: false,
            disabled: true,
            key: 'physical_host',
            type: 'text',
            width: '100%',
        },
        {
            label: 'Grupo',
            placeHolder: 'Grupo',
            required: false,
            disabled: false,
            key: 'group',
            type: 'text',
            width: '100%',
            query: getQuery('group'),
            keys: GROUP_KEYS
        },
        {
            label: 'Desativada',
            placeHolder: 'Desativada',
            required: false,
            disabled: true,
            customProps: {
              noMargin: true
            },
            key: 'disabled',
            type: 'check',
            width: '100%',
        },
    ]
}]