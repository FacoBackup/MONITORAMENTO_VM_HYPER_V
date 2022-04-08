

export const GROUP = [{
    title: 'Informações básicas',
    groups: '2 1',
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
            label: 'Serviço',
            placeHolder: 'Serviço',
            required: true,

            key: 'service',
            type: 'text',
            width: '100%'
        },
        {
            label: 'Descrição',
            placeHolder: 'Descrição',
            required: true,

            key: 'description',
            type: 'text',
            width: '100%',
            customProps: {variant: 'area'}
        },
    ]
}]