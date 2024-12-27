CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    name VARCHAR NOT NULL,
    surname VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);

INSERT INTO "user" (email, name, surname, password) VALUES
('matipresuttari@gmail.com', 'matias', 'presuttari', '$2b$10$sRRhkKhRa2UWAvtA.7tzu.7Q0VJNhNGvLS6RqMVbB91CZJ6ON5V8K'),
('gastonmagni@hotmail.com', 'gaston', 'magni', '$2b$10$cp1p2OBTqsrWM93fbQlpC.tiRy1EAVUkX02wC6/kj3yHag2g29txy'),
('admin@admin.com', 'admin', 'admin', '$2b$10$7oxgkPtinNR0o7SI3H4HdOmdONPbsZ5bs0NS3yVFx7J3To4A7Asgi');
