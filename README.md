# Créer une API RESTful en JavaScript avec Node.js et Express

## Introduction

**_Representation State Transfer_** ou _REST_ est considéré comme le standard pour les API web. Une API web est une _interface de programmation_ qui permet aux applications de communiquer entre elles. Les _API REST_ sont des API web qui utilisent le protocole HTTP pour communiquer. Ce type d'API web est populaire car simple, flexible et efficace.

Jusqu'à présent, vous avez utilisé JavaScript **côté client** (navigateur). **_Node.js_** est un environnement d'exécution JavaScript qui permet de créer des applications web **côté serveur**. C'est le même principe que PHP, mais en JavaScript.

**_Express.js_** est un framework populaire et puissant pour le développement d'applications web Node.js pour la création d'API RESTful qui facilite le processus de développement en simplifiant beaucoup des détails techniques de la construction d'une API.

Les API REST sont notamment utilisées pour créer des applications web et mobiles. Il est important de comprendre leur fonctionnement et de savoir comment elles sont implémentées. La réalisation de ce projet vous permettra d'acquérir de l'expérience en développement côté serveur.

## Objectifs d'apprentissage

- Utiliser le framework Express pour implémenter une application côté serveur
- Démontrer une compréhension de haut niveau des requêtes et réponses HTTP
- Développer et tester une API tout en suivant de bonnes pratiques de conception

## Le projet

Dans ce petit projet, vous implémenterez une API pour un serveur web qui stocke et modifie des informations sur des étudiants (représentés par des objets JSON). Le client pourra exécuter les fonctionnalités CRUD (Création, Lecture, Modification et Suppression) sur ces objets. Ces fonctionnalités seront implémentées grâce au protocole HTTP, à travers l'API REST.

## Terminologie web

Commençons par un rappel de la terminologie web.

La nature de toute communication qui a lieu sur le web suit un ensemble de « normes » : les _protocoles_. Une telle transaction a lieu entre un client (la partie qui initie la transaction en envoyant une requête) et un serveur (la partie qui accepte et traite la requête). De telles échanges d'informations ont lieu tout le temps. Un exemple est votre navigateur web (le client) demandant à un serveur en ligne une page web et l'affichant.

Les requêtes envoyées par le client sont dirigées vers un emplacement particulier marqué par l'**identificateur uniforme de ressource (URI)**. Une URL de page web est un type d'URI qui identifie l'emplacement d'une ressource :

```
http://www.site.com:9001/chemin?parametre1=valeur1$parametre2=valeur2
```

Sur cette URL, on retrouve :

- **http://** : le protocole utilisé pour la requête
- **www.site.com** : le nom de domaine du serveur
- **:9001** : le port utilisé par le serveur
- **/chemin** : le chemin vers la ressource
- **?parametre1=valeur1$parametre2=valeur2** : deux paramètres pour cette requête

## Protocole HTTP

Les transactions HTTP ont lieu à l'aide de requêtes et de réponses. Une requête ou une réponse HTTP contient des informations sur l'URI (l'emplacement d'une ressource), le type de requête, la version du protocole et, généralement, des entêtes et un corps supplémentaires.

Le tableau ci-dessous montre quelques types de requêtes HTTP couramment utilisées :

| Type de requête | Description                             |
| --------------- | --------------------------------------- |
| GET             | Récupération d'une ressource spécifique |
| POST            | Création de ressource                   |
| PUT             | Mise à jour d'une ressource             |
| DELETE          | Suppression d'une ressource             |

## L'API

Une API fournit un moyen pour les logiciels de communiquer entre eux. Les API permettent à certains logiciels de fournir des fonctionnalités ou des informations à travers des demandes et des réponses, ce qui permet de les utiliser sans avoir à exposer le code source ou la logique métier. En conséquence, une API rend une application plus accessible pour les autres développeurs.

Certaines des contraintes architecturales proposées par l'architecture REST sont:

