import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
    // 1. Get a template for this page
    const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
    // 2. Query all pizzas
    const { data } = await graphql(`
        query {
            pizzas: allSanityPizza {
                nodes {
                    name
                    slug {
                        current
                    }
                }
            }
        }
    `);
    // 3. Loop over each pizza and create a page for that pizza
    data.pizzas.nodes.forEach(pizza => {
        console.log(`creating a page for: ${pizza.name}`)
        actions.createPage({
            path: `pizza/${pizza.slug.current}`,
            component: pizzaTemplate,
            context: {
                slug: pizza.slug.current,
            }
        });
    })
}

async function turnToppingsIntoPages({ graphql, actions }) {
    const toppingsTemplate = path.resolve('./src/pages/pizzas.js');

    const { data } = await graphql(`
        query {
            toppings: allSanityToppings {
                nodes {
                    name
                    id
                }
            }
        }
    `);

    data.toppings.nodes.forEach((topping) => {
        console.log(`Creating page for topping`, topping.name);
        actions.createPage({
            path: `topping/${topping.name}`,
            component: toppingsTemplate,
            context: {
                topping: topping.name,
            }
        });
    })
}

export async function createPages(params) {
    // Create pages dynamically...
    // Wait for all promizes to be resolved befor finishing this function
    await Promise.all([
        turnPizzasIntoPages(params),
        turnToppingsIntoPages(params),
    ]);
}