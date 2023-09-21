-- Annonces dans la catégorie Vêtement
SELECT * FROM Ad WHERE categoryId = 1;
-- Si on ne connaît pas l'ID de la catégorie :
SELECT * FROM Ad JOIN Category ON Ad.categoryId = Category.id WHERE Category.name = 'Vêtement';

-- Annonces dans les catégories Vêtement ou Voiture
SELECT * FROM Ad WHERE categoryId IN (1, 2);

-- Prix moyen des annonces dans la catégorie Autre
SELECT AVG(price) FROM Ad WHERE categoryId = 3;

-- Annonces dans les catégories dont le nom commence par un 'v'
SELECT * FROM Ad JOIN Category ON Category.id = Ad.categoryId WHERE name LIKE 'v%' COLLATE NOCASE;