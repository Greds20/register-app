/* SENTENCIAS DML */

/* INSERT */
INSERT INTO Desarrollador (nombres, apellidos, nickname) VALUES 
	('Guillermo Andrés', 'Rojas Acosta', 'Guille'),
    ('Juan Manuel', 'Gómez Villa', 'Juanma'),
    ('Neil Camilo', 'Gutierrez Giménez', 'Camigut'),
    ('Luisa Fernanda', 'Santos Calderón', 'Lufer'),
    ('Ronaldo Luis', 'Nazário de Lima', 'Ronal');

INSERT INTO Categoria (nombre) VALUES 
	('Médicina'),
    ('Educación'),
    ('Contabilidad'),
    ('Matemáticas'),
    ('Quimica'),
    ('Calculadora');

INSERT INTO Aplicacion (nombre, fecha_lanz, FK_ID_CATEGORIA) VALUES 
	('Identificador de Enfermedades', '2023-07-12', '1'),
    ('Aprende a Programar', '2022-02-10', '2'),
    ('Registro de Ventas', '2024-01-05', '3'),
    ('Calculadora de Integrales', '2023-12-20', '4'),
    ('Tabla Periódica', '2022-03-01', '5'),
    ('Calculadora', '2022-03-01', '3');

INSERT INTO APLICACION_DESARROLLADOR (FK_ID_APLICACION, FK_ID_DESARROLLADOR) VALUES 
	('1', '1'),
    ('1', '2'),
    ('2', '2'),
    ('3', '1'),
    ('3', '4'),
    ('3', '3'),
    ('4', '1'),
    ('4', '4'),
    ('5', '4');

/* UPDATE */
UPDATE APLICACION_DESARROLLADOR SET estado = false WHERE FK_ID_DESARROLLADOR = 4 AND FK_ID_APLICACION = 4;

/* DELETE */
DELETE FROM Categoria WHERE nombre = 'Calculadora';

/* CONSULTAS */

/* INNER JOIN */
SELECT A.nombre AS Aplicación, A.fecha_lanz AS Lanzamiento, A.estado AS Disponible, C.nombre AS Categoria FROM Categoria C 
INNER JOIN Aplicacion A ON C.ID_CATEGORIA = A.FK_ID_CATEGORIA
ORDER BY Categoria;

/* LEFT JOIN */
SELECT A.nombre AS Aplicación, D.ID_DESARROLLADOR AS ID, D.nickname AS Desarrollador, AD.fecha_reg AS Registro, AD.estado
FROM Desarrollador D 
LEFT JOIN APLICACION_DESARROLLADOR AD ON AD.FK_ID_DESARROLLADOR = D.ID_DESARROLLADOR
LEFT JOIN Aplicacion A ON A.ID_APLICACION = AD.FK_ID_APLICACION
ORDER BY Aplicación;

/* CASE */
SELECT D.nickname, 'Tiene: ' || SUM( CASE WHEN AD.FK_ID_APLICACION IS NOT NULL THEN 1 ELSE 0 END ) AS Aplicaciones
FROM Desarrollador D
LEFT JOIN APLICACION_DESARROLLADOR AD ON AD.FK_ID_DESARROLLADOR = D.ID_DESARROLLADOR
GROUP BY nickname;