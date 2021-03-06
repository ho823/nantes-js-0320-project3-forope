import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Article from './Article';
import { Flex } from '../mainStyle';

const ContainerAllArticles = styled(Flex)`
  margin: 0 3rem;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export default function AllArticles({
  titlearticle1,
  titlearticle2,
  titlearticle3,
  contentarticle1,
  contentarticle2,
  contentarticle3,
}) {
  return (
    <ContainerAllArticles>
      <Article title={titlearticle1} content={contentarticle1} />
      <Article
        title={titlearticle2}
        content={contentarticle2}
        seeMore="En savoir plus"
      />
      <Article
        title={titlearticle3}
        content={contentarticle3}
        seeMore="En savoir plus"
      />
    </ContainerAllArticles>
  );
}

AllArticles.propTypes = {
  titlearticle1: PropTypes.string.isRequired,
  titlearticle2: PropTypes.string.isRequired,
  titlearticle3: PropTypes.string.isRequired,
  contentarticle1: PropTypes.string.isRequired,
  contentarticle2: PropTypes.string.isRequired,
  contentarticle3: PropTypes.string.isRequired,
};
