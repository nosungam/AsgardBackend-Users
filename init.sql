CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    name VARCHAR NOT NULL,
    surname VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);

INSERT INTO "user" (email, name, surname, password) VALUES
('matipresuttari@gmail.com', 'matias', 'presuttari', 'password123'),
('gastonmagni@hotmail.com', 'gaston', 'magni', 'password456'),
('admin@admin.com', 'admin', 'admin', 'admin123');
