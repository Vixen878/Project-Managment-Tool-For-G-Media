import React from 'react'

function AnimatedBlurBlobs() {
    return (
        <div>
            <div class="absolute top-0 -left-4 w-72 h-72 bg-primaryGreen rounded-full mix-blend-multiply filter opacity-70 animate-blob"></div>
            <div class="absolute top-0 -right-4 w-72 h-72 bg-gred rounded-full mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000"></div>
            <div class="absolute -bottom-8 left-20 w-72 h-72 bg-gorange rounded-full mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000"></div>
        </div>
    )
}

export default AnimatedBlurBlobs