- **Architecture client-serveur** : les implémentations client et serveur doivent être indépendantes l'une de l'autre. L'API doit fonctionner indépendamment de l'interface utilisateur et le client doit pouvoir accéder aux informations sans avoir connaissance de la logique côté serveur ;

- **Sans état** : chaque demande doit contenir toutes les informations nécessaires pour la traiter. Le serveur ne doit pas nécessiter d'informations des sessions précédentes pour traiter une demande dans la session actuelle ;

- **Système en couches** : une application peut être divisée en couches, mais chaque couche ne doit interagir qu'avec les couches adjacentes. Des couches supplémentaires aident à l'équilibrage de charge et à l'ajout de fonctionnalités supplémentaires. Un exemple de cela serait une application client interagissant avec un serveur et le serveur communiquant à son tour avec une base de données ;

- **Interface uniforme** : l'interface est déconnectée de l'implémentation du serveur et soumise à certaines contraintes (non mentionnées ici).

En pratique :

- L'architecture REST est centrée sur les _ressources_
- Les ressources sont une représentation des données pertinentes au format JSON, XML (plus rarement HTML)
- En adhérant au format le plus populaire, vous utiliserez *JSON* pour représenter vos objets « étudiant »

### Le format JSON

JSON (_JavaScript Object Notation_) est un format de données courant où les données sont stockées sous forme de paires clé-valeur. Voici un exemple d'un objet « étudiant » représenté en JSON :

```json
{
  "id": 123,
  "nom": "Geoffrey G.",
  "ville": "Valenciennes",
  "moyenne": 14
}
```

### Les requêtes et réponses

Chaque requête est effectuée sur une URI qui cible une ressource spécifique. Le type de requête détermine l'action effectuée sur la ressource. Par exemple :

  - une requête `GET` sur `/etudiants` récupérerait tous les étudiants ;
  - une requête `GET` sur `/etudiants/1` récupérerait l'étudiant d'ID 1 ;
  - une requête `POST` sur `/etudiants` permettrait la création d'un nouvel étudiant.

On voit bien ici l'importance du verbe HTTP : on a deux requêtes qui pointent vers la même URI mais, comme les verbes HTTP associés sont différents, le serveur sait qu'il doit effectuer des actions différentes.

Les réponses, en plus des informations éventuellement demandées, contiennent des informations utiles sur le fait que la requête a réussi ou échoué.

## Le client

Le client est déjà implémenté (fichier `client.js`). Il peut envoyer diverses requêtes à l'API et afficher les réponses.

### Mettre en place l'environnement

Pour travailler en JavaScript côté serveur, nous devons d'abord installer Node.js. Node.js est un environnement d'exécution JavaScript qui permet d'exécuter du code JavaScript en dehors d'un navigateur. Il est utilisé pour implémenter des applications côté serveur.

