il deploy avviene in automatico al push su master, grazie alla github action.

modifiche sulla vps: configurazione di nginx.
andare su /etc/nginx/sites-enabled. qui ci saranno solo i link simbolici che nginx usa.
quindi per non usare un file di configurazione nginx, basta fare
sudo rm /etc/nginx/sites-enabled/default
per riaggiungerlo, basta fare
sudo ln -s /etc/nginx/sites-available/reverse-proxy /etc/nginx/sites-enabled/
questo perché i link simbolici sono dentro /etc/nginx/sites-available/ dove ci sono i veri file di configurazione di nginx.

per testare la configurazione nginx:
sudo nginx -t

per riavviare nginx (per fargli prendere le modifiche)
sudo systemctl restart nginx

