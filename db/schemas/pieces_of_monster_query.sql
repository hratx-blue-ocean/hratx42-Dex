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