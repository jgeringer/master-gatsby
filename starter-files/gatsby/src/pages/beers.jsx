import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 100px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
`;

export default function BeersPage({ data }) {
  console.log(data);
  return (
    <>
      <h2 className="center">
        We have {data.beers.nodes.length} beers available. Dine in Only!
      </h2>
      <BeerGridStyles>
        {data.beers.nodes.map((beer) => {
          const rating =
            beer.rating !== null ? Math.round(beer.rating.average) : 0;
          return (
            <SingleBeerStyles key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
              {beer.price}
              {rating && (
                <p title={`${rating} out of 5 stars`}>
                  {`x`.repeat(rating)}
                  <span>({beer.rating.reviews})</span>
                </p>
              )}
            </SingleBeerStyles>
          );
        })}
      </BeerGridStyles>
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;