- Installez la [dernière version LTS](https://nodejs.org/fr) (_Long Time Support_) de Node.js.

- Si ce n'est pas encore fait, récupérez ce dépôt en local (ZIP ou clone) et ouvrez le répertoire dans VS Code.

Quand nous travaillons avec une application JavaScript qui utilise Node.js, nous devons d'abord installer tous les packages requis par l'application. C'est le fichier `package.json` qui spécifie toutes ces dépendances. Nous allons maintenant installer toutes les dépendances requises.

- Ouvrez le fichier `package.json` et examinez son contenu. Vous y verrez une liste de dépendances requises pour l'application. Ces dépendances sont des packages Node.js qui fournissent des fonctionnalités supplémentaires. Par exemple, `express` est un package qui fournit des fonctionnalités pour créer des applications web Node.js.

- Sous VS Code, ouvrez un nouveau terminal et entrez la commande suivante (assurez-vous d'abord d'être à la racine du projet) :

```
npm i
```

Les dépendances sont téléchargées et installées dans le dossier `node_modules`. Si vous avez un message d'erreur, assurez-vous que vous êtes bien à la racine du projet.

En ce qui concerne la gestion de version (Git), le dossier `node_modules` ne doit pas être ajouté au dépôt car les dépendances qu'il contient peuvent être réinstallées facilement à partir du fichier `package.json`. C'est pourquoi le fichier `.gitignore` contient déjà une ligne pour ignorer ce dossier.

Le fichier `package-lock.json` est également généré à ce moment. Ce fichier contient des informations sur les dépendances installées ainsi que leur version exacte et est utilisé pour garantir que les mêmes versions de dépendances sont installées sur toutes les machines cibles, et notamment en production. Ce fichier, tout comme `package.json`, serait ajouté au dépôt.

- Tout est en place pour lancer le client ; entrez la commande suivante dans la fenêtre du terminal :

```
node client.js
```

Vous devriez voir une invite de console qui indique « écoute sur le port 3000 », ce qui signifie que l'application cliente est maintenant en cours d'exécution sur le port 3000. Ouvrez la page `localhost:3000` dans votre navigateur pour voir l'application. Pour l'instant, aucun code serveur n'est implémenté, donc le client ne peut pas communiquer avec l'API.

Chaque formulaire peut être utilisé pour envoyer une requête, tandis que la section en bas affiche la réponse. Essayez d'envoyer une requête. Aucune réponse ne sera observée car le serveur n'écoute pas encore les requêtes et aucun code n'est implémenté pour les traiter.

## Introduction à Express.js

Il est temps de mettre en place le serveur. Comme mentionné précédemment, nous utiliserons Express.js, un framework _back-end_ pour Node.js.

Ouvrez `serveur.js` et collez le code suivant :

```js
const express = require("express");
const app = express();

app.listen(3001, () => {
  console.log("Serveur écoute sur port 3001");
});
```

Analysons le code.

- _ligne 1_ : importe le framework Express.js comme un module JavaScript classique en utilisant la méthode `require`. Cela nous permet d'accéder aux méthodes disponibles dans le framework ;

- _ligne 2_ : initialisation d'une instance de Express ;

- _ligne 3_ : `app.listen(PORT, CALLBACK)` démarre un serveur qui écoute les requêtes sur le port `PORT` (dans notre cas, `3001`) et exécute la méthode `CALLBACK` après le démarrage du serveur. Dans notre cas, le code de la méthode est directement indiqué à cet endroit (classique en JS). Cette méthode affiche un message sur la console indiquant que l'application Express.js a démarré et que le serveur est en cours d'exécution.

Pour lancer le serveur, on utilise `node` comme lorsqu'on a lancé le client. Pour pouvoir lancer le serveur et le client en même temps, nous allons utiliser deux terminaux séparés.

- Entrez cette commande dans un _nouveau terminal_ :

```bash
node serveur.js
```

Vous devriez voir un message indiquant que le serveur écoute sur le port 3001.

Note : pour déployer les futures modifications du serveur, il faudra l'arrêter (`Ctrl+C`) et le relancer ensuite. L'application cliente, en revanche, peut être laissée en cours d'exécution dans une fenêtre de terminal séparée car elle ne changera plus.

## Gestion des routes

Chaque requête est faite à une URI spécifique, avec un verbe HTTP associé et, si nécessaire, contient un corps avec des informations supplémentaires. L'application cliente communiquera avec l'API via des requêtes faites à des **_endpoints_**, des « points de terminaison » à travers lesquels les ressources correspondantes à l'application peuvent être accédées. Un point de terminaison est défini par une route et un type de requête (verbe HTTP). Dans notre application cliente, à chaque bouton du formulaire va correspondre un point de terminaison sur le serveur.

Le processus de filtrage des requêtes vers les fonctions appropriées s'appelle le **routage**. Dans Express, le routage est effectué de la façon suivante :

```js
app.UN_VERBE_HTTP(route, callback);
```

où :

- `app` est l'instance Express ;
- `UN_VERBE_HTTP` est le type de requête HTTP accepté par le point de terminaison (`get`, `post`...) ;
- `route` est le chemin de la route sur le serveur ;
- `callback` est la méthode qui est appelée si une requête correspond aux critères du _endpoint_. Les représentations objet de la requête et de la réponse sont passées en paramètre à la fonction _callback_.

Pour définir le schéma de routage de l'API, collez le code suivant juste après la ligne `const app = express();` :

```js
let etudiants = []; // le tableau d'étudiants
let compteur = 0; // servira comme compteur d'étudiants

// Les différents endpoints acceptés par le serveur

// récupérer tous les étudiants
app.get("/etudiants", (req, res) => {
  console.log("### récupérer tous les étudiants");
});

// récupérer un étudiant spécifique
app.get("/etudiants/:id", (req, res) => {
  console.log(`### récupérer l'étudiant d'id ${req.params.id}`);
});

