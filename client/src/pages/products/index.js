import React from "react";
import {Grid, Button} from '@chakra-ui/react'
import Card from '../../components/cards/';
import {ProductsList} from '../../api';
import { useInfiniteQuery } from 'react-query';

export default function Products() {

    const { data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status } = useInfiniteQuery("Products", ProductsList, {
        getNextPageParam: (lastPage, allGroups) => {
            const morePagesExist = lastPage?.length === 12;

            if(!morePagesExist) return

            return allGroups.length + 1;
        },
      })

  
    if (status === "loading") return 'Loading...'

    if(status === "error") return "An error:" + error.message;
    
    return (
        <div>
            <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                {data.pages.map((group, i) => {
                    return (
                        <React.Fragment key={i}>
                            {group.map(item => {
                                return (
                                    <Card key={item._id} item={item}/>
                                )
                            })}
                        </React.Fragment>
                    )
                })}
            </Grid>
            <Button
                mt="10"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
            >
                {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                ? 'Load More'
                : 'Nothing more to load'}
            </Button>
        </div>
    )
}
