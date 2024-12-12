# Utilisez l'image officielle de Nginx
FROM nginx:alpine

# Supprimez la page par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiez les fichiers Angular dans le dossier Nginx
COPY dist/crud-etudiant /usr/share/nginx/html

# Exposez le port 80
EXPOSE 80

# Démarrez Nginx
CMD ["nginx", "-g", "daemon off;"]
