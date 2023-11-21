CREATE TABLE duties (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR ( 255 ) NOT NULL
);