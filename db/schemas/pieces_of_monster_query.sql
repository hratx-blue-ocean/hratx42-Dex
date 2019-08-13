select card_id, array_agg(label_id)
from cards_labels
group by card_id;

select 
    c.id, 
    c.title as card_title, 
    c.description as card_description, 
    c.updated_at,
    c.created_at, 
    c.weight as card_weight,
    c.impact as card_impact,
    labels_array
from cards c join (
    select card_id, array_agg(label_id) as labels_array
    from cards_labels
    group by card_id
) l on c.id = l.card_id;

select 
    c.id, 
    c.title as card_title, 
    c.description as card_description, 
    c.updated_at,
    c.created_at, 
    c.weight as card_weight,
    c.impact as card_impact,
    array[l.label_name, l.color] as label
from
    cards c 
    join cards_labels cl on c.id = cl.card_id
    join labels l on cl.label_id = l.id;

select 
    c.id, 
    c.title as card_title, 
    c.description as card_description, 
    c.updated_at,
    c.created_at, 
    c.weight as card_weight,
    c.impact as card_impact,
    array[cast(u.id as varchar), u.name] as user
from
    cards c 
    join cards_members cm on c.id = cm.card_id
    join users u on cm.user_id = u.id;



select 
    c.id, 
    c.title as card_title, 
    c.description as card_description, 
    c.updated_at,
    c.created_at, 
    c.weight as card_weight,
    c.impact as card_impact,
    array_agg(array[cast(u.id as varchar), u.name]) as users,
    array_agg(array[l.label_name, l.color]) as labels
from
    cards c 
    join cards_members cm on c.id = cm.card_id
    join users u on cm.user_id = u.id
    join cards_labels cl on c.id = cl.card_id
    join labels l on cl.label_id = l.id
group by c.id; 

-- last working query
select 
    json_build_object(
        'card_id', c.id, 
        'card_title', c.title, 
        'card_description', c.description, 
        'card_updated', c.updated_at,
        'card_created', c.created_at, 
        'card_weight', c.weight,
        'card_impact', c.impact,
        'cards_members', array_agg(
            json_build_object(
                'member_id', cast(u.id as varchar),
                'member_name', u.name
            )
        ),
        'card_labels', array_agg(
            json_build_object(
                'label_name', l.label_name,
                'color', l.color
            )
        )
    )
from
    cards c 
    join cards_members cm on c.id = cm.card_id
    join users u on cm.user_id = u.id
    join cards_labels cl on c.id = cl.card_id
    join labels l on cl.label_id = l.id
group by c.id; 

-- ********************************************************************************************************************************

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
group by c.id; 


-- *************************************************************************************************


select 
    json_build_object(
        'card_id', c.id, 
        'card_title', c.title, 
        'card_description', c.description, 
        'card_updated', c.updated_at,
        'card_created', c.created_at, 
        'card_weight', c.weight,
        'card_impact', c.impact,
        'cards_members', array[
            json_build_object(
                'member_id', cast(u.id as varchar),
                'member_name', u.name
            )
        ],
        'card_labels', array[
            json_build_object(
                'label_name', l.label_name,
                'color', l.color
            )
        ]
    )
from
    cards c 
    join cards_members cm on c.id = cm.card_id
    join users u on cm.user_id = u.id
    join cards_labels cl on c.id = cl.card_id
    join labels l on cl.label_id = l.id
group by c.id; 

select 
    json_build_object(
        'deck_id', d.id,
        'deck_title', d.title,
        'deck_index_in_table', d.table_index,
        'cards', array_agg(
            json_build_object(
                'card_id', c.id, 
                'card_title', c.title, 
                'card_description', c.description, 
                'card_updated', c.updated_at,
                'card_created', c.created_at, 
                'card_weight', c.weight,
                'card_impact', c.impact,
                'cards_members', array_agg(
                    json_build_object(
                        'member_id', cast(u.id as varchar),
                        'member_name', u.name
                    )
                ),
                'card_labels', array_agg(
                    json_build_object(
                        'label_name', l.label_name,
                        'color', l.color
                    )
                )
            )
        )
    )
from
    decks d 
    join cards c on d.id = c.deck_id
    join cards_members cm on c.id = cm.card_id
    join users u on cm.user_id = u.id
    join cards_labels cl on c.id = cl.card_id
    join labels l on cl.label_id = l.id
group by d.id; 




select 
    json_build_object(
        'deck_id', d.id,
        'deck_title', d.title,
        'deck_index_in_table', d.table_index,
        'cards', array_agg(
            select 
            json_build_object(
                'card_id', c.id, 
                'card_title', c.title, 
                'card_description', c.description, 
                'card_updated', c.updated_at,
                'card_created', c.created_at, 
                'card_weight', c.weight,
                'card_impact', c.impact,
                'cards_members', array_agg(
                    json_build_object(
                        'member_id', cast(u.id as varchar),
                        'member_name', u.name
                    )
                ),
                'card_labels', array_agg(
                    json_build_object(
                        'label_name', l.label_name,
                        'color', l.color
                    )
                )
            )
            from
                cards c 
                join cards_members cm on c.id = cm.card_id
                join users u on cm.user_id = u.id
                join cards_labels cl on c.id = cl.card_id
                join labels l on cl.label_id = l.id
            where by c.deck_id = d.id; 
        )
    )
from
    decks d 
group by d.id; 


select 
    t.id as table_id,
    t.name as table_name,
    tu.id as table_member_id,
    tu.name as table_member_name,
    d.id as deck_id,
    d.title as deck_title,
    c.id as card_id,
    c.deck_id as card_deck_id,
    c.title as card_title, 
    c.description as card_description, 
    c.updated_at as card_updated,
    c.created_at as card_created, 
    c.weight as card_weight,
    c.impact as card_impact,
    c.due_date as card_due_date,
    cu.id as card_member_id,
    cu.name as card_member_name,
    l.label_name as card_label_name,
    l.color as card_label_color
from dex_tables t 
    join tables_members tm on t.id = tm.table_id 
    join users tu on tm.member_id = tu.id
    join decks d on t.id = d.table_id
    join cards c on d.id = c.deck_id
    join cards_members cm on c.id = cm.card_id
    join users cu on cm.user_id = cu.id
    join cards_labels cl on c.id = cl.card_id
    join labels l on cl.label_id = l.id;


-- get decks by tableid %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

-- select 
--     d.id as deck_id,
--     d.title as deck_title,
--     c.title as card_title,
--     array_agg(
--         json_build_object(
--             'member_id', cast(u.id as varchar),
--             'member_name', u.name
--         )
--     ) as cards_members,
--     array_agg(
--         json_build_object(
--             'label_name', l.label_name,
--             'color', l.color
--         )
--     ) as card_labels
-- from
--     cards c 
--     join cards_members cm on c.id = cm.card_id
--     join users u on cm.user_id = u.id
--     join cards_labels cl on c.id = cl.card_id
--     join labels l on cl.label_id = l.id
-- group by c.id; 