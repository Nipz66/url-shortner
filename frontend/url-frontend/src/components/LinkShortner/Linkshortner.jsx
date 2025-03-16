import React from 'react'
import { useState } from 'react'
import ShortenedLinks from './ShortenedLinks'
import ShortenerForm from './ShortenerForm'

function Linkshortner() {
    
    return (
        <div>
            <ShortenedLinks />
            <ShortenerForm />
        </div>

    )
}

export default Linkshortner