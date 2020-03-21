
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const placeHolder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="

const Image = styled.img`
  display: block;
  height: 100px;
  width: 100px;
  // Add a smooth animation on loading
  @keyframes loaded {
    0% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }
  // I use utilitary classes instead of props to avoid style regenerating
  &.loaded:not(.has-error) {
    animation: loaded 300ms ease-in-out;
  }
  &.has-error {
    // fallback to placeholder image on error
    content: url(${placeHolder});
  }
`
const onLoad = event => {
    event.target.classList.add("loaded")
}

const onError = event => {
    event.target.classList.add("has-error")
}

export const LazyImage = ({ src, alt }) => {

    const [imageSrc, setImageSrc] = useState(placeHolder)
    const [imageRef, setImageRef] = useState()


    useEffect(() => {
        let observer
        let didCancel = false
        if (imageRef && imageSrc === placeHolder) {
            if (IntersectionObserver) {
                observer = new IntersectionObserver(
                    entries => {
                        entries.forEach(entry => {
                            if (!didCancel && entry.intersectionRatio && entry.isIntersecting > 0)
                                setImageSrc(src);
                        })
                    }
                    , {
                        threshold: 0.5,
                        rootMargin: '75%'
                    })
                return observer
            }
        } else {
            setImageSrc(src)
        }
        return () => {
            didCancel = true
            if (observer && observer.unobserve) {
                observer.unobserve(imageRef)
            }
        }
    }, [src, imageSrc, imageRef])

    return (<Image
        ref={setImageRef}
        src={imageSrc}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
    />)
}
