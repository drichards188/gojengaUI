import {useMediaQuery, useMediaQueries} from '@react-hook/media-query'
import Media from 'react-media'

// // Using a single media query
// const Component = () => {
//     const matches = useMediaQuery('only screen and (min-width: 400px)')
//     return `Matches? ${matches ? 'Matched!' : 'Nope :(')}`
// }

// Using multiple media queries
export const MediaComp = () => {
    const {matches, matchesAny, matchesAll} = useMediaQueries({
        screen: 'screen',
        width: '(min-width: 400px)',
        height: '(max-height: 200px)'
    })

    //uses a ternary expression to execute for a small or not small screen
    return (
        <div>
            <Media
                queries={{
                    small: '(max-width: 700px)',
                }}
            >
                {(size) =>
                    size.small ? (
                        <p>This is small</p>
                    ) : (
                        <div style={{display: 'flex'}}>
                            <p>this is not small</p>
                        </div>
                    )
                }
            </Media>

            Screen matched? {matches.screen ? 'Yes' : 'No'}<br/>
            Width matched? {matches.width ? 'Yes' : 'No'}<br/>
            All matched? {matchesAll ? 'Yes' : 'No'}<br/>
            Any matched? {matchesAny ? 'Yes' : 'No'}<br/>
        </div>
    )
}