// ajouter un étudiant
app.post("/etudiants", (req, res) => {
  console.log("### ajouter un étudiant");
});

// modifier un étudiant
app.put("/etudiants/:id", (req, res) => {
  console.log(`### modifier l'étudiant d'id ${req.params.id}`);
});

// supprimer un étudiant
app.delete("/etudiants/:id", (req, res) => {
  console.log(`### supprimer l'étudiant d'id ${req.params.id}`);
});
```

Le tableau `etudiants` va être utilisé pour stocker et récupérer tous les étudiants de la session. Habituellement, une solution de stockage dédiée (type base de données) est utilisée pour faciliter la gestion des données et pour les conserver entre les sessions. Pour ce projet, nous n'utiliserons pas de BDD : quand le serveur s'arrête, les données sont perdues.

Le corps et les entêtes de la requête sont contenus dans le paramètre `req`. Le paramètre `res` représente l'objet-réponse (_response_) qui est renvoyé au client. Chaque méthode va pouvoir accéder à ces variables pour traiter la requête et renvoyer une réponse.

Le _endpoint_ `/etudiants/:id` contient un paramètre (spécifié par les deux points) qui fait référence à des informations stockées à un emplacement spécifique dans l'URL. Ce type de paramètre peut être accédé par l'objet `req` via l'attribut `req.params`. Par exemple, les requêtes dirigées vers `/etudiants/123` seront capturées par la route ci-dessus et `req.params` contiendra `{ id: 123 }`. l'expression `req.params.id` renverra donc `123`.

> L'ordre dans lequel les routes et les _middlewares_ (introduits dans la section suivante) sont écrits dans l'application est important. Une requête sera comparée aux routes dans l'ordre dans lequel elles sont écrites. La première route correspondante sera exécutée et si elle renvoie une réponse, le cycle requête-réponse sera considéré comme terminé et aucune autre route ne sera vérifiée/exécutée.

## GET (récupération)

Nous allons maintenant implémenter les routes `GET` qui récupèrent les ressources. Voici ce que nous avons pour l'instant pour nos deux `GET` :

```js
app.get("/etudiants", (req, res) => {
  console.log("### récupérer tous les étudiants");
});

app.get("/etudiants/:id", (req, res) => {
  console.log(`### récupérer l'étudiant d'id ${req.params.id}`);
});
```

Le routage est en place mais les implémentations se contentent de _loguer_ des messages dans la console. Nous allons maintenant compléter les _callbacks_ pour renvoyer les données au client.

Pour la première route `app.get()`, nous voulons renvoyer tous les étudiants. Nous pouvons le faire simplement en envoyant le tableau `etudiants` en utilisant `res.send()`.

Pour le _endpoint_ `/etudiants/:id`, nous devons parcourir notre tableau d'étudiants pour trouver celui qui est demandé. Nous pouvons le faire avec la méthode `.find()`. Si on ne trouve rien, nous renvoyons un code HTTP `400`.

Modifiez le code des deux fonctions _callback_ pour qu'il corresponde à ce qui suit :

<br>

<details>
<summary><b>Cliquez pour le code de la solution pour les points de terminaison GET</b></summary>

<br>

```js
app.get("/etudiants", (req, res) => {
  console.log("### récupérer tous les étudiants");
  console.log(etudiants);  // affichage dans la console serveur pour comparaison
  res.send(etudiants);
});

