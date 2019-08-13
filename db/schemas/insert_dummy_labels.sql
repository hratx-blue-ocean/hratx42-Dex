insert into labels (label_name, color)
    values
    ('frontend', 'yellow'),
    ('backend', 'blue'),
    ('implementation', 'orange'),
    ('bug', 'red');

insert into cards_labels (card_id, label_id)
    values 
    (1, 1),
    (1, 1),
    (2, 2),
    (3, 1),
    (3, 2),
    (4, 2),
    (4, 3),
    (5, 1),
    (6, 1),
    (7, 1),
    (7, 2),
    (7, 3),
    (8, 2),
    (9, 2),
    (9, 3),
    (10, 1),
    (11, 1),
    (12, 2),
    (13, 4),
    (14, 3),
    (14, 4);