require('dotenv').config();
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

// db('shopping_list')
//     .select('*')
//     .then(result => {
//         console.log(result)
//     })

function search(searchTerm) {
    db('shopping_list')
        .select('*')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        });
}

// search('c')

function paginate(pageNumber) {
    const showN = 6;
    const offset = showN * (pageNumber - 1);
    db('shopping_list')
        .select('*')
        .limit(showN)
        .offset(offset)
        .then(result => {
            console.log(result)
        });
}

// paginate(2);

function itemsAfter(daysAgo) {
    db('shopping_list')
        .select('*')
        .where(
            'date_added',
            '>',
            db.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .then(result => {
            console.log(result);
        })
}

// itemsAfter(2);

function group(){
    db('shopping_list')
        .distinct('category')
        .sum({total_price: 'price'})
        .groupBy('category')
        .then(result => {
            console.log(result)
        });
}

group();