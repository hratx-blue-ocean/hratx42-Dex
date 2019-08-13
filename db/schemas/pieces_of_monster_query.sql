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
    l.label_name,
    l.color
from
    cards c 
    join cards_labels cl on c.id = cl.card_id
    join labels l on cl.label_id = l.id;