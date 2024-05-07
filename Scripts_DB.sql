-- Active: 1712454387041@@127.0.0.1@3306

-- Eliminamos la base de datos si existe
DROP DATABASE IF EXISTS TodoColorDB;

-- Creamos la nueva base de datos
CREATE DATABASE TodoColorDB;

-- Seleccionamos la base de datos recién creada
USE TodoColorDB;

-- Creamos la tabla de usuarios con el correo como clave primaria
CREATE TABLE usuarios (
    correo VARCHAR(100) PRIMARY KEY, nombres VARCHAR(50), apellidos VARCHAR(50), contrasena VARCHAR(100)
);

-- Insertamos algunos datos de ejemplo en la tabla de usuarios
INSERT INTO
    usuarios (
        correo, nombres, apellidos, contrasena
    )
VALUES (
        'juan@example.com', 'Juan', 'Pérez', 'password123'
    ),
    (
        'maria@example.com', 'María', 'Gómez', 'securepass'
    ),
    (
        'pedro@example.com', 'Pedro', 'Martínez', '123456'
    );

-- Creamos la tabla de pedidos con la clave foránea actualizada
CREATE TABLE pedidos (
    numero_orden INT AUTO_INCREMENT PRIMARY KEY, fecha_orden DATE, id_usuario VARCHAR(100), estado_pago ENUM('PENDIENTE', 'PAGO'), descripcion_pedido TEXT, total DECIMAL(10, 2), FOREIGN KEY (id_usuario) REFERENCES usuarios (correo)
);

-- Creamos la tabla de procesos con la clave foránea actualizada
CREATE TABLE procesos (
    id_proceso INT AUTO_INCREMENT PRIMARY KEY, fecha_estado TIMESTAMP, id_usuario VARCHAR(100), numero_orden INT, estado_pedido ENUM(
        'Listo para entrega', 'Proceso de calandra', 'Proceso de impresion', 'Orden en proceso'
    ), FOREIGN KEY (id_usuario) REFERENCES usuarios (correo), FOREIGN KEY (numero_orden) REFERENCES pedidos (numero_orden)
);

INSERT INTO
    pedidos (
        fecha_orden, id_usuario, estado_pago, descripcion_pedido, total
    )
VALUES (
        '2024-05-01', 'juan@example.com', 'PENDIENTE', 'Camisetas personalizadas', 10440.00
    ),
	(
        '2024-05-02', 'juan@example.com', 'PAGO', 'Camisetas personalizadas', 100.0044
    ),
	(
        '2024-05-03', 'juan@example.com', 'PENDIENTE', 'Camisetas personalizadas', 4440.00
    ),
	(
        '2024-05-05', 'juan@example.com', 'PAGO', 'Camisetas personalizadas', 300.00
    ),
	(
        '2024-05-06', 'juan@example.com', 'PENDIENTE', 'Camisetas personalizadas', 100.00
    ),
	(
        '2024-05-07', 'juan@example.com', 'PAGO', 'Camisetas personalizadas', 100.00
    ),
	(
        '2024-05-08', 'juan@example.com', 'PAGO', 'Camisetas personalizadas', 5600.00
    ),
    (
        '2024-05-02', 'maria@example.com', 'PAGO', 'Lonas impresas', 250.00
    ),
    (
        '2024-05-03', 'pedro@example.com', 'PENDIENTE', 'Tarjetas de presentación', 50.00
    );

INSERT INTO
    procesos (
        fecha_estado, id_usuario, numero_orden, estado_pedido
    )
VALUES (
        '2024-05-02 09:00:00', 'juan@example.com', 1, 'Proceso de impresion'
    ),
    (
        '2024-05-03 10:30:00', 'maria@example.com', 2, 'Listo para entrega'
    ),
    (
        '2024-05-04 08:45:00', 'pedro@example.com', 3, 'Orden en proceso'
    );