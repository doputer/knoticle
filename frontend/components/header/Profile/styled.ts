import styled from 'styled-components';

export const ProfileContainer = styled.div``;

export const ProfileImage = styled.div`
  width: 32px;
  aspect-ratio: 1 / 1;
  border: 1px solid var(--grey-01-color);
  border-radius: 50%;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;
