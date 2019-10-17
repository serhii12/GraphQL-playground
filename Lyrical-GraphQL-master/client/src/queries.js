import { gql } from 'apollo-boost';

export const FETCH_SONGS = gql`
    {
        songs {
            id
            title
        }
    }
`;

export const FETCH_SONG = gql`
    query SongQuery($id: ID!) {
        song(id: $id) {
            id
            title
            # lyrics {
            #     id
            #     content
            #     likes
            # }
        }
    }
`;
