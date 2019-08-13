insert into cards (table_id, deck_id, title, weight, impact, due_date, description)
    VALUES
    (1, 1, 'table thumbnails', 2, 2, to_date('2019-08-15', 'YYYY-MM-DD'), ''),
    (1, 1, 'user profile', 2, 2, to_date('2019-08-15', 'YYYY-MM-DD'), ''),
    (1, 1, 'table settings', 3, 3, to_date('2019-08-15', 'YYYY-MM-DD'), ''),
    (1, 2, 'create db query methods', 2, 2, to_date('2019-08-15', 'YYYY-MM-DD'), ''),
    (1, 2, 'build out landing page', 2, 2, to_date('2019-08-15', 'YYYY-MM-DD'), ''),
    (1, 2, 'style register component', 2, 2, to_date('2019-08-15', 'YYYY-MM-DD'), ''),
    (1, 2, 'search ticket functionality', 2, 3, to_date('2019-08-15', 'YYYY-MM-DD'), ''),
    (1, 2, 'authentication', 3, 3, to_date('2019-08-15', 'YYYY-MM-DD'), ''),
    (1, 3, 'implement JWT', 2, 3, to_date('2019-08-15', 'YYYY-MM-DD'), ''),
    (1, 3, 'set up css modules with webpack', 3, 3, to_date('2019-08-15', 'YYYY-MM-DD'), ''),
    (1, 4, 'complete wireframes', 2, 5, to_date('2019-08-15', 'YYYY-MM-DD'), ''),
    (1, 4, 'connect server routes to postgres', 2, 4, to_date('2019-08-15', 'YYYY-MM-DD'), ''),
    (1, 4, 'repair launch scripts', 1, 2, to_date('2019-08-15', 'YYYY-MM-DD'), ''),
    (1, 4, 'deploy project', 2, 3, to_date('2019-08-15', 'YYYY-MM-DD'), '');

insert into cards_members (card_id, user_id)
    values 
    (1, 1),
    (2, 1), 
    (2, 2), 
    (3, 2), 
    (4, 2),
    (5, 3), 
    (6, 3), 
    (7, 4),
    (8, 4),
    (9, 4),
    (10, 3),
    (11, 2), 
    (12, 3), 
    (13, 1),
    (13, 4),
    (14, 2);