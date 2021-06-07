import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({ data }) {
    const pizzas = data.pizzas.nodes;
    return (
    <>
        <ToppingsFilter />
        <PizzaList pizzas={pizzas} />
    </>
    );
}

export const query = graphql`
    query PizzaQuery($topping: [String]) {
        pizzas: allSanityPizza(filter: {
            toppings: {
                elemMatch: {
                    name: {
                        in: $topping
                    }
                }
            }
        }) {
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