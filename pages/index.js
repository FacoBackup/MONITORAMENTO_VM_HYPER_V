import React, {useState} from 'react'
import {Tab, VerticalTabs} from "@f-ui/core";
import VMList from "../components/lists/VMList";
import GroupList from "../components/lists/GroupList";
import {useRouter} from "next/router";
import HostList from "../components/lists/HostList";
import StorageList from "../components/lists/StorageList";


export default function Home({data}) {
    const router = useRouter()
    const [open, setOpen] = useState(0)

    return (
        <VerticalTabs open={open}  setOpen={setOpen} styles={{width: '100%'}}>
            <Tab label={'Máquinas virtuais'}>
                <VMList redirect={router.push}/>
            </Tab>
            <Tab label={'Hosts físicos'}>
                <HostList redirect={router.push}/>
            </Tab>
            <Tab label={'Volumes'} group={'Dados adicionais'}>
                <StorageList redirect={router.push}/>
            </Tab>
            <Tab label={'Grupos'} group={'Dados adicionais'}>
                <GroupList redirect={router.push}/>
            </Tab>
        </VerticalTabs>
    )
}