app.get("/etudiants/:id", (req, res) => {
  console.log(`### récupérer l'étudiant d'id ${req.params.id}`);
  // vérifie si un étudiant avec un id correspondant est trouvé
  const etudiantMatch = etudiants.find(
    (etudiant) => etudiant.id === req.params.id
  );
  // on renvoie l'étudiant trouvé ou bien un code 400
  if (etudiantMatch) {
    console.log("étudiant trouvé :");
    console.log(etudiantMatch);
    res.send(etudiantMatch);
  } else {
    console.log("étudiant non trouvé...");
    res.sendStatus(400);
  }
});
```

</details>

<br>

Analysons le code.

L'objet `res` a plusieurs méthodes pour envoyer différents types de réponses telles que `res.json()` pour envoyer des objets JSON ou `res.sendfile()` pour envoyer un fichier sous forme de flux. `res.send()` peut envoyer des réponses de différents types.

Dans `/etudiants`, l'ensemble du tableau `etudiants` est renvoyé en tant que réponse en utilisant `res.send`. L'objet-réponse a des méthodes prédéfinies qui facilitent l'envoi de réponses en remplissant les entêtes et le corps.

Dans `/etudiants/:id`, si un étudiant avec un identifiant correspondant est trouvé, il est envoyé de la même manière que la route précédente. Si aucune correspondance n'est trouvée, `res.sendStatus()` est utilisé pour envoyer un code HTTP approprié.

Un code HTTP indique le statut de la réponse. Il fournit des informations utiles pour l'utilisateur en indiquant si et/ou pourquoi la requête a échoué. Certains codes d'état courants sont indiqués dans le tableau ci-dessous :

| Code | Description           |
| ---- | --------------------- |
| 200  | OK                    |
| 201  | Created               |
| 204  | No Content            |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 500  | Internal Server Error |

> `res.send()` remplit automatiquement un code d'état `200` si aucune erreur n'est détectée dans l'application serveur.

## CORS et _Middleware_

À ce stade, si vous essayez d'envoyer une requête, elle ne sera pas reçue par le serveur (vous pouvez vérifier cela en lançant le client et en envoyant une requête). C'est parce qu'actuellement, le serveur n'accepte pas les requêtes provenant d'autres « origines ». Pour permettre de telles requêtes, vous devrez utiliser une fonctionnalité Express appelée _middleware_.

Actuellement, l'application cliente (port 3000) et le serveur (port 3001) sont hébergés sur des « origines » différentes (définies par la partie URL du protocole, du nom d'hôte et du port). Javascript suit une « _politique d'origine identique_ » qui contrôle les interactions entre différentes origines pour des raisons de sécurité. La politique interdit les requêtes provenant d'autres origines (CORS : _Cross-origin resource sharing_), mais dans certains cas (comme le nôtre), permettre les requêtes CORS est nécessaire. Pour ce faire, le serveur doit être configuré pour les accepter.

Les _middlewares_ dans Express sont définis comme des méthodes qui ont accès à l'objet-requête, à l'objet-réponse et au _middleware_ suivant dans le cycle de requête/réponse. Une façon de penser au framework Express est comme une série de fonctions (_middlewares_) qui sont exécutées dans l'ordre, où la première exécution est déclenchée par une requête et la dernière exécution envoie une réponse. Les méthodes supplémentaires dans le cycle peuvent exécuter une variété de tâches telles que l'authentification, la journalisation, etc. Dans ce cas, vous ajouterez un _middleware_ qui permet au serveur d'accepter les requêtes provenant d'autres origines.

Les _middlewares_ peuvent être configurés pour s'exécuter pour certains types de requêtes et à des endroits spécifiques du cycle de requête/réponse (par exemple, juste après la réception d'une requête). Ce projet utilise uniquement des _middlewares_ de niveau d'application qui s'exécutent pour chaque requête que l'application reçoit.

Ajoutez ceci avec les autres `require` :

```js
// Ajoute le support de CORS
const cors = require("cors");
```

Et ceci avec les autres `use` :

```js
// autorise les requêtes CORS
app.use(cors());
```

> Assurez-vous que les `app.use()` sont au-dessus des méthodes de routage car elle doivent être mises en place avant le routage dans le cycle de requête/réponse.

Redémarrez le serveur. Accédez à l'application cliente et envoyez une requête `GET`. Vérifiez que vous obtenez un tableau vide avec un statut de succès.

Implémentons maintenant la méthode `POST`.

## POST (création)

Les requêtes POST ont souvent des données supplémentaires dans le corps de la requête. Collez ce qui suit en dessous de votre déclaration de _middleware_ CORS (et au-dessus des routes) :

```js
app.use(express.json());
```

Le _middleware_ ci-dessus analyse les données du corps de la requête entrante en objets JSON que nous pouvons traiter dans Node.js.

Voici la route `POST` actuelle :

```js
app.post("/etudiants", (req, res) => {
  console.log("### ajouter un étudiant");
});
```

Nous voulons créer un nouvel étudiant avec `id` égal au `compteur` courant, puis ce que nous recevons en JSON depuis `req.body` pour le reste. Nous incrémentons `compteur` pour le prochain étudiant, puis nous insérons ce nouvel étudiant dans le tableau. Enfin, nous l'envoyons au client pour confirmer que l'étudiant a bien été créé.

<br>

<details>
<summary><b>Cliquez pour le code de la solution pour le _endpoint_ POST</b></summary>

<br>

```js
app.post("/etudiants", (req, res) => {
  console.log("### ajout d'un étudiant");
  // la syntaxe "..." permet de copier toutes les propriétés de req.body dans newEtudiant
  const newEtudiant = { id: compteur, ...req.body };
  compteur = compteur + 1;
  etudiants.push(newEtudiant);
  console.log("étudiant créé :");
  console.log(newEtudiant);
  res.send(newEtudiant);
});
```

</details>

<br>

- La ligne 4 crée un nouvel objet étudiant et lui attribue automatiquement un `id`.
- La ligne 5 incrémente la variable `compteur` pour que le prochain étudiant créé ait un nouvel `id`.
- La ligne 6 insère l'étudiant dans la collection existante (dans un contexte BDD, on aurait ici un INSERT)
- Enfin, la route se termine en envoyant une réponse avec l'étudiant nouvellement ajouté.

Vérifiez la fonctionnalité ci-dessus en envoyant une requête `POST` à l'aide de l'application cliente. N'oubliez pas de redémarrer votre application serveur auparavant.

## PUT (mise à jour)

Pour implémenter l'unique point de terminaison en `PUT`, le _callback_ doit :

- essayer de trouver l'étudiant avec l'identifiant requis (paramètre de route) ;
- si aucun étudiant n'est trouvé, envoyer une réponse d'erreur avec le code 404 (_Not Found_) ;
- si un étudiant est trouvé, remplacer l'étudiant dans le tableau par celui du corps de la requête.

Vous pouvez essayer d'implémenter ceci par vous-même avant de regarder la solution (vous pourriez vouloir utiliser la méthode `.findIndex()` sur le tableau).

<br>

<details>
<summary><b>Cliquez pour la solution du point de terminaison PUT</b></summary>

<br>

```js
app.put("/etudiants/:id", (req, res) => {
  console.log(`### modifier l'étudiant d'id ${req.params.id}`);
  const etudiantIndex = etudiants.findIndex(
    (etudiant) => etudiant.id === req.params.id
  );
  // si aucun id trouvé, findIndex renvoie -1
  if (etudiantIndex != -1) {
    console.log("étudiant modifié");
    console.log(req.body);
    // mise à jour de l'étudiant dans le tableau
    etudiants[etudiantIndex] = req.body;
    // la réponse contient l'étudiant modifié
    res.send(etudiants[etudiantIndex]);
  } else {
    console.log("étudiant non trouvé...");
    res.sendStatus(204);
  }
});
```

</details>

<br>

Vérifiez la fonctionnalité ci-dessus en envoyant une requête `PUT` à l'aide de l'application cliente.

## DELETE (suppression)

Implémentons finalement le point de terminaison de suppression. Ce _endpoint_ doit :

- essayer de trouver l'étudiant avec l'identifiant requis (paramètre de route) ;
- si aucun étudiant n'est trouvé, envoyer une réponse d'erreur avec le code 404 (_Not Found_) ;
- si un étudiant est trouvé, le supprimer du tableau et renvoyer un code 204 (_No Content_ : la requête a réussi mais il n'y a pas de contenu à renvoyer)

Vous pouvez essayer d'implémenter ceci par vous-même avant de regarder la solution (vous pourriez vouloir utiliser la méthode `.filter()` sur le tableau).

<br>

<details>

<summary><b>Cliquez pour la solution du _endpoint_ DELETE</b></summary>

<br>

```js
app.delete("/etudiants/:id", (req, res) => {
  console.log(`### supprimer l'étudiant d'id ${req.params.id}`);
  var etudiantIndex = etudiants.findIndex((et) => et.id === req.params.id);
  // si aucun id trouvé, findIndex renvoie -1
  if (etudiantIndex != -1) {
    console.log("étudiant supprimé");
    // filter va renvoyer un nouveau tableau sans l'élément à supprimer
    etudiants = etudiants.filter((etudiant) => etudiant.id != req.params.id);
    res.sendStatus(204);
  } else {
    console.log("étudiant non trouvé...");
    res.sendStatus(404);
  }
});
```

</details>

<br>

Vérifiez la fonctionnalité ci-dessus en envoyant une requête `DELETE` à l'aide de l'application cliente.

## Traiter les autres routes

Il est temps d'ajouter la touche finale : la gestion des routes inexistantes. Ajoutez le code ci-dessous à vos routes existantes (et au-dessus de `app.listen()`) :

```js
app.all("/", (req, res) => {
  console.log("### route inconnue");
  res.sendStatus("404");
});
```

La ligne ci-dessus utilise la méthode spéciale `all`, qui n'est pas un verbe HTTP mais sert plutôt à capturer tous les types de requêtes. De plus, la route `"/"` fait référence à tous les chemins possibles. Si une requête ne correspond à aucun des _endpoints_ définis précédemment, elle « atterrira » dans ce _endpoint_ de capture qui fournit un message d'erreur indiquant que le chemin de la requête est inexistant (code 404).

L'API est maintenant terminée.

## Test

### Test 404

Redémarrez le serveur et naviguez vers l'application cliente. Modifiez le _endpoint_ dans la barre d'adresse du navigateur pour envoyer une requête à un chemin invalide et observer le message d'erreur.

### Test `GET`

Après un démarrage du serveur, un premier `GET` doit renvoyer une liste vide.

### Test `POST`

Ajoutez un étudiant à la liste en envoyant une requête `POST` à l'aide de l'application cliente. Vérifiez que l'étudiant a été ajouté à la liste par un nouvel appel `GET`.

### Test `PUT`

Modifiez un étudiant existant en envoyant une requête `PUT` à l'aide de l'application cliente. Vérifiez que l'étudiant a été modifié dans la liste par un nouvel appel `GET` sur l'ID de l'étudiant modifié.

### Test `DELETE`

Supprimez un étudiant existant en envoyant une requête `DELETE` à l'aide de l'application cliente. Vérifiez que l'étudiant a été supprimé de la liste par un nouvel appel `GET`.

## Conclusion

Dans ce projet, vous avez appris :

- à reconnaître et à mettre en œuvre de bonnes pratiques de conception d'API ;
- à appliquer les contraintes de conception REST telles que l'interface uniforme, l'architecture client-serveur, le sans-état et la conception en couches ;
- à utiliser le framework Express avec les méthodes et _middlewares_ intégrés pour implémenter une application côté serveur ;
- à comprendre différents types de requêtes et réponses HTTP ;
- à tester les points de terminaison pour s'assurer que les fonctionnalités sont correctes.
