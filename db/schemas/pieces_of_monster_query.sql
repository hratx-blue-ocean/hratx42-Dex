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