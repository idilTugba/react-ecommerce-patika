import {useAuth} from '../../context/'
import { Heading } from '@chakra-ui/react';


export default function Profile() {
    const {user} = useAuth();

    return (
        <>
            <Heading mb="10px" as="h3">Profile</Heading>
            <code>{JSON.stringify(user)}</code>
        </>
    )
}
