export const GROUP_KEYS = [
    {
        label: 'Nome', key: 'name', type: 'string', visible: true
    },
    {
        label: 'Descrição', key: 'description', type: 'string', visible: true
    },
    {
        label: 'Data criação', key: 'creation', type: 'date', visible: true
    }
]

export const HOST_KEYS = [
    {label: 'Nome', key: 'name', type: 'string', visible: true},
    {label: 'Núcleos', key: 'cores', type: 'number', visible: true},
    {label: 'Threads', key: 'threads', type: 'number', visible: true},
    {
        label: 'Disco', key: 'disk', type: 'string', visible: true,
    },
    {
        label: 'RAM', key: 'ram', type: 'number', visible: true, method: (setColor, key, obj) => {
            return Math.floor(parseFloat(obj[key.key]) / (1000000))
        }
    }
]

export const STORAGE_KEYS = [
    {label: 'Nome', key: 'name', type: 'string', visible: true},
    {label: 'Pure ID', key: 'pure_id', type: 'number', visible: true},
    {label: 'Espaço', key: 'space', type: 'number', visible: true},
    {label: 'Espaço utilizado', key: 'used_space', type: 'number', visible: true},
]
export const VM_KEYS = [{
    label: 'Nome', key: 'name', type: 'string', visible: true
}, {
    label: 'Descrição', key: 'description', type: 'string', visible: true
}, {
    label: 'Data criação', key: 'created_on', type: 'date', visible: true
}, {
    label: 'Host', key: 'host', type: 'object', visible: true, subfieldKey: 'name', subType: 'string'
}, {
    label: 'Núcleos', key: 'cores', type: 'number', visible: true
}, {
    label: 'RAM', key: 'ram', type: 'number', visible: true, method: (setColor, key, obj) => {
        return Math.floor(parseFloat(obj[key.key]) / (10 ** 9))
    }
}, {
    label: 'IP', key: 'ip', type: 'string', visible: true, method: (setColor, key, obj) => {
        return obj[key.key] ? obj[key.key].split(' ')[0] : undefined
    }
}, {
    label: 'Mac', key: 'mac', type: 'string', visible: true
}]