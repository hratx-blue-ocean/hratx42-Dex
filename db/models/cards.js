const pgClient = require('../hosteddb');

const cardsModel = {
    async getCardsByDeckId(deckId) {
        const cards = pgClient.query(`
            select 
                c.id as card_id,
                c.title as card_title,
                c.description as card_description,
                c.updated_at as card_updated,
                c.created_at as card_created,
                c.weight as card_weight,
                c.impact as card_impact,
                array_agg(
                    json_build_object(
                        'member_id', cast(u.id as varchar),
                        'member_name', u.name
                    )
                ) as cards_members,
                array_agg(
                    json_build_object(
                        'label_name', l.label_name,
                        'color', l.color
                    )
                ) as card_labels
            from
                cards c 
                join cards_members cm on c.id = cm.card_id
                join users u on cm.user_id = u.id
                join cards_labels cl on c.id = cl.card_id
                join labels l on cl.label_id = l.id
            where c.deck_id = $1 
            group by c.id;
        `, [deckId])
        return cards;
    },
    async get(id){
        const query = 'select * from cards where id = $1'
        const {rows: cards} = pgClient.query(query, id);
        return cards[0];
    },
    // async post(deck){
    //     const query = 'Insert into decks (id, table_id, title, table_index) values (default, $1, $2, 1)';
    //     const values = [deck.table_id, deck.title]
    //     const result = await pgClient.query(query, values);
    //     return result
    // },
    // async put(deck){
    //     const query = 'update decks set title = $1 where id = $2';
    //     const values = [deck.title, deck.id]
    //     const result = await pgClient.query(query, values);
    //     return result
    // },
    async delete(id){
        const query = 'delete from cards where id = $1';
        const values = [id]
        const result = await pgClient.query(query, values)
        return result;
    }
}
