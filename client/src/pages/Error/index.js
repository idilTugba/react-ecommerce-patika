import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'

function Error() {
    return (
        <div>
            <Alert status='error'>
                <AlertIcon />
                <AlertTitle>404 Not Founded</AlertTitle>
                <AlertDescription>This page was not founded.</AlertDescription>
            </Alert>
        </div>
    )
}

export default Error
