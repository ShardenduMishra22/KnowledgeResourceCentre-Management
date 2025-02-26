import { Button } from '@/components/ui/button'
import React from 'react'


const page = () => {
  return (
    <main>
      Slow Down Buddy
      <Button
        onClick={() => {
          window.history.back()
        }}
      >
        Go Back
      </Button>
    </main>
  )
}

export default page
