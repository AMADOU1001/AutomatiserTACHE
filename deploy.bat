@echo off
REM Configurations
set REPO_URL=https://github.com/AMADOU1001/AutomatiserTACHE.git
set IMAGE_NAME= automatiser-angular-nginx-app
set PORT=3082

echo  -------------Début du déploiement...-----------------

REM Étape 1 : Ajouter les fichiers et faire un push sur GitHub
echo  ---------Ajout des fichiers dans le repo GitHub...-----------
git add .
git commit -m "Mise à jour automatique du projet"
git push %REPO_URL%
if errorlevel 1 (
    echo  Erreur : Impossible de pousser sur GitHub. Vérifiez vos accès.
    exit /b 1
)
echo  Push sur GitHub terminé.

REM Étape 2 : Construire le projet Angular
echo 🔧 ---------Construction du projet Angular...----------
call ng build 
if errorlevel 1 (
    echo  Erreur : Construction du projet Angular échouée.
    exit /b 1
)
echo  --------Construction Angular réussie.-------------

REM Étape 3 : Construire et lancer le conteneur Docker
echo 🐳 -----------Création de l'image Docker...-------------
docker build -t %IMAGE_NAME% .
if errorlevel 1 (
    echo  Erreur : Construction de l'image Docker échouée.
    exit /b 1
)

echo  ---------Lancement du conteneur Docker...------------
docker run -d -p %PORT%:80 %IMAGE_NAME%
if errorlevel 1 (
    echo  Erreur : Lancement du conteneur échoué.
    exit /b 1
)

echo  Conteneur en cours d'exécution sur http://localhost:%PORT%.
echo  -----------Déploiement terminé avec succès !-----------------
pause
