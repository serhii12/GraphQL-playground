import { gql } from 'apollo-boost';

export const FETCH_SONGS = gql`
    {
        songs {
            id
            title
        }
    }
`;
