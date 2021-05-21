import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';

export default function PizzasPage({ data }) {
    const pizzas = data.pizzas.nodes;
    console.log(data.pizzas);
    return (
    <>
        <PizzaList pizzas={pizzas} />
    </>
    );
}

export const query = graphql`
    query PizzaQuery {
        pizzas: allSanityPizza {
            nodes {
                id
                name
                slug {
                    current
                }
                toppings {
                    id
                    name
                }
                image {
                    asset {
                        fluid(maxWidth: 400) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
    }
`;