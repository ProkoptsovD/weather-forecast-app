import { BigPlusButton } from '@components/BigPlusButton';
import * as Styled from './HomePage.styled';

function HomePage() {
  return (
    <Styled.Wrapper>
      <Styled.Title>Start typing to choose your city</Styled.Title>
      <BigPlusButton />
    </Styled.Wrapper>
  );
}

export default HomePage;
