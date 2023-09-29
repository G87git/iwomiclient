import Button from '@/components/button';
import PageWrapper from '@/components/PageWrapper';
import RTable from '@/components/RTable';
import React from 'react'

export default function Anomalie() {


    const column = [
        {
          Header: 'Code',
          accessor: "anormalieCode",
        },
        {
          Header: 'Label',
          accessor: "libelleAnormalie",
        },
        {
          Header: 'Creation Date',
          accessor: "DateCreation",
        },
        {
          Header: 'Modify Date',
          accessor: "DateModifier",
        },
        {
          Header: 'Status',
          accessor: "statusAnormalie",
        },
        {
          Header: 'Action',
          accessor: "action",
          disableFilters: true,
        },
      ];


  return (
    <div>
        <PageWrapper title="Anormalie List" />
        <RTable actions={<>
        <Button href="/system/anomalie/new">New</Button>
        </>} data={[]} columns={column} />
    </div>
  )
}